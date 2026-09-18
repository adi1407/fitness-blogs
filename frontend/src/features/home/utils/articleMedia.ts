import type { PublicBlogArticle } from "@/lib/api/blog";

const CATEGORY_FALLBACK: Record<string, string> = {
  "muscle-building":
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1400&auto=format&fit=crop",
  "weight-loss":
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1400&auto=format&fit=crop",
  nutrition:
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1400&auto=format&fit=crop",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400&auto=format&fit=crop";

function isHttpUrl(value: string | undefined | null): value is string {
  if (!value?.trim()) return false;
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function articleHref(article: PublicBlogArticle): string | null {
  if (article.path) return article.path;
  if (article.categorySlug && article.subcategorySlug && article.slug) {
    return `/blog/${article.categorySlug}/${article.subcategorySlug}/${article.slug}`;
  }
  return null;
}

export function articleImage(article: PublicBlogArticle): string {
  if (isHttpUrl(article.featuredImage)) return article.featuredImage.trim();
  if (isHttpUrl(article.ogImage)) return article.ogImage.trim();
  const cat = article.categorySlug ?? "";
  return CATEGORY_FALLBACK[cat] ?? DEFAULT_IMAGE;
}
