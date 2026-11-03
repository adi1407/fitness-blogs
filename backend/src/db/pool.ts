import { Pool } from "pg";
import { env } from "../config/env";

export const pool = new Pool({
  connectionString: env.databaseUrl,
  // Render Postgres often requires SSL in production
  ssl: env.nodeEnv === "production" ? { rejectUnauthorized: false } : undefined,
  max: 10,
  // Fail fast instead of queueing forever when the pool is exhausted or the DB is unreachable.
  connectionTimeoutMillis: 5_000,
  idleTimeoutMillis: 30_000,
  // Server-side caps: a runaway query or a transaction left open can't pin a connection.
  statement_timeout: 15_000,
  idle_in_transaction_session_timeout: 30_000,
  application_name: "fitlives-api",
});

pool.on("error", (err) => {
  console.error("[db] unexpected pool error", err);
});

export type SlowQuery = { at: string; ms: number; sql: string };

const SLOW_QUERY_MS = 200;
const KEEP_SLOW = 50;
/** Leading comment that keeps expected-slow statements (boot DDL, catalog stats) out of the log. */
export const NO_SLOW_LOG = "/* no-slow-log */";
const slowQueries: SlowQuery[] = [];

/** Most recent slow queries in this process, newest first (SQL text only, never parameters). */
export function recentSlowQueries(): SlowQuery[] {
  return [...slowQueries].reverse();
}

function sqlText(arg: unknown): string {
  const text = typeof arg === "string" ? arg : (arg as { text?: unknown } | null)?.text;
  return typeof text === "string" ? text.replace(/\s+/g, " ").trim().slice(0, 300) : "(unknown)";
}

// Time every pool query (the app only uses the promise form). Parameters are never
// logged: they can hold emails, tokens and password hashes.
const rawQuery = pool.query.bind(pool) as (...args: unknown[]) => Promise<unknown>;
(pool as unknown as { query: (...args: unknown[]) => Promise<unknown> }).query = async (...args: unknown[]) => {
  const start = performance.now();
  try {
    return await rawQuery(...args);
  } finally {
    const ms = Math.round(performance.now() - start);
    const sql = sqlText(args[0]);
    if (ms >= SLOW_QUERY_MS && !sql.startsWith(NO_SLOW_LOG)) {
      const entry = { at: new Date().toISOString(), ms, sql };
      slowQueries.push(entry);
      if (slowQueries.length > KEEP_SLOW) slowQueries.shift();
      console.warn(`[db] slow query ${ms}ms: ${entry.sql.slice(0, 160)}`);
    }
  }
};
