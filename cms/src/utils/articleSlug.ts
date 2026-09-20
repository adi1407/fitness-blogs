/** Slug / tag helpers for the article editor. */

/** Live slug typing: spaces & underscores become `-`, lowercase, keep trailing `-`. */
export function formatSlugAsYouType(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 100);
}

/** Insert a hyphen at the caret (used when Space is pressed). */
export function insertSlugHyphenAt(
  value: string,
  selectionStart: number,
  selectionEnd: number,
): { next: string; caret: number } {
  const before = value.slice(0, selectionStart);
  const after = value.slice(selectionEnd);
  const next = formatSlugAsYouType(`${before}-${after}`);
  // Caret sits just after the hyphen we intended
  const caret = formatSlugAsYouType(`${before}-`).length;
  return { next, caret: Math.min(caret, next.length) };
}

/** Final slug for save/URL — no leading/trailing hyphens. */
export function normalizeSlugInput(value: unknown): string {
  return formatSlugAsYouType(value).replace(/^-+|-+$/g, "");
}

export function slugFromTitle(title: string): string {
  return normalizeSlugInput(title);
}

function cleanTagToken(token: string): string {
  return token.replace(/^#+/, "").replace(/[^\w-]/g, "");
}

/**
 * Live tags: finished words get a leading `#`.
 * Space or comma finishes the current word → `#word` then ready for the next.
 * The word currently being typed stays without `#` until finished.
 */
export function formatTagsAsYouType(value: unknown): string {
  const raw = String(value ?? "");
  if (raw === "") return "";

  const finished = /[,\s]$/.test(raw);
  const tokens = raw
    .split(/[,\s]+/)
    .map(cleanTagToken)
    .filter(Boolean);

  if (tokens.length === 0) return "";

  if (finished) {
    // Every token is complete — prefix each and leave a trailing space for the next word
    return `${tokens.map((t) => `#${t}`).join(" ")} `;
  }

  // Last token is still being typed — only earlier words get `#`
  const done = tokens.slice(0, -1).map((t) => `#${t}`);
  const current = tokens[tokens.length - 1];
  return [...done, current].join(" ");
}

/** On blur: ensure every tag has a leading `#`. */
export function finalizeTagsInput(value: unknown): string {
  return String(value ?? "")
    .split(/[,\s]+/)
    .map(cleanTagToken)
    .filter(Boolean)
    .map((t) => `#${t}`)
    .join(" ");
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
