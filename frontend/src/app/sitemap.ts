import type { MetadataRoute } from "next";
import { BLOG_TAXONOMY } from "@/lib/blogTaxonomy";
import { fetchPublishedArticles } from "@/lib/api/blog";
import {
  fetchExercises,
  fetchKnowledgeSection,
  fetchRecipes,
  MUSCLE_GROUPS,
} from "@/lib/api/knowledge";
import { getPublicSiteUrl } from "@/lib/siteUrl";

/** Cache sitemap so Google/Search Console hit a fast response, not a cold API fan-out. */
export const revalidate = 3600;

function safeDate(value?: string | null): Date {
  if (!value) return new Date();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("sitemap fetch timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getPublicSiteUrl();

  const paths = [
    "",
    "/blog",
    "/nutrition",
    "/nutrition/protein",
    "/weight-loss",
    "/muscle-building",
    "/training",
    "/tools",
    "/tools/protein-calculator",
    "/tools/tdee-calculator",
    "/tools/calorie-calculator",
    "/tools/macro-calculator",
    "/tools/bmr-calculator",
    "/tools/bmi-calculator",
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

  const blogCategoryPaths = BLOG_TAXONOMY.map((c) => `/blog/${c.slug}`);
  const exerciseGroupPaths = MUSCLE_GROUPS.map((g) => `/exercises/${g}`);

  const staticEntries: MetadataRoute.Sitemap = [
    ...paths,
    ...exerciseGroupPaths,
  ].map((path, index) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === "" || path === "/blog"
      ? "daily"
      : "weekly") as "daily" | "weekly",
    priority: path === "" ? 1 : path === "/blog" ? 0.95 : index < 6 ? 0.9 : 0.7,
  }));

  const blogCategoryEntries: MetadataRoute.Sitemap = blogCategoryPaths.map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    }),
  );

  let articleEntries: MetadataRoute.Sitemap = [];
  let subcategoryEntries: MetadataRoute.Sitemap = [];
  let exerciseEntries: MetadataRoute.Sitemap = [];
  let recipeEntries: MetadataRoute.Sitemap = [];
  let knowledgeEntries: MetadataRoute.Sitemap = [];

  try {
    const articles = await withTimeout(
      fetchPublishedArticles({ limit: 500 }),
      8_000,
    );
    const subcatsWithContent = new Set<string>();

    articleEntries = articles
      .filter((a) => a.path || (a.categorySlug && a.subcategorySlug && a.slug))
      .map((a) => {
        const path =
          a.path ??
          (a.categorySlug && a.subcategorySlug && a.slug && a.articleNumber
            ? `/blog/${a.categorySlug}/${a.subcategorySlug}/${a.slug}/${a.articleNumber}`
            : a.categorySlug && a.subcategorySlug && a.slug
              ? `/blog/${a.categorySlug}/${a.subcategorySlug}/${a.slug}`
              : null);
        if (!path) return null;
        if (a.categorySlug && a.subcategorySlug) {
          subcatsWithContent.add(`${a.categorySlug}/${a.subcategorySlug}`);
        }
        return {
          url: `${siteUrl}${path}`,
          lastModified: safeDate(a.updatedAt ?? a.publishedAt),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        };
      })
      .filter((e): e is NonNullable<typeof e> => e != null);

    subcategoryEntries = [...subcatsWithContent].map((key) => ({
      url: `${siteUrl}/blog/${key}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));
  } catch {
    /* API unavailable — keep static URLs */
  }

  try {
    const exercises = await withTimeout(fetchExercises(), 8_000);
    exerciseEntries = exercises
      .filter((e) => e.robotsIndex !== false && e.path)
      .map((e) => ({
        url: `${siteUrl}${e.path}`,
        lastModified: safeDate(e.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.75,
      }));
  } catch {
    /* ignore */
  }

  try {
    const recipes = await withTimeout(fetchRecipes(), 8_000);
    recipeEntries = recipes
      .filter((r) => r.robotsIndex !== false && r.path)
      .map((r) => ({
        url: `${siteUrl}${r.path}`,
        lastModified: safeDate(r.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch {
    /* ignore */
  }

  try {
    for (const section of ["programs", "reviews"] as const) {
      const { pages } = await withTimeout(
        fetchKnowledgeSection(section),
        8_000,
      );
      for (const p of pages) {
        if (p.robotsIndex === false || !p.path) continue;
        knowledgeEntries.push({
          url: `${siteUrl}${p.path}`,
          lastModified: safeDate(p.updatedAt),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch {
    /* ignore */
  }

  return [
    ...staticEntries,
    ...blogCategoryEntries,
    ...subcategoryEntries,
    ...articleEntries,
    ...exerciseEntries,
    ...recipeEntries,
    ...knowledgeEntries,
  ];
}
