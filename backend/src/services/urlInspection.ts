import { pool } from "../db/pool";
import { googleApi, gscServiceAccount, resolveSiteUrl } from "./searchConsole";

const INSPECT_URL = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";
const LOCK_KEY = 874_201_120;
/** Google allows 2,000 inspections a day per property; a 3-day refresh of ~250 URLs uses ~85. */
const STALE_AFTER = "3 days";

type IndexStatus = {
  verdict?: string;
  coverageState?: string;
  indexingState?: string;
  robotsTxtState?: string;
  pageFetchState?: string;
  googleCanonical?: string;
  userCanonical?: string;
  lastCrawlTime?: string;
};

/** Keeps the last good verdict; only the error and timestamp change. */
async function saveInspectionError(url: string, error: string): Promise<void> {
  await pool.query(
    `INSERT INTO gsc_url_inspections (url, error, inspected_at) VALUES ($1, $2, NOW())
     ON CONFLICT (url) DO UPDATE SET error = EXCLUDED.error, inspected_at = NOW()`,
    [url, error.slice(0, 500)],
  );
}

async function saveInspection(url: string, status: IndexStatus): Promise<void> {
  await pool.query(
    `INSERT INTO gsc_url_inspections (
       url, verdict, coverage_state, indexing_state, robots_txt_state, page_fetch_state,
       google_canonical, user_canonical, last_crawl_time, error, inspected_at
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
     ON CONFLICT (url) DO UPDATE SET
       verdict = EXCLUDED.verdict, coverage_state = EXCLUDED.coverage_state,
       indexing_state = EXCLUDED.indexing_state, robots_txt_state = EXCLUDED.robots_txt_state,
       page_fetch_state = EXCLUDED.page_fetch_state, google_canonical = EXCLUDED.google_canonical,
       user_canonical = EXCLUDED.user_canonical, last_crawl_time = EXCLUDED.last_crawl_time,
       error = EXCLUDED.error, inspected_at = NOW()`,
    [
      url,
      status.verdict ?? "",
      status.coverageState ?? "",
      status.indexingState ?? "",
      status.robotsTxtState ?? "",
      status.pageFetchState ?? "",
      status.googleCanonical ?? "",
      status.userCanonical ?? "",
      status.lastCrawlTime ?? null,
      "",
    ],
  );
}

/** Ask Google how it sees one URL and store the answer. Throws on API errors. */
export async function inspectUrl(url: string, siteUrl?: string): Promise<void> {
  const sa = gscServiceAccount();
  if (!sa) throw new Error("Search Console is not connected");
  const data = await googleApi<{ inspectionResult?: { indexStatusResult?: IndexStatus } }>(sa, INSPECT_URL, {
    inspectionUrl: url,
    siteUrl: siteUrl ?? (await resolveSiteUrl(sa)),
    languageCode: "en-IN",
  });
  await saveInspection(url, data.inspectionResult?.indexStatusResult ?? {});
}

/**
 * Inspect up to `limit` sitemap URLs that were never inspected or are older than
 * STALE_AFTER, one at a time. Stops early when Google reports the quota is spent.
 */
export async function inspectStaleUrls(limit: number): Promise<{ inspected: number; failed: number }> {
  const sa = gscServiceAccount();
  if (!sa) return { inspected: 0, failed: 0 };
  const client = await pool.connect();
  try {
    const lock = await client.query<{ ok: boolean }>(`SELECT pg_try_advisory_lock($1) AS ok`, [LOCK_KEY]);
    if (!lock.rows[0]?.ok) return { inspected: 0, failed: 0 };
    try {
      const due = await client.query<{ url: string }>(
        `SELECT p.url FROM site_audit_pages p
         LEFT JOIN gsc_url_inspections i ON i.url = p.url
         WHERE i.url IS NULL OR i.inspected_at < NOW() - $2::interval
         ORDER BY i.inspected_at NULLS FIRST, p.url
         LIMIT $1`,
        [limit, STALE_AFTER],
      );
      if (!due.rows.length) return { inspected: 0, failed: 0 };
      const siteUrl = await resolveSiteUrl(sa);
      let inspected = 0;
      let failed = 0;
      for (const { url } of due.rows) {
        try {
          await inspectUrl(url, siteUrl);
          inspected++;
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          if (/\b429\b|quota/i.test(message)) {
            console.warn("[url-inspection] quota reached, resuming next hour");
            break;
          }
          failed++;
          await saveInspectionError(url, message);
        }
      }
      console.log(`[url-inspection] inspected ${inspected} URL(s)${failed ? `, ${failed} failed` : ""}`);
      return { inspected, failed };
    } finally {
      await client.query(`SELECT pg_advisory_unlock($1)`, [LOCK_KEY]).catch(() => undefined);
    }
  } finally {
    client.release();
  }
}
