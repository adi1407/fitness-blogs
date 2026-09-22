import "dotenv/config";
import { ensureCmsSchema } from "./ensureCmsSchema";
import { pool } from "./pool";

/** Ensures schema and removes any leftover `seed-*` demo articles. */
async function main() {
  await ensureCmsSchema();
  const r = await pool.query(
    `SELECT COUNT(*)::int AS c FROM articles WHERE status = 'published'`,
  );
  const seeded = await pool.query(
    `SELECT COUNT(*)::int AS c FROM articles WHERE slug LIKE 'seed-%'`,
  );
  console.log(
    JSON.stringify({
      published: r.rows[0].c,
      seedArticles: seeded.rows[0].c,
    }),
  );
  await pool.end();
}

main().catch(async (err) => {
  console.error(err);
  try {
    await pool.end();
  } catch {
    /* ignore */
  }
  process.exit(1);
});
