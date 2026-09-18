/** News-kothari-style “Read also” blocks keyed by 9-digit article numbers. */

export const MAX_RELATED_LINKS = 5;

export const RELATED_LINK_RE =
  /<a\s+[^>]*href=["']\/blog\/(?:[a-z0-9-]+\/){0,2}(?:[a-z0-9-]+-)?(\d{9})["'][^>]*>([\s\S]*?)<\/a>/gi;

export function collectRelatedNumbersFromHtml(html: string): number[] {
  const found: number[] = [];
  RELATED_LINK_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = RELATED_LINK_RE.exec(html))) {
    const n = Number(m[1]);
    if (Number.isFinite(n) && !found.includes(n)) found.push(n);
  }
  return found;
}

export function buildReadAlsoHtml(
  articleNumber: number,
  title: string,
  path: string | null,
): string {
  const href = path || `/blog/${articleNumber}`;
  const safeTitle = title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<p class="read-also"><strong>Read also:</strong> <a href="${href}" data-article-number="${articleNumber}">${safeTitle}</a></p>`;
}

export function removeRelatedLinkFromHtml(
  html: string,
  articleNumber: number,
): string {
  const escaped = String(articleNumber);
  const blockRe = new RegExp(
    `<p[^>]*class=["'][^"']*read-also[^"']*["'][^>]*>[\\s\\S]*?<a\\s+[^>]*href=["'][^"']*${escaped}["'][^>]*>[\\s\\S]*?<\\/a>[\\s\\S]*?<\\/p>`,
    "gi",
  );
  return html.replace(blockRe, "");
}

/** Insert first link before 2nd heading (or 1st / end); later links at end. */
export function insertRelatedLinkBlock(
  html: string,
  block: string,
  existingCount: number,
): string {
  const src = html || "";
  if (existingCount === 0) {
    const headings = [...src.matchAll(/<h[23][^>]*>/gi)];
    if (headings.length >= 2) {
      const idx = headings[1].index ?? -1;
      if (idx >= 0) {
        return `${src.slice(0, idx)}${block}${src.slice(idx)}`;
      }
    }
    if (headings.length === 1) {
      const idx = headings[0].index ?? -1;
      if (idx >= 0) {
        return `${src.slice(0, idx)}${block}${src.slice(idx)}`;
      }
    }
    return `${src}${block}`;
  }
  return `${src}${block}`;
}
