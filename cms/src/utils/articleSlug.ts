/** Slug helpers ported from news-kothari cms/src/utils/articleSlug.js */

export function normalizeSlugInput(value: unknown): string {
  const words = String(value ?? "")
    .trim()
    .toLowerCase()
    .split(/[\s_-]+/)
    .map((word) => word.replace(/[^a-z0-9]/g, ""))
    .filter(Boolean);

  if (!words.length) return "";

  return words
    .join("-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

export function slugFromTitle(title: string): string {
  return normalizeSlugInput(title);
}
