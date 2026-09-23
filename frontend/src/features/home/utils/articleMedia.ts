import type { PublicBlogArticle } from "@/lib/api/blog";
import { CATEGORY_COVERS, HUB } from "@/lib/hubImages";

function isUsableImageUrl(value: string | undefined | null): value is string {
  if (!value?.trim()) return false;
  const v = value.trim();
  if (v.startsWith("/")) return true;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function articleHref(article: PublicBlogArticle): string | null {
  if (article.path) return article.path;
  if (article.categorySlug && article.subcategorySlug && article.slug) {
    const base = `/blog/${article.categorySlug}/${article.subcategorySlug}/${article.slug}`;
    return article.articleNumber ? `${base}/${article.articleNumber}` : base;
  }
  return null;
}

export function articleImage(article: PublicBlogArticle): string {
  if (isUsableImageUrl(article.featuredImage)) return article.featuredImage.trim();
  if (isUsableImageUrl(article.ogImage)) return article.ogImage.trim();
  const cat = article.categorySlug ?? "";
  return CATEGORY_COVERS[cat] ?? HUB.gymInterior;
}
