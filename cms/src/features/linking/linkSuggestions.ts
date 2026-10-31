import { apiFetch } from "@/lib/api/client";

export type LinkTargetKind = "article" | "calculator" | "food" | "exercise";

export type LinkTarget = {
  key: string;
  kind: LinkTargetKind;
  title: string;
  path: string;
  phrases: string[];
  articleId?: string;
  slug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
};

export type LinkSuggestion = {
  target: LinkTarget;
  phrase: string;
  matched: string;
  before: string;
  after: string;
  sameTopic: boolean;
};

export type InboundSuggestion = { id: string; title: string; path: string; phrase: string; snippet: string };

let indexRequest: Promise<LinkTarget[]> | null = null;

/** Shared for the session: the index only changes when something is published. */
export function loadLinkIndex(refresh = false): Promise<LinkTarget[]> {
  if (!indexRequest || refresh) {
    indexRequest = apiFetch<{ targets: LinkTarget[] }>("/articles/link-index")
      .then((d) => d.targets)
      .catch((err) => {
        indexRequest = null;
        throw err;
      });
  }
  return indexRequest;
}

export function loadInboundSuggestions(articleId: string): Promise<InboundSuggestion[]> {
  return apiFetch<{ suggestions: InboundSuggestion[] }>(`/articles/${articleId}/inbound-suggestions`).then(
    (d) => d.suggestions,
  );
}

/** Mirrors `phraseRegex` in backend/src/services/internalLinking.ts. */
function phraseRegex(phrase: string): RegExp {
  const body = phrase
    .split(/[\s-]+/)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("[\\s-]+");
  return new RegExp(`(?<![\\p{L}\\p{N}])${body}(?:s|es)?(?![\\p{L}\\p{N}])`, "giu");
}

const NO_LINK_ZONES = new Set(["A", "H1", "H2", "H3", "H4", "H5", "H6", "CODE", "PRE", "FIGCAPTION", "BUTTON"]);

function parseBody(html: string): HTMLElement {
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
  return doc.body.firstElementChild as HTMLElement;
}

/** Text nodes where a new link may go: not inside links, headings or code. */
function linkableTextNodes(root: HTMLElement): Text[] {
  const nodes: Text[] = [];
  const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      for (let el = node.parentElement; el && el !== root; el = el.parentElement) {
        if (NO_LINK_ZONES.has(el.tagName)) return NodeFilter.FILTER_REJECT;
      }
      return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n as Text);
  return nodes;
}

function linkedPaths(root: HTMLElement): { paths: Set<string>; slugs: Set<string> } {
  const paths = new Set<string>();
  const slugs = new Set<string>();
  for (const a of root.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href") ?? "";
    let path: string;
    try {
      const u = new URL(href, "https://fitlives.in");
      if (!/(^|\.)fitlives\.in$/.test(u.hostname)) continue;
      path = u.pathname.replace(/\/+$/, "") || "/";
    } catch {
      continue;
    }
    paths.add(path);
    const blog = path.match(/^\/blog\/[^/]+\/[^/]+\/([^/]+)/);
    if (blog) slugs.add(blog[1]);
  }
  return { paths, slugs };
}

export function countInternalLinks(html: string): number {
  if (!html) return 0;
  const { paths } = linkedPaths(parseBody(html));
  return paths.size;
}

type Context = { articleId: string | null; categorySlug?: string; subcategorySlug?: string; currentPath?: string | null };

function weight(t: LinkTarget, ctx: Context): number {
  if (t.kind === "article") {
    if (ctx.subcategorySlug && t.subcategorySlug === ctx.subcategorySlug) return 4;
    if (ctx.categorySlug && t.categorySlug === ctx.categorySlug) return 3;
    return 2;
  }
  return t.kind === "calculator" ? 2.5 : 1;
}

const MAX_SUGGESTIONS = 12;

/**
 * One suggestion per page not already linked from the body: the first place its
 * phrase appears in prose. Higher-priority targets claim overlapping text first.
 */
export function findLinkSuggestions(html: string, targets: LinkTarget[], ctx: Context): LinkSuggestion[] {
  if (!html.trim() || !targets.length) return [];
  const root = parseBody(html);
  const { paths, slugs } = linkedPaths(root);
  const nodes = linkableTextNodes(root);
  const claimed = new Map<Text, [number, number][]>();
  const overlaps = (node: Text, start: number, end: number) =>
    (claimed.get(node) ?? []).some(([s, e]) => start < e && end > s);

  const candidates = targets
    .filter((t) => t.articleId !== ctx.articleId && t.path !== ctx.currentPath)
    .filter((t) => !paths.has(t.path) && !(t.slug && slugs.has(t.slug)))
    .map((t) => ({ t, w: weight(t, ctx) }))
    .sort((a, b) => b.w - a.w || b.t.phrases[0].length - a.t.phrases[0].length);

  const found: (LinkSuggestion & { w: number; order: number })[] = [];
  for (const { t, w } of candidates) {
    let hit: { node: Text; index: number; text: string; phrase: string; order: number } | null = null;
    for (const phrase of t.phrases) {
      const re = phraseRegex(phrase);
      for (let i = 0; i < nodes.length && !hit; i++) {
        const value = nodes[i].data;
        re.lastIndex = 0;
        for (let m = re.exec(value); m; m = re.exec(value)) {
          if (!overlaps(nodes[i], m.index, m.index + m[0].length)) {
            hit = { node: nodes[i], index: m.index, text: m[0], phrase, order: i * 100_000 + m.index };
            break;
          }
        }
      }
      if (hit) break;
    }
    if (!hit) continue;
    const ranges = claimed.get(hit.node) ?? [];
    ranges.push([hit.index, hit.index + hit.text.length]);
    claimed.set(hit.node, ranges);
    const value = hit.node.data;
    found.push({
      target: t,
      phrase: hit.phrase,
      matched: hit.text,
      before: value.slice(Math.max(0, hit.index - 60), hit.index),
      after: value.slice(hit.index + hit.text.length, hit.index + hit.text.length + 60),
      sameTopic: w >= 4,
      w,
      order: hit.order,
    });
  }
  return found
    .sort((a, b) => b.w - a.w || a.order - b.order)
    .slice(0, MAX_SUGGESTIONS)
    .map(({ w: _w, order: _order, ...s }) => s);
}

/** Wrap the first free occurrence of the suggestion's phrase in a link; null if the text has changed. */
export function insertSuggestedLink(html: string, s: LinkSuggestion): string | null {
  const root = parseBody(html);
  const re = phraseRegex(s.phrase);
  for (const node of linkableTextNodes(root)) {
    re.lastIndex = 0;
    const m = re.exec(node.data);
    if (!m) continue;
    const middle = node.splitText(m.index);
    middle.splitText(m[0].length);
    const a = root.ownerDocument.createElement("a");
    a.setAttribute("href", s.target.path);
    a.textContent = middle.data;
    middle.replaceWith(a);
    return root.innerHTML;
  }
  return null;
}
