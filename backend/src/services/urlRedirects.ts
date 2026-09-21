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

export async function resolveRedirect(
  fromPath: string,
): Promise<string | null> {
  const path = normalizePath(fromPath);
  if (!path) return null;
  const result = await pool.query(
    `SELECT to_path FROM url_redirects
     WHERE from_path = $1 AND is_active = TRUE
     LIMIT 1`,
    [path],
  );
  const to = result.rows[0]?.to_path as string | undefined;
  return to ? normalizePath(to) : null;
}

export { normalizePath };
