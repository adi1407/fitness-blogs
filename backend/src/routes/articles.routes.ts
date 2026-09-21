import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool";
import { allocateArticleNumber } from "../db/ensureCmsSchema";
import { authenticate } from "../middleware/auth";
import { recordAudit } from "../services/auditLog";
import { blogArticlePath } from "../constants/blogTaxonomy";
import { canEditArticle, canPublish } from "../utils/roles";
import { env } from "../config/env";
import {
  estimateReadingTime,
  normalizeSlugInput,
  slugFromTitle,
} from "../utils/articleSlug";

export const articlesRouter = Router();

const MAX_RELATED = 5;

const faqItemSchema = z.object({
  question: z.string().max(300),
  answer: z.string().max(2000),
});

const sourceItemSchema = z.object({
  title: z.string().max(250),
  url: z.string().max(1000).optional().default(""),
  note: z.string().max(500).optional().default(""),
});

const articleBodySchema = z.object({
  title: z.string().max(250).optional(),
  slug: z.string().max(100).optional().nullable(),
  excerpt: z.string().max(500).optional(),
  body: z.string().optional(),
  categoryId: z.string().uuid().optional().nullable(),
  subcategoryId: z.string().uuid().optional().nullable(),
  metaTitle: z.string().max(250).optional(),
  metaDescription: z.string().max(320).optional(),
  metaKeywords: z.string().max(500).optional(),
  primaryKeyword: z.string().max(120).optional(),
  ogImage: z.string().max(1000).optional(),
  featuredImage: z.string().max(1000).optional(),
  featuredImageAlt: z.string().max(250).optional(),
  featuredImageCaption: z.string().max(500).optional(),
  quickAnswer: z.string().max(2000).optional(),
  tags: z.array(z.string().max(60)).max(30).optional(),
  topics: z.array(z.string().max(80)).max(20).optional(),
  relatedArticleNumbers: z
    .array(z.number().int().min(100_000_000).max(999_999_999))
    .max(MAX_RELATED)
    .optional(),
  faq: z.array(faqItemSchema).max(20).optional(),
  sources: z.array(sourceItemSchema).max(30).optional(),
});

const ARTICLE_SELECT = `
  SELECT a.*,
    c.slug AS category_slug,
    c.label AS category_label,
    s.slug AS subcategory_slug,
    s.label AS subcategory_label,
    u.name AS author_name,
    u.email AS author_email,
    rev.name AS reviewer_name
  FROM articles a
  LEFT JOIN categories c ON c.id = a.category_id
  LEFT JOIN subcategories s ON s.id = a.subcategory_id
  LEFT JOIN users u ON u.id = a.author_id
  LEFT JOIN users rev ON rev.id = a.reviewer_id
`;

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

