import { BLOG_TAXONOMY } from "@/lib/blogTaxonomy";
import { getPublicSiteUrl } from "@/lib/siteUrl";
import { MUSCLE_GROUPS } from "@/lib/api/knowledge";

export const runtime = "nodejs";
export const revalidate = 3600;

type SitemapRow = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toLastmod(value?: string | null): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

function xmlFor(rows: SitemapRow[]): string {
  const body = rows
    .map((row) => {
      const parts = [`<loc>${escapeXml(row.loc)}</loc>`];
      if (row.lastmod) parts.push(`<lastmod>${row.lastmod}</lastmod>`);
      if (row.changefreq) {
        parts.push(`<changefreq>${row.changefreq}</changefreq>`);
      }
      if (row.priority) parts.push(`<priority>${row.priority}</priority>`);
      return `<url>${parts.join("")}</url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>\n`;
}

function staticRows(siteUrl: string): SitemapRow[] {
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
    ...BLOG_TAXONOMY.map((c) => `/blog/${c.slug}`),
    ...MUSCLE_GROUPS.map((g) => `/exercises/${g}`),
  ];

  const now = new Date().toISOString();
  return paths.map((path, index) => ({
    loc: `${siteUrl}${path}`,
    lastmod: now,
    changefreq: path === "" || path === "/blog" ? "daily" : "weekly",
    priority:
      path === ""
        ? "1.0"
        : path === "/blog"
          ? "0.95"
          : index < 6
            ? "0.9"
            : "0.7",
  }));
}

async function fetchJson<T>(
  path: string,
  timeoutMs: number,
): Promise<T | null> {
  const base = (
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
  ).replace(/\/$/, "");
  if (!base) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${base}${path}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function buildRows(): Promise<SitemapRow[]> {
  const siteUrl = getPublicSiteUrl();
  const rows = staticRows(siteUrl);
  const seen = new Set(rows.map((r) => r.loc));

  const push = (row: SitemapRow) => {
    if (seen.has(row.loc)) return;
    seen.add(row.loc);
    rows.push(row);
  };

  // Short timeout so a cold Render API cannot 500 the whole sitemap for Google.
  const articlesPayload = await fetchJson<{
    articles?: Array<{
      path?: string | null;
      categorySlug?: string | null;
      subcategorySlug?: string | null;
      slug?: string | null;
      articleNumber?: number | null;
      updatedAt?: string | null;
      publishedAt?: string | null;
    }>;
  }>("/public/articles?limit=500", 2500);

  const subcats = new Set<string>();
  for (const a of articlesPayload?.articles ?? []) {
    const path =
      a.path ??
      (a.categorySlug && a.subcategorySlug && a.slug && a.articleNumber
        ? `/blog/${a.categorySlug}/${a.subcategorySlug}/${a.slug}/${a.articleNumber}`
        : a.categorySlug && a.subcategorySlug && a.slug
          ? `/blog/${a.categorySlug}/${a.subcategorySlug}/${a.slug}`
          : null);
    if (!path) continue;
    if (a.categorySlug && a.subcategorySlug) {
      subcats.add(`${a.categorySlug}/${a.subcategorySlug}`);
    }
    push({
      loc: `${siteUrl}${path}`,
      lastmod: toLastmod(a.updatedAt ?? a.publishedAt),
      changefreq: "weekly",
      priority: "0.8",
    });
  }
  for (const key of subcats) {
    push({
      loc: `${siteUrl}/blog/${key}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: "0.75",
    });
  }

  const exercisesPayload = await fetchJson<{
    exercises?: Array<{
      path?: string | null;
      robotsIndex?: boolean;
      updatedAt?: string | null;
    }>;
  }>("/public/exercises", 2500);
  for (const e of exercisesPayload?.exercises ?? []) {
    if (e.robotsIndex === false || !e.path) continue;
    push({
      loc: `${siteUrl}${e.path}`,
      lastmod: toLastmod(e.updatedAt),
      changefreq: "weekly",
      priority: "0.75",
    });
  }

  const recipesPayload = await fetchJson<{
    recipes?: Array<{
      path?: string | null;
      robotsIndex?: boolean;
      updatedAt?: string | null;
    }>;
  }>("/public/recipes", 2500);
  for (const r of recipesPayload?.recipes ?? []) {
    if (r.robotsIndex === false || !r.path) continue;
    push({
      loc: `${siteUrl}${r.path}`,
      lastmod: toLastmod(r.updatedAt),
      changefreq: "weekly",
      priority: "0.7",
    });
  }

  for (const section of ["programs", "reviews"] as const) {
    const payload = await fetchJson<{
      pages?: Array<{
        path?: string | null;
        robotsIndex?: boolean;
        updatedAt?: string | null;
      }>;
    }>(`/public/knowledge/${section}`, 2500);
    for (const p of payload?.pages ?? []) {
      if (p.robotsIndex === false || !p.path) continue;
      push({
        loc: `${siteUrl}${p.path}`,
        lastmod: toLastmod(p.updatedAt),
        changefreq: "weekly",
        priority: "0.7",
      });
    }
  }

  return rows;
}

function responseXml(xml: string, maxAge = 3600): Response {
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=${maxAge}, stale-while-revalidate=86400`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/** Always HTTP 200 — Google rejects intermittent 500s as "could not be read". */
export async function GET() {
  try {
    const rows = await buildRows();
    return responseXml(xmlFor(rows), 3600);
  } catch {
    const fallback = xmlFor(staticRows(getPublicSiteUrl()));
    return responseXml(fallback, 300);
  }
}
