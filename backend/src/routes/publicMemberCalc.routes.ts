import { Router, type Request, type Response } from "express";
import { pool } from "../db/pool";
import { requireMember } from "../middleware/memberAuth";

export const CALC_TOOLS = [
  "calorie-calculator",
  "tdee-calculator",
  "bmr-calculator",
  "macro-calculator",
  "protein-calculator",
  "bmi-calculator",
  "calorie-deficit-calculator",
  "body-fat-calculator",
  "one-rep-max-calculator",
  "water-intake-calculator",
  "steps-to-calories-calculator",
] as const;

type CalcTool = (typeof CALC_TOOLS)[number];

const MAX_RESULTS_PER_MEMBER = 20;
const MAX_JSON_BYTES = 4096;
const MAX_FLAT_KEYS = 32;
const MAX_STRING_LEN = 80;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Primitive = string | number | boolean;

function isCalcTool(value: unknown): value is CalcTool {
  return (
    typeof value === "string" && (CALC_TOOLS as readonly string[]).includes(value)
  );
}

/** Accepts only small flat objects of finite numbers, short strings, booleans. */
function parseFlatRecord(value: unknown): Record<string, Primitive> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length > MAX_FLAT_KEYS) return null;
  const out: Record<string, Primitive> = {};
  for (const [key, v] of entries) {
    if (!/^[a-zA-Z][a-zA-Z0-9_]{0,39}$/.test(key)) return null;
    if (typeof v === "number") {
      if (!Number.isFinite(v)) return null;
      out[key] = v;
    } else if (typeof v === "string") {
      if (v.length > MAX_STRING_LEN) return null;
      out[key] = v;
    } else if (typeof v === "boolean") {
      out[key] = v;
    } else if (v !== null && v !== undefined) {
      return null;
    }
  }
  if (Buffer.byteLength(JSON.stringify(out), "utf8") > MAX_JSON_BYTES) {
    return null;
  }
  return out;
}

type CalcProfile = {
  sex?: "male" | "female";
  age?: number;
  kg?: number;
  cm?: number;
  weightUnit?: "kg" | "lb";
  heightUnit?: "cm" | "ft";
  activity?: "sedentary" | "light" | "moderate" | "very";
  goal?: "loss" | "maintain" | "gain";
  bodyFatPct?: number;
};

function inRange(v: unknown, min: number, max: number): v is number {
  return typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;
}

function oneOf<T extends string>(v: unknown, options: readonly T[]): v is T {
  return typeof v === "string" && (options as readonly string[]).includes(v);
}

/** Whitelist + range-check profile fields; unknown or invalid fields are dropped. */
function parseProfile(value: unknown): CalcProfile | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const raw = value as Record<string, unknown>;
  const p: CalcProfile = {};
  if (oneOf(raw.sex, ["male", "female"] as const)) p.sex = raw.sex;
  if (inRange(raw.age, 15, 100)) p.age = Math.round(raw.age);
  if (inRange(raw.kg, 30, 300)) p.kg = Math.round(raw.kg * 10) / 10;
  if (inRange(raw.cm, 120, 230)) p.cm = Math.round(raw.cm);
  if (oneOf(raw.weightUnit, ["kg", "lb"] as const)) p.weightUnit = raw.weightUnit;
  if (oneOf(raw.heightUnit, ["cm", "ft"] as const)) p.heightUnit = raw.heightUnit;
  if (oneOf(raw.activity, ["sedentary", "light", "moderate", "very"] as const)) {
    p.activity = raw.activity;
  }
  if (oneOf(raw.goal, ["loss", "maintain", "gain"] as const)) p.goal = raw.goal;
  if (inRange(raw.bodyFatPct, 3, 60)) {
    p.bodyFatPct = Math.round(raw.bodyFatPct * 10) / 10;
  }
  return p;
}

function mapResultRow(row: Record<string, unknown>) {
  return {
    id: String(row.id),
    tool: String(row.tool),
    inputs: row.inputs ?? {},
    result: row.result ?? {},
    createdAt: row.created_at,
  };
}