export function mapArticle(row: Record<string, unknown>) {
  const categorySlug =
    typeof row.category_slug === "string" ? row.category_slug : null;
  const subcategorySlug =
    typeof row.subcategory_slug === "string" ? row.subcategory_slug : null;
  const slug = typeof row.slug === "string" ? row.slug : null;
  const path =
    categorySlug && subcategorySlug && slug
      ? blogArticlePath(categorySlug, subcategorySlug, slug)
      : null;

  const relatedRaw = row.related_article_numbers;
  const relatedArticleNumbers = Array.isArray(relatedRaw)
    ? relatedRaw.map((n) => Number(n)).filter((n) => Number.isFinite(n))
    : [];

  return {
    id: row.id,
    articleNumber: row.article_number,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    body: row.body,
    categoryId: row.category_id,
    subcategoryId: row.subcategory_id,
    categorySlug,
    categoryLabel:
      typeof row.category_label === "string" ? row.category_label : null,
    subcategorySlug,
    subcategoryLabel:
      typeof row.subcategory_label === "string" ? row.subcategory_label : null,
    path,
    status: row.status,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    metaKeywords: row.meta_keywords,
    primaryKeyword: row.primary_keyword,
    ogImage: row.og_image,
    featuredImage: row.featured_image,
    featuredImageAlt: row.featured_image_alt ?? "",
    featuredImageCaption: row.featured_image_caption ?? "",
    quickAnswer: row.quick_answer,
    tags: Array.isArray(row.tags) ? row.tags : [],
    topics: Array.isArray(row.topics) ? row.topics : [],
    relatedArticleNumbers,
    faq: parseJsonArray(row.faq),
    sources: parseJsonArray(row.sources),
    views: Number(row.views ?? 0),
    readingTime: row.reading_time,
    authorId: row.author_id,
    authorName:
      typeof row.author_name === "string" && row.author_name
        ? row.author_name
        : null,
    authorEmail:
      typeof row.author_email === "string" ? row.author_email : null,
    reviewerId: row.reviewer_id,
    reviewerName:
      typeof row.reviewer_name === "string" && row.reviewer_name
        ? row.reviewer_name
        : null,
    publishedBy: row.published_by,
    rejectReason: row.reject_reason,
    editorNote: row.reject_reason,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function resolveRelatedArticles(
  numbers: number[],
  excludeId?: string,
) {
  if (!numbers.length) return [];
  const result = await pool.query(
    `${ARTICLE_SELECT}
     WHERE a.article_number = ANY($1::int[])
       AND a.status = 'published'
       AND a.slug IS NOT NULL
       ${excludeId ? "AND a.id <> $2" : ""}
     ORDER BY array_position($1::int[], a.article_number)`,
    excludeId ? [numbers, excludeId] : [numbers],
  );
  return result.rows.map(mapArticle);
}

async function uniqueSlug(
  base: string,
  excludeId?: string,
): Promise<string | null> {
  const normalized = normalizeSlugInput(base);
  if (!normalized) return null;

  let candidate = normalized;
  let n = 2;
  for (;;) {
    const q = excludeId
      ? await pool.query(
          `SELECT id FROM articles WHERE slug = $1 AND id <> $2 LIMIT 1`,
          [candidate, excludeId],
        )
      : await pool.query(`SELECT id FROM articles WHERE slug = $1 LIMIT 1`, [
          candidate,
        ]);
    if (q.rowCount === 0) return candidate;
    candidate = `${normalized}-${n}`.slice(0, 100);
    n += 1;
  }
}

async function resolveTaxonomyPair(
  categoryId: string | null | undefined,
  subcategoryId: string | null | undefined,
): Promise<
  | { ok: true; categoryId: string | null; subcategoryId: string | null }
  | { ok: false; message: string }
> {
  if (!categoryId && !subcategoryId) {
    return { ok: true, categoryId: null, subcategoryId: null };
  }
  if (!categoryId || !subcategoryId) {
    return {
      ok: false,
      message: "Both categoryId and subcategoryId are required together",
    };
  }
  const check = await pool.query(
    `SELECT s.id FROM subcategories s
     WHERE s.id = $1 AND s.category_id = $2 LIMIT 1`,
    [subcategoryId, categoryId],
  );
  if (!check.rowCount) {
    return {
      ok: false,
      message: "Subcategory does not belong to the selected category",
    };
  }
  return { ok: true, categoryId, subcategoryId };
}

async function syncBriefOnArticle(
  articleId: string,
  next: "done" | "in_progress" | "reopen" | "resume",
): Promise<void> {
  if (next === "reopen") {
    await pool.query(
      `UPDATE article_briefs
       SET status = 'open', article_id = NULL, updated_at = NOW()
       WHERE article_id = $1 AND status = 'in_progress'`,
      [articleId],
    );
    return;
  }
  if (next === "resume") {
    await pool.query(
      `UPDATE article_briefs
       SET status = 'in_progress', updated_at = NOW()
       WHERE article_id = $1 AND status = 'done'`,
      [articleId],
    );
    return;
  }
  await pool.query(
    `UPDATE article_briefs
     SET status = $2, updated_at = NOW()
     WHERE article_id = $1 AND status <> 'cancelled' AND status <> 'done'`,
    [articleId, next],
  );
}

articlesRouter.use(authenticate);

/** Lookup published or any article by 9-digit ID (CMS linking). */
articlesRouter.get("/lookup-by-number/:articleNumber", async (req, res) => {
  const num = Number(req.params.articleNumber);
  if (!Number.isInteger(num) || num < 100_000_000 || num > 999_999_999) {
    res.status(400).json({ message: "Invalid article number" });
    return;
  }

  const result = await pool.query(
    `${ARTICLE_SELECT} WHERE a.article_number = $1 LIMIT 1`,
    [num],
  );
  const row = result.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  if (req.user?.role === "writer" && row.author_id !== req.user.id) {
    // Writers may look up any published piece for linking
    if (row.status !== "published") {
      res.status(404).json({ message: "Article not found" });
      return;
    }
  }
  res.json({ article: mapArticle(row) });
});

articlesRouter.get("/", async (req, res) => {
  const status = typeof req.query.status === "string" ? req.query.status : null;
  const categoryId =
    typeof req.query.categoryId === "string" ? req.query.categoryId : null;
  const subcategoryId =
    typeof req.query.subcategoryId === "string"
      ? req.query.subcategoryId
      : null;
  const categorySlug =
    typeof req.query.category === "string" ? req.query.category : null;
  const subcategorySlug =
    typeof req.query.subcategory === "string" ? req.query.subcategory : null;
  const period =
    typeof req.query.period === "string" ? req.query.period : "all";
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
  const offset = (page - 1) * limit;

  const clauses: string[] = [];
  const params: unknown[] = [];

  if (req.user?.role === "writer") {
    params.push(req.user.id);
    clauses.push(`a.author_id = $${params.length}`);
  }
  if (status) {
    params.push(status);
    clauses.push(`a.status = $${params.length}`);
  }
  if (categoryId) {
    params.push(categoryId);
    clauses.push(`a.category_id = $${params.length}`);
  }
  if (subcategoryId) {
    params.push(subcategoryId);
    clauses.push(`a.subcategory_id = $${params.length}`);
  }
  if (categorySlug) {
    params.push(categorySlug);
    clauses.push(`c.slug = $${params.length}`);
  }
  if (subcategorySlug) {
    params.push(subcategorySlug);
    clauses.push(`s.slug = $${params.length}`);
  }

  const dateCol =
    status === "published"
      ? "COALESCE(a.published_at, a.updated_at)"
      : "a.updated_at";

  if (period === "today") {
    clauses.push(`${dateCol} >= date_trunc('day', NOW())`);
  } else if (period === "week") {
    clauses.push(`${dateCol} >= date_trunc('week', NOW())`);
  } else if (period === "month") {
    clauses.push(`${dateCol} >= date_trunc('month', NOW())`);
  } else if (period === "year") {
    clauses.push(`${dateCol} >= date_trunc('year', NOW())`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  const countRes = await pool.query(
    `SELECT COUNT(*)::int AS total
     FROM articles a
     LEFT JOIN categories c ON c.id = a.category_id
     LEFT JOIN subcategories s ON s.id = a.subcategory_id
     ${where}`,
    params,
  );
  const total = countRes.rows[0]?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const listParams = [...params, limit, offset];
  const result = await pool.query(
    `${ARTICLE_SELECT} ${where}
     ORDER BY a.updated_at DESC
     LIMIT $${listParams.length - 1} OFFSET $${listParams.length}`,
    listParams,
  );

  res.json({
    articles: result.rows.map(mapArticle),
    page,
    limit,
    total,
    totalPages,
  });
});

articlesRouter.get("/:id", async (req, res) => {
  const result = await pool.query(`${ARTICLE_SELECT} WHERE a.id = $1`, [
    req.params.id,
  ]);
  const row = result.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  if (req.user?.role === "writer" && row.author_id !== req.user.id) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
  res.json({ article: mapArticle(row) });
});

/** Short-lived token so the public site can render unpublished drafts. */
articlesRouter.post("/:id/preview-token", async (req, res) => {
  const result = await pool.query(`SELECT * FROM articles WHERE id = $1`, [
    req.params.id,
  ]);
  const row = result.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  if (req.user?.role === "writer" && row.author_id !== req.user.id) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const expiresIn = "30m";
  const token = jwt.sign(
    { purpose: "article_preview", articleId: String(row.id) },
    env.jwtSecret,
    { expiresIn },
  );
  await recordAudit(req, {
    action: "article.preview_token",
    entityType: "article",
    entityId: String(row.id),
    summary: `Minted preview for “${row.title || "Untitled"}”`,
  });
  res.json({ token, expiresInSeconds: 30 * 60 });
});

articlesRouter.post("/", async (req, res) => {
  const parsed = articleBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid article payload",
      errors: parsed.error.flatten(),
    });
    return;
  }

  const data = parsed.data;
  const tax = await resolveTaxonomyPair(data.categoryId, data.subcategoryId);
  if (!tax.ok) {
    res.status(400).json({ message: tax.message });
    return;
  }

  const title = data.title ?? "";
  const slug = await uniqueSlug(data.slug || slugFromTitle(title) || "");
  const body = data.body ?? "";
  const articleNumber = await allocateArticleNumber();
  const tags = (data.tags ?? []).map((t) => t.trim()).filter(Boolean);
  const topics = (data.topics ?? []).map((t) => t.trim()).filter(Boolean);
  const related = data.relatedArticleNumbers ?? [];
  const faq = data.faq ?? [];
  const sources = data.sources ?? [];

  const result = await pool.query(
    `INSERT INTO articles (
      article_number, title, slug, excerpt, body,
      category_id, subcategory_id, status,
      meta_title, meta_description, meta_keywords, primary_keyword,
      og_image, featured_image, featured_image_alt, featured_image_caption,
      quick_answer, tags, topics, related_article_numbers, faq, sources,
      reading_time, author_id
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,'draft',$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20::jsonb,$21::jsonb,$22,$23
    ) RETURNING id`,
    [
      articleNumber,
      title,
      slug,
      data.excerpt ?? "",
      body,
      tax.categoryId,
      tax.subcategoryId,
      data.metaTitle ?? "",
      data.metaDescription ?? "",
      data.metaKeywords ?? "",
      data.primaryKeyword ?? "",
      data.ogImage ?? "",
      data.featuredImage ?? "",
      data.featuredImageAlt ?? "",
      data.featuredImageCaption ?? "",
      data.quickAnswer ?? "",
      tags,
      topics,
      related,
      JSON.stringify(faq),
      JSON.stringify(sources),
      estimateReadingTime(body),
      req.user!.id,
    ],
  );

  const full = await pool.query(`${ARTICLE_SELECT} WHERE a.id = $1`, [
    result.rows[0].id,
  ]);
  const article = mapArticle(full.rows[0]);
  await recordAudit(req, {
    action: "article.created",
    entityType: "article",
    entityId: String(article.id),
    summary: `Created “${title || "Untitled"}” (#${articleNumber})`,
  });

  res.status(201).json({ article });
});

articlesRouter.put("/:id", async (req, res) => {
  const existing = await pool.query(`SELECT * FROM articles WHERE id = $1`, [
    req.params.id,
  ]);
  const row = existing.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }

  if (
    !canEditArticle(req.user!.role, row.author_id, req.user!.id, row.status)
  ) {
    res.status(403).json({ message: "Cannot edit this article" });
    return;
  }

  const parsed = articleBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid article payload" });
    return;
  }

  const data = parsed.data;
  const nextCategoryId =
    data.categoryId !== undefined ? data.categoryId : row.category_id;
  const nextSubcategoryId =
    data.subcategoryId !== undefined
      ? data.subcategoryId
      : row.subcategory_id;
  const tax = await resolveTaxonomyPair(nextCategoryId, nextSubcategoryId);
  if (!tax.ok) {
    res.status(400).json({ message: tax.message });
    return;
  }

  const title = data.title ?? row.title;
  const slugBase =
    data.slug !== undefined
      ? normalizeSlugInput(data.slug ?? "")
      : row.slug || slugFromTitle(title);
  const slug = await uniqueSlug(slugBase || slugFromTitle(title), row.id);
  const body = data.body ?? row.body;
  const tags =
    data.tags !== undefined
      ? data.tags.map((t) => t.trim()).filter(Boolean)
      : row.tags;
  const topics =
    data.topics !== undefined
      ? data.topics.map((t) => t.trim()).filter(Boolean)
      : row.topics;
  const related =
    data.relatedArticleNumbers !== undefined
      ? data.relatedArticleNumbers
      : row.related_article_numbers ?? [];
  const faq =
    data.faq !== undefined ? data.faq : parseJsonArray(row.faq);
  const sources =
    data.sources !== undefined ? data.sources : parseJsonArray(row.sources);

  await pool.query(
    `UPDATE articles SET
      title = $1, slug = $2, excerpt = $3, body = $4,
      category_id = $5, subcategory_id = $6,
      meta_title = $7, meta_description = $8, meta_keywords = $9,
      primary_keyword = $10, og_image = $11, featured_image = $12,
      featured_image_alt = $13, featured_image_caption = $14,
      quick_answer = $15, tags = $16, topics = $17,
      related_article_numbers = $18, faq = $19::jsonb, sources = $20::jsonb,
      reading_time = $21, updated_at = NOW()
     WHERE id = $22`,
    [
      title,
      slug,
      data.excerpt ?? row.excerpt,
      body,
      tax.categoryId,
      tax.subcategoryId,
      data.metaTitle ?? row.meta_title,
      data.metaDescription ?? row.meta_description,
      data.metaKeywords ?? row.meta_keywords,
      data.primaryKeyword ?? row.primary_keyword,
      data.ogImage ?? row.og_image,
      data.featuredImage ?? row.featured_image,
      data.featuredImageAlt ?? row.featured_image_alt ?? "",
      data.featuredImageCaption ?? row.featured_image_caption ?? "",
      data.quickAnswer ?? row.quick_answer,
      tags,
      topics,
      related,
      JSON.stringify(faq),
      JSON.stringify(sources),
      estimateReadingTime(body),
      row.id,
    ],
  );

  const full = await pool.query(`${ARTICLE_SELECT} WHERE a.id = $1`, [row.id]);
  res.json({ article: mapArticle(full.rows[0]) });
});

