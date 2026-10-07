import { Router } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool";
import { BLOG_TAXONOMY, BLOG_TOPICS } from "../constants/blogTaxonomy";
import {
  isKnowledgeSection,
  isMuscleGroup,
  KNOWLEDGE_HUB_SLUG,
} from "../constants/knowledgeContent";
import { env } from "../config/env";
import { resolveRedirect } from "../services/urlRedirects";
import {
  mapExercise,
  mapKnowledgePage,
  mapRecipe,
} from "../utils/knowledgeMappers";
import { publicAuthRouter } from "./publicAuth.routes";
import { publicFoodsRouter } from "./publicFoods.routes";
import {
  publicBookmarksRouter,
  publicEngagementRouter,
  publicUpvotesRouter,
} from "./publicEngagement.routes";
import {
  publicCalcProfileRouter,
  publicCalcResultsRouter,
} from "./publicMemberCalc.routes";
import {
  mapPublicArticle,
  resolveRelatedArticles,
} from "./articles.routes";

export const publicRouter = Router();

publicRouter.use("/auth", publicAuthRouter);
publicRouter.use("/me/bookmarks", publicBookmarksRouter);
publicRouter.use("/me/upvotes", publicUpvotesRouter);
publicRouter.use("/me/calc-profile", publicCalcProfileRouter);
publicRouter.use("/me/calc-results", publicCalcResultsRouter);
publicRouter.use("/articles/:articleId/engagement", publicEngagementRouter);
publicRouter.use("/foods", publicFoodsRouter);

const ARTICLE_SELECT = `
  SELECT a.*,
    c.slug AS category_slug,
    c.label AS category_label,
    s.slug AS subcategory_slug,
    s.label AS subcategory_label,
    u.name AS author_name,
    u.slug AS author_slug,
    rev.name AS reviewer_name,
    rev.slug AS reviewer_slug
  FROM articles a
  LEFT JOIN categories c ON c.id = a.category_id
  LEFT JOIN subcategories s ON s.id = a.subcategory_id
  LEFT JOIN users u ON u.id = a.author_id
  LEFT JOIN users rev ON rev.id = a.reviewer_id
`;

function mapPublic(row: Record<string, unknown>) {
  return mapPublicArticle(row);
}

const VIEW_DEDUPE_MS = 30 * 60 * 1000;
const VIEW_DEDUPE_MAX = 50_000;
/** `${ip}:${articleId}` → last counted at. Per-instance; good enough to stop refresh spam. */
const recentViews = new Map<string, number>();

