/** Slug helpers ported from news-kothari cms/src/utils/articleSlug.js */

/** Live slug typing: space → hyphen, lowercase, strip invalid chars (keeps trailing `-`). */
export function formatSlugAsYouType(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 100);
}

/** Final slug for save/URL — no leading/trailing hyphens. */
export function normalizeSlugInput(value: unknown): string {
  return formatSlugAsYouType(value).replace(/^-+|-+$/g, "");
}

export function slugFromTitle(title: string): string {
  return normalizeSlugInput(title);
}

/**
 * Live tags typing: each word gets a leading `#`.
 * Space or comma starts the next tag (`#protein #indian`).
 */
export function formatTagsAsYouType(value: unknown): string {
  const raw = String(value ?? "");
  if (raw === "") return "";

  const trailingSep = /[,\s]$/.test(raw);
  const tags = raw
    .split(/[,\s]+/)
    .map((t) => t.replace(/^#+/, "").replace(/[^\w-]/g, ""))
    .filter(Boolean)
    .map((t) => `#${t}`);

  if (tags.length === 0) return "#";

  let result = tags.join(" ");
  if (trailingSep) result += " #";
  return result;
}

/** Tags for API — strip `#` and empty values. */
export function tagsFromInput(value: unknown): string[] {
  return String(value ?? "")
    .split(/[,\s]+/)
    .map((t) => t.replace(/^#+/, "").trim())
    .filter(Boolean);
}

/** Display stored tags with `#` prefixes. */
export function tagsToInput(tags: string[]): string {
  return tags
    .map((t) => t.replace(/^#+/, "").trim())
    .filter(Boolean)
    .map((t) => `#${t}`)
    .join(" ");
}