articlesRouter.patch("/:id/submit", async (req, res) => {
  const existing = await pool.query(`SELECT * FROM articles WHERE id = $1`, [
    req.params.id,
  ]);
  const row = existing.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  if (
    !canEditArticle(req.user!.role, row.author_id, req.user!.id, row.status)
  ) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
  if (
    row.status !== "draft" &&
    row.status !== "rejected" &&
    row.status !== "changes_requested"
  ) {
    res.status(400).json({
      message:
        "Only draft, rejected, or changes-requested articles can be submitted",
    });
    return;
  }
  if (!row.title?.trim() || !row.body?.trim()) {
    res.status(400).json({ message: "Title and body required to submit" });
    return;
  }
  if (!row.slug) {
    res.status(400).json({ message: "Slug required to submit" });
    return;
  }
  if (!row.category_id || !row.subcategory_id) {
    res
      .status(400)
      .json({ message: "Category and subcategory required to submit" });
    return;
  }

  await pool.query(
    `UPDATE articles SET status = 'submitted', reject_reason = '', updated_at = NOW()
     WHERE id = $1`,
    [row.id],
  );
  await syncBriefOnArticle(String(row.id), "in_progress");
  const full = await pool.query(`${ARTICLE_SELECT} WHERE a.id = $1`, [row.id]);
  const article = mapArticle(full.rows[0]);
  await recordAudit(req, {
    action: "article.submitted",
    entityType: "article",
    entityId: String(article.id),
    summary: `Submitted “${article.title}”`,
  });
  res.json({ article });
});