/** Express 4 does not catch async rejections; turn them into a 500. */
function safe(fn: (req: Request, res: Response) => Promise<void>) {
  return (req: Request, res: Response) => {
    fn(req, res).catch((err: unknown) => {
      console.error("[member-calc]", err);
      if (!res.headersSent) res.status(500).json({ message: "Server error" });
    });
  };
}

export const publicCalcProfileRouter = Router();
export const publicCalcResultsRouter = Router();

publicCalcProfileRouter.get("/", requireMember, safe(async (req, res) => {
  const result = await pool.query(
    `SELECT profile, updated_at FROM member_calc_profiles WHERE member_id = $1`,
    [req.member!.id],
  );
  const row = result.rows[0];
  res.json({
    profile: row ? parseProfile(row.profile) ?? {} : null,
    updatedAt: row?.updated_at ?? null,
  });
}));

publicCalcProfileRouter.put("/", requireMember, safe(async (req, res) => {
  const profile = parseProfile(req.body?.profile);
  if (!profile) {
    res.status(400).json({ message: "Invalid profile" });
    return;
  }
  const result = await pool.query(
    `INSERT INTO member_calc_profiles (member_id, profile, updated_at)
     VALUES ($1, $2::jsonb, NOW())
     ON CONFLICT (member_id) DO UPDATE
       SET profile = member_calc_profiles.profile || EXCLUDED.profile,
           updated_at = NOW()
     RETURNING profile, updated_at`,
    [req.member!.id, JSON.stringify(profile)],
  );
  res.json({
    profile: parseProfile(result.rows[0].profile) ?? {},
    updatedAt: result.rows[0].updated_at,
  });
}));

publicCalcResultsRouter.get("/", requireMember, safe(async (req, res) => {
  const result = await pool.query(
    `SELECT id, tool, inputs, result, created_at
       FROM member_calc_results
      WHERE member_id = $1
      ORDER BY created_at DESC
      LIMIT $2`,
    [req.member!.id, MAX_RESULTS_PER_MEMBER],
  );
  res.json({ results: result.rows.map(mapResultRow) });
}));

publicCalcResultsRouter.post("/", requireMember, safe(async (req, res) => {
  const tool = req.body?.tool;
  const inputs = parseFlatRecord(req.body?.inputs ?? {});
  const resultData = parseFlatRecord(req.body?.result);
  if (!isCalcTool(tool) || !inputs || !resultData) {
    res.status(400).json({ message: "Invalid calculator result" });
    return;
  }
  if (typeof resultData.label !== "string" || resultData.value === undefined) {
    res.status(400).json({ message: "Result needs a label and value" });
    return;
  }

  const memberId = req.member!.id;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const inserted = await client.query(
      `INSERT INTO member_calc_results (member_id, tool, inputs, result)
       VALUES ($1, $2, $3::jsonb, $4::jsonb)
       RETURNING id, tool, inputs, result, created_at`,
      [memberId, tool, JSON.stringify(inputs), JSON.stringify(resultData)],
    );
    await client.query(
      `DELETE FROM member_calc_results
        WHERE member_id = $1
          AND id NOT IN (
            SELECT id FROM member_calc_results
             WHERE member_id = $1
             ORDER BY created_at DESC
             LIMIT $2
          )`,
      [memberId, MAX_RESULTS_PER_MEMBER],
    );
    await client.query("COMMIT");
    res.status(201).json({ result: mapResultRow(inserted.rows[0]) });
  } catch (err) {
    await client.query("ROLLBACK").catch(() => undefined);
    console.error("[calc-results]", err);
    res.status(500).json({ message: "Could not save result" });
  } finally {
    client.release();
  }
}));

publicCalcResultsRouter.delete("/:id", requireMember, safe(async (req, res) => {
  const id = String(req.params.id || "");
  if (!UUID_RE.test(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  const result = await pool.query(
    `DELETE FROM member_calc_results WHERE id = $1 AND member_id = $2`,
    [id, req.member!.id],
  );
  if (!result.rowCount) {
    res.status(404).json({ message: "Result not found" });
    return;
  }
  res.json({ ok: true });
}));
