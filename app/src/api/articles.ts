import { API_URL } from "@/config";

import { apiGet } from "./client";

export type ArticleSummary = {
  id: string;
  articleNumber: number;
  title: string;
  slug: string;
  excerpt: string | null;
  categorySlug: string | null;
  categoryLabel: string | null;
  subcategorySlug: string | null;
  subcategoryLabel: string | null;
  path: string | null;
  featuredImage: string | null;
  featuredImageAlt: string;
  ogImage: string | null;
  quickAnswer: string | null;
  readingTime: number | null;
  authorName: string | null;
  reviewerName: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
};

export type ArticleFaq = { question: string; answer: string };
export type ArticleSource = { title: string; url?: string; note?: string };

export type Article = ArticleSummary & {
  body: string;
  faq: ArticleFaq[];
  sources: ArticleSource[];
};

export function fetchArticles(signal?: AbortSignal) {
  return apiGet<{ articles: ArticleSummary[] }>(
    "/public/articles?limit=100&fields=summary",
    signal,
  ).then((d) => d.articles.filter((a) => a.slug && a.articleNumber));
}

export function fetchArticlesByCategory(category: string, signal?: AbortSignal) {
  return apiGet<{ articles: ArticleSummary[] }>(
    `/public/articles?limit=300&fields=summary&category=${encodeURIComponent(category)}`,
    signal,
  ).then((d) => d.articles.filter((a) => a.slug && a.articleNumber));
}

export function fetchArticle(articleNumber: number, signal?: AbortSignal) {
  return apiGet<{ article: Article; related: ArticleSummary[] }>(
    `/public/articles/by-number/${articleNumber}`,
    signal,
  );
}

/** Counts one reader view (server dedupes repeats). Fire-and-forget. */
export function recordArticleView(articleId: string) {
  void fetch(`${API_URL}/public/articles/${encodeURIComponent(articleId)}/view`, {
    method: "POST",
  }).catch(() => {});
}

export function articleImage(a: Pick<ArticleSummary, "featuredImage" | "ogImage">) {
  return a.featuredImage || a.ogImage || null;
}
