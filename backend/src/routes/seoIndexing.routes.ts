import { Router } from "express";
import { z } from "zod";
import { env } from "../config/env";
import { pool } from "../db/pool";
import { authorize } from "../middleware/auth";
import { gscServiceAccount } from "../services/searchConsole";
import { auditSite } from "../services/siteAudit";
import { inspectUrl } from "../services/urlInspection";

function articleNumberOf(path: string): number | null {
  const n = path.match(/^\/blog\/[^/]+\/[^/]+\/[^/]+\/(\d{9})$/)?.[1];
  return n ? Number(n) : null;
}

/** Mounted at /admin/seo/indexing */
export const adminSeoIndexingRouter = Router();

adminSeoIndexingRouter.get("/", authorize("admin", "editor"), async (_req, res) => {
  const [lastRun, lastSuccess, pages, gscSite] = await Promise.all([
    pool.query(
      `SELECT status, trigger, pages, error, started_at, finished_at FROM site_audit_runs ORDER BY started_at DESC LIMIT 1`,
    ),
    pool.query(
      `SELECT finished_at, broken_links FROM site_audit_runs WHERE status = 'success' ORDER BY started_at DESC LIMIT 1`,
    ),
    pool.query(
      `SELECT p.*, i.verdict, i.coverage_state, i.indexing_state, i.robots_txt_state, i.page_fetch_state,
              i.google_canonical, i.user_canonical, i.last_crawl_time, i.error AS inspection_error, i.inspected_at
       FROM site_audit_pages p
       LEFT JOIN gsc_url_inspections i ON i.url = p.url
       ORDER BY p.content_inlinks, p.path`,
    ),
    pool.query<{ site_url: string }>(
      `SELECT site_url FROM gsc_sync_runs WHERE status = 'success' ORDER BY started_at DESC LIMIT 1`,
    ),
  ]);

  const numbers = pages.rows.map((r) => articleNumberOf(String(r.path))).filter((n): n is number => n !== null);
  const articles = numbers.length
    ? await pool.query<{ id: string; article_number: number }>(
        `SELECT id, article_number FROM articles WHERE article_number = ANY($1::int[])`,
        [numbers],
      )
    : { rows: [] as { id: string; article_number: number }[] };
  const articleIds = new Map(articles.rows.map((a) => [Number(a.article_number), a.id]));

  const run = lastRun.rows[0];
  res.json({
    audit: {
      lastRun: run
        ? {
            status: run.status,
            trigger: run.trigger,
            pages: Number(run.pages),
            error: run.error || null,
            startedAt: run.started_at,
            finishedAt: run.finished_at,
          }
        : null,
      lastSuccessAt: lastSuccess.rows[0]?.finished_at ?? null,
      brokenLinks: lastSuccess.rows[0]?.broken_links ?? [],
    },
    inspection: {
      configured: Boolean(gscServiceAccount()),
      siteUrl: gscSite.rows[0]?.site_url || env.gsc.siteUrl || null,
    },
    pages: pages.rows.map((r) => {
      const number = articleNumberOf(String(r.path));
      return {
        url: r.url,
        path: r.path,
        title: r.title,
        status: Number(r.status),
        redirectTo: r.redirect_to || null,
        canonical: r.canonical || null,
        noindex: Boolean(r.noindex),
        inlinks: Number(r.inlinks),
        contentInlinks: Number(r.content_inlinks),
        linkedFrom: r.linked_from ?? [],
        articleId: number === null ? null : (articleIds.get(number) ?? null),
        google: r.inspected_at
          ? {
              verdict: r.verdict || null,
              coverageState: r.coverage_state || null,
              indexingState: r.indexing_state || null,
              robotsTxtState: r.robots_txt_state || null,
              pageFetchState: r.page_fetch_state || null,
              googleCanonical: r.google_canonical || null,
              userCanonical: r.user_canonical || null,
              lastCrawlTime: r.last_crawl_time,
              error: r.inspection_error || null,
              inspectedAt: r.inspected_at,
            }
          : null,
      };
    }),
  });
});

adminSeoIndexingRouter.post("/audit", authorize("admin", "editor"), async (_req, res) => {
  const last = await pool.query<{ running: boolean; recent: boolean }>(
    `SELECT status = 'running' AND started_at > NOW() - interval '30 minutes' AS running,
            started_at > NOW() - interval '5 minutes' AS recent
     FROM site_audit_runs ORDER BY started_at DESC LIMIT 1`,
  );
  const latest = last.rows[0];
  if (latest?.running) {
    res.status(409).json({ message: "A crawl is already running." });
    return;
  }
  if (latest?.recent) {
    res.status(429).json({ message: "A crawl just ran. Try again in a few minutes." });
    return;
  }
  void auditSite("manual");
  res.status(202).json({ started: true });
});

const inspectSchema = z.object({ url: z.string().url().max(2000) });

adminSeoIndexingRouter.post("/inspect", authorize("admin", "editor"), async (req, res) => {
  if (!gscServiceAccount()) {
    res.status(400).json({ message: "Connect Search Console first (SEO performance page)." });
    return;
  }
  const parsed = inspectSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "A page URL is required." });
    return;
  }
  const known = await pool.query(`SELECT 1 FROM site_audit_pages WHERE url = $1`, [parsed.data.url]);
  if (!known.rowCount) {
    res.status(404).json({ message: "That URL is not in the latest sitemap crawl." });
    return;
  }
  try {
    await inspectUrl(parsed.data.url);
    res.json({ ok: true });
  } catch (err) {
    res.status(502).json({ message: err instanceof Error ? err.message : "Inspection failed" });
  }
});
