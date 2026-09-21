import { Router } from "express";
import { pool } from "../db/pool";
import { optionalMember, requireMember } from "../middleware/memberAuth";

export const publicEngagementRouter = Router({ mergeParams: true });

async function articleExists(articleId: string) {
  const result = await pool.query(
    `SELECT id FROM articles WHERE id = $1 AND status = 'published' LIMIT 1`,
    [articleId],
  );
  return Boolean(result.rowCount);
}

/** GET engagement summary (upvote count + member state if signed in). */
publicEngagementRouter.get("/", optionalMember, async (req, res) => {
  const articleId = String(req.params.articleId || "");
  if (!(await articleExists(articleId))) {
    res.status(404).json({ message: "Article not found" });
    return;
  }

  const countRes = await pool.query(
    `SELECT COUNT(*)::int AS c FROM member_article_upvotes WHERE article_id = $1`,
    [articleId],
  );
  const upvoteCount = countRes.rows[0]?.c ?? 0;

  let upvoted = false;
  let bookmarked = false;
  if (req.member) {
    const state = await pool.query(
      `SELECT
         EXISTS(
           SELECT 1 FROM member_article_upvotes
           WHERE member_id = $1 AND article_id = $2
         ) AS upvoted,
         EXISTS(
           SELECT 1 FROM member_article_bookmarks
           WHERE member_id = $1 AND article_id = $2
         ) AS bookmarked`,
      [req.member.id, articleId],
    );
    upvoted = Boolean(state.rows[0]?.upvoted);
    bookmarked = Boolean(state.rows[0]?.bookmarked);
  }

  res.json({ upvoteCount, upvoted, bookmarked });
});

publicEngagementRouter.post("/upvote", requireMember, async (req, res) => {
  const articleId = String(req.params.articleId || "");
  if (!(await articleExists(articleId))) {
    res.status(404).json({ message: "Article not found" });
    return;
  }

  await pool.query(
    `INSERT INTO member_article_upvotes (member_id, article_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [req.member!.id, articleId],
  );

  const countRes = await pool.query(
    `SELECT COUNT(*)::int AS c FROM member_article_upvotes WHERE article_id = $1`,
    [articleId],
  );
  res.json({
    upvoted: true,
    upvoteCount: countRes.rows[0]?.c ?? 0,
  });
});

publicEngagementRouter.delete("/upvote", requireMember, async (req, res) => {
  const articleId = String(req.params.articleId || "");
  await pool.query(
    `DELETE FROM member_article_upvotes WHERE member_id = $1 AND article_id = $2`,
    [req.member!.id, articleId],
  );
  const countRes = await pool.query(
    `SELECT COUNT(*)::int AS c FROM member_article_upvotes WHERE article_id = $1`,
    [articleId],
  );
  res.json({
    upvoted: false,
    upvoteCount: countRes.rows[0]?.c ?? 0,
  });
});

publicEngagementRouter.post("/bookmark", requireMember, async (req, res) => {
  const articleId = String(req.params.articleId || "");
  if (!(await articleExists(articleId))) {
    res.status(404).json({ message: "Article not found" });
    return;
  }

  await pool.query(
    `INSERT INTO member_article_bookmarks (member_id, article_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [req.member!.id, articleId],
  );
  res.json({ bookmarked: true });
});

publicEngagementRouter.delete("/bookmark", requireMember, async (req, res) => {
  const articleId = String(req.params.articleId || "");
  await pool.query(
    `DELETE FROM member_article_bookmarks
     WHERE member_id = $1 AND article_id = $2`,
    [req.member!.id, articleId],
  );
  res.json({ bookmarked: false });
});

/** List bookmarked articles for the signed-in member. */
export const publicBookmarksRouter = Router();

publicBookmarksRouter.get("/", requireMember, async (req, res) => {
  const result = await pool.query(
    `SELECT a.id, a.title, a.slug, a.excerpt, a.article_number,
            a.published_at, a.featured_image,
            c.slug AS category_slug, s.slug AS subcategory_slug,
            b.created_at AS bookmarked_at
     FROM member_article_bookmarks b
     JOIN articles a ON a.id = b.article_id
     LEFT JOIN categories c ON c.id = a.category_id
     LEFT JOIN subcategories s ON s.id = a.subcategory_id
     WHERE b.member_id = $1 AND a.status = 'published'
     ORDER BY b.created_at DESC
     LIMIT 100`,
    [req.member!.id],
  );

  res.json({
    bookmarks: result.rows.map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      excerpt: r.excerpt ?? "",
      articleNumber: r.article_number,
      publishedAt: r.published_at,
      featuredImage: r.featured_image ?? "",
      categorySlug: r.category_slug,
      subcategorySlug: r.subcategory_slug,
      path:
        r.category_slug && r.subcategory_slug && r.slug
          ? `/blog/${r.category_slug}/${r.subcategory_slug}/${r.slug}`
          : r.article_number
            ? `/blog/${r.article_number}`
            : null,
      bookmarkedAt: r.bookmarked_at,
    })),
  });
});