articlesRouter.patch("/:id/publish", async (req, res) => {
  if (!canPublish(req.user!.role)) {
    res.status(403).json({ message: "Only editors/admins can publish" });
    return;
  }
  const existing = await pool.query(`SELECT * FROM articles WHERE id = $1`, [
    req.params.id,
  ]);
  const row = existing.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  if (row.status === "published") {
    res.status(400).json({ message: "Article is already published" });
    return;
  }
  if (!row.title?.trim() || !row.body?.trim()) {
    res.status(400).json({ message: "Title and body required to publish" });
    return;
  }
  if (!row.slug) {
    res.status(400).json({ message: "Slug required before publish" });
    return;
  }
  if (!row.category_id || !row.subcategory_id) {
    res
      .status(400)
      .json({ message: "Category and subcategory required to publish" });
    return;
  }

  await pool.query(
    `UPDATE articles SET
      status = 'published', published_at = COALESCE(published_at, NOW()),
      published_by = $1, reviewer_id = $1, reject_reason = '', updated_at = NOW()
     WHERE id = $2`,
    [req.user!.id, row.id],
  );
  await syncBriefOnArticle(String(row.id), "done");
  const full = await pool.query(`${ARTICLE_SELECT} WHERE a.id = $1`, [row.id]);
  const article = mapArticle(full.rows[0]);
  await recordAudit(req, {
    action: "article.published",
    entityType: "article",
    entityId: String(article.id),
    summary: `Published “${article.title}”`,
  });
  res.json({ article });
});

