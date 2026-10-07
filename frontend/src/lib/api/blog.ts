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
  primaryKeyword?: string | null;
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
  /** Omit body/faq/sources (listing pages only need card fields). */
  summary?: boolean;
  /** Seconds to cache (ISR). Omit for an uncached, always-fresh fetch. */
  revalidate?: number;
}): Promise<PublicBlogArticle[]> {
  const params = new URLSearchParams();
  if (opts?.category) params.set("category", opts.category);
  if (opts?.subcategory) params.set("subcategory", opts.subcategory);
  if (opts?.summary) params.set("fields", "summary");
  params.set("limit", String(opts?.limit ?? 48));

  try {
    const data = await apiFetch<{ articles: PublicBlogArticle[] }>(
      `/public/articles?${params.toString()}`,
      opts?.revalidate != null
        ? { next: { revalidate: opts.revalidate, tags: ["articles"] } }
        : undefined,
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
  deficit: {
    href: "/calorie-deficit-calculator",
    label: "Calorie deficit calculator",
    blurb: "Get the daily calories that reach your goal weight on a safe timeline.",
  },
  tdee: {
    href: "/tdee-calculator",
    label: "TDEE calculator",
    blurb: "Find your maintenance calories — the starting point for any fat-loss plan.",
  },
  bmr: {
    href: "/bmr-calculator",
    label: "BMR calculator",
    blurb: "See how many calories your body burns at complete rest.",
  },
  bodyFat: {
    href: "/body-fat-calculator",
    label: "Body fat calculator",
    blurb: "Estimate body fat % with a tape measure and track real progress.",
  },
  oneRepMax: {
    href: "/one-rep-max-calculator",
    label: "One rep max calculator",
    blurb: "Estimate your 1RM and get working weights for every rep range.",
  },
  water: {
    href: "/water-intake-calculator",
    label: "Water intake calculator",
    blurb: "Get a daily water target for your weight, training and climate.",
  },
  steps: {
    href: "/steps-to-calories-calculator",
    label: "Steps to calories calculator",
    blurb: "Turn your daily steps into distance and calories burned.",
  },
  all: {
    href: "/tools",
    label: "Fitness calculators",
    blurb: "Free educational tools for calories, macros, and more.",
  },
} satisfies Record<string, CalculatorCta>;

const CALC_BY_SUBCATEGORY: Record<string, CalculatorCta> = {
  // Muscle building
  "muscle-growth-hypertrophy": CALC_CTA.protein,
  bulking: CALC_CTA.calorie,
  "muscle-building-nutrition": CALC_CTA.protein,
  "strength-performance": CALC_CTA.oneRepMax,
  "training-programs": CALC_CTA.oneRepMax,
  "beginner-muscle-building": CALC_CTA.macro,
  "advanced-muscle-building": CALC_CTA.oneRepMax,
  "recovery-muscle-growth": CALC_CTA.protein,
  "muscle-building-mistakes": CALC_CTA.protein,
  "muscle-building-science": CALC_CTA.protein,
  // Weight loss
  "fat-loss-basics": CALC_CTA.tdee,
  "calorie-deficit": CALC_CTA.deficit,
  "weight-loss-nutrition": CALC_CTA.calorie,
  "diet-meal-planning": CALC_CTA.macro,
  "cardio-weight-loss": CALC_CTA.steps,
  "strength-training-weight-loss": CALC_CTA.bodyFat,
  "walking-daily-activity": CALC_CTA.steps,
  "intermittent-fasting": CALC_CTA.calorie,
  "beginner-weight-loss": CALC_CTA.deficit,
  "weight-loss-plateaus": CALC_CTA.tdee,
  "sustainable-weight-loss": CALC_CTA.deficit,
  "weight-loss-mistakes": CALC_CTA.tdee,
  "weight-loss-myths": CALC_CTA.calorie,
  "weight-maintenance": CALC_CTA.tdee,
  // Nutrition
  "nutrition-basics": CALC_CTA.macro,
  "calories-energy": CALC_CTA.bmr,
  protein: CALC_CTA.protein,
  carbohydrates: CALC_CTA.macro,
  "dietary-fats": CALC_CTA.macro,
  "meal-planning": CALC_CTA.macro,
  hydration: CALC_CTA.water,
  "sports-nutrition": CALC_CTA.protein,
  "pre-workout-nutrition": CALC_CTA.protein,
  "post-workout-nutrition": CALC_CTA.protein,
  "food-labels-portions": CALC_CTA.calorie,
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
