import { pool } from "../db/pool";
import { blogArticlePath } from "../constants/blogTaxonomy";

/**
 * Matches article links that are missing the trailing article number:
 * `/blog/{category}/{subcategory}/{slug}` (optionally absolute on fitlives.in,
 * with a trailing slash or #anchor). Numbered links have a 4th path segment
 * and never match.
 */
const UNNUMBERED_ARTICLE_HREF =
  /href="(?:https?:\/\/(?:www\.)?fitlives\.in)?\/blog\/[a-z0-9-]+\/[a-z0-9-]+\/([a-z0-9-]+)\/?(#[^"]*)?"/gi;

type Target = {
  category_slug: string;
  subcategory_slug: string;
  article_number: number;
};

async function lookupTargets(slugs: string[]): Promise<Map<string, Target>> {
  if (!slugs.length) return new Map();
  const res = await pool.query<Target & { slug: string }>(
    `SELECT a.slug, c.slug AS category_slug, s.slug AS subcategory_slug, a.article_number
     FROM articles a
     JOIN categories c ON c.id = a.category_id
     JOIN subcategories s ON s.id = a.subcategory_id
     WHERE a.slug = ANY($1::text[])
       AND a.status = 'published'
       AND a.article_number IS NOT NULL`,
    [slugs],
  );
  return new Map(res.rows.map((r) => [r.slug, r]));
}

/**
 * Point internal article links at the canonical numbered URL so readers and
 * crawlers skip the un-numbered duplicate. Links to unknown or unpublished
 * slugs are left untouched.
 */
export async function normalizeArticleLinks(html: string): Promise<string> {
  if (!html || !html.includes("/blog/")) return html;
  const slugs = [
    ...new Set(
      [...html.matchAll(UNNUMBERED_ARTICLE_HREF)].map((m) => m[1].toLowerCase()),
    ),
  ];
  const targets = await lookupTargets(slugs);
  if (!targets.size) return html;

  return html.replace(UNNUMBERED_ARTICLE_HREF, (full, slug: string, hash?: string) => {
    const t = targets.get(slug.toLowerCase());
    if (!t) return full;
    const path = blogArticlePath(
      t.category_slug,
      t.subcategory_slug,
      slug.toLowerCase(),
      Number(t.article_number),
    );
    return `href="${path}${hash ?? ""}"`;
  });
}

const ANCHOR = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
const ARTICLE_HREF_SLUG =
  /\bhref="(?:https?:\/\/(?:www\.)?fitlives\.in)?\/blog\/[a-z0-9-]+\/[a-z0-9-]+\/([a-z0-9-]+)(?:\/\d+)?\/?(?:#[^"]*)?"/i;

/**
 * Serve-time guard: unwrap links to articles that are not published (draft,
 * in review, unpublished), keeping the link text, so live pages never point
 * at a 404. The stored body is untouched, so links return on republish.
 */
export async function unlinkUnpublishedArticles(html: string): Promise<string> {
  if (!html || !html.includes("/blog/")) return html;
  const slugs = new Set<string>();
  for (const [, attrs] of html.matchAll(ANCHOR)) {
    const slug = attrs.match(ARTICLE_HREF_SLUG)?.[1];
    if (slug) slugs.add(slug.toLowerCase());
  }
  if (!slugs.size) return html;

  const res = await pool.query<{ slug: string }>(
    `SELECT slug FROM articles WHERE slug = ANY($1::text[]) AND status = 'published'`,
    [[...slugs]],
  );
  const published = new Set(res.rows.map((r) => r.slug));
  if (published.size === slugs.size) return html;

  return html.replace(ANCHOR, (full, attrs: string, inner: string) => {
    const slug = attrs.match(ARTICLE_HREF_SLUG)?.[1]?.toLowerCase();
    return slug && !published.has(slug) ? inner : full;
  });
}

/** Boot-time pass over every article body. Idempotent; leaves `updated_at` alone. */
export async function normalizeAllArticleLinks(): Promise<void> {
  const res = await pool.query<{ id: string; body: string }>(
    `SELECT id, body FROM articles WHERE body LIKE '%/blog/%'`,
  );
  let updated = 0;
  for (const row of res.rows) {
    const next = await normalizeArticleLinks(row.body);
    if (next === row.body) continue;
    await pool.query(`UPDATE articles SET body = $1 WHERE id = $2`, [next, row.id]);
    updated++;
  }
  console.log(`[db] internal links: ${updated} article bodies normalized`);
}
