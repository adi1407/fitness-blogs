import { apiFetch } from "@/lib/api/client";
import {
  BLOG_TAXONOMY,
  BLOG_TOPICS,
  type BlogCategoryDef,
} from "@/lib/blogTaxonomy";

export type ArticleFaqItem = { question: string; answer: string };
export type ArticleSourceItem = {
  title: string;
  url?: string;
  note?: string;
};

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
  relatedArticleNumbers: number[];
  faq: ArticleFaqItem[];
  sources: ArticleSourceItem[];
  metaTitle: string;
  metaDescription: string;
  publishedAt: string | null;
  updatedAt?: string;
  readingTime: number;
  featuredImage?: string;
  featuredImageAlt?: string;
  featuredImageCaption?: string;
  ogImage?: string;
  authorName?: string | null;
  reviewerName?: string | null;
  /** Present on preview payloads only. */
  status?: string;
  robotsIndex?: boolean;
  lastReviewedAt?: string | null;
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
  } catch (err) {
    console.error("[blog] fetchPublishedArticles failed", err);
    return [];
  }
}

export async function fetchPublishedArticleBySlug(
  slug: string,
): Promise<{ article: PublicBlogArticle; related: PublicBlogArticle[] } | null> {
  try {
    const data = await apiFetch<{
      article: PublicBlogArticle;
      related?: PublicBlogArticle[];
    }>(`/public/articles/${encodeURIComponent(slug)}`);
    if (!data.article) return null;
    return {
      article: {
        ...data.article,
        relatedArticleNumbers: data.article.relatedArticleNumbers ?? [],
        faq: data.article.faq ?? [],
        sources: data.article.sources ?? [],
      },
      related: data.related ?? [],
    };
  } catch {
    return null;
  }
}

/** Staff preview of any status via short-lived token. */
export async function fetchArticlePreview(
  token: string,
): Promise<{ article: PublicBlogArticle; related: PublicBlogArticle[] } | null> {
  try {
    const data = await apiFetch<{
      article: PublicBlogArticle;
      related?: PublicBlogArticle[];
    }>(`/public/articles/preview/${encodeURIComponent(token)}`);
    if (!data.article) return null;
    return {
      article: {
        ...data.article,
        relatedArticleNumbers: data.article.relatedArticleNumbers ?? [],
        faq: data.article.faq ?? [],
        sources: data.article.sources ?? [],
      },
      related: data.related ?? [],
    };
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

export function calculatorCtaForCategory(categorySlug: string | null): {
  href: string;
  label: string;
  blurb: string;
} | null {
  switch (categorySlug) {
    case "nutrition":
      return {
        href: "/tools/protein-calculator",
        label: "Protein calculator",
        blurb: "Estimate daily protein targets for your goal.",
      };
    case "weight-loss":
      return {
        href: "/tools/tdee-calculator",
        label: "TDEE calculator",
        blurb: "Estimate maintenance calories to plan a sustainable deficit.",
      };
    case "muscle-building":
      return {
        href: "/tools/macro-calculator",
        label: "Macro calculator",
        blurb: "Build a simple macro split around your training.",
      };
    default:
      return {
        href: "/tools",
        label: "Fitness calculators",
        blurb: "Free educational tools for calories, macros, and more.",
      };
  }
}
