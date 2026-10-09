import type { MetadataRoute } from "next";
import { CALCULATOR_CONTENT } from "@/features/tools/content/registry";
import { MUSCLE_GROUPS } from "@/lib/api/knowledge";
import { getPublicSiteUrl } from "@/lib/siteUrl";

/**
 * Served from the CDN and regenerated in the background at most hourly, so a
 * slow or sleeping API never turns a crawler request into a 500.
 */
export const revalidate = 3600;

const API_TIMEOUT_MS = 15_000;

type PathItem = {
  path?: string | null;
  robotsIndex?: boolean;
  updatedAt?: string | null;
};

type ArticleItem = PathItem & {
  categorySlug?: string | null;
  subcategorySlug?: string | null;
  slug?: string | null;
  articleNumber?: number | null;
  publishedAt?: string | null;
};

const STATIC_PATHS = [
  "",
  "/blog",
  "/nutrition",
  "/nutrition/protein",
  "/nutrition/calories",
  "/weight-loss",
  "/muscle-building",
  "/training",
  "/tools",
  "/protein-calculator",
  "/tdee-calculator",
  "/calorie-calculator",
  "/macro-calculator",
  "/bmr-calculator",
  "/bmi-calculator",
  "/calorie-deficit-calculator",
  "/body-fat-calculator",
  "/one-rep-max-calculator",
  "/water-intake-calculator",
  "/steps-to-calories-calculator",
  "/exercises",
  "/foods",
  "/foods/indian",
  "/recipes",
  "/programs",
  "/reviews",
];

const TRUST_PATHS = [
  "/about",
  "/editorial-policy",
  "/medical-disclaimer",
  "/nutrition-disclaimer",
  "/terms",
  "/privacy",
  "/cookie-policy",
  "/affiliate-disclosure",
  "/corrections",
  "/contact",
];

/** Money pages: pillar hubs, the calculator directory and every calculator. */
const PRIORITY_PATHS = new Set([
  "/nutrition",
  "/nutrition/protein",
  "/nutrition/calories",
  "/weight-loss",
  "/muscle-building",
  "/tools",
  ...Object.keys(CALCULATOR_CONTENT),
]);

function safeDate(value?: string | null): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

async function fetchApi<T>(path: string): Promise<T | null> {
  const base = (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
  ).replace(/\/$/, "");
  if (!base) return null;

  try {
    const res = await fetch(`${base}${path}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function articlePath(a: ArticleItem): string | null {
  if (a.path) return a.path;
  if (!a.categorySlug || !a.subcategorySlug || !a.slug) return null;
  const base = `/blog/${a.categorySlug}/${a.subcategorySlug}/${a.slug}`;
  return a.articleNumber ? `${base}/${a.articleNumber}` : base;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getPublicSiteUrl();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  /** `lastModified` is omitted when unknown: a fake "now" on every rebuild teaches Google to ignore it. */
  const add = (
    path: string,
    priority: number,
    changeFrequency: "daily" | "weekly" | "monthly",
    lastModified?: Date,
  ) => {
    const url = `${siteUrl}${path}`;
    if (seen.has(url)) return;
    seen.add(url);
    entries.push({ url, changeFrequency, priority, ...(lastModified ? { lastModified } : {}) });
  };

  for (const path of STATIC_PATHS) {
    if (path === "" || path === "/blog") {
      add(path, path === "" ? 1 : 0.95, "daily", now);
      continue;
    }
    const calc = CALCULATOR_CONTENT[path];
    add(path, PRIORITY_PATHS.has(path) ? 0.9 : 0.7, "weekly", safeDate(calc?.updated));
  }
  TRUST_PATHS.forEach((path) => add(path, 0.3, "monthly"));
  MUSCLE_GROUPS.forEach((g) => add(`/exercises/${g}`, 0.7, "weekly"));

  const [articles, exercises, recipes, programs, reviews, foods, authors] = await Promise.all([
    fetchApi<{ articles?: ArticleItem[] }>("/public/articles?limit=500&fields=summary"),
    fetchApi<{ exercises?: PathItem[] }>("/public/exercises"),
    fetchApi<{ recipes?: PathItem[] }>("/public/recipes"),
    fetchApi<{ pages?: PathItem[] }>("/public/knowledge/programs"),
    fetchApi<{ pages?: PathItem[] }>("/public/knowledge/reviews"),
    fetchApi<{ foods?: { slug: string; updatedAt?: string | null }[] }>("/public/foods"),
    fetchApi<{ authors?: { slug: string }[] }>("/public/authors"),
  ]);

  const subcategories = new Set<string>();
  for (const a of articles?.articles ?? []) {
    if (a.robotsIndex === false) continue;
    const path = articlePath(a);
    if (!path) continue;
    if (a.categorySlug && a.subcategorySlug) {
      subcategories.add(`/blog/${a.categorySlug}/${a.subcategorySlug}`);
    }
    add(path, 0.8, "weekly", safeDate(a.updatedAt ?? a.publishedAt));
  }
  subcategories.forEach((path) => add(path, 0.75, "weekly"));

  const addItems = (items: PathItem[] | undefined, priority: number) => {
    for (const item of items ?? []) {
      if (item.robotsIndex === false || !item.path) continue;
      add(item.path, priority, "weekly", safeDate(item.updatedAt));
    }
  };
  addItems(exercises?.exercises, 0.75);
  addItems(recipes?.recipes, 0.7);
  addItems(programs?.pages, 0.7);
  addItems(reviews?.pages, 0.7);
  for (const f of foods?.foods ?? []) {
    add(`/foods/${f.slug}`, 0.75, "weekly", safeDate(f.updatedAt));
  }
  if (authors?.authors?.length) {
    add("/authors", 0.4, "monthly");
    for (const a of authors.authors) add(`/authors/${a.slug}`, 0.4, "monthly");
  }

  return entries;
}
