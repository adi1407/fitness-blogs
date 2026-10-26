import bcrypt from "bcryptjs";
import { env } from "../config/env";
import { pool } from "./pool";
import { BLOG_TAXONOMY } from "../constants/blogTaxonomy";
import { seedKnowledgeContent } from "./seedKnowledgeContent";
import { seedIntentArticles } from "./seedIntentArticles";
import { seedFoods } from "./seedFoods";
import { applyContentMigrations } from "./contentMigrations";
import { normalizeAllArticleLinks } from "../services/internalLinks";
import { runSeedIfChanged } from "./seedState";

const SCHEMA_SQL = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'writer')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  password_changed_at TIMESTAMPTZ,
  password_version INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (category_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_subcategories_category ON subcategories(category_id);

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_number INT UNIQUE,
  title TEXT NOT NULL DEFAULT '',
  slug TEXT UNIQUE,
  excerpt TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  category_id UUID REFERENCES categories(id) ON DELETE RESTRICT,
  subcategory_id UUID REFERENCES subcategories(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'submitted', 'published', 'rejected', 'changes_requested')),
  meta_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  meta_keywords TEXT NOT NULL DEFAULT '',
  primary_keyword TEXT NOT NULL DEFAULT '',
  og_image TEXT NOT NULL DEFAULT '',
  featured_image TEXT NOT NULL DEFAULT '',
  featured_image_alt TEXT NOT NULL DEFAULT '',
  featured_image_caption TEXT NOT NULL DEFAULT '',
  quick_answer TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  topics TEXT[] NOT NULL DEFAULT '{}',
  related_article_numbers INT[] NOT NULL DEFAULT '{}',
  faq JSONB NOT NULL DEFAULT '[]'::jsonb,
  sources JSONB NOT NULL DEFAULT '[]'::jsonb,
  views INT NOT NULL DEFAULT 0,
  reading_time INT NOT NULL DEFAULT 0,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  published_by UUID REFERENCES users(id) ON DELETE SET NULL,
  reject_reason TEXT NOT NULL DEFAULT '',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_subcategory_id ON articles(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_number ON articles(article_number);
CREATE UNIQUE INDEX IF NOT EXISTS uq_articles_article_number
  ON articles(article_number) WHERE article_number IS NOT NULL;

CREATE TABLE IF NOT EXISTS audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  actor_role TEXT NOT NULL DEFAULT '',
  actor_email TEXT NOT NULL DEFAULT '',
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL DEFAULT '',
  entity_id UUID,
  summary TEXT NOT NULL DEFAULT '',
  meta JSONB,
  ip TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_events(action);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_events(actor_id);

CREATE TABLE IF NOT EXISTS article_briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_query TEXT NOT NULL,
  working_title TEXT NOT NULL DEFAULT '',
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  subcategory_id UUID NOT NULL REFERENCES subcategories(id) ON DELETE RESTRICT,
  outline TEXT NOT NULL DEFAULT '',
  required_links TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  due_on DATE,
  writer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  assigned_by UUID REFERENCES users(id) ON DELETE SET NULL,
  article_id UUID UNIQUE REFERENCES articles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'done', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_article_briefs_writer ON article_briefs(writer_id);
CREATE INDEX IF NOT EXISTS idx_article_briefs_status ON article_briefs(status);
CREATE INDEX IF NOT EXISTS idx_article_briefs_article ON article_briefs(article_id);

CREATE TABLE IF NOT EXISTS article_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  revision_number INT NOT NULL,
  snapshot JSONB NOT NULL,
  reason TEXT NOT NULL DEFAULT 'save',
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  actor_name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (article_id, revision_number)
);

CREATE INDEX IF NOT EXISTS idx_article_revisions_article
  ON article_revisions(article_id, revision_number DESC);

CREATE TABLE IF NOT EXISTS url_redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path TEXT NOT NULL,
  to_path TEXT NOT NULL,
  article_id UUID REFERENCES articles(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_url_redirects_from UNIQUE (from_path)
);

CREATE INDEX IF NOT EXISTS idx_url_redirects_active
  ON url_redirects(from_path) WHERE is_active = TRUE;