function shouldCountView(key: string): boolean {
  const now = Date.now();
  const last = recentViews.get(key);
  if (last && now - last < VIEW_DEDUPE_MS) return false;
  if (recentViews.size >= VIEW_DEDUPE_MAX) {
    for (const [k, t] of recentViews) {
      if (now - t >= VIEW_DEDUPE_MS) recentViews.delete(k);
    }
    if (recentViews.size >= VIEW_DEDUPE_MAX) recentViews.clear();
  }
  recentViews.set(key, now);
  return true;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

publicRouter.get("/redirects/resolve", async (req, res) => {
  const path =
    typeof req.query.path === "string" ? req.query.path : "";
  const to = await resolveRedirect(path);
  if (!to) {
    res.status(404).json({ message: "No redirect" });
    return;
  }
  res.json({ from: path, to });
});

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
  const summary = req.query.fields === "summary";
  const limit = Math.min(summary ? 500 : 100, Math.max(1, Number(req.query.limit) || 48));

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

  const articles = result.rows.map(mapPublic);
  if (summary) {
    res.json({
      articles: articles.map(({ body: _body, faq: _faq, sources: _sources, ...rest }) => rest),
    });
    return;
  }
  res.json({ articles });
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

  const article = mapPublic(row);
  const curated = await resolveRelatedArticles(
    article.relatedArticleNumbers as number[],
    String(article.id),
  );
  const related = await fillRelatedArticles(curated, {
    id: String(article.id),
    categorySlug: (article.categorySlug as string | null) ?? null,
    subcategorySlug: (article.subcategorySlug as string | null) ?? null,
  });
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

const RELATED_TARGET = 10;

/** Curated → same subcategory → same category, unique, up to RELATED_TARGET. */
async function fillRelatedArticles(
  curated: ReturnType<typeof mapPublic>[],
  article: {
    id: string;
    categorySlug: string | null;
    subcategorySlug: string | null;
  },
) {
  const relatedList = [...curated];
  const seen = new Set(relatedList.map((a) => a.id));

  async function appendFromQuery(sql: string, params: unknown[]) {
    if (relatedList.length >= RELATED_TARGET) return;
    const fill = await pool.query(sql, params);
    for (const r of fill.rows.map(mapPublic)) {
      if (seen.has(r.id)) continue;
      relatedList.push(r);
      seen.add(r.id);
      if (relatedList.length >= RELATED_TARGET) break;
    }
  }

  if (article.categorySlug && article.subcategorySlug) {
    await appendFromQuery(
      `${ARTICLE_SELECT}
       WHERE a.status = 'published' AND a.slug IS NOT NULL
         AND c.slug = $1 AND s.slug = $2 AND a.id <> $3
       ORDER BY a.published_at DESC NULLS LAST
       LIMIT $4`,
      [
        article.categorySlug,
        article.subcategorySlug,
        article.id,
        RELATED_TARGET - relatedList.length,
      ],
    );
  }

  if (relatedList.length < RELATED_TARGET && article.categorySlug) {
    await appendFromQuery(
      `${ARTICLE_SELECT}
       WHERE a.status = 'published' AND a.slug IS NOT NULL
         AND c.slug = $1 AND a.id <> $2
       ORDER BY a.published_at DESC NULLS LAST
       LIMIT $3`,
      [
        article.categorySlug,
        article.id,
        RELATED_TARGET - relatedList.length,
      ],
    );
  }

  return relatedList;
}

/** Staff preview — any status, no view increment, requires signed token. */
publicRouter.get("/articles/preview/:token", async (req, res) => {
  let articleId = "";
  try {
    const decoded = jwt.verify(req.params.token, env.jwtSecret) as {
      purpose?: string;
      articleId?: string;
    };
    if (decoded.purpose !== "article_preview" || !decoded.articleId) {
      res.status(401).json({ message: "Invalid preview token" });
      return;
    }
    articleId = decoded.articleId;
  } catch {
    res.status(401).json({ message: "Preview link expired or invalid" });
    return;
  }

  const result = await pool.query(`${ARTICLE_SELECT} WHERE a.id = $1 LIMIT 1`, [
    articleId,
  ]);
  const row = result.rows[0];
  if (!row) {
    res.status(404).json({ message: "Article not found" });
    return;
  }

  const article = mapPublic(row);
  const curated = await resolveRelatedArticles(
    (article.relatedArticleNumbers as number[]) ?? [],
    String(article.id),
  );
  const relatedList = await fillRelatedArticles(curated, {
    id: String(article.id),
    categorySlug: (article.categorySlug as string | null) ?? null,
    subcategorySlug: (article.subcategorySlug as string | null) ?? null,
  });

  res.json({ article, related: relatedList, preview: true });
});

/**
 * Counts a reader view. Called by the browser/app after the article renders, so
 * cached page builds, crawlers fetching HTML and server re-renders don't inflate it.
 */
publicRouter.post("/articles/:id/view", async (req, res) => {
  const id = req.params.id;
  if (!UUID_RE.test(id)) {
    res.status(400).json({ message: "Invalid article id" });
    return;
  }
  // The site proxies this call server-side, so it forwards the reader's IP.
  const forwarded = req.get("x-client-ip")?.trim().slice(0, 64);
  if (!shouldCountView(`${forwarded || req.ip || "unknown"}:${id}`)) {
    res.status(204).end();
    return;
  }
  await pool.query(
    `UPDATE articles SET views = views + 1 WHERE id = $1 AND status = 'published'`,
    [id],
  );
  res.status(204).end();
});

type PublicAuthorRow = {
  id: string;
  slug: string;
  name: string;
  bio: string;
  credentials: string;
  role: string;
  written: number;
  reviewed: number;
};

const AUTHOR_SELECT = `
  SELECT u.id, u.slug, u.name, u.bio, u.credentials, u.role,
    (SELECT COUNT(*)::int FROM articles a
      WHERE a.author_id = u.id AND a.status = 'published') AS written,
    (SELECT COUNT(*)::int FROM articles a
      WHERE a.reviewer_id = u.id AND a.status = 'published') AS reviewed
  FROM users u
`;

function mapAuthor(row: PublicAuthorRow) {
  return {
    slug: row.slug,
    name: row.name,
    bio: row.bio,
    credentials: row.credentials,
    role: row.role,
    writtenCount: row.written,
    reviewedCount: row.reviewed,
  };
}

/** Staff with at least one published article written or reviewed. */
publicRouter.get("/authors", async (_req, res) => {
  const result = await pool.query<PublicAuthorRow>(
    `SELECT * FROM (${AUTHOR_SELECT}
       WHERE u.is_active = TRUE AND u.slug IS NOT NULL) t
     WHERE t.written > 0 OR t.reviewed > 0
     ORDER BY t.written DESC, t.name ASC`,
  );
  res.json({ authors: result.rows.map(mapAuthor) });
});

publicRouter.get("/authors/:slug", async (req, res) => {
  const result = await pool.query<PublicAuthorRow>(
    `${AUTHOR_SELECT} WHERE u.slug = $1 AND u.is_active = TRUE LIMIT 1`,
    [req.params.slug],
  );
  const row = result.rows[0];
  if (!row || (row.written === 0 && row.reviewed === 0)) {
    res.status(404).json({ message: "Author not found" });
    return;
  }
  const [written, reviewed] = await Promise.all([
    pool.query(
      `${ARTICLE_SELECT}
       WHERE a.author_id = $1 AND a.status = 'published' AND a.slug IS NOT NULL
       ORDER BY a.published_at DESC NULLS LAST LIMIT 100`,
      [row.id],
    ),
    pool.query(
      `${ARTICLE_SELECT}
       WHERE a.reviewer_id = $1 AND a.status = 'published' AND a.slug IS NOT NULL
       ORDER BY a.published_at DESC NULLS LAST LIMIT 100`,
      [row.id],
    ),
  ]);
  const summarize = (r: Record<string, unknown>) => {
    const { body: _b, faq: _f, sources: _s, ...rest } = mapPublic(r);
    return rest;
  };
  res.json({
    author: mapAuthor(row),
    written: written.rows.map(summarize),
    reviewed: reviewed.rows.map(summarize),
  });
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

  const article = mapPublic(row);
  const curated = await resolveRelatedArticles(
    article.relatedArticleNumbers as number[],
    String(article.id),
  );

  const relatedList = await fillRelatedArticles(curated, {
    id: String(article.id),
    categorySlug: (article.categorySlug as string | null) ?? null,
    subcategorySlug: (article.subcategorySlug as string | null) ?? null,
  });

  res.json({ article, related: relatedList });
});

publicRouter.get("/exercises", async (req, res) => {
  const group =
    typeof req.query.group === "string" ? req.query.group : undefined;
  const params: unknown[] = ["published"];
  let where = `WHERE status = $1 AND robots_index = TRUE`;
  if (group && isMuscleGroup(group)) {
    params.push(group);
    where += ` AND muscle_group = $${params.length}`;
  }
  const result = await pool.query(
    `SELECT * FROM exercises ${where}
     ORDER BY muscle_group ASC, sort_order ASC, title ASC`,
    params,
  );
  res.json({ exercises: result.rows.map(mapExercise) });
});

publicRouter.get("/exercises/:group/:slug", async (req, res) => {
  const { group, slug } = req.params;
  if (!isMuscleGroup(group)) {
    res.status(404).json({ message: "Exercise group not found" });
    return;
  }
  const result = await pool.query(
    `SELECT * FROM exercises
     WHERE muscle_group = $1 AND slug = $2 AND status = 'published'
     LIMIT 1`,
    [group, slug],
  );
  if (!result.rows[0]) {
    res.status(404).json({ message: "Exercise not found" });
    return;
  }
  const related = await pool.query(
    `SELECT * FROM exercises
     WHERE muscle_group = $1 AND status = 'published' AND id <> $2
     ORDER BY sort_order ASC, title ASC
     LIMIT 6`,
    [group, result.rows[0].id],
  );
  res.json({
    exercise: mapExercise(result.rows[0]),
    related: related.rows.map(mapExercise),
  });
});

publicRouter.get("/recipes", async (_req, res) => {
  const result = await pool.query(
    `SELECT * FROM recipes
     WHERE status = 'published' AND robots_index = TRUE
     ORDER BY sort_order ASC, title ASC`,
  );
  res.json({ recipes: result.rows.map(mapRecipe) });
});

publicRouter.get("/recipes/:slug", async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM recipes
     WHERE slug = $1 AND status = 'published'
     LIMIT 1`,
    [req.params.slug],
  );
  if (!result.rows[0]) {
    res.status(404).json({ message: "Recipe not found" });
    return;
  }
  const related = await pool.query(
    `SELECT * FROM recipes
     WHERE status = 'published' AND id <> $1
     ORDER BY sort_order ASC, title ASC
     LIMIT 4`,
    [result.rows[0].id],
  );
  res.json({
    recipe: mapRecipe(result.rows[0]),
    related: related.rows.map(mapRecipe),
  });
});

publicRouter.get("/knowledge/:section", async (req, res) => {
  const section = req.params.section;
  if (!isKnowledgeSection(section)) {
    res.status(404).json({ message: "Section not found" });
    return;
  }
  const hub = await pool.query(
    `SELECT * FROM knowledge_pages
     WHERE section = $1 AND slug = $2 AND status = 'published'
     LIMIT 1`,
    [section, KNOWLEDGE_HUB_SLUG],
  );
  const pages = await pool.query(
    `SELECT * FROM knowledge_pages
     WHERE section = $1 AND status = 'published' AND slug <> $2
       AND robots_index = TRUE
     ORDER BY sort_order ASC, title ASC`,
    [section, KNOWLEDGE_HUB_SLUG],
  );
  res.json({
    hub: hub.rows[0] ? mapKnowledgePage(hub.rows[0]) : null,
    pages: pages.rows.map(mapKnowledgePage),
  });
});

publicRouter.get("/knowledge/:section/:slug", async (req, res) => {
  const { section, slug } = req.params;
  if (!isKnowledgeSection(section) || slug === KNOWLEDGE_HUB_SLUG) {
    res.status(404).json({ message: "Page not found" });
    return;
  }
  const result = await pool.query(
    `SELECT * FROM knowledge_pages
     WHERE section = $1 AND slug = $2 AND status = 'published'
     LIMIT 1`,
    [section, slug],
  );
  if (!result.rows[0]) {
    res.status(404).json({ message: "Page not found" });
    return;
  }
  const related = await pool.query(
    `SELECT * FROM knowledge_pages
     WHERE section = $1 AND status = 'published'
       AND slug <> $2 AND slug <> $3
     ORDER BY sort_order ASC, title ASC
     LIMIT 4`,
    [section, slug, KNOWLEDGE_HUB_SLUG],
  );
  res.json({
    page: mapKnowledgePage(result.rows[0]),
    related: related.rows.map(mapKnowledgePage),
  });
});
