import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { authenticate, authorize } from "../middleware/auth";
import { recordAudit } from "../services/auditLog";
import { revalidateSite } from "../services/revalidateSite";

/** Picks sit on many pages; the tag refreshes every page that fetched them. */
function refreshPickPages() {
  revalidateSite([], ["product-picks"]);
}

export const PRODUCT_PICK_CATEGORIES = [
  "protein",
  "creatine",
  "scale",
  "tracker",
  "equipment",
  "hydration",
  "other",
] as const;

/** article:<9-digit number> · calc:/<path> · review:<slug> */
const TARGET_RE = /^(article:\d{9}|calc:\/[a-z0-9-]+|review:[a-z0-9-]+)$/;
const MAX_PICKS_PER_TARGET = 3;

const placementSchema = z.object({
  target: z.string().trim().regex(TARGET_RE),
  sortOrder: z.number().int().min(0).max(100).optional().default(0),
});

const pickBodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  brand: z.string().trim().max(80).optional().default(""),
  category: z.enum(PRODUCT_PICK_CATEGORIES).optional().default("other"),
  url: z.string().trim().url().max(500).regex(/^https:\/\//, "URL must start with https://"),
  retailer: z.string().trim().max(60).optional().default(""),
  whyPick: z.string().trim().max(300).optional().default(""),
  notFor: z.string().trim().max(200).optional().default(""),
  priceRange: z.string().trim().max(80).optional().default(""),
  isAffiliate: z.boolean().optional().default(false),
  status: z.enum(["draft", "published"]).optional().default("draft"),
  sortOrder: z.number().int().min(0).max(10_000).optional().default(0),
  placements: z.array(placementSchema).max(40).optional(),
});

type PickRow = Record<string, unknown>;

function mapPick(row: PickRow, placements: { target: string; sortOrder: number }[] = []) {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand ?? "",
    category: row.category,
    url: row.url,
    retailer: row.retailer ?? "",
    whyPick: row.why_pick ?? "",
    notFor: row.not_for ?? "",
    priceRange: row.price_range ?? "",
    isAffiliate: row.is_affiliate === true,
    status: row.status,
    sortOrder: Number(row.sort_order ?? 0),
    placements,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function placementsFor(ids: string[]) {
  const byPick = new Map<string, { target: string; sortOrder: number }[]>();
  if (!ids.length) return byPick;
  const res = await pool.query(
    `SELECT pick_id, target, sort_order FROM product_pick_placements
     WHERE pick_id = ANY($1::uuid[])
     ORDER BY target ASC`,
    [ids],
  );
  for (const r of res.rows) {
    const list = byPick.get(r.pick_id) ?? [];
    list.push({ target: r.target, sortOrder: Number(r.sort_order ?? 0) });
    byPick.set(r.pick_id, list);
  }
  return byPick;
}

/** Targets that already hold the maximum number of published picks (excluding this pick). */
async function crowdedTargets(targets: string[], excludeId: string | null) {
  if (!targets.length) return [];
  const res = await pool.query(
    `SELECT pl.target, COUNT(*)::int AS n
     FROM product_pick_placements pl
     JOIN product_picks p ON p.id = pl.pick_id
     WHERE pl.target = ANY($1::text[])
       AND p.status = 'published'
       AND ($2::uuid IS NULL OR p.id <> $2::uuid)
     GROUP BY pl.target
     HAVING COUNT(*) >= $3`,
    [targets, excludeId, MAX_PICKS_PER_TARGET],
  );
  return res.rows.map((r) => String(r.target));
}

export const productPicksRouter = Router();

productPicksRouter.use(authenticate, authorize("admin", "editor"));

productPicksRouter.get("/", async (_req, res) => {
  const result = await pool.query(
    `SELECT * FROM product_picks ORDER BY category ASC, sort_order ASC, name ASC`,
  );
  const placements = await placementsFor(result.rows.map((r) => String(r.id)));
  res.json({
    picks: result.rows.map((r) => mapPick(r, placements.get(String(r.id)) ?? [])),
  });
});

productPicksRouter.get("/:id", async (req, res) => {
  const result = await pool.query(`SELECT * FROM product_picks WHERE id = $1`, [
    req.params.id,
  ]);
  if (!result.rows[0]) {
    res.status(404).json({ message: "Product pick not found" });
    return;
  }
  const placements = await placementsFor([String(result.rows[0].id)]);
  res.json({ pick: mapPick(result.rows[0], placements.get(String(result.rows[0].id)) ?? []) });
});

async function savePick(
  id: string | null,
  data: z.infer<typeof pickBodySchema>,
): Promise<PickRow> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const values = [
      data.name,
      data.brand,
      data.category,
      data.url,
      data.retailer,
      data.whyPick,
      data.notFor,
      data.priceRange,
      data.isAffiliate,
      data.status,
      data.sortOrder,
    ];
    const saved = id
      ? await client.query(
          `UPDATE product_picks SET
             name = $1, brand = $2, category = $3, url = $4, retailer = $5,
             why_pick = $6, not_for = $7, price_range = $8, is_affiliate = $9,
             status = $10, sort_order = $11, updated_at = NOW()
           WHERE id = $12
           RETURNING *`,
          [...values, id],
        )
      : await client.query(
          `INSERT INTO product_picks (
             name, brand, category, url, retailer, why_pick, not_for,
             price_range, is_affiliate, status, sort_order
           ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
           RETURNING *`,
          values,
        );
    const row = saved.rows[0];
    if (row && data.placements) {
      await client.query(`DELETE FROM product_pick_placements WHERE pick_id = $1`, [row.id]);
      const unique = new Map(data.placements.map((p) => [p.target, p.sortOrder]));
      for (const [target, sortOrder] of unique) {
        await client.query(
          `INSERT INTO product_pick_placements (pick_id, target, sort_order) VALUES ($1, $2, $3)`,
          [row.id, target, sortOrder],
        );
      }
    }
    await client.query("COMMIT");
    return row;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function respondWithPick(res: import("express").Response, row: PickRow, status = 200) {
  const placements = await placementsFor([String(row.id)]);
  const pick = mapPick(row, placements.get(String(row.id)) ?? []);
  const warnings: string[] = [];
  if (pick.status === "published" && pick.placements.length) {
    const crowded = await crowdedTargets(
      pick.placements.map((p) => p.target),
      String(row.id),
    );
    if (crowded.length) {
      warnings.push(
        `Pages already showing ${MAX_PICKS_PER_TARGET} picks (extra picks are not shown): ${crowded.join(", ")}`,
      );
    }
  }
  res.status(status).json({ pick, warnings });
}

productPicksRouter.post("/", async (req, res) => {
  const parsed = pickBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid product pick", issues: parsed.error.issues });
    return;
  }
  const row = await savePick(null, parsed.data);
  await recordAudit(req, {
    action: "product_pick.create",
    entityType: "product_pick",
    entityId: String(row.id),
    summary: `Created product pick ${row.name}`,
  });
  refreshPickPages();
  await respondWithPick(res, row, 201);
});