articlesRouter.patch("/:id/unpublish", async (req, res) => {
  if (!canPublish(req.user!.role)) {
    res.status(403).json({ message: "Only editors/admins can unpublish" });
    return;
  }
  const existing = await pool.query(`SELECT * FROM articles WHERE id = $1`, [
    req.params.id,
  ]);
  const row = existing.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  if (row.status !== "published") {
    res
      .status(400)
      .json({ message: "Only published articles can be unpublished" });
    return;
  }

  await pool.query(
    `UPDATE articles SET status = 'draft', updated_at = NOW() WHERE id = $1`,
    [row.id],
  );
  await syncBriefOnArticle(String(row.id), "resume");
  const full = await pool.query(`${ARTICLE_SELECT} WHERE a.id = $1`, [row.id]);
  const article = mapArticle(full.rows[0]);
  await recordAudit(req, {
    action: "article.unpublished",
    entityType: "article",
    entityId: String(article.id),
    summary: `Unpublished “${article.title}”`,
  });
  res.json({ article });
});

articlesRouter.patch("/:id/reject", async (req, res) => {
  if (!canPublish(req.user!.role)) {
    res.status(403).json({ message: "Only editors/admins can reject" });
    return;
  }
  const existing = await pool.query(`SELECT * FROM articles WHERE id = $1`, [
    req.params.id,
  ]);
  const row = existing.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  if (row.status !== "submitted") {
    res.status(400).json({ message: "Only submitted articles can be rejected" });
    return;
  }

  const reason = String(req.body?.reason ?? "").slice(0, 500);
  await pool.query(
    `UPDATE articles SET status = 'rejected', reject_reason = $1, updated_at = NOW()
     WHERE id = $2`,
    [reason, row.id],
  );
  const full = await pool.query(`${ARTICLE_SELECT} WHERE a.id = $1`, [row.id]);
  const article = mapArticle(full.rows[0]);
  await recordAudit(req, {
    action: "article.rejected",
    entityType: "article",
    entityId: String(article.id),
    summary: `Rejected “${article.title}”`,
    meta: { reason },
  });
  res.json({ article });
});

