import { pool } from "../db/pool";

export async function notifyUsers(opts: {
  userIds: string[];
  kind: string;
  title: string;
  body?: string;
  href?: string;
  articleId?: string | null;
}): Promise<void> {
  const ids = [...new Set(opts.userIds.filter(Boolean))];
  if (!ids.length) return;
  for (const userId of ids) {
    await pool.query(
      `INSERT INTO staff_notifications
        (user_id, kind, title, body, href, article_id)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        userId,
        opts.kind,
        opts.title,
        opts.body ?? "",
        opts.href ?? "",
        opts.articleId ?? null,
      ],
    );
  }
}

export async function notifyEditorsAndAdmins(opts: {
  kind: string;
  title: string;
  body?: string;
  href?: string;
  articleId?: string | null;
  excludeUserId?: string | null;
}): Promise<void> {
  const result = await pool.query(
    `SELECT id FROM users
     WHERE is_active = TRUE AND role IN ('editor', 'admin')
       ${opts.excludeUserId ? "AND id <> $1" : ""}`,
    opts.excludeUserId ? [opts.excludeUserId] : [],
  );
  await notifyUsers({
    userIds: result.rows.map((r) => String(r.id)),
    kind: opts.kind,
    title: opts.title,
    body: opts.body,
    href: opts.href,
    articleId: opts.articleId,
  });
}
