import bcrypt from "bcryptjs";
import { pool } from "./pool";
import { BLOG_TAXONOMY } from "../constants/blogTaxonomy";

const SCHEMA_SQL = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'writer')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
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
    CHECK (status IN ('draft', 'submitted', 'published', 'rejected')),
  meta_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  meta_keywords TEXT NOT NULL DEFAULT '',
  primary_keyword TEXT NOT NULL DEFAULT '',
  og_image TEXT NOT NULL DEFAULT '',
  featured_image TEXT NOT NULL DEFAULT '',
  quick_answer TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  topics TEXT[] NOT NULL DEFAULT '{}',
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
`;

const SEED_USERS = [
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
] as const;

async function migrateLegacySchema(): Promise<void> {
  await pool.query(`
    DO $$ BEGIN
      ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
      ALTER TABLE users ADD CONSTRAINT users_role_check
        CHECK (role IN ('admin', 'editor', 'writer'));
    EXCEPTION WHEN others THEN NULL;
    END $$;
  `);
  await pool.query(`UPDATE users SET role = 'writer' WHERE role = 'author'`);

  await pool.query(`
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS article_number INT;
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS category_id UUID;
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS subcategory_id UUID;
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS topics TEXT[] DEFAULT '{}';
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS views INT NOT NULL DEFAULT 0;
  `);

}

async function seedTaxonomy(): Promise<void> {
  for (let ci = 0; ci < BLOG_TAXONOMY.length; ci++) {
    const cat = BLOG_TAXONOMY[ci];
    const catRes = await pool.query(
      `INSERT INTO categories (slug, label, description, sort_order)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (slug) DO UPDATE SET
         label = EXCLUDED.label,
         description = EXCLUDED.description,
         sort_order = EXCLUDED.sort_order
       RETURNING id`,
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
           sort_order = EXCLUDED.sort_order`,
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

/** Apply CMS schema and seed staff + taxonomy. */
export async function ensureCmsSchema(): Promise<void> {
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

  await pool.query(
    `UPDATE users SET email = 'writer@fitknowledge.local', name = 'FitKnowledge Writer', role = 'writer'
     WHERE email = 'author@fitknowledge.local'`,
  );

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
