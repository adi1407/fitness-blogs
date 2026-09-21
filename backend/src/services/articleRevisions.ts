import { pool } from "../db/pool";

const MAX_REVISIONS = 80;

export type ArticleSnapshot = {
  title: string;
  slug: string | null;
  excerpt: string;
  body: string;
  categoryId: string | null;
  subcategoryId: string | null;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  primaryKeyword: string;
  ogImage: string;
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageCaption: string;
  quickAnswer: string;
  tags: string[];
  topics: string[];
  relatedArticleNumbers: number[];
  faq: unknown[];
  sources: unknown[];
  status: string;
};

function parseJsonArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export function snapshotFromArticleRow(
  row: Record<string, unknown>,
): ArticleSnapshot {
  const relatedRaw = row.related_article_numbers;
  const relatedArticleNumbers = Array.isArray(relatedRaw)
    ? relatedRaw.map((n) => Number(n)).filter((n) => Number.isFinite(n))
    : [];

  return {
    title: String(row.title ?? ""),
    slug: typeof row.slug === "string" ? row.slug : null,
    excerpt: String(row.excerpt ?? ""),
    body: String(row.body ?? ""),
    categoryId: (row.category_id as string | null) ?? null,
    subcategoryId: (row.subcategory_id as string | null) ?? null,
    metaTitle: String(row.meta_title ?? ""),
    metaDescription: String(row.meta_description ?? ""),
    metaKeywords: String(row.meta_keywords ?? ""),
    primaryKeyword: String(row.primary_keyword ?? ""),
    ogImage: String(row.og_image ?? ""),
    featuredImage: String(row.featured_image ?? ""),
    featuredImageAlt: String(row.featured_image_alt ?? ""),
    featuredImageCaption: String(row.featured_image_caption ?? ""),
    quickAnswer: String(row.quick_answer ?? ""),
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    topics: Array.isArray(row.topics) ? (row.topics as string[]) : [],
    relatedArticleNumbers,
    faq: parseJsonArray(row.faq),
    sources: parseJsonArray(row.sources),
    status: String(row.status ?? "draft"),
  };
}

function stableStringify(value: unknown): string {
  return JSON.stringify(value);
}

/** Persist a revision of the current article if it differs from the last one. */
export async function maybeRecordRevision(opts: {
  articleId: string;
  row: Record<string, unknown>;
  actorId: string | null;
  actorName: string;
  reason?: string;
}): Promise<void> {
  const snapshot = snapshotFromArticleRow(opts.row);
  const last = await pool.query(
    `SELECT snapshot FROM article_revisions
     WHERE article_id = $1
     ORDER BY revision_number DESC
     LIMIT 1`,
    [opts.articleId],
  );
  if (last.rowCount && last.rows[0]) {
    const prev = last.rows[0].snapshot;
    if (stableStringify(prev) === stableStringify(snapshot)) return;
  }

  const nextNum = await pool.query(
    `SELECT COALESCE(MAX(revision_number), 0) + 1 AS n
     FROM article_revisions WHERE article_id = $1`,
    [opts.articleId],
  );
  const revisionNumber = Number(nextNum.rows[0].n);

  await pool.query(
    `INSERT INTO article_revisions
      (article_id, revision_number, snapshot, reason, actor_id, actor_name)
     VALUES ($1, $2, $3::jsonb, $4, $5, $6)`,
    [
      opts.articleId,
      revisionNumber,
      JSON.stringify(snapshot),
      opts.reason ?? "save",
      opts.actorId,
      opts.actorName,
    ],
  );

  await pool.query(
    `DELETE FROM article_revisions
     WHERE article_id = $1
       AND revision_number <= (
         SELECT COALESCE(MAX(revision_number), 0) - $2
         FROM article_revisions WHERE article_id = $1
       )`,
    [opts.articleId, MAX_REVISIONS],
  );
}

export function mapRevisionRow(row: Record<string, unknown>) {
  return {
    id: row.id,
    articleId: row.article_id,
    revisionNumber: Number(row.revision_number),
    snapshot: row.snapshot as ArticleSnapshot,
    reason: String(row.reason ?? "save"),
    actorId: row.actor_id,
    actorName: String(row.actor_name ?? ""),
    createdAt: row.created_at,
  };
}
