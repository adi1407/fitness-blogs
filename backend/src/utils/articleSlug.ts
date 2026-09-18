/** Same rules as news-kothari cms/backend articleSlug helpers. */
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

export function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 200));
}