CREATE TABLE IF NOT EXISTS staff_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL DEFAULT 'info',
  title TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  href TEXT NOT NULL DEFAULT '',
  article_id UUID REFERENCES articles(id) ON DELETE SET NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staff_notifications_user
  ON staff_notifications(user_id, is_read, created_at DESC);

CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT '',
  picture TEXT NOT NULL DEFAULT '',
  google_sub TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_members_google_sub ON members(google_sub);
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);

CREATE TABLE IF NOT EXISTS member_article_upvotes (
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (member_id, article_id)
);

CREATE INDEX IF NOT EXISTS idx_member_upvotes_article
  ON member_article_upvotes(article_id);

CREATE TABLE IF NOT EXISTS member_article_bookmarks (
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (member_id, article_id)
);

CREATE INDEX IF NOT EXISTS idx_member_bookmarks_member
  ON member_article_bookmarks(member_id, created_at DESC);

CREATE TABLE IF NOT EXISTS member_calc_profiles (
  member_id UUID PRIMARY KEY REFERENCES members(id) ON DELETE CASCADE,
  profile JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS member_calc_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  tool TEXT NOT NULL,
  inputs JSONB NOT NULL DEFAULT '{}'::jsonb,
  result JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_member_calc_results_member
  ON member_calc_results(member_id, created_at DESC);

CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  muscle_group TEXT NOT NULL
    CHECK (muscle_group IN ('chest','back','shoulders','arms','legs','core','cardio')),
  slug TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  quick_answer TEXT NOT NULL DEFAULT '',
  body_html TEXT NOT NULL DEFAULT '',
  form_cues TEXT[] NOT NULL DEFAULT '{}',
  common_mistakes TEXT[] NOT NULL DEFAULT '{}',
  programming_notes TEXT NOT NULL DEFAULT '',
  equipment TEXT[] NOT NULL DEFAULT '{}',
  difficulty TEXT NOT NULL DEFAULT 'intermediate'
    CHECK (difficulty IN ('beginner','intermediate','advanced')),
  primary_muscles TEXT[] NOT NULL DEFAULT '{}',
  secondary_muscles TEXT[] NOT NULL DEFAULT '{}',
  meta_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','published')),
  robots_index BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  managed_by TEXT NOT NULL DEFAULT 'seed',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (muscle_group, slug)
);

CREATE INDEX IF NOT EXISTS idx_exercises_group_status
  ON exercises(muscle_group, status, sort_order);
CREATE INDEX IF NOT EXISTS idx_exercises_status ON exercises(status);

CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  quick_answer TEXT NOT NULL DEFAULT '',
  body_html TEXT NOT NULL DEFAULT '',
  ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  calories INT,
  protein_g NUMERIC(6,1),
  carbs_g NUMERIC(6,1),
  fat_g NUMERIC(6,1),
  cuisine_tags TEXT[] NOT NULL DEFAULT '{}',
  meal_type TEXT NOT NULL DEFAULT '',
  meta_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','published')),
  robots_index BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  managed_by TEXT NOT NULL DEFAULT 'seed',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recipes_status ON recipes(status, sort_order);

CREATE TABLE IF NOT EXISTS knowledge_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL CHECK (section IN ('programs','reviews')),
  slug TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  body_html TEXT NOT NULL DEFAULT '',
  meta_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','published')),
  robots_index BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  managed_by TEXT NOT NULL DEFAULT 'seed',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (section, slug)
);

CREATE INDEX IF NOT EXISTS idx_knowledge_pages_section
  ON knowledge_pages(section, status, sort_order);

CREATE TABLE IF NOT EXISTS foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  hindi_name TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  diet TEXT NOT NULL CHECK (diet IN ('veg','egg','non-veg')),
  is_veg BOOLEAN NOT NULL DEFAULT TRUE,
  basis_label TEXT NOT NULL DEFAULT '',
  kcal NUMERIC(6,1) NOT NULL,
  protein_g NUMERIC(6,2) NOT NULL,
  carbs_g NUMERIC(6,2) NOT NULL,
  fat_g NUMERIC(6,2) NOT NULL,
  fiber_g NUMERIC(6,2) NOT NULL DEFAULT 0,
  calcium_mg NUMERIC(7,1),
  iron_mg NUMERIC(6,2),
  servings JSONB NOT NULL DEFAULT '[]'::jsonb,
  source TEXT NOT NULL,
  source_ref TEXT NOT NULL DEFAULT '',
  source_name TEXT NOT NULL DEFAULT '',
  source_note TEXT NOT NULL DEFAULT '',
  intro TEXT NOT NULL DEFAULT '',
  tips JSONB NOT NULL DEFAULT '[]'::jsonb,
  related_slugs TEXT[] NOT NULL DEFAULT '{}',
  compare_slug TEXT,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  managed_by TEXT NOT NULL DEFAULT 'seed'
    CHECK (managed_by IN ('seed', 'cms')),
  image_url TEXT NOT NULL DEFAULT '',
  image_alt TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_foods_published ON foods(published, category, sort_order);

