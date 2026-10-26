import { Router } from "express";
import { z } from "zod";
import { env } from "../config/env";
import { pool } from "../db/pool";
import { authorize } from "../middleware/auth";
import { gscServiceAccount, syncSearchConsole } from "../services/searchConsole";

const overviewSchema = z.object({
  days: z.coerce.number().refine((d) => [7, 28, 90, 180, 365].includes(d)).default(28),
  segment: z.enum(["nonbrand", "brand", "all"]).default("nonbrand"),
});

/** Postgres regex matching any brand term; empty = nothing is brand. */
function brandPattern(): string {
  return env.gsc.brandTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
}
const IS_BRAND = (param: string) => `COALESCE(query ~* NULLIF(${param}, ''), FALSE)`;
const WEIGHTED_POSITION = `SUM(position * impressions) / NULLIF(SUM(impressions), 0)`;

type Metrics = { clicks: number; impressions: number; ctr: number; position: number | null };

function metrics(row?: { clicks?: unknown; impressions?: unknown; position?: unknown }): Metrics {
  const clicks = Number(row?.clicks ?? 0);
  const impressions = Number(row?.impressions ?? 0);
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: row?.position == null ? null : Number(row.position),
  };
}

function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function pathOf(url: string): string {
  try {
    const u = new URL(url);
    return `${u.pathname}${u.search}` || "/";
  } catch {
    return url;
  }
}

function articleNumberOf(url: string): number | null {
  const n = pathOf(url).match(/^\/blog\/[^/]+\/[^/]+\/[^/]+\/(\d{9})\/?$/)?.[1];
  return n ? Number(n) : null;
}

async function syncStatus() {
  const sa = gscServiceAccount();
  const [lastRun, lastSuccess, through] = await Promise.all([
    pool.query(
      `SELECT status, trigger, site_url, row_count, error, started_at, finished_at
       FROM gsc_sync_runs ORDER BY started_at DESC LIMIT 1`,
    ),
    pool.query(
      `SELECT site_url, finished_at FROM gsc_sync_runs WHERE status = 'success' ORDER BY started_at DESC LIMIT 1`,
    ),
    pool.query<{ through: string | null }>(`SELECT to_char(MAX(date), 'YYYY-MM-DD') AS through FROM gsc_site_daily`),
  ]);
  const run = lastRun.rows[0];
  return {
    configured: Boolean(sa),
    serviceAccountEmail: sa?.clientEmail ?? null,
    siteUrl: lastSuccess.rows[0]?.site_url || env.gsc.siteUrl || null,
    lastSuccessAt: lastSuccess.rows[0]?.finished_at ?? null,
    dataThrough: through.rows[0]?.through ?? null,
    lastRun: run
      ? {
          status: run.status as string,
          trigger: run.trigger as string,
          rows: Number(run.row_count),
          error: (run.error as string) || null,
          startedAt: run.started_at,
          finishedAt: run.finished_at,
        }
      : null,
    brandTerms: env.gsc.brandTerms,
  };
}

/** Mounted at /admin/seo */
export const adminSeoRouter = Router();

