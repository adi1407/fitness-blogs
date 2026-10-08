import crypto from "node:crypto";
import { pool } from "../db/pool";

export type SubscriberStatus = "active" | "unsubscribed" | "all";

function newToken(): string {
  return crypto.randomBytes(24).toString("base64url");
}

/** Idempotent: re-subscribing clears a previous unsubscribe and keeps the original source. */
export async function upsertSubscriber(email: string, source: string): Promise<void> {
  await pool.query(
    `INSERT INTO subscribers (email, source, unsubscribe_token)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE
       SET unsubscribed_at = NULL, updated_at = NOW()`,
    [email.trim().toLowerCase(), source, newToken()],
  );
}

/** Returns false when the token is unknown. Repeat calls stay successful. */
export async function unsubscribeByToken(token: string): Promise<boolean> {
  const result = await pool.query(
    `UPDATE subscribers
       SET unsubscribed_at = COALESCE(unsubscribed_at, NOW()), updated_at = NOW()
     WHERE unsubscribe_token = $1`,
    [token],
  );
  return Boolean(result.rowCount);
}

function statusClause(status: SubscriberStatus): string {
  if (status === "active") return "unsubscribed_at IS NULL";
  if (status === "unsubscribed") return "unsubscribed_at IS NOT NULL";
  return "TRUE";
}

export async function listSubscribers(opts: {
  status: SubscriberStatus;
  search: string;
  limit: number;
  offset: number;
}) {
  const params: unknown[] = [];
  const clauses = [statusClause(opts.status)];
  if (opts.search) {
    params.push(`%${opts.search.toLowerCase()}%`);
    clauses.push(`email LIKE $${params.length}`);
  }
  const where = `WHERE ${clauses.join(" AND ")}`;

  const [rows, total] = await Promise.all([
    pool.query(
      `SELECT id, email, source, created_at, unsubscribed_at
       FROM subscribers ${where}
       ORDER BY created_at DESC
       LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, opts.limit, opts.offset],
    ),
    pool.query(`SELECT COUNT(*)::int AS c FROM subscribers ${where}`, params),
  ]);

  return {
    subscribers: rows.rows.map((r) => ({
      id: r.id as string,
      email: r.email as string,
      source: r.source as string,
      createdAt: r.created_at as string,
      unsubscribedAt: (r.unsubscribed_at as string | null) ?? null,
    })),
    total: (total.rows[0]?.c as number) ?? 0,
  };
}

export async function subscriberSummary() {
  const result = await pool.query(
    `SELECT source,
            COUNT(*) FILTER (WHERE unsubscribed_at IS NULL)::int AS active,
            COUNT(*) FILTER (WHERE unsubscribed_at IS NOT NULL)::int AS unsubscribed
     FROM subscribers
     GROUP BY source
     ORDER BY active DESC, source`,
  );
  const bySource = result.rows.map((r) => ({
    source: r.source as string,
    active: r.active as number,
    unsubscribed: r.unsubscribed as number,
  }));
  return {
    active: bySource.reduce((n, s) => n + s.active, 0),
    unsubscribed: bySource.reduce((n, s) => n + s.unsubscribed, 0),
    bySource,
  };
}

function csvCell(value: unknown): string {
  let s = value == null ? "" : String(value);
  // Keep spreadsheet apps from evaluating user-supplied text as formulas.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function subscribersCsv(status: SubscriberStatus): Promise<string> {
  const result = await pool.query(
    `SELECT email, source, created_at, unsubscribed_at
     FROM subscribers WHERE ${statusClause(status)}
     ORDER BY created_at DESC`,
  );
  const lines = ["email,source,subscribed_at,unsubscribed_at"];
  for (const r of result.rows) {
    lines.push(
      [
        r.email,
        r.source,
        new Date(r.created_at).toISOString(),
        r.unsubscribed_at ? new Date(r.unsubscribed_at).toISOString() : "",
      ]
        .map(csvCell)
        .join(","),
    );
  }
  return `${lines.join("\n")}\n`;
}
