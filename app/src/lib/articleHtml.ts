import { colors } from "@/theme";

export type TocItem = { index: number; text: string };

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/** H2 headings in document order — indices match `document.querySelectorAll('h2')`. */
export function extractToc(html: string | null | undefined): TocItem[] {
  if (!html) return [];
  const out: TocItem[] = [];
  const re = /<h2(?:\s[^>]*)?>([\s\S]*?)<\/h2>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const text = decode(m[1].replace(/<[^>]+>/g, "")).trim();
    out.push({ index: out.length, text });
  }
  return out.filter((t) => t.text);
}

/**
 * Reports content height and H2 offsets to React Native so the WebView can be
 * sized to its content (it never scrolls itself) and the native TOC can jump.
 */
const REPORT_SCRIPT = `
(function () {
  var last = "";
  function report() {
    var heads = Array.prototype.map.call(document.querySelectorAll("h2"), function (h, i) {
      return { i: i, top: Math.round(h.getBoundingClientRect().top + window.scrollY) };
    });
    var h = Math.ceil(document.getElementById("fl-root").getBoundingClientRect().height);
    var msg = JSON.stringify({ height: h, heads: heads });
    if (msg !== last && window.ReactNativeWebView) {
      last = msg;
      window.ReactNativeWebView.postMessage(msg);
    }
  }
  if (window.ResizeObserver) new ResizeObserver(report).observe(document.getElementById("fl-root"));
  Array.prototype.forEach.call(document.images, function (img) { img.addEventListener("load", report); });
  window.addEventListener("load", report);
  setTimeout(report, 50);
  setTimeout(report, 600);
  setTimeout(report, 2000);
})();
true;
`;

/**
 * Document wrapping CMS HTML, styled like `.article-body` on the website.
 * Fonts load from Google Fonts, falling back to Georgia.
 */
export function buildBodyHtml(body: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:${colors.bg};overflow:hidden;-webkit-text-size-adjust:100%}
#fl-root{padding:0 20px 4px;font-family:'Roboto Slab',Georgia,serif;font-size:16.5px;line-height:1.7;color:${colors.muted};overflow-wrap:anywhere}
#fl-root>:first-child{margin-top:0}
h2{font-size:23px;line-height:1.3;font-weight:600;letter-spacing:-0.02em;margin:36px 0 12px;color:${colors.ink}}
h3{font-size:19px;line-height:1.35;font-weight:600;margin:26px 0 8px;color:${colors.ink}}
h4{font-size:17px;font-weight:600;margin:22px 0 8px;color:${colors.ink}}
p,ul,ol{margin:0 0 16px}
ul,ol{padding-left:20px}
li{margin-bottom:6px}
li>ul,li>ol{margin:6px 0 0}
strong{font-weight:600;color:${colors.ink}}
a{color:${colors.ink};font-weight:500;text-decoration:underline;text-decoration-color:${colors.accent};text-decoration-thickness:2px;text-underline-offset:3px}
img{display:block;width:100%;max-width:100%;height:auto;max-height:36rem;object-fit:contain;margin:20px auto;border-radius:12px;border:1px solid ${colors.border};background:${colors.surface}}
figure{margin:20px 0 28px;overflow:hidden;border-radius:12px;border:1px solid ${colors.border};background:${colors.surface}}
figure img{margin:0;border:0;border-radius:0}
figcaption{padding:10px 16px;font-size:13px;color:${colors.muted}}
table{display:block;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;border-collapse:collapse;margin:16px 0 20px;font-size:14px;overflow-wrap:normal}
th,td{border:1px solid ${colors.border};padding:8px 12px;text-align:left;vertical-align:top}
th{background:${colors.canvas};color:${colors.ink};font-weight:600}
blockquote{margin:0 0 18px;padding:12px 16px;border-left:4px solid ${colors.accent};background:${colors.accentSoft}}
blockquote p:last-child{margin:0}
.read-also{margin:24px 0;padding:12px 16px;font-size:14px;border:1px solid ${colors.border};border-left:4px solid ${colors.accent};border-radius:12px;background:${colors.accentSoft}}
hr{border:0;border-top:1px solid ${colors.border};margin:32px 0}
code{background:${colors.surface};color:${colors.ink};padding:2px 6px;border-radius:4px;font-size:0.875em}
pre{max-width:100%;overflow-x:auto;padding:16px;border:1px solid ${colors.border};border-radius:12px;background:${colors.surface};font-size:14px}
pre code{background:none;padding:0}
</style></head><body><div id="fl-root">${body}</div><script>${REPORT_SCRIPT}</script></body></html>`;
}