articlesRouter.patch("/:id/request-changes", async (req, res) => {
  if (!canPublish(req.user!.role)) {
    res
      .status(403)
      .json({ message: "Only editors/admins can request changes" });
    return;
  }
  const existing = await pool.query(`SELECT * FROM articles WHERE id = $1`, [
    req.params.id,
  ]);
  const row = existing.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  if (row.status !== "submitted") {
    res.status(400).json({
      message: "Only submitted articles can be sent back for changes",
    });
    return;
  }

  const reason = String(req.body?.reason ?? "").slice(0, 500);
  await pool.query(
    `UPDATE articles SET status = 'changes_requested', reject_reason = $1, updated_at = NOW()
     WHERE id = $2`,
    [reason, row.id],
  );
  const full = await pool.query(`${ARTICLE_SELECT} WHERE a.id = $1`, [row.id]);
  const article = mapArticle(full.rows[0]);
  await recordAudit(req, {
    action: "article.changes_requested",
    entityType: "article",
    entityId: String(article.id),
    summary: `Requested changes on “${article.title}”`,
    meta: { reason },
  });
  res.json({ article });
});

articlesRouter.delete("/:id", async (req, res) => {
  if (!canPublish(req.user!.role) && req.user!.role !== "writer") {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
  const existing = await pool.query(`SELECT * FROM articles WHERE id = $1`, [
    req.params.id,
  ]);
  const row = existing.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  if (
    req.user!.role === "writer" &&
    (row.author_id !== req.user!.id || row.status === "published")
  ) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  await syncBriefOnArticle(String(row.id), "reopen");
  await pool.query(`DELETE FROM articles WHERE id = $1`, [row.id]);
  await recordAudit(req, {
    action: "article.deleted",
    entityType: "article",
    entityId: row.id,
    summary: `Deleted “${row.title}”`,
  });
  res.json({ ok: true });
});
