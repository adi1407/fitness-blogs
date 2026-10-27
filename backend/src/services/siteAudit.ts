import { env } from "../config/env";
import { pool } from "../db/pool";
import { gscServiceAccount, publicSiteOrigin } from "./searchConsole";
import { inspectStaleUrls } from "./urlInspection";

const LOCK_KEY = 874_201_119;
const USER_AGENT = "fitlives-site-audit/1.0 (+https://fitlives.in/about)";
const CONCURRENCY = 4;
const MAX_HTML_CHARS = 4_000_000;
const MAX_EXTRA_LINK_CHECKS = 150;
const AUDIT_EVERY_MS = 24 * 60 * 60 * 1000;
const CHECK_EVERY_MS = 60 * 60 * 1000;
const INSPECTIONS_PER_TICK = 40;

type Fetched = { status: number; location: string; html: string; robotsHeader: string };

type BrokenLink = { path: string; status: number; location: string; sources: string[]; count: number };

export type SiteAuditResult =
  | { status: "skipped"; reason: string }
  | { status: "success"; pages: number; brokenLinks: number }
  | { status: "error"; error: string };

function trimSlash(url: string): string {
  return url.length > 1 && url.endsWith("/") ? url.replace(/\/+$/, "") : url;
}

function sameHost(a: string, b: string): boolean {
  return a.replace(/^www\./, "") === b.replace(/^www\./, "");
}

/** Site path for an internal page link; null for external links, assets and non-http schemes. */
function internalPath(href: string, base: URL): string | null {
  let u: URL;
  try {
    u = new URL(href.replace(/&amp;/g, "&"), base);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(u.protocol) || !sameHost(u.hostname, base.hostname)) return null;
  const path = trimSlash(u.pathname) || "/";
  if (/^\/(_next|api)\//.test(path) || /\.[a-z0-9]{2,5}$/i.test(path)) return null;
  return path;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function attr(tag: string, name: string): string {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"))?.[1] ?? "";
}

/**
 * Page body without the site header/footer: the <main> element plus streamed
 * Suspense chunks, which React emits as hidden blocks after </main>.
 */
function contentHtml(html: string): string {
  const start = html.search(/<main\b/i);
  const end = html.lastIndexOf("</main>");
  const main =
    start >= 0 && end > start
      ? html.slice(start, end)
      : html.replace(/<header\b[\s\S]*?<\/header>|<footer\b[\s\S]*?<\/footer>/gi, "");
  const streamed = [...html.matchAll(/<div hidden id="S:[^"]*">([\s\S]*?)<\/div><script>/g)]
    .map((m) => m[1])
    .join("");
  return main + streamed;
}

function linkPaths(html: string, base: URL): Set<string> {
  const paths = new Set<string>();
  for (const m of html.matchAll(/<a\b[^>]*?\shref="([^"]+)"/gi)) {
    const path = internalPath(m[1], base);
    if (path) paths.add(path);
  }
  return paths;
}

async function fetchPage(url: string): Promise<Fetched> {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, {
        redirect: "manual",
        headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
        signal: AbortSignal.timeout(30_000),
      });
      if (res.status >= 500 && attempt === 0) {
        await res.arrayBuffer().catch(() => undefined);
        continue;
      }
      const isHtml = (res.headers.get("content-type") ?? "").includes("text/html");
      const html = res.status === 200 && isHtml ? (await res.text()).slice(0, MAX_HTML_CHARS) : "";
      if (!html) await res.arrayBuffer().catch(() => undefined);
      const location = res.headers.get("location");
      return {
        status: res.status,
        location: location ? new URL(location, url).toString() : "",
        html,
        robotsHeader: res.headers.get("x-robots-tag") ?? "",
      };
    } catch (err) {
      if (attempt === 0) continue;
      throw err;
    }
  }
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
}

/**
 * Crawl every sitemap URL on the live site: status, redirects, canonical, noindex,
 * and the internal link graph (all links vs links inside the page content), plus
 * a check of internal links that point outside the sitemap.
 */
