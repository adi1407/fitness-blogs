import bcrypt from "bcryptjs";
import { pool } from "./pool";
import { BLOG_TAXONOMY } from "../constants/blogTaxonomy";
import { seedKnowledgeContent } from "./seedKnowledgeContent";

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
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (section, slug)
);

CREATE INDEX IF NOT EXISTS idx_knowledge_pages_section
  ON knowledge_pages(section, status, sort_order);
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
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS featured_image_alt TEXT NOT NULL DEFAULT '';
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS featured_image_caption TEXT NOT NULL DEFAULT '';
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS related_article_numbers INT[] NOT NULL DEFAULT '{}';
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS faq JSONB NOT NULL DEFAULT '[]'::jsonb;
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS sources JSONB NOT NULL DEFAULT '[]'::jsonb;
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS robots_index BOOLEAN NOT NULL DEFAULT TRUE;
    ALTER TABLE articles ADD COLUMN IF NOT EXISTS last_reviewed_at TIMESTAMPTZ;
  `);

  // Allow changes_requested status on existing DBs
  await pool.query(`
    DO $$ BEGIN
      ALTER TABLE articles DROP CONSTRAINT IF EXISTS articles_status_check;
      ALTER TABLE articles ADD CONSTRAINT articles_status_check
        CHECK (status IN ('draft', 'submitted', 'published', 'rejected', 'changes_requested'));
    EXCEPTION WHEN others THEN NULL;
    END $$;
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

  await removeSeededArticles();
  await seedKnowledgeContent();
}
