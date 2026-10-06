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

/** Brand-styled document wrapping CMS HTML. Fonts load from Google Fonts, falling back to Georgia. */
export function buildBodyHtml(body: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:${colors.bg};overflow:hidden;-webkit-text-size-adjust:100%}
#fl-root{padding:4px 20px 8px;font-family:'Roboto Slab',Georgia,serif;font-size:17px;line-height:1.72;color:#1F1F1F;word-wrap:break-word}
h2{font-size:22px;line-height:1.3;margin:34px 0 12px;color:${colors.ink};padding-top:4px}
h2::before{content:"";display:block;width:28px;height:3px;background:${colors.accent};border-radius:2px;margin-bottom:12px}
h3{font-size:18px;line-height:1.35;margin:26px 0 8px;color:${colors.ink}}
p,ul,ol{margin:0 0 16px}
li{margin-bottom:8px}
ul li::marker{color:${colors.accent}}
strong{color:${colors.ink}}
a{color:${colors.ink};text-decoration:underline;text-decoration-color:${colors.accent};text-decoration-thickness:2px;text-underline-offset:3px}
img{max-width:100%;height:auto;border-radius:14px;margin:6px 0}
figure{margin:0 0 18px}figcaption{font-size:13px;color:${colors.muted};margin-top:6px}
table{display:block;overflow-x:auto;border-collapse:collapse;margin:0 0 20px;font-size:15px;max-width:100%;border-radius:12px}
th,td{border:1px solid ${colors.border};padding:10px 12px;text-align:left;vertical-align:top}
th{background:${colors.ink};color:#fff;font-weight:600}
tr:nth-child(even) td{background:${colors.surface}}
blockquote{margin:0 0 18px;padding:12px 16px;border-left:4px solid ${colors.accent};background:${colors.accentSoft};border-radius:0 12px 12px 0}
blockquote p:last-child{margin:0}
hr{border:0;border-top:1px solid ${colors.border};margin:28px 0}
code{background:${colors.surface};padding:2px 6px;border-radius:6px;font-size:15px}
</style></head><body><div id="fl-root">${body}</div><script>${REPORT_SCRIPT}</script></body></html>`;
}
