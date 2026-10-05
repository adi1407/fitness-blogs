import { articleHref } from "@/features/home/utils/articleMedia";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { getApiBase } from "@/lib/api/client";
import { BRAND_NAME, BRAND_SLOGAN } from "@/lib/brand";
import { getPublicSiteUrl } from "@/lib/siteUrl";

export const revalidate = 3600;

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absolute(siteUrl: string, src: string): string {
  return src.startsWith("http") ? src : `${siteUrl}${src}`;
}

async function fetchArticles(): Promise<PublicBlogArticle[]> {
  try {
    const res = await fetch(`${getApiBase()}/public/articles?limit=50`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15_000),
      next: { revalidate },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { articles?: PublicBlogArticle[] };
    return data.articles ?? [];
  } catch {
    return [];
  }
}

export async function GET() {
  const siteUrl = getPublicSiteUrl();
  const articles = (await fetchArticles())
    .filter((a) => articleHref(a) && a.publishedAt)
    .sort((a, b) => Date.parse(b.publishedAt!) - Date.parse(a.publishedAt!));

  const items = articles
    .map((a) => {
      const url = `${siteUrl}${articleHref(a)}`;
      const image = a.featuredImage || a.ogImage;
      const summary = a.excerpt || a.quickAnswer || a.metaDescription || "";
      return [
        "<item>",
        `<title>${esc(a.title)}</title>`,
        `<link>${esc(url)}</link>`,
        `<guid isPermaLink="true">${esc(url)}</guid>`,
        `<pubDate>${new Date(a.publishedAt!).toUTCString()}</pubDate>`,
        a.categoryLabel ? `<category>${esc(a.categoryLabel)}</category>` : "",
        a.authorName ? `<dc:creator>${esc(a.authorName)}</dc:creator>` : "",
        summary ? `<description>${esc(summary)}</description>` : "",
        image ? `<media:content url="${esc(absolute(siteUrl, image))}" medium="image" />` : "",
        "</item>",
      ].join("");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>${esc(BRAND_NAME)} — ${esc(BRAND_SLOGAN)}</title>
<link>${siteUrl}</link>
<description>Evidence-informed fitness, nutrition and training guides for India.</description>
<language>en-IN</language>
<atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${articles[0]?.publishedAt ? `<lastBuildDate>${new Date(articles[0].publishedAt).toUTCString()}</lastBuildDate>` : ""}
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
