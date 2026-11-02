import { pool } from "../db/pool";

function normalizePath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) return "";
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

/** Upsert a 301 from an old public path to a new one. */
export async function upsertRedirect(opts: {
  fromPath: string;
  toPath: string;
  articleId?: string | null;
}): Promise<void> {
  const fromPath = normalizePath(opts.fromPath);
  const toPath = normalizePath(opts.toPath);
  if (!fromPath || !toPath || fromPath === toPath) return;

  await pool.query(
    `INSERT INTO url_redirects (from_path, to_path, article_id, is_active, updated_at)
     VALUES ($1, $2, $3, TRUE, NOW())
     ON CONFLICT (from_path) DO UPDATE SET
       to_path = EXCLUDED.to_path,
       article_id = COALESCE(EXCLUDED.article_id, url_redirects.article_id),
       is_active = TRUE,
       updated_at = NOW()`,
    [fromPath, toPath, opts.articleId ?? null],
  );

  // Avoid A→B and B→A loops: deactivate reverse if present
  await pool.query(
    `UPDATE url_redirects SET is_active = FALSE, updated_at = NOW()
     WHERE from_path = $1 AND to_path = $2`,
    [toPath, fromPath],
  );
}

const MAX_HOPS = 10;

/** Follow a redirect chain to its final path; null on a loop or an over-long chain. */
function finalTarget(from: string, map: Map<string, string>): string | null {
  const seen = new Set([from]);
  let to = map.get(from);
  for (let hops = 0; to && hops < MAX_HOPS; hops++) {
    if (seen.has(to)) return null;
    seen.add(to);
    const next = map.get(to);
    if (!next) return to;
    to = next;
  }
  return null;
}

async function activeRows(): Promise<{ from: string; to: string }[]> {
  const res = await pool.query<{ from_path: string; to_path: string }>(
    `SELECT from_path, to_path FROM url_redirects WHERE is_active = TRUE`,
  );
  return res.rows.map((r) => ({ from: normalizePath(r.from_path), to: normalizePath(r.to_path) }));
}

/** Every active redirect pointing straight at its final destination, so visitors take one hop. */
export async function activeRedirectMap(): Promise<{ from: string; to: string }[]> {
  const rows = await activeRows();
  const map = new Map(rows.map((r) => [r.from, r.to]));
  return rows.flatMap((r) => {
    const to = finalTarget(r.from, map);
    return to && to !== r.from ? [{ from: r.from, to }] : [];
  });
}

export type RedirectHealth = {
  finalTo: string | null;
  isChain: boolean;
  isLoop: boolean;
  /** live = 200 in the latest crawl; broken = crawled with an error; unknown = not in the sitemap. */
  target: "live" | "broken" | "unknown";
};

export async function redirectHealth(): Promise<Map<string, RedirectHealth>> {
  const [rows, crawl] = await Promise.all([
    activeRows(),
    pool.query<{ path: string; status: number }>(`SELECT path, status FROM site_audit_pages`),
  ]);
  const map = new Map(rows.map((r) => [r.from, r.to]));
  const crawled = new Map(crawl.rows.map((r) => [r.path, Number(r.status)]));
  const out = new Map<string, RedirectHealth>();
  for (const r of rows) {
    const finalTo = finalTarget(r.from, map);
    const status = finalTo ? crawled.get(finalTo) : undefined;
    out.set(r.from, {
      finalTo,
      isChain: map.has(r.to),
      isLoop: finalTo === null,
      target: status === undefined ? "unknown" : status === 200 ? "live" : "broken",
    });
  }
  return out;
}

export async function resolveRedirect(
  fromPath: string,
): Promise<string | null> {
  const path = normalizePath(fromPath);
  if (!path) return null;
  const rows = await activeRows();
  const to = finalTarget(path, new Map(rows.map((r) => [r.from, r.to])));
  return to && to !== path ? to : null;
}

export { normalizePath };