productPicksRouter.patch("/:id", async (req, res) => {
  const existing = await pool.query(`SELECT * FROM product_picks WHERE id = $1`, [
    req.params.id,
  ]);
  if (!existing.rows[0]) {
    res.status(404).json({ message: "Product pick not found" });
    return;
  }
  const current = mapPick(existing.rows[0]);
  const parsed = pickBodySchema.safeParse({
    name: current.name,
    brand: current.brand,
    category: current.category,
    url: current.url,
    retailer: current.retailer,
    whyPick: current.whyPick,
    notFor: current.notFor,
    priceRange: current.priceRange,
    isAffiliate: current.isAffiliate,
    status: current.status,
    sortOrder: current.sortOrder,
    ...req.body,
  });
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid product pick", issues: parsed.error.issues });
    return;
  }
  const row = await savePick(req.params.id, parsed.data);
  await recordAudit(req, {
    action: "product_pick.update",
    entityType: "product_pick",
    entityId: String(row.id),
    summary: `Updated product pick ${row.name}`,
  });
  refreshPickPages();
  await respondWithPick(res, row);
});

productPicksRouter.delete("/:id", async (req, res) => {
  const result = await pool.query(
    `DELETE FROM product_picks WHERE id = $1 RETURNING id, name`,
    [req.params.id],
  );
  if (!result.rows[0]) {
    res.status(404).json({ message: "Product pick not found" });
    return;
  }
  await recordAudit(req, {
    action: "product_pick.delete",
    entityType: "product_pick",
    entityId: String(result.rows[0].id),
    summary: `Deleted product pick ${result.rows[0].name}`,
  });
  refreshPickPages();
  res.status(204).send();
});

/** Mounted at /public/product-picks — no auth. */
export const publicProductPicksRouter = Router();

publicProductPicksRouter.get("/", async (req, res) => {
  const target = typeof req.query.target === "string" ? req.query.target.trim() : "";
  if (!TARGET_RE.test(target)) {
    res.status(400).json({ message: "Invalid target" });
    return;
  }
  const result = await pool.query(
    `SELECT p.*
     FROM product_pick_placements pl
     JOIN product_picks p ON p.id = pl.pick_id
     WHERE pl.target = $1 AND p.status = 'published'
     ORDER BY pl.sort_order ASC, p.sort_order ASC, p.name ASC
     LIMIT $2`,
    [target, MAX_PICKS_PER_TARGET],
  );
  res.set("Cache-Control", "public, max-age=300, s-maxage=600, stale-while-revalidate=86400");
  res.json({
    picks: result.rows.map((r) => {
      const { placements: _p, status: _s, sortOrder: _o, createdAt: _c, ...pub } = mapPick(r);
      return pub;
    }),
  });
});
