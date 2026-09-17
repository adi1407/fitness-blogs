import { Pool } from "pg";
import { env } from "../config/env";

export const pool = new Pool({
  connectionString: env.databaseUrl,
  // Render Postgres often requires SSL in production
  ssl: env.nodeEnv === "production" ? { rejectUnauthorized: false } : undefined,
  max: 10,
});

pool.on("error", (err) => {
  console.error("[db] unexpected pool error", err);
});
