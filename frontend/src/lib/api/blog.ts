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

type CalculatorCta = { href: string; label: string; blurb: string };

const CALC_CTA = {
  calorie: {
    href: "/calorie-calculator",
    label: "Calorie calculator",
    blurb: "Get a daily calorie target for losing, maintaining, or gaining weight.",
  },
  protein: {
    href: "/protein-calculator",
    label: "Protein calculator",
    blurb: "Estimate your daily protein target for your weight and goal.",
  },
  macro: {
    href: "/macro-calculator",
    label: "Macro calculator",
    blurb: "Split your calories into protein, carbs, and fat.",
  },
  all: {
    href: "/tools",
    label: "Fitness calculators",
    blurb: "Free educational tools for calories, macros, and more.",
  },
} satisfies Record<string, CalculatorCta>;

const CALC_BY_SUBCATEGORY: Record<string, CalculatorCta> = {
  protein: CALC_CTA.protein,
  "sports-nutrition": CALC_CTA.protein,
  "muscle-building-nutrition": CALC_CTA.protein,
  "muscle-growth-hypertrophy": CALC_CTA.protein,
  "training-programs": CALC_CTA.protein,
  "beginner-muscle-building": CALC_CTA.macro,
  hydration: CALC_CTA.calorie,
};

const CALC_BY_CATEGORY: Record<string, CalculatorCta> = {
  "weight-loss": CALC_CTA.calorie,
  "muscle-building": CALC_CTA.protein,
  nutrition: CALC_CTA.macro,
};

/** Most relevant calculator for an article: subcategory first, then category. */
export function calculatorCtaFor(
  categorySlug: string | null,
  subcategorySlug?: string | null,
): CalculatorCta {
  return (
    (subcategorySlug && CALC_BY_SUBCATEGORY[subcategorySlug]) ||
    (categorySlug && CALC_BY_CATEGORY[categorySlug]) ||
    CALC_CTA.all
  );
}
