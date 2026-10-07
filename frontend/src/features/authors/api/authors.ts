import { apiFetch } from "@/lib/api/client";
import { articlesCache, type PublicBlogArticle } from "@/lib/api/blog";

export type PublicAuthor = {
  slug: string;
  name: string;
  bio: string;
  credentials: string;
  role: string;
  writtenCount: number;
  reviewedCount: number;
};

export type PublicAuthorProfile = {
  author: PublicAuthor;
  written: PublicBlogArticle[];
  reviewed: PublicBlogArticle[];
};

/** Staff with at least one published article written or reviewed. */
export async function fetchAuthors(): Promise<PublicAuthor[]> {
  try {
    const data = await apiFetch<{ authors: PublicAuthor[] }>(
      "/public/authors",
      articlesCache(),
    );
    return data.authors ?? [];
  } catch (err) {
    console.error("[authors] fetchAuthors failed", err);
    return [];
  }
}

export async function fetchAuthor(
  slug: string,
): Promise<PublicAuthorProfile | null> {
  try {
    return await apiFetch<PublicAuthorProfile>(
      `/public/authors/${encodeURIComponent(slug)}`,
      articlesCache(),
    );
  } catch {
    return null;
  }
}
