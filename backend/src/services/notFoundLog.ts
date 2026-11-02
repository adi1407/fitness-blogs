import { pool } from "../db/pool";
import { buildLinkIndex } from "./internalLinking";
import { publicSiteOrigin } from "./searchConsole";
import { normalizePath } from "./urlRedirects";

const MAX_PATH = 300;
const RETAIN_DAYS = 90;

/** Site paths only: no assets, API routes, or anything that isn't a plain page path. */
export function cleanNotFoundPath(raw: string): string | null {
  const path = normalizePath(raw.split(/[?#]/)[0] ?? "");
  if (!path || path === "/" || path.length > MAX_PATH) return null;
  if (!/^\/[\w\-./%~]*$/.test(path)) return null;
  if (/^\/(_next|api)\//.test(path) || /\.[a-z0-9]{2,5}$/i.test(path)) return null;
  return path;
}

function internalReferrer(referrer: string): string {
  try {
    const u = new URL(referrer);
    const host = new URL(publicSiteOrigin()).hostname.replace(/^www\./, "");
    return u.hostname.replace(/^www\./, "") === host ? normalizePath(u.pathname) : "";
  } catch {
    return "";
  }
}

export async function recordNotFound(path: string, referrer: string): Promise<void> {
  const ref = referrer.slice(0, 500);
  await pool.query(
    `INSERT INTO not_found_hits (path, last_referrer, internal_referrer)
     VALUES ($1, $2, $3)
     ON CONFLICT (path) DO UPDATE SET
       hit_count = not_found_hits.hit_count + 1,
       last_referrer = CASE WHEN EXCLUDED.last_referrer <> '' THEN EXCLUDED.last_referrer ELSE not_found_hits.last_referrer END,
       internal_referrer = CASE WHEN EXCLUDED.internal_referrer <> '' THEN EXCLUDED.internal_referrer ELSE not_found_hits.internal_referrer END,
       last_seen_at = NOW()`,
    [path, ref, internalReferrer(ref)],
  );
  if (Math.random() < 0.02) {
    await pool.query(
      `DELETE FROM not_found_hits WHERE last_seen_at < NOW() - make_interval(days => $1)`,
      [RETAIN_DAYS],
    );
  }
}

function slugOf(path: string): string {
  const segs = path.split("/").filter((s) => s && !/^\d+$/.test(s));
  return (segs[segs.length - 1] ?? "").toLowerCase();
}

function levenshteinRatio(a: string, b: string): number {
  if (!a || !b) return 0;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return 1 - prev[b.length] / Math.max(a.length, b.length);
}

/**
 * How likely `candidate` is the page someone meant by `missing`: same slug wins
 * (e.g. an old un-numbered article URL), then shared slug words or a near-typo,
 * with a small bonus for the same top-level section.
 */
function similarity(missing: string, candidate: string): number {
  const a = slugOf(missing);
  const b = slugOf(candidate);
  if (!a || !b) return 0;
  const section = missing.split("/")[1] === candidate.split("/")[1] ? 0.15 : 0;
  if (a === b) return 1 + section;
  const ta = new Set(a.split("-"));
  const tb = new Set(b.split("-"));
  const shared = [...ta].filter((t) => tb.has(t)).length;
  const jaccard = shared / new Set([...ta, ...tb]).size;
  return Math.max(jaccard, levenshteinRatio(a, b)) + section;
}

const SUGGEST_THRESHOLD = 0.6;

async function livePaths(): Promise<string[]> {
  const crawl = await pool.query<{ path: string }>(`SELECT path FROM site_audit_pages WHERE status = 200`);
  if (crawl.rows.length) return crawl.rows.map((r) => r.path);
  return (await buildLinkIndex()).map((t) => t.path);
}

export type NotFoundRow = {
  path: string;
  hits: number;
  lastReferrer: string;
  internalReferrer: string;
  firstSeenAt: string;
  lastSeenAt: string;
  suggestion: string | null;
};

/** Unresolved 404s (no active redirect yet, not ignored), most-hit first, each with a suggested target. */
export async function listNotFound(limit = 100): Promise<NotFoundRow[]> {
  const [rows, paths] = await Promise.all([
    pool.query(
      `SELECT h.* FROM not_found_hits h
       WHERE NOT h.ignored
         AND NOT EXISTS (SELECT 1 FROM url_redirects r WHERE r.from_path = h.path AND r.is_active)
       ORDER BY h.hit_count DESC, h.last_seen_at DESC
       LIMIT $1`,
      [limit],
    ),
    livePaths(),
  ]);
  return rows.rows.map((r) => {
    let best: { path: string; score: number } | null = null;
    for (const p of paths) {
      if (p === r.path) continue;
      const score = similarity(String(r.path), p);
      if (score >= SUGGEST_THRESHOLD && (!best || score > best.score)) best = { path: p, score };
    }
    return {
      path: r.path,
      hits: Number(r.hit_count),
      lastReferrer: r.last_referrer,
      internalReferrer: r.internal_referrer,
      firstSeenAt: r.first_seen_at,
      lastSeenAt: r.last_seen_at,
      suggestion: best?.path ?? null,
    };
  });
}
