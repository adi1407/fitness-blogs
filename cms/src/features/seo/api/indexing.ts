import { apiFetch } from "@/lib/api/client";

export type GoogleIndexStatus = {
  verdict: "PASS" | "NEUTRAL" | "FAIL" | string | null;
  coverageState: string | null;
  indexingState: string | null;
  robotsTxtState: string | null;
  pageFetchState: string | null;
  googleCanonical: string | null;
  userCanonical: string | null;
  lastCrawlTime: string | null;
  error: string | null;
  inspectedAt: string;
};

export type IndexingPageRow = {
  url: string;
  path: string;
  title: string;
  status: number;
  redirectTo: string | null;
  canonical: string | null;
  noindex: boolean;
  inlinks: number;
  contentInlinks: number;
  linkedFrom: string[];
  articleId: string | null;
  google: GoogleIndexStatus | null;
};

export type BrokenLink = {
  path: string;
  status: number;
  location: string;
  sources: string[];
  count: number;
};

export type IndexingOverview = {
  audit: {
    lastRun: {
      status: "running" | "success" | "error";
      trigger: string;
      pages: number;
      error: string | null;
      startedAt: string;
      finishedAt: string | null;
    } | null;
    lastSuccessAt: string | null;
    brokenLinks: BrokenLink[];
  };
  inspection: { configured: boolean; siteUrl: string | null };
  pages: IndexingPageRow[];
};

export function fetchIndexing(): Promise<IndexingOverview> {
  return apiFetch<IndexingOverview>("/admin/seo/indexing");
}

export function startSiteAudit(): Promise<{ started: boolean }> {
  return apiFetch<{ started: boolean }>("/admin/seo/indexing/audit", { method: "POST" });
}

export function inspectPage(url: string): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>("/admin/seo/indexing/inspect", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}

function sameUrl(a: string, b: string): boolean {
  return a.replace(/\/+$/, "") === b.replace(/\/+$/, "");
}

/** Problems our own crawl can see; empty = technically fine. */
export function siteProblems(p: IndexingPageRow): string[] {
  const out: string[] = [];
  if (p.status >= 300 && p.status < 400) out.push(`Redirects${p.redirectTo ? ` → ${new URL(p.redirectTo).pathname}` : ""}`);
  else if (p.status !== 200) out.push(`HTTP ${p.status}`);
  if (p.noindex) out.push("noindex");
  if (p.status === 200 && p.canonical && !sameUrl(p.canonical, p.url)) out.push("Canonical points elsewhere");
  if (p.status === 200 && !p.canonical) out.push("No canonical");
  return out;
}

export function isIndexed(g: GoogleIndexStatus | null): boolean {
  return g?.verdict === "PASS";
}

export function googleChoseOtherCanonical(g: GoogleIndexStatus | null): boolean {
  return Boolean(g?.googleCanonical && g.userCanonical && !sameUrl(g.googleCanonical, g.userCanonical));
}

/** Plain-language next step for Google's coverage states. */
export function coverageAdvice(state: string | null): string | null {
  const s = (state ?? "").toLowerCase();
  if (!s || s.includes("submitted and indexed") || s === "indexed") return null;
  if (s.includes("discovered")) {
    return "Google knows this URL but has not crawled it yet. Link to it from strong pages (pillar hubs, popular articles).";
  }
  if (s.includes("crawled")) {
    return "Google crawled it but chose not to index it yet. Make it clearly more useful than similar pages and add links from related articles.";
  }
  if (s.includes("unknown")) {
    return "Google has not found this URL. Link to it from a hub page; the sitemap alone is slow.";
  }
  if (s.includes("duplicate") || s.includes("canonical")) {
    return "Google treats this as a copy of another page. Merge the two or make this one clearly different.";
  }
  if (s.includes("redirect")) return "This URL redirects. Link to the final URL instead.";
  if (s.includes("noindex")) return "The page asks not to be indexed. Remove noindex if it should rank.";
  if (s.includes("soft 404")) return "Google thinks the page is empty or an error page. Add real content.";
  if (s.includes("404") || s.includes("not found")) return "Google got a 404. Restore the page or add a redirect.";
  if (s.includes("robots")) return "robots.txt blocks this URL.";
  return null;
}
