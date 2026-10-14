import { PILLAR_REVALIDATE_SECONDS } from "@/features/blog/components/PillarGuides";
import { fetchPublishedArticles } from "@/lib/api/blog";

type LinkedArticle = { slug: string; href: string };

/**
 * Returns a predicate for hub pages that hard-link cluster articles: true when the
 * article is published, so queued drafts don't ship as 404 links. Uses the same
 * request as `PillarGuides`, so Next dedupes it. If the API is unreachable every
 * link is kept rather than stripping the page bare.
 */
export async function publishedFilter(
  categories: string[],
): Promise<(article: LinkedArticle) => boolean> {
  const lists = await Promise.all(
    categories.map((category) =>
      fetchPublishedArticles({
        category,
        limit: 200,
        summary: true,
        revalidate: PILLAR_REVALIDATE_SECONDS,
      }),
    ),
  );
  if (lists.some((list) => list.length === 0)) return () => true;
  const live = new Set(lists.flat().map((a) => a.slug));
  return (article) => live.has(article.slug);
}
