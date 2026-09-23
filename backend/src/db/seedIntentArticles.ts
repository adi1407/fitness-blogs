import { pool } from "./pool";
import { estimateReadingTime } from "../utils/articleSlug";
import { batch1 } from "./intentArticles/batch1";
import { batch2 } from "./intentArticles/batch2";
import { batch3 } from "./intentArticles/batch3";
import { batch4 } from "./intentArticles/batch4";
import { coverForSlug } from "./intentArticles/covers";
import type { IntentArticleDef } from "./intentArticles/helpers";

const ARTICLES: IntentArticleDef[] = [
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
];

const AUTHOR_EMAIL = "aditya@fitknowledge.local";

async function allocateArticleNumber(): Promise<number> {
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

/** Anchor: stagger ~2 articles/day going backward from "today" conceptually. */
function publishedAtFor(dayOffset: number): Date {
  const d = new Date();
  d.setUTCHours(10, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - (9 - dayOffset));
  return d;
}

async function resolveAuthorId(): Promise<string> {
  const res = await pool.query(
    `SELECT id FROM users WHERE email = $1 AND role = 'writer' LIMIT 1`,
    [AUTHOR_EMAIL],
  );
  if (!res.rows[0]) {
    throw new Error(
      `[seedIntentArticles] writer ${AUTHOR_EMAIL} not found — seed users first`,
    );
  }
  return res.rows[0].id as string;
}

async function resolveTaxonomy(
  categorySlug: string,
  subcategorySlug: string,
): Promise<{ categoryId: string; subcategoryId: string }> {
  const res = await pool.query(
    `SELECT c.id AS category_id, s.id AS subcategory_id
     FROM categories c
     JOIN subcategories s ON s.category_id = c.id
     WHERE c.slug = $1 AND s.slug = $2
     LIMIT 1`,
    [categorySlug, subcategorySlug],
  );
  if (!res.rows[0]) {
    throw new Error(
      `[seedIntentArticles] missing taxonomy ${categorySlug}/${subcategorySlug}`,
    );
  }
  return {
    categoryId: res.rows[0].category_id as string,
    subcategoryId: res.rows[0].subcategory_id as string,
  };
}

async function insertIfMissing(
  def: IntentArticleDef,
  authorId: string,
): Promise<"inserted" | "skipped"> {
  const existing = await pool.query(
    `SELECT id FROM articles WHERE slug = $1 LIMIT 1`,
    [def.slug],
  );
  if (existing.rowCount && existing.rowCount > 0) {
    return "skipped";
  }

  const { categoryId, subcategoryId } = await resolveTaxonomy(
    def.categorySlug,
    def.subcategorySlug,
  );
  const articleNumber = await allocateArticleNumber();
  const readingTime = estimateReadingTime(def.body);
  const publishedAt = publishedAtFor(def.dayOffset);
  const cover = coverForSlug(def.slug);

  await pool.query(
    `INSERT INTO articles (
      article_number, title, slug, excerpt, body,
      category_id, subcategory_id, status,
      meta_title, meta_description, primary_keyword,
      quick_answer, tags, topics, faq, sources,
      featured_image, og_image, featured_image_alt, reading_time, author_id,
      published_by, published_at, robots_index, views
    ) VALUES (
      $1,$2,$3,$4,$5,
      $6,$7,'published',
      $8,$9,$10,
      $11,$12,$13,$14::jsonb,$15::jsonb,
      $16,$16,$17,$18,$19,
      $19,$20,TRUE,0
    )`,
    [
      articleNumber,
      def.title,
      def.slug,
      def.excerpt,
      def.body,
      categoryId,
      subcategoryId,
      def.metaTitle,
      def.metaDescription,
      def.primaryKeyword,
      def.quickAnswer,
      def.tags,
      def.topics,
      JSON.stringify(def.faq),
      JSON.stringify(def.sources),
      cover,
      def.featuredImageAlt,
      readingTime,
      authorId,
      publishedAt,
    ],
  );
  return "inserted";
}

/** Always attach the planned hero/OG cover for the 20 intent slugs. */
async function syncIntentCovers(): Promise<number> {
  let updated = 0;
  for (const def of ARTICLES) {
    const cover = coverForSlug(def.slug);
    if (!cover) continue;
    const result = await pool.query(
      `UPDATE articles
       SET featured_image = $1,
           og_image = $1,
           featured_image_alt = CASE
             WHEN featured_image_alt IS NULL OR featured_image_alt = '' THEN $2
             ELSE featured_image_alt
           END,
           updated_at = NOW()
       WHERE slug = $3
         AND (
           featured_image IS DISTINCT FROM $1
           OR og_image IS DISTINCT FROM $1
           OR featured_image_alt IS NULL
           OR featured_image_alt = ''
         )`,
      [cover, def.featuredImageAlt, def.slug],
    );
    updated += result.rowCount ?? 0;
  }
  return updated;
}

async function linkRelatedArticles(): Promise<void> {
  const slugToNumber = new Map<string, number>();
  const rows = await pool.query(
    `SELECT slug, article_number FROM articles
     WHERE slug = ANY($1::text[]) AND article_number IS NOT NULL`,
    [ARTICLES.map((a) => a.slug)],
  );
  for (const row of rows.rows) {
    slugToNumber.set(String(row.slug), Number(row.article_number));
  }

  for (const def of ARTICLES) {
    const related = def.relatedSlugs
      .map((s) => slugToNumber.get(s))
      .filter((n): n is number => typeof n === "number" && Number.isFinite(n))
      .slice(0, 5);
    if (!related.length) continue;

    await pool.query(
      `UPDATE articles
       SET related_article_numbers = $1,
           updated_at = NOW()
       WHERE slug = $2
         AND (related_article_numbers IS NULL OR related_article_numbers = '{}')`,
      [related, def.slug],
    );
  }
}

/** Insert-if-missing seed of 20 high-intent articles by Aditya Choudhary. */
export async function seedIntentArticles(): Promise<void> {
  const authorId = await resolveAuthorId();
  let inserted = 0;
  let skipped = 0;

  for (const def of ARTICLES) {
    const result = await insertIfMissing(def, authorId);
    if (result === "inserted") inserted += 1;
    else skipped += 1;
  }

  await linkRelatedArticles();
  const coversUpdated = await syncIntentCovers();

  console.log(
    `[db] intent articles: ${inserted} inserted, ${skipped} skipped, ${coversUpdated} covers synced, author=${AUTHOR_EMAIL}`,
  );
}