CREATE TABLE IF NOT EXISTS uploaded_images (
  filename TEXT PRIMARY KEY,
  mime TEXT NOT NULL,
  size_bytes INT NOT NULL,
  data BYTEA NOT NULL,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL DEFAULT 'site',
  unsubscribe_token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_subscribers_created ON subscribers(created_at DESC);

CREATE TABLE IF NOT EXISTS search_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query_norm TEXT NOT NULL UNIQUE,
  query_display TEXT NOT NULL,
  hit_count INT NOT NULL DEFAULT 0,
  zero_count INT NOT NULL DEFAULT 0,
  last_results INT NOT NULL DEFAULT 0,
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_search_queries_zero
  ON search_queries(zero_count DESC, last_seen_at DESC)
  WHERE zero_count > 0;

CREATE TABLE IF NOT EXISTS product_picks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'other'
    CHECK (category IN ('protein','creatine','scale','tracker','equipment','hydration','other')),
  url TEXT NOT NULL,
  retailer TEXT NOT NULL DEFAULT '',
  why_pick TEXT NOT NULL DEFAULT '',
  not_for TEXT NOT NULL DEFAULT '',
  price_range TEXT NOT NULL DEFAULT '',
  is_affiliate BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_pick_placements (
  pick_id UUID NOT NULL REFERENCES product_picks(id) ON DELETE CASCADE,
  target TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (pick_id, target)
);

CREATE INDEX IF NOT EXISTS idx_product_pick_placements_target
  ON product_pick_placements(target, sort_order);

CREATE TABLE IF NOT EXISTS seed_state (
  name TEXT PRIMARY KEY,
  fingerprint TEXT NOT NULL,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

/**
 * Local-development logins only. These passwords are public (this repo is public),
 * so production never creates them and warns at boot while any still work.
 */
export const SEED_USERS = [
  {
    email: "admin@fitknowledge.local",
    password: "ChangeMeAdmin123!",
    name: "FitKnowledge Admin",
    role: "admin",
  },
  {
    email: "editor@fitknowledge.local",
    password: "ChangeMeEditor123!",
    name: "FitKnowledge Editor",
    role: "editor",
  },
  {
    email: "writer@fitknowledge.local",
    password: "ChangeMeWriter123!",
    name: "FitKnowledge Writer",
    role: "writer",
  },
  {
    email: "aditya@fitknowledge.local",
    password: "ChangeMeAditya123!",
    name: "Aditya Choudhary",
    role: "writer",
  },
] as const;

/**
 * Loud boot warning for any active account that still accepts its public default password.
 * Accounts with a recorded password change are skipped: change-password refuses the
 * defaults, so only never-changed accounts need the (slow) bcrypt check.
 */
async function warnDefaultPasswords(): Promise<void> {
  const rows = await pool.query<{ email: string; password_hash: string }>(
    `SELECT email, password_hash FROM users
     WHERE is_active = TRUE AND password_changed_at IS NULL AND email = ANY($1::text[])`,
    [SEED_USERS.map((u) => u.email)],
  );
  for (const row of rows.rows) {
    const seed = SEED_USERS.find((u) => u.email === row.email);
    if (seed && (await bcrypt.compare(seed.password, row.password_hash))) {
      console.error(
        `[security] ${row.email} still uses its public default password. Change it in the CMS (Change password).`,
      );
    }
  }
}

/** Columns added after a table first shipped: [table, column, definition]. */
const ADDED_COLUMNS: [string, string, string][] = [
  ["articles", "article_number", "INT"],
  ["articles", "category_id", "UUID"],
  ["articles", "subcategory_id", "UUID"],
  ["articles", "tags", "TEXT[] DEFAULT '{}'"],
  ["articles", "topics", "TEXT[] DEFAULT '{}'"],
  ["articles", "views", "INT NOT NULL DEFAULT 0"],
  ["articles", "featured_image_alt", "TEXT NOT NULL DEFAULT ''"],
  ["articles", "featured_image_caption", "TEXT NOT NULL DEFAULT ''"],
  ["articles", "related_article_numbers", "INT[] NOT NULL DEFAULT '{}'"],
  ["articles", "faq", "JSONB NOT NULL DEFAULT '[]'::jsonb"],
  ["articles", "sources", "JSONB NOT NULL DEFAULT '[]'::jsonb"],
  ["articles", "robots_index", "BOOLEAN NOT NULL DEFAULT TRUE"],
  ["articles", "last_reviewed_at", "TIMESTAMPTZ"],
  ["users", "slug", "TEXT"],
  ["users", "bio", "TEXT NOT NULL DEFAULT ''"],
  ["users", "credentials", "TEXT NOT NULL DEFAULT ''"],
  ["users", "password_changed_at", "TIMESTAMPTZ"],
  ["users", "password_version", "INT NOT NULL DEFAULT 0"],
  ["foods", "managed_by", "TEXT NOT NULL DEFAULT 'seed'"],
  ["exercises", "managed_by", "TEXT NOT NULL DEFAULT 'seed'"],
  ["recipes", "managed_by", "TEXT NOT NULL DEFAULT 'seed'"],
  ["knowledge_pages", "managed_by", "TEXT NOT NULL DEFAULT 'seed'"],
  ["foods", "image_url", "TEXT NOT NULL DEFAULT ''"],
  ["foods", "image_alt", "TEXT NOT NULL DEFAULT ''"],
];

/** Value-list CHECKs whose allowed values changed after the table first shipped. */
const VALUE_CHECKS: { table: string; name: string; column: string; values: string[] }[] = [
  { table: "users", name: "users_role_check", column: "role", values: ["admin", "editor", "writer"] },
  { table: "foods", name: "foods_managed_by_check", column: "managed_by", values: ["seed", "cms"] },
  {
    table: "articles",
    name: "articles_status_check",
    column: "status",
    values: ["draft", "submitted", "published", "rejected", "changes_requested"],
  },
];

function quotedValues(constraintDef: string): string {
  return [...constraintDef.matchAll(/'((?:[^']|'')*)'/g)].map((m) => m[1]).sort().join(",");
}

/**
 * ALTER TABLE takes an exclusive lock that blocks reads even when the change is a
 * no-op, and a deploy boots while the previous instance is still serving. So read
 * the catalog first and only alter what is actually missing or different.
 */
async function migrateLegacySchema(): Promise<void> {
  await pool.query(`UPDATE users SET role = 'writer' WHERE role = 'author'`);

  const [columns, checks] = await Promise.all([
    pool.query<{ table_name: string; column_name: string }>(
      `SELECT table_name, column_name FROM information_schema.columns
       WHERE table_schema = current_schema() AND table_name = ANY($1::text[])`,
      [[...new Set(ADDED_COLUMNS.map(([table]) => table))]],
    ),
    pool.query<{ table_name: string; conname: string; def: string }>(
      `SELECT rel.relname AS table_name, con.conname, pg_get_constraintdef(con.oid) AS def
       FROM pg_constraint con
       JOIN pg_class rel ON rel.oid = con.conrelid
       WHERE con.contype = 'c' AND con.conname = ANY($1::text[])`,
      [VALUE_CHECKS.map((c) => c.name)],
    ),
  ]);

  const present = new Set(columns.rows.map((r) => `${r.table_name}.${r.column_name}`));
  const missing = ADDED_COLUMNS.filter(([table, column]) => !present.has(`${table}.${column}`));
  if (missing.length) {
    await pool.query(
      missing
        .map(([table, column, def]) => `ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS ${column} ${def};`)
        .join("\n"),
    );
  }
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS uq_users_slug ON users(slug) WHERE slug IS NOT NULL`);

  for (const check of VALUE_CHECKS) {
    const current = checks.rows.find((r) => r.table_name === check.table && r.conname === check.name);
    if (current && quotedValues(current.def) === [...check.values].sort().join(",")) continue;
    // Existing rows outside the new list make ADD fail; the block then rolls back and keeps the old check.
    await pool.query(`
      DO $$ BEGIN
        ALTER TABLE ${check.table} DROP CONSTRAINT IF EXISTS ${check.name};
        ALTER TABLE ${check.table} ADD CONSTRAINT ${check.name}
          CHECK (${check.column} IN (${check.values.map((v) => `'${v}'`).join(", ")}));
      EXCEPTION WHEN others THEN NULL;
      END $$;
    `);
    console.log(`[db] check constraint ${check.name} updated`);
  }
}

async function seedTaxonomy(): Promise<void> {
  await runSeedIfChanged("taxonomy", [BLOG_TAXONOMY, upsertTaxonomy], upsertTaxonomy);
}

async function upsertTaxonomy(): Promise<void> {
  for (let ci = 0; ci < BLOG_TAXONOMY.length; ci++) {
    const cat = BLOG_TAXONOMY[ci];
    // Unchanged rows are skipped (no rewrite each boot), so fall back to a plain lookup for the id.
    const catRes = await pool.query(
      `WITH upserted AS (
         INSERT INTO categories (slug, label, description, sort_order)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (slug) DO UPDATE SET
           label = EXCLUDED.label,
           description = EXCLUDED.description,
           sort_order = EXCLUDED.sort_order
         WHERE (categories.label, categories.description, categories.sort_order)
           IS DISTINCT FROM (EXCLUDED.label, EXCLUDED.description, EXCLUDED.sort_order)
         RETURNING id
       )
       SELECT id FROM upserted
       UNION ALL
       SELECT id FROM categories WHERE slug = $1
       LIMIT 1`,
      [cat.slug, cat.label, cat.description, ci],
    );
    const categoryId = catRes.rows[0].id as string;

    for (let si = 0; si < cat.subcategories.length; si++) {
      const sub = cat.subcategories[si];
      await pool.query(
        `INSERT INTO subcategories (category_id, slug, label, sort_order)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (category_id, slug) DO UPDATE SET
           label = EXCLUDED.label,
           sort_order = EXCLUDED.sort_order
         WHERE (subcategories.label, subcategories.sort_order)
           IS DISTINCT FROM (EXCLUDED.label, EXCLUDED.sort_order)`,
        [categoryId, sub.slug, sub.label, si],
      );
    }
  }
}

async function backfillLegacyArticles(): Promise<void> {
  const map: Record<string, { cat: string; sub: string }> = {
    nutrition: { cat: "nutrition", sub: "nutrition-basics" },
    protein: { cat: "nutrition", sub: "protein" },
    "weight-loss": { cat: "weight-loss", sub: "fat-loss-basics" },
    "muscle-building": {
      cat: "muscle-building",
      sub: "muscle-growth-hypertrophy",
    },
    training: { cat: "muscle-building", sub: "training-programs" },
    recovery: { cat: "muscle-building", sub: "recovery-muscle-growth" },
    supplements: { cat: "nutrition", sub: "nutrition-basics" },
    tools: { cat: "nutrition", sub: "calories-energy" },
  };

  const rows = await pool.query(
    `SELECT id, category FROM articles WHERE category_id IS NULL`,
  );
  for (const row of rows.rows) {
    const key = String(row.category || "nutrition");
    const target = map[key] || map.nutrition;
    const ids = await pool.query(
      `SELECT c.id AS category_id, s.id AS subcategory_id
       FROM categories c
       JOIN subcategories s ON s.category_id = c.id
       WHERE c.slug = $1 AND s.slug = $2`,
      [target.cat, target.sub],
    );
    if (!ids.rows[0]) continue;
    await pool.query(
      `UPDATE articles SET category_id = $1, subcategory_id = $2 WHERE id = $3`,
      [ids.rows[0].category_id, ids.rows[0].subcategory_id, row.id],
    );
  }
}

export async function allocateArticleNumber(): Promise<number> {
  for (let attempt = 0; attempt < 120; attempt++) {
    const n = Math.floor(100_000_000 + Math.random() * 900_000_000);
    const clash = await pool.query(
      `SELECT 1 FROM articles WHERE article_number = $1 LIMIT 1`,
      [n],
    );
    if (!clash.rowCount) return n;
  }
  throw new Error("Failed to allocate unique article number");
}

async function ensureArticleNumbers(): Promise<void> {
  const missing = await pool.query(
    `SELECT id FROM articles WHERE article_number IS NULL`,
  );
  for (const row of missing.rows) {
    const num = await allocateArticleNumber();
    await pool.query(`UPDATE articles SET article_number = $1 WHERE id = $2`, [
      num,
      row.id,
    ]);
  }
}

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Public author profile URLs (`/authors/{slug}`) need a stable slug per staff user. */
export async function ensureUserSlugs(): Promise<void> {
  const missing = await pool.query(
    `SELECT id, name, email FROM users WHERE slug IS NULL ORDER BY created_at ASC`,
  );
  for (const row of missing.rows) {
    const base =
      slugifyName(String(row.name || "")) ||
      slugifyName(String(row.email || "").split("@")[0]) ||
      "author";
    for (let n = 1; n < 100; n++) {
      const candidate = n === 1 ? base : `${base}-${n}`;
      const res = await pool.query(
        `UPDATE users SET slug = $1
         WHERE id = $2 AND NOT EXISTS (SELECT 1 FROM users WHERE slug = $1)`,
        [candidate, row.id],
      );
      if (res.rowCount) break;
    }
  }
}

/** Remove legacy demo posts (slug `seed-*`) so they never reappear. */
async function removeSeededArticles(): Promise<void> {
  const result = await pool.query(
    `DELETE FROM articles WHERE slug LIKE 'seed-%'`,
  );
  const deleted = result.rowCount ?? 0;
  if (deleted > 0) {
    console.log(`[db] removed ${deleted} seeded demo article(s)`);
  }
}

async function ensureSchema(): Promise<void> {
  await pool.query(SCHEMA_SQL);
  await migrateLegacySchema();
  await seedTaxonomy();

  const hasLegacy = await pool.query(`
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'category'
  `);
  if (hasLegacy.rowCount && hasLegacy.rowCount > 0) {
    await backfillLegacyArticles();
    await pool.query(`ALTER TABLE articles DROP COLUMN IF EXISTS category`);
  }

  await ensureArticleNumbers();
}

async function ensureStaffUsers(): Promise<void> {
  await pool.query(
    `UPDATE users SET email = 'writer@fitknowledge.local', name = 'FitKnowledge Writer', role = 'writer'
     WHERE email = 'author@fitknowledge.local'`,
  );

  if (env.nodeEnv === "production") {
    await warnDefaultPasswords();
  } else {
    for (const user of SEED_USERS) {
      const existing = await pool.query(
        `SELECT id FROM users WHERE email = $1 LIMIT 1`,
        [user.email],
      );
      if (existing.rowCount && existing.rowCount > 0) continue;

      const hash = await bcrypt.hash(user.password, 10);
      await pool.query(
        `INSERT INTO users (email, password_hash, name, role)
         VALUES ($1, $2, $3, $4)`,
        [user.email, hash, user.name, user.role],
      );
      console.log(
        `[db] seeded ${user.email} / ${user.password} — change after first login`,
      );
    }
  }
  await ensureUserSlugs();
}

async function seedContent(): Promise<void> {
  await removeSeededArticles();
  await seedKnowledgeContent();
  await seedIntentArticles();
  await seedFoods();
}

/** Apply CMS schema, staff accounts, seeds and content migrations; logs per-step timings. */
export async function ensureCmsSchema(): Promise<void> {
  const started = Date.now();
  const timings: string[] = [];
  const steps: [string, () => Promise<void>][] = [
    ["schema", ensureSchema],
    ["users", ensureStaffUsers],
    ["seeds", seedContent],
    ["migrations", applyContentMigrations],
    ["links", normalizeAllArticleLinks],
  ];
  for (const [name, run] of steps) {
    const stepStart = Date.now();
    await run();
    timings.push(`${name} ${Date.now() - stepStart}ms`);
  }
  console.log(`[db] ready in ${Date.now() - started}ms (${timings.join(", ")})`);
}
