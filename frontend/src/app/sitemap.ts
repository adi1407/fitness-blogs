import type { MetadataRoute } from "next";
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

function safeDate(value?: string | null): Date {
  if (!value) return new Date();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
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

  const add = (
    path: string,
    priority: number,
    changeFrequency: "daily" | "weekly",
    lastModified: Date = now,
  ) => {
    const url = `${siteUrl}${path}`;
    if (seen.has(url)) return;
    seen.add(url);
    entries.push({ url, lastModified, changeFrequency, priority });
  };

  STATIC_PATHS.forEach((path, index) => {
    const daily = path === "" || path === "/blog";
    const priority =
      path === "" ? 1 : path === "/blog" ? 0.95 : index < 6 ? 0.9 : 0.7;
    add(path, priority, daily ? "daily" : "weekly");
  });
  MUSCLE_GROUPS.forEach((g) => add(`/exercises/${g}`, 0.7, "weekly"));

  const [articles, exercises, recipes, programs, reviews, foods] = await Promise.all([
    fetchApi<{ articles?: ArticleItem[] }>("/public/articles?limit=500&fields=summary"),
    fetchApi<{ exercises?: PathItem[] }>("/public/exercises"),
    fetchApi<{ recipes?: PathItem[] }>("/public/recipes"),
    fetchApi<{ pages?: PathItem[] }>("/public/knowledge/programs"),
    fetchApi<{ pages?: PathItem[] }>("/public/knowledge/reviews"),
    fetchApi<{ foods?: { slug: string; updatedAt?: string | null }[] }>("/public/foods"),
  ]);

  const subcategories = new Set<string>();
  for (const a of articles?.articles ?? []) {
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

  return entries;
}
