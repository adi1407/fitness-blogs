import type { PoolClient } from "pg";
import { env } from "../config/env";
import { pool } from "../db/pool";
import {
  isCloudinaryConfigured,
  uploadImageBuffer,
  uploadImageFromUrl,
} from "./cloudinary";

const LOCK_KEY = 874_201_117;

/**
 * Legacy image references: CMS uploads served by the API (`/uploads/articles/...`)
 * and static heroes shipped with the site (`/images/articles/...`), either
 * relative or absolute. Relative matches must not be the tail of another URL path.
 */
const LEGACY_REF =
  /(?:(https?:\/\/[a-z0-9.-]+(?::\d+)?)|(?<![\w./-]))\/(uploads|images)\/articles\/([a-z0-9_-]+\.(?:jpe?g|png|webp|gif))/gi;

const TARGETS: { table: string; column: string; jsonb?: boolean }[] = [
  { table: "articles", column: "featured_image" },
  { table: "articles", column: "og_image" },
  { table: "articles", column: "body" },
  { table: "article_revisions", column: "snapshot", jsonb: true },
  { table: "exercises", column: "body_html" },
  { table: "recipes", column: "body_html" },
  { table: "knowledge_pages", column: "body_html" },
];

function siteOrigin(): string {
  const site = env.publicSiteUrl;
  return /localhost|127\.0\.0\.1/.test(site) ? "https://fitlives.in" : site;
}

function isOwnSiteHost(origin: string | undefined): boolean {
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    const configured = new URL(siteOrigin()).hostname;
    return (
      host === configured ||
      host === "fitlives.in" ||
      host === "www.fitlives.in" ||
      host === "localhost" ||
      host.endsWith(".vercel.app")
    );
  } catch {
    return false;
  }
}

async function ensureAssetTable(client: PoolClient): Promise<void> {
  await client.query(`
    CREATE TABLE IF NOT EXISTS cloudinary_assets (
      source_key TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

type Resolver = (kind: string, filename: string) => Promise<string | null>;

function createResolver(client: PoolClient, missing: Set<string>): Resolver {
  const memo = new Map<string, Promise<string | null>>();

  const resolveOnce = async (kind: string, filename: string) => {
    const key = `${kind}:${filename}`;
    const cached = await client.query<{ url: string }>(
      `SELECT url FROM cloudinary_assets WHERE source_key = $1`,
      [key],
    );
    if (cached.rows[0]) return cached.rows[0].url;

    let url: string | null = null;
    if (kind === "uploads") {
      const row = await client.query<{ data: Buffer }>(
        `SELECT data FROM uploaded_images WHERE filename = $1`,
        [filename],
      );
      if (row.rows[0]) url = await uploadImageBuffer(row.rows[0].data, filename);
    } else {
      try {
        url = await uploadImageFromUrl(
          `${siteOrigin()}/images/articles/${filename}`,
          filename,
        );
      } catch (err) {
        console.warn(`[cloudinary-migrate] fetch failed for ${filename}:`, err);
      }
    }

    if (!url) {
      missing.add(key);
      return null;
    }
    await client.query(
      `INSERT INTO cloudinary_assets (source_key, url) VALUES ($1, $2)
       ON CONFLICT (source_key) DO NOTHING`,
      [key, url],
    );
    return url;
  };

  return (kind, filename) => {
    const key = `${kind}:${filename.toLowerCase()}`;
    let p = memo.get(key);
    if (!p) {
      p = resolveOnce(kind, filename.toLowerCase());
      memo.set(key, p);
    }
    return p;
  };
}

async function rewrite(text: string, resolve: Resolver): Promise<string> {
  const matches = [...text.matchAll(LEGACY_REF)];
  if (!matches.length) return text;

  const replacements = new Map<string, string>();
  for (const m of matches) {
    const [full, origin, kind, filename] = m;
    if (replacements.has(full)) continue;
    if (kind.toLowerCase() === "images" && !isOwnSiteHost(origin)) continue;
    const url = await resolve(kind.toLowerCase(), filename);
    if (url) replacements.set(full, url);
  }
  if (!replacements.size) return text;
  return text.replace(LEGACY_REF, (full) => replacements.get(full) ?? full);
}

/**
 * Copy every legacy image to Cloudinary and point stored content at it.
 * Idempotent and safe to run on every boot; unresolvable images are left as-is.
 */
export async function migrateImagesToCloudinary(): Promise<void> {
  if (!isCloudinaryConfigured()) {
    console.log("[cloudinary-migrate] skipped: Cloudinary env vars not set");
    return;
  }

  const client = await pool.connect();
  try {
    const lock = await client.query<{ ok: boolean }>(
      `SELECT pg_try_advisory_lock($1) AS ok`,
      [LOCK_KEY],
    );
    if (!lock.rows[0]?.ok) return;

    try {
      await ensureAssetTable(client);
      const missing = new Set<string>();
      const resolve = createResolver(client, missing);
      let updatedRows = 0;

      const stored = await client.query<{ filename: string }>(
        `SELECT filename FROM uploaded_images ORDER BY created_at`,
      );
      for (const { filename } of stored.rows) {
        await resolve("uploads", filename);
      }

      for (const { table, column, jsonb } of TARGETS) {
        const rows = await client.query<{ id: string; v: string }>(
          `SELECT id, ${column}::text AS v FROM ${table}
           WHERE ${column}::text LIKE '%/uploads/articles/%'
              OR ${column}::text LIKE '%/images/articles/%'`,
        );
        for (const row of rows.rows) {
          const next = await rewrite(row.v, resolve);
          if (next === row.v) continue;
          await client.query(
            `UPDATE ${table} SET ${column} = $1${jsonb ? "::jsonb" : ""} WHERE id = $2`,
            [next, row.id],
          );
          updatedRows += 1;
        }
      }

      console.log(
        `[cloudinary-migrate] done: ${updatedRows} field(s) updated` +
          (missing.size ? `, ${missing.size} image(s) not found: ${[...missing].join(", ")}` : ""),
      );
    } finally {
      await client.query(`SELECT pg_advisory_unlock($1)`, [LOCK_KEY]);
    }
  } finally {
    client.release();
  }
}
