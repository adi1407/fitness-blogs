import { apiFetch } from "@/lib/api/client";
import type { PublicBlogArticle } from "@/lib/api/blog";
import type { LearnArticle, LearnCategory } from "../data/learnArticles";

import { HUB } from "@/lib/hubImages";

const FALLBACK_IMG = HUB.gymInterior;

function toLearnCategory(
  categorySlug: string | null,
): Exclude<LearnCategory, "all"> {
  switch (categorySlug) {
    case "nutrition":
      return "protein";
    case "weight-loss":
      return "weight-loss";
    case "muscle-building":
      return "muscle-building";
    default:
      return "protein";
  }
}

export function mapPublicArticleToLearn(
  a: PublicBlogArticle,
): LearnArticle | null {
  if (!a.slug || !a.path) return null;
  return {
    id: `cms-${a.id}`,
    category: toLearnCategory(a.categorySlug),
    subcategory: a.subcategorySlug ?? a.categorySlug ?? "general",
    src: a.featuredImage || a.ogImage || FALLBACK_IMG,
    alt: a.title,
    content: a.excerpt || a.title,
    linkHref: a.path,
    linkText: "Read article",
  };
}

/** Published CMS articles for /learn — empty array if API is down. */
export async function fetchPublishedLearnArticles(): Promise<LearnArticle[]> {
  try {
    const data = await apiFetch<{ articles: PublicBlogArticle[] }>(
      "/public/articles?limit=48",
    );
    return data.articles
      .map(mapPublicArticleToLearn)
      .filter((a): a is LearnArticle => a !== null);
  } catch {
    return [];
  }
}
