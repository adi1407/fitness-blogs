import { Router } from "express";
import { pool } from "../db/pool";
import { BLOG_TAXONOMY, BLOG_TOPICS } from "../constants/blogTaxonomy";
import {
  mapArticle,
  resolveRelatedArticles,
} from "./articles.routes";

export const publicRouter = Router();

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

function mapPublic(row: Record<string, unknown>) {
  return mapArticle(row);
}

publicRouter.get("/taxonomy", async (_req, res) => {
  const cats = await pool.query(
    `SELECT id, slug, label, description, sort_order
     FROM categories ORDER BY sort_order ASC, label ASC`,
  );
  const subs = await pool.query(
    `SELECT id, category_id, slug, label, sort_order
     FROM subcategories ORDER BY sort_order ASC, label ASC`,
  );

  const categories = cats.rows.map((c) => ({
    id: c.id,
    slug: c.slug,
    label: c.label,
    description: c.description,
    subcategories: subs.rows
      .filter((s) => s.category_id === c.id)
      .map((s) => ({
        id: s.id,
        slug: s.slug,
        label: s.label,
      })),
  }));

  if (categories.length === 0) {
    res.json({
      categories: BLOG_TAXONOMY.map((c) => ({
        id: c.slug,
        slug: c.slug,
        label: c.label,
        description: c.description,
        subcategories: c.subcategories.map((s) => ({
          id: s.slug,
          slug: s.slug,
          label: s.label,
        })),
      })),
      topics: [...BLOG_TOPICS],
    });
    return;
  }

  res.json({ categories, topics: [...BLOG_TOPICS] });
});

publicRouter.get("/articles", async (req, res) => {
  const category =
    typeof req.query.category === "string" ? req.query.category : null;
  const subcategory =
    typeof req.query.subcategory === "string" ? req.query.subcategory : null;
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 48));

  const params: unknown[] = [];
  const clauses = [`a.status = 'published'`, `a.slug IS NOT NULL`];

  if (category) {
    params.push(category);
    clauses.push(`c.slug = $${params.length}`);
  }
  if (subcategory) {
    params.push(subcategory);
    clauses.push(`s.slug = $${params.length}`);
  }

  params.push(limit);
  const result = await pool.query(
    `${ARTICLE_SELECT}
     WHERE ${clauses.join(" AND ")}
     ORDER BY a.published_at DESC NULLS LAST, a.updated_at DESC
     LIMIT $${params.length}`,
    params,
  );

  res.json({ articles: result.rows.map(mapPublic) });
});

publicRouter.get("/articles/by-number/:articleNumber", async (req, res) => {
  const num = Number(req.params.articleNumber);
  if (!Number.isInteger(num) || num < 100_000_000 || num > 999_999_999) {
    res.status(400).json({ message: "Invalid article number" });
    return;
  }

  const result = await pool.query(
    `${ARTICLE_SELECT}
     WHERE a.article_number = $1 AND a.status = 'published' LIMIT 1`,
    [num],
  );
  const row = result.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }

  await pool.query(`UPDATE articles SET views = views + 1 WHERE id = $1`, [
    row.id,
  ]);
  row.views = Number(row.views ?? 0) + 1;
  const article = mapPublic(row);
  const related = await resolveRelatedArticles(
    article.relatedArticleNumbers as number[],
    String(article.id),
  );
  res.json({ article, related });
});

publicRouter.get("/articles/lookup/:articleNumber", async (req, res) => {
  const num = Number(req.params.articleNumber);
  if (!Number.isInteger(num) || num < 100_000_000 || num > 999_999_999) {
    res.status(400).json({ message: "Invalid article number" });
    return;
  }
  const result = await pool.query(
    `${ARTICLE_SELECT}
     WHERE a.article_number = $1 AND a.status = 'published' LIMIT 1`,
    [num],
  );
  if (!result.rows[0]) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  res.json({ article: mapPublic(result.rows[0]) });
});

publicRouter.get("/articles/:slug", async (req, res) => {
  const result = await pool.query(
    `${ARTICLE_SELECT}
     WHERE a.slug = $1 AND a.status = 'published' LIMIT 1`,
    [req.params.slug],
  );
  const row = result.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }

  await pool.query(`UPDATE articles SET views = views + 1 WHERE id = $1`, [
    row.id,
  ]);
  row.views = Number(row.views ?? 0) + 1;
  const article = mapPublic(row);
  const related = await resolveRelatedArticles(
    article.relatedArticleNumbers as number[],
    String(article.id),
  );

  // Fill related from same subcategory if curated list is short
  let relatedList = related;
  if (relatedList.length < 4 && article.categorySlug && article.subcategorySlug) {
    const fill = await pool.query(
      `${ARTICLE_SELECT}
       WHERE a.status = 'published' AND a.slug IS NOT NULL
         AND c.slug = $1 AND s.slug = $2 AND a.id <> $3
       ORDER BY a.published_at DESC NULLS LAST
       LIMIT $4`,
      [
        article.categorySlug,
        article.subcategorySlug,
        article.id,
        4 - relatedList.length,
      ],
    );
    const seen = new Set(relatedList.map((a) => a.id));
    for (const r of fill.rows.map(mapPublic)) {
      if (!seen.has(r.id)) {
        relatedList.push(r);
        seen.add(r.id);
      }
    }
  }

  res.json({ article, related: relatedList });
});
