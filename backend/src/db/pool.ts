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
