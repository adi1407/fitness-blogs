import { apiFetch } from "@/lib/api/client";
import {
  BLOG_TAXONOMY,
  BLOG_TOPICS,
  type BlogCategoryDef,
} from "@/lib/blogTaxonomy";

export type PublicBlogArticle = {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string;
  body: string;
  quickAnswer: string;
  categorySlug: string | null;
  subcategorySlug: string | null;
  categoryLabel: string | null;
  subcategoryLabel: string | null;
  path: string | null;
  tags: string[];
  topics: string[];
  views: number;
  articleNumber: number | null;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string | null;
  readingTime: number;
  featuredImage?: string;
  ogImage?: string;
};

export type PublicTaxonomyCategory = {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  subcategories: { id: string; slug: string; label: string }[];
};

export type PublicTaxonomy = {
  categories: PublicTaxonomyCategory[];
  topics: string[];
};

function staticTaxonomyFallback(): PublicTaxonomy {
  return {
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
  };
}

/** Map API/static taxonomy into the shared BlogCategoryDef shape. */
export function toBlogCategoryDefs(
  taxonomy: PublicTaxonomy,
): BlogCategoryDef[] {
  return taxonomy.categories.map((c) => ({
    slug: c.slug as BlogCategoryDef["slug"],
    label: c.label,
    description: c.description ?? "",
    subcategories: c.subcategories.map((s) => ({
      slug: s.slug,
      label: s.label,
    })),
  }));
}

export async function fetchPublicTaxonomy(): Promise<PublicTaxonomy> {
  try {
    const data = await apiFetch<PublicTaxonomy>("/public/taxonomy");
    if (!data.categories?.length) return staticTaxonomyFallback();
    return data;
  } catch {
    return staticTaxonomyFallback();
  }
}

export async function fetchPublishedArticles(opts?: {
  category?: string;
  subcategory?: string;
  limit?: number;
}): Promise<PublicBlogArticle[]> {
  const params = new URLSearchParams();
  if (opts?.category) params.set("category", opts.category);
  if (opts?.subcategory) params.set("subcategory", opts.subcategory);
  params.set("limit", String(opts?.limit ?? 48));

  try {
    const data = await apiFetch<{ articles: PublicBlogArticle[] }>(
      `/public/articles?${params.toString()}`,
    );
    return data.articles ?? [];
  } catch {
    return [];
  }
}

export async function fetchPublishedArticleBySlug(
  slug: string,
): Promise<PublicBlogArticle | null> {
  try {
    const data = await apiFetch<{ article: PublicBlogArticle }>(
      `/public/articles/${encodeURIComponent(slug)}`,
    );
    return data.article ?? null;
  } catch {
    return null;
  }
}

export async function fetchPublishedArticleByNumber(
  articleNumber: number,
): Promise<PublicBlogArticle | null> {
  try {
    const data = await apiFetch<{ article: PublicBlogArticle }>(
      `/public/articles/by-number/${articleNumber}`,
    );
    return data.article ?? null;
  } catch {
    return null;
  }
}