adminSeoRouter.get("/overview", authorize("admin", "editor"), async (req, res) => {
  const parsed = overviewSchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid range or segment" });
    return;
  }
  const { days, segment } = parsed.data;
  const status = await syncStatus();
  if (!status.dataThrough) {
    res.json({ status, range: null });
    return;
  }

  const end = status.dataThrough;
  const start = addDays(end, -(days - 1));
  const prevStart = addDays(start, -days);
  const brand = brandPattern();
  const segmentFilter =
    segment === "all" ? "TRUE" : segment === "brand" ? IS_BRAND("$3") : `NOT ${IS_BRAND("$3")}`;

  const [totals, split, daily, queries, pages] = await Promise.all([
    pool.query(
      `SELECT (date >= $1) AS current, SUM(clicks) AS clicks, SUM(impressions) AS impressions,
              ${WEIGHTED_POSITION} AS position
       FROM gsc_site_daily WHERE date BETWEEN $3 AND $2 GROUP BY 1`,
      [start, end, prevStart],
    ),
    pool.query(
      `SELECT (date >= $1) AS current, ${IS_BRAND("$4")} AS brand,
              SUM(clicks) AS clicks, SUM(impressions) AS impressions, ${WEIGHTED_POSITION} AS position
       FROM gsc_query_daily WHERE date BETWEEN $3 AND $2 GROUP BY 1, 2`,
      [start, end, prevStart, brand],
    ),
    pool.query(
      `SELECT to_char(d, 'YYYY-MM-DD') AS date,
              COALESCE(s.clicks, 0) AS clicks, COALESCE(s.impressions, 0) AS impressions,
              COALESCE(q.clicks, 0) AS nb_clicks, COALESCE(q.impressions, 0) AS nb_impressions
       FROM generate_series($1::date, $2::date, interval '1 day') AS d
       LEFT JOIN gsc_site_daily s ON s.date = d::date
       LEFT JOIN (
         SELECT date, SUM(clicks) AS clicks, SUM(impressions) AS impressions
         FROM gsc_query_daily
         WHERE date BETWEEN $1 AND $2 AND NOT ${IS_BRAND("$3")}
         GROUP BY date
       ) q ON q.date = d::date
       ORDER BY d`,
      [start, end, brand],
    ),
    pool.query(
      `SELECT query, SUM(clicks) AS clicks, SUM(impressions) AS impressions, ${WEIGHTED_POSITION} AS position
       FROM gsc_query_daily
       WHERE date BETWEEN $1 AND $2 AND ${segmentFilter}
       GROUP BY query ORDER BY SUM(impressions) DESC, SUM(clicks) DESC, query LIMIT 50`,
      [start, end, brand],
    ),
    pool.query(
      `SELECT page, SUM(clicks) AS clicks, SUM(impressions) AS impressions, ${WEIGHTED_POSITION} AS position
       FROM gsc_page_daily WHERE date BETWEEN $1 AND $2
       GROUP BY page ORDER BY SUM(impressions) DESC, SUM(clicks) DESC, page LIMIT 50`,
      [start, end],
    ),
  ]);

  const queryNames = queries.rows.map((r) => String(r.query));
  const pageUrls = pages.rows.map((r) => String(r.page));
  const articleNumbers = pageUrls.map(articleNumberOf).filter((n): n is number => n !== null);

  const [queryPages, articles] = await Promise.all([
    // Window counts run before DISTINCT ON, so `pages` is how many URLs the query reached.
    pool.query<{ query: string; page: string; pages: string }>(
      `SELECT DISTINCT ON (query) query, page, COUNT(*) OVER (PARTITION BY query) AS pages
       FROM (
         SELECT query, page, SUM(clicks) AS clicks, SUM(impressions) AS impressions
         FROM gsc_page_query_daily
         WHERE date BETWEEN $1 AND $2 AND query = ANY($3::text[])
         GROUP BY query, page
       ) t
       ORDER BY query, clicks DESC, impressions DESC`,
      [start, end, queryNames],
    ),
    articleNumbers.length
      ? pool.query<{ id: string; article_number: number; title: string }>(
          `SELECT id, article_number, title FROM articles WHERE article_number = ANY($1::int[])`,
          [articleNumbers],
        )
      : Promise.resolve({ rows: [] as { id: string; article_number: number; title: string }[] }),
  ]);
  const topPage = new Map(queryPages.rows.map((r) => [r.query, r.page]));
  const pagesPerQuery = new Map(queryPages.rows.map((r) => [r.query, Number(r.pages)]));
  const articleByNumber = new Map(articles.rows.map((a) => [Number(a.article_number), a]));

  const period = (current: boolean) => totals.rows.find((r) => r.current === current);
  const splitRow = (current: boolean, isBrand: boolean) =>
    split.rows.find((r) => r.current === current && r.brand === isBrand);
  const hidden = (current: boolean) => {
    const total = metrics(period(current));
    const brandM = metrics(splitRow(current, true));
    const nonBrand = metrics(splitRow(current, false));
    return {
      clicks: Math.max(0, total.clicks - brandM.clicks - nonBrand.clicks),
      impressions: Math.max(0, total.impressions - brandM.impressions - nonBrand.impressions),
    };
  };

  res.json({
    status,
    range: { start, end, days, previousStart: prevStart, previousEnd: addDays(start, -1) },
    totals: { current: metrics(period(true)), previous: metrics(period(false)) },
    split: {
      current: { brand: metrics(splitRow(true, true)), nonBrand: metrics(splitRow(true, false)), hidden: hidden(true) },
      previous: { brand: metrics(splitRow(false, true)), nonBrand: metrics(splitRow(false, false)), hidden: hidden(false) },
    },
    daily: daily.rows.map((r) => ({
      date: r.date,
      clicks: Number(r.clicks),
      impressions: Number(r.impressions),
      nonBrandClicks: Number(r.nb_clicks),
      nonBrandImpressions: Number(r.nb_impressions),
    })),
    segment,
    queries: queries.rows.map((r) => {
      const page = topPage.get(String(r.query));
      return {
        query: r.query,
        ...metrics(r),
        topPage: page ? { url: page, path: pathOf(page) } : null,
        pageCount: pagesPerQuery.get(String(r.query)) ?? 0,
      };
    }),
    pages: pages.rows.map((r) => {
      const url = String(r.page);
      const number = articleNumberOf(url);
      const article = number === null ? undefined : articleByNumber.get(number);
      return {
        url,
        path: pathOf(url),
        ...metrics(r),
        article: article ? { id: article.id, title: article.title } : null,
      };
    }),
  });
});

adminSeoRouter.post("/sync", authorize("admin", "editor"), async (_req, res) => {
  if (!gscServiceAccount()) {
    res.status(400).json({ message: "Search Console is not connected yet (GSC_SERVICE_ACCOUNT_JSON)." });
    return;
  }
  const last = await pool.query<{ running: boolean; recent: boolean }>(
    `SELECT status = 'running' AND started_at > NOW() - interval '30 minutes' AS running,
            started_at > NOW() - interval '2 minutes' AS recent
     FROM gsc_sync_runs ORDER BY started_at DESC LIMIT 1`,
  );
  const latest = last.rows[0];
  if (latest?.running) {
    res.status(409).json({ message: "A sync is already running." });
    return;
  }
  if (latest?.recent) {
    res.status(429).json({ message: "A sync just ran. Try again in a couple of minutes." });
    return;
  }
  void syncSearchConsole("manual");
  res.status(202).json({ started: true });
});
