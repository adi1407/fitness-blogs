import type { Article, ArticleSummary } from "@/api/articles";
import { articleImage } from "@/api/articles";
import { SITE_URL } from "@/config";
import { colors } from "@/theme";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const safeUrl = (u: string | undefined) => (u && /^https?:\/\//i.test(u) ? esc(u) : null);

function formatDate(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Self-contained, brand-styled HTML document for the article WebView. */
export function buildArticleHtml(article: Article, related: ArticleSummary[]) {
  const img = articleImage(article);
  const date = formatDate(article.updatedAt ?? article.publishedAt);
  const byline = [
    article.authorName ? `Written by <strong>${esc(article.authorName)}</strong>` : null,
    article.reviewerName ? `Reviewed by <strong>${esc(article.reviewerName)}</strong>` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const meta = [article.categoryLabel, article.subcategoryLabel, article.readingTime ? `${article.readingTime} min read` : null]
    .filter(Boolean)
    .map((m) => esc(String(m)))
    .join(" · ");

  const faq = article.faq.length
    ? `<section class="faq"><h2>Frequently asked questions</h2>${article.faq
        .map((f) => `<details><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`)
        .join("")}</section>`
    : "";

  const sources = article.sources.length
    ? `<section class="sources"><h2>Sources</h2><ol>${article.sources
        .map((s) => {
          const url = safeUrl(s.url);
          const title = esc(s.title);
          return `<li>${url ? `<a href="${url}">${title}</a>` : title}${s.note ? `<br><span>${esc(s.note)}</span>` : ""}</li>`;
        })
        .join("")}</ol></section>`
    : "";

  const relatedHtml = related.length
    ? `<section class="related"><h2>Keep reading</h2>${related
        .filter((r) => r.path)
        .slice(0, 6)
        .map((r) => `<a class="rel" href="${esc(SITE_URL + r.path)}">${esc(r.title)}</a>`)
        .join("")}</section>`
    : "";

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;padding:20px 18px 64px;font-family:'Roboto Slab',Georgia,serif;font-size:17px;line-height:1.65;color:${colors.ink};background:${colors.bg};word-wrap:break-word}
h1{font-size:26px;line-height:1.25;margin:6px 0 10px}
h2{font-size:21px;line-height:1.3;margin:32px 0 10px}
h3{font-size:18px;margin:24px 0 8px}
p,ul,ol{margin:0 0 14px}
li{margin-bottom:6px}
a{color:${colors.ink};text-decoration-color:${colors.accent};text-underline-offset:3px}
img{max-width:100%;height:auto;border-radius:12px}
.hero{width:100%;aspect-ratio:16/9;object-fit:cover;background:${colors.surface};margin:8px 0 16px}
.meta{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${colors.muted}}
.byline{font-size:14px;color:${colors.muted};margin-bottom:18px}
.qa{background:${colors.accentSoft};border-left:4px solid ${colors.accent};border-radius:12px;padding:14px 16px;margin:0 0 22px}
.qa b{display:block;font-size:12px;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px}
table{display:block;overflow-x:auto;border-collapse:collapse;margin:0 0 18px;font-size:15px;max-width:100%}
th,td{border:1px solid ${colors.border};padding:8px 10px;text-align:left;vertical-align:top}
th{background:${colors.surface}}
blockquote{margin:0 0 16px;padding:10px 16px;border-left:3px solid ${colors.border};color:${colors.muted}}
details{border:1px solid ${colors.border};border-radius:12px;padding:12px 14px;margin-bottom:10px}
summary{font-weight:600;cursor:pointer}
details p{margin:10px 0 0}
.sources{font-size:14px}.sources span{color:${colors.muted}}
.rel{display:block;padding:12px 14px;border:1px solid ${colors.border};border-radius:12px;margin-bottom:10px;text-decoration:none;font-weight:600}
.disclaimer{margin-top:28px;font-size:13px;color:${colors.muted};border-top:1px solid ${colors.border};padding-top:14px}
</style></head><body>
${meta ? `<div class="meta">${meta}</div>` : ""}
<h1>${esc(article.title)}</h1>
${byline || date ? `<div class="byline">${byline}${byline && date ? " · " : ""}${date ? `Updated ${esc(date)}` : ""}</div>` : ""}
${img ? `<img class="hero" src="${esc(img)}" alt="${esc(article.featuredImageAlt || article.title)}">` : ""}
${article.quickAnswer ? `<div class="qa"><b>Quick answer</b>${esc(article.quickAnswer)}</div>` : ""}
<article>${article.body ?? ""}</article>
${faq}${sources}${relatedHtml}
<p class="disclaimer">Educational information only — not medical advice. Consult a qualified professional for personal health decisions.</p>
</body></html>`;
}
