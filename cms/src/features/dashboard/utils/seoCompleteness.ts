import type { Article } from "@/lib/api/client";

export type SeoCheckId =
  | "title"
  | "slug"
  | "taxonomy"
  | "excerpt"
  | "quickAnswer"
  | "body"
  | "featuredImage"
  | "featuredImageAlt"
  | "metaTitle"
  | "metaDescription"
  | "primaryKeyword"
  | "faq"
  | "tags"
  | "sources"
  | "related";

export type SeoCheck = {
  id: SeoCheckId;
  label: string;
  pass: boolean;
};

const MIN_BODY_CHARS = 400;

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Pass/fail SEO checklist for a draftable article. */
export function seoCompleteness(article: Article): {
  checks: SeoCheck[];
  passed: number;
  total: number;
  percent: number;
  missing: string[];
} {
  const bodyText = stripHtml(article.body || "");
  const faq = (article.faq || []).filter(
    (f) => f.question?.trim() && f.answer?.trim(),
  );
  const tags = (article.tags || []).filter((t) => t.trim());

  const checks: SeoCheck[] = [
    { id: "title", label: "Title", pass: Boolean(article.title?.trim()) },
    { id: "slug", label: "Slug", pass: Boolean(article.slug?.trim()) },
    {
      id: "taxonomy",
      label: "Category + subcategory",
      pass: Boolean(article.categoryId && article.subcategoryId),
    },
    { id: "excerpt", label: "Excerpt", pass: Boolean(article.excerpt?.trim()) },
    {
      id: "quickAnswer",
      label: "Quick answer",
      pass: Boolean(article.quickAnswer?.trim()),
    },
    {
      id: "body",
      label: `Body (≥${MIN_BODY_CHARS} chars)`,
      pass: bodyText.length >= MIN_BODY_CHARS,
    },
    {
      id: "featuredImage",
      label: "Featured image",
      pass: Boolean(article.featuredImage?.trim()),
    },
    {
      id: "featuredImageAlt",
      label: "Cover alt text",
      pass: Boolean(article.featuredImageAlt?.trim()),
    },
    {
      id: "metaTitle",
      label: "Meta title",
      pass: Boolean(article.metaTitle?.trim()),
    },
    {
      id: "metaDescription",
      label: "Meta description",
      pass: Boolean(article.metaDescription?.trim()),
    },
    {
      id: "primaryKeyword",
      label: "Primary keyword",
      pass: Boolean(article.primaryKeyword?.trim()),
    },
    { id: "faq", label: "At least 1 FAQ", pass: faq.length >= 1 },
    { id: "tags", label: "At least 1 tag", pass: tags.length >= 1 },
  ];

  const passed = checks.filter((c) => c.pass).length;
  const total = checks.length;
  const percent = total === 0 ? 0 : Math.round((passed / total) * 100);
  const missing = checks.filter((c) => !c.pass).map((c) => c.label);

  return { checks, passed, total, percent, missing };
}

/** Editor publish gates — SEO checklist plus sources & related links. */
export function editorQuality(article: Article): {
  checks: SeoCheck[];
  passed: number;
  total: number;
  percent: number;
  missing: string[];
  ready: boolean;
  criticalFail: boolean;
} {
  const base = seoCompleteness(article);
  const sources = (article.sources || []).filter((s) => s.title?.trim());
  const related = article.relatedArticleNumbers || [];

  const extra: SeoCheck[] = [
    {
      id: "sources",
      label: "At least 1 source",
      pass: sources.length >= 1,
    },
    {
      id: "related",
      label: "Related article link",
      pass: related.length >= 1,
    },
  ];

  const checks = [...base.checks, ...extra];
  const passed = checks.filter((c) => c.pass).length;
  const total = checks.length;
  const percent = total === 0 ? 0 : Math.round((passed / total) * 100);
  const missing = checks.filter((c) => !c.pass).map((c) => c.label);

  const byId = Object.fromEntries(checks.map((c) => [c.id, c.pass]));
  const criticalFail = !(
    byId.title &&
    byId.slug &&
    byId.taxonomy &&
    byId.body &&
    byId.featuredImage
  );
  const ready = percent >= 85 && !criticalFail;

  return { checks, passed, total, percent, missing, ready, criticalFail };
}
