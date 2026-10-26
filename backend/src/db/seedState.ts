import { createHash } from "node:crypto";
import { pool } from "./pool";

/**
 * Hash of everything a seed writes: its rows and the functions holding its SQL,
 * so editing either the seed data or the upsert re-runs it.
 */
function fingerprint(inputs: unknown[]): string {
  const hash = createHash("sha256");
  for (const input of inputs) {
    hash.update(typeof input === "function" ? input.toString() : JSON.stringify(input));
    hash.update("\u0000");
  }
  return hash.digest("hex");
}

/**
 * Run a boot seed only when its fingerprint differs from the last successful run.
 * Unchanged seeds cost one read instead of an upsert per row. Consequence: a
 * seeded row deleted in the CMS stays deleted until that seed changes.
 */
export async function runSeedIfChanged(
  name: string,
  inputs: unknown[],
  run: () => Promise<void>,
): Promise<void> {
  const next = fingerprint(inputs);
  const prev = await pool.query<{ fingerprint: string }>(
    `SELECT fingerprint FROM seed_state WHERE name = $1`,
    [name],
  );
  if (prev.rows[0]?.fingerprint === next) {
    console.log(`[db] seed ${name}: unchanged, skipped`);
    return;
  }
  await run();
  await pool.query(
    `INSERT INTO seed_state (name, fingerprint) VALUES ($1, $2)
     ON CONFLICT (name) DO UPDATE SET fingerprint = EXCLUDED.fingerprint, applied_at = NOW()`,
    [name, next],
  );
}