export async function auditSite(trigger: "schedule" | "manual"): Promise<SiteAuditResult> {
  const client = await pool.connect();
  try {
    const lock = await client.query<{ ok: boolean }>(`SELECT pg_try_advisory_lock($1) AS ok`, [LOCK_KEY]);
    if (!lock.rows[0]?.ok) return { status: "skipped", reason: "an audit is already running" };

    let runId: string | null = null;
    let inTransaction = false;
    try {
      await client.query(
        `UPDATE site_audit_runs SET status = 'error', error = 'Interrupted (server restarted)', finished_at = NOW()
         WHERE status = 'running'`,
      );
      runId = (
        await client.query<{ id: string }>(`INSERT INTO site_audit_runs (trigger) VALUES ($1) RETURNING id`, [trigger])
      ).rows[0].id;

      const origin = publicSiteOrigin();
      const base = new URL(origin);
      const sitemapRes = await fetch(`${origin}/sitemap.xml`, {
        headers: { "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(30_000),
      });
      if (!sitemapRes.ok) throw new Error(`sitemap.xml returned ${sitemapRes.status}`);
      const sitemapXml = await sitemapRes.text();
      const urls = [...new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decodeEntities(m[1].trim())))];
      if (!urls.length) throw new Error("sitemap.xml has no URLs");

      const pathOf = (u: string) => trimSlash(new URL(u).pathname) || "/";
      const sitemapPaths = new Set(urls.map(pathOf));
      const all = new Map<string, Set<string>>();
      const content = new Map<string, Set<string>>();
      const addLinks = (target: Map<string, Set<string>>, from: string, paths: Set<string>) => {
        for (const p of paths) {
          if (p === from) continue;
          let set = target.get(p);
          if (!set) target.set(p, (set = new Set()));
          set.add(from);
        }
      };

      const pages = await mapLimit(urls, CONCURRENCY, async (url) => {
        const path = pathOf(url);
        const page = await fetchPage(url);
        let title = "";
        let canonical = "";
        let robots = page.robotsHeader;
        if (page.html) {
          // Next.js may stream metadata into <body> for non-crawler user agents, so search the whole document.
          const html = page.html;
          title = decodeEntities(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? "").trim();
          const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)].find((m) => /\srel="canonical"/i.test(m[0]));
          canonical = canonicalTag ? decodeEntities(attr(canonicalTag[0], "href")) : "";
          const robotsTag = [...html.matchAll(/<meta\b[^>]*>/gi)].find((m) => /\sname="robots"/i.test(m[0]));
          if (robotsTag) robots += ` ${attr(robotsTag[0], "content")}`;
          addLinks(all, path, linkPaths(page.html, base));
          addLinks(content, path, linkPaths(contentHtml(page.html), base));
        }
        return {
          url,
          path,
          status: page.status,
          redirectTo: page.location,
          title,
          canonical,
          noindex: /noindex/i.test(robots),
        };
      });

      const crawled = new Set(pages.filter((p) => p.status === 200).map((p) => p.path));
      const extra = [...all.keys()].filter((p) => !sitemapPaths.has(p)).slice(0, MAX_EXTRA_LINK_CHECKS);
      const extraChecks = await mapLimit(extra, CONCURRENCY, async (path) => {
        const res = await fetchPage(`${origin}${path === "/" ? "" : path}`).catch(() => null);
        return { path, status: res?.status ?? 0, location: res?.location ?? "" };
      });
      const brokenLinks: BrokenLink[] = extraChecks
        .filter((c) => c.status === 0 || c.status >= 300)
        .map((c) => {
          const sources = [...(all.get(c.path) ?? [])].filter((s) => crawled.has(s));
          return { ...c, sources: sources.slice(0, 5), count: sources.length };
        })
        .sort((a, b) => b.count - a.count);

      await client.query("BEGIN");
      inTransaction = true;
      await client.query(`DELETE FROM site_audit_pages`);
      const records = pages.map((p) => {
        const contentFrom = [...(content.get(p.path) ?? [])];
        const allFrom = [...(all.get(p.path) ?? [])];
        return {
          url: p.url,
          path: p.path,
          status: p.status,
          redirect_to: p.redirectTo,
          title: p.title.slice(0, 300),
          canonical: p.canonical,
          noindex: p.noindex,
          inlinks: allFrom.length,
          content_inlinks: contentFrom.length,
          linked_from: (contentFrom.length ? contentFrom : allFrom).slice(0, 5),
        };
      });
      await client.query(
        `INSERT INTO site_audit_pages (url, path, status, redirect_to, title, canonical, noindex, inlinks, content_inlinks, linked_from)
         SELECT url, path, status, redirect_to, title, canonical, noindex, inlinks, content_inlinks, linked_from
         FROM jsonb_to_recordset($1::jsonb) AS x(
           url text, path text, status int, redirect_to text, title text, canonical text,
           noindex boolean, inlinks int, content_inlinks int, linked_from text[]
         )`,
        [JSON.stringify(records)],
      );
      await client.query(
        `UPDATE site_audit_runs SET status = 'success', pages = $2, broken_links = $3::jsonb, finished_at = NOW()
         WHERE id = $1`,
        [runId, pages.length, JSON.stringify(brokenLinks)],
      );
      await client.query("COMMIT");
      inTransaction = false;
      console.log(`[site-audit] crawled ${pages.length} sitemap URLs, ${brokenLinks.length} problem link target(s)`);
      return { status: "success", pages: pages.length, brokenLinks: brokenLinks.length };
    } catch (err) {
      if (inTransaction) await client.query("ROLLBACK").catch(() => undefined);
      const message = (err instanceof Error ? err.message : String(err)).slice(0, 500);
      console.error("[site-audit] failed:", message);
      if (runId) {
        await client
          .query(`UPDATE site_audit_runs SET status = 'error', error = $2, finished_at = NOW() WHERE id = $1`, [
            runId,
            message,
          ])
          .catch(() => undefined);
      }
      return { status: "error", error: message };
    } finally {
      await client.query(`SELECT pg_advisory_unlock($1)`, [LOCK_KEY]).catch(() => undefined);
    }
  } finally {
    client.release();
  }
}

/** Production only: a daily crawl, then a batch of Google URL inspections every hour. */
export function startSiteAuditSchedule(): void {
  if (env.nodeEnv !== "production") return;
  const tick = async () => {
    try {
      const last = await pool.query<{ started_at: Date }>(
        `SELECT started_at FROM site_audit_runs WHERE status = 'success' ORDER BY started_at DESC LIMIT 1`,
      );
      const lastAt = last.rows[0]?.started_at;
      if (!lastAt || Date.now() - new Date(lastAt).getTime() >= AUDIT_EVERY_MS) {
        await auditSite("schedule");
      }
      if (gscServiceAccount()) await inspectStaleUrls(INSPECTIONS_PER_TICK);
    } catch (err) {
      console.error("[site-audit] scheduled run failed", err);
    }
  };
  setTimeout(() => void tick(), 2 * 60_000).unref();
  setInterval(() => void tick(), CHECK_EVERY_MS).unref();
}
