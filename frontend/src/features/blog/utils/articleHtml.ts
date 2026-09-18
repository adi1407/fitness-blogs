/** Add stable ids to h2/h3 and extract TOC entries from article HTML. */

export type TocItem = { id: string; text: string; level: 2 | 3 };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;]+;/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function enhanceArticleHtml(html: string): {
  html: string;
  toc: TocItem[];
} {
  if (!html) return { html: "", toc: [] };
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const next = html.replace(
    /<(h[23])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi,
    (_full, tag: string, attrs = "", inner: string) => {
      const level = tag.toLowerCase() === "h2" ? 2 : 3;
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return `<${tag}${attrs || ""}>${inner}</${tag}>`;

      let id = slugify(text) || `section-${toc.length + 1}`;
      let n = 2;
      while (used.has(id)) {
        id = `${slugify(text)}-${n}`;
        n += 1;
      }
      used.add(id);
      toc.push({ id, text, level: level as 2 | 3 });

      if (/\sid\s*=/.test(attrs || "")) {
        return `<${tag}${attrs}>${inner}</${tag}>`;
      }
      return `<${tag}${attrs || ""} id="${id}">${inner}</${tag}>`;
    },
  );

  return { html: next, toc };
}
