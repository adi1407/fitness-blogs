import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool";
import { authorize } from "../middleware/auth";
import { clientIp, rateLimit } from "../middleware/rateLimit";

const TEN_MINUTES = 10 * 60 * 1000;
const MAX_QUERY = 80;

function normalizeSearchQuery(raw: string): { norm: string; display: string } | null {
  const display = raw.replace(/\s+/g, " ").trim().slice(0, MAX_QUERY);
  if (display.length < 2) return null;
  const norm = display.toLowerCase();
  return { norm, display };
}

const logSchema = z.object({
  query: z.string().max(200),
  results: z.number().int().min(0).max(10_000),
});

/** Mounted at /public — no auth. */
export const publicSearchLogRouter = Router();

publicSearchLogRouter.post(
  "/search-log",
  rateLimit({
    windowMs: TEN_MINUTES,
    max: 30,
    key: (req) => `search-log:${clientIp(req)}`,
  }),
  rateLimit({
    windowMs: TEN_MINUTES,
    max: 120,
    key: (req) => `search-log-host:${req.ip}`,
  }),
  async (req, res) => {
    const parsed = logSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid search log payload" });
      return;
    }
    const normalized = normalizeSearchQuery(parsed.data.query);
    if (!normalized) {
      res.json({ ok: true });
      return;
    }
    const results = parsed.data.results;
    const zeroInc = results === 0 ? 1 : 0;
    try {
      await pool.query(
        `INSERT INTO search_queries (
           query_norm, query_display, hit_count, zero_count, last_results, last_seen_at
         ) VALUES ($1, $2, 1, $3, $4, NOW())
         ON CONFLICT (query_norm) DO UPDATE SET
           query_display = EXCLUDED.query_display,
           hit_count = search_queries.hit_count + 1,
           zero_count = search_queries.zero_count + EXCLUDED.zero_count,
           last_results = EXCLUDED.last_results,
           last_seen_at = NOW()`,
        [normalized.norm, normalized.display, zeroInc, results],
      );
      res.json({ ok: true });
    } catch (err) {
      console.error("[search-log] failed", err);
      res.status(500).json({ message: "Could not log search" });
    }
  },
);

function mapInsight(row: Record<string, unknown>) {
  return {
    id: row.id,
    query: row.query_display,
    queryNorm: row.query_norm,
    hitCount: Number(row.hit_count ?? 0),
    zeroCount: Number(row.zero_count ?? 0),
    lastResults: Number(row.last_results ?? 0),
    lastSeenAt: row.last_seen_at,
    createdAt: row.created_at,
  };
}

/** Mounted at /admin/search-insights */
export const adminSearchInsightsRouter = Router();

adminSearchInsightsRouter.get("/", authorize("admin", "editor"), async (req, res) => {
  const zeroOnly =
    req.query.zeroOnly === "1" ||
    req.query.zeroOnly === "true";
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));
  const where = zeroOnly ? "WHERE zero_count > 0" : "";
  try {
    const result = await pool.query(
      `SELECT * FROM search_queries
       ${where}
       ORDER BY
         CASE WHEN zero_count > 0 THEN 0 ELSE 1 END,
         zero_count DESC,
         hit_count DESC,
         last_seen_at DESC
       LIMIT $1`,
      [limit],
    );
    res.json({ queries: result.rows.map(mapInsight) });
  } catch (err) {
    console.error("[admin/search-insights] failed", err);
    res.status(500).json({ message: "Could not load search insights" });
  }
});
