import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import {
  coverageAdvice,
  fetchIndexing,
  googleChoseOtherCanonical,
  inspectPage,
  isIndexed,
  siteProblems,
  startSiteAudit,
  type IndexingOverview,
  type IndexingPageRow,
} from "@/features/seo/api/indexing";
import { formatAgo } from "@/features/seo/format";

type Filter = "all" | "not-indexed" | "unchecked" | "problems" | "orphans" | "weak";

const PAGE_SIZE = 100;
const POLL_MS = 5_000;

const FILTERS: { id: Filter; label: string; hint: string; needsGoogle?: boolean }[] = [
  { id: "all", label: "Sitemap URLs", hint: "Every page we ask Google to index" },
  { id: "not-indexed", label: "Not indexed", hint: "Google's verdict is not “indexed”", needsGoogle: true },
  { id: "unchecked", label: "Not checked yet", hint: "Waiting for a Google inspection", needsGoogle: true },
  { id: "problems", label: "Site problems", hint: "Redirect, error, noindex or canonical" },
  { id: "orphans", label: "No content links", hint: "No other page links to it in its content" },
  { id: "weak", label: "Weakly linked", hint: "Linked from only 1–2 pages' content" },
];

function matches(filter: Filter, p: IndexingPageRow): boolean {
  switch (filter) {
    case "not-indexed":
      return Boolean(p.google?.verdict) && !isIndexed(p.google);
    case "unchecked":
      return !p.google?.verdict;
    case "problems":
      return siteProblems(p).length > 0 || googleChoseOtherCanonical(p.google);
    case "orphans":
      return p.contentInlinks === 0;
    case "weak":
      return p.contentInlinks > 0 && p.contentInlinks <= 2;
    default:
      return true;
  }
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function GoogleCell({ page }: { page: IndexingPageRow }) {
  const g = page.google;
  if (!g?.verdict) {
    return (
      <div>
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-600">Not checked</span>
        {g?.error ? <p className="mt-1 text-xs text-red-600">{g.error}</p> : null}
      </div>
    );
  }
  const indexed = isIndexed(g);
  const tone = indexed
    ? "bg-emerald-100 text-emerald-800"
    : g.verdict === "FAIL"
      ? "bg-red-100 text-red-800"
      : "bg-amber-100 text-amber-800";
  const advice = coverageAdvice(g.coverageState);
  return (
    <div className="max-w-[280px]">
      <span className={`rounded px-1.5 py-0.5 text-xs font-semibold ${tone}`}>
        {indexed ? "Indexed" : g.coverageState || g.verdict}
      </span>
      <p className="mt-1 text-xs text-slate-500">
        {g.lastCrawlTime ? `Google crawled ${formatShortDate(g.lastCrawlTime)}` : "Never crawled"} · checked{" "}
        {formatAgo(g.inspectedAt)}
      </p>
      {googleChoseOtherCanonical(g) ? (
        <p className="mt-1 text-xs text-amber-700">
          Google picked another canonical: {new URL(g.googleCanonical ?? "").pathname}
        </p>
      ) : null}
      {advice ? <p className="mt-1 text-xs text-slate-600">{advice}</p> : null}
    </div>
  );
}

function SiteCell({ page }: { page: IndexingPageRow }) {
  const problems = siteProblems(page);
  if (!problems.length) {
    return <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-700">OK</span>;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {problems.map((p) => (
        <span key={p} className="rounded bg-red-50 px-1.5 py-0.5 text-xs font-semibold text-red-700">
          {p}
        </span>
      ))}
    </div>
  );
}

function LinksCell({ page }: { page: IndexingPageRow }) {
  const tone =
    page.contentInlinks === 0 ? "text-red-700" : page.contentInlinks <= 2 ? "text-amber-700" : "text-slate-900";
  return (
    <div className="w-[150px]">
      <p className={`font-semibold tabular-nums ${tone}`}>
        {page.contentInlinks}
        <span className="ml-1 text-xs font-normal text-slate-500">content · {page.inlinks} total</span>
      </p>
      {page.linkedFrom.length ? (
        <p className="mt-0.5 truncate text-xs text-slate-500" title={page.linkedFrom.join("\n")}>
          from {page.linkedFrom.slice(0, 2).join(", ")}
        </p>
      ) : null}
    </div>
  );
}

export default function SeoIndexingPage() {
  const [data, setData] = useState<IndexingOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [crawling, setCrawling] = useState(false);
  const [inspecting, setInspecting] = useState<string | null>(null);
  const requestId = useRef(0);

  const load = useCallback(async () => {
    const id = ++requestId.current;
    try {
      const next = await fetchIndexing();
      if (id !== requestId.current) return;
      setData(next);
      setError("");
    } catch (err) {
      if (id === requestId.current) setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const running = data?.audit.lastRun?.status === "running";
  useEffect(() => {
    if (!running && !crawling) return;
    const timer = window.setTimeout(() => {
      setCrawling(false);
      void load();
    }, POLL_MS);
    return () => window.clearTimeout(timer);
  }, [running, crawling, data, load]);

  const counts = useMemo(() => {
    const out = {} as Record<Filter, number>;
    for (const f of FILTERS) out[f.id] = (data?.pages ?? []).filter((p) => matches(f.id, p)).length;
    return out;
  }, [data]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (data?.pages ?? []).filter(
      (p) => matches(filter, p) && (!q || p.path.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)),
    );
  }, [data, filter, query]);

  async function onCrawl() {
    setNotice("");
    setCrawling(true);
    try {
      await startSiteAudit();
    } catch (err) {
      setCrawling(false);
      setNotice(err instanceof Error ? err.message : "Could not start a crawl");
    }
  }

  async function onInspect(url: string) {
    setNotice("");
    setInspecting(url);
    try {
      await inspectPage(url);
      await load();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Inspection failed");
    } finally {
      setInspecting(null);
    }
  }

  const googleOn = Boolean(data?.inspection.configured);
  const siteUrl = data?.inspection.siteUrl;
  const lastRun = data?.audit.lastRun;
  const inspectedCount = (data?.pages ?? []).filter((p) => p.google?.verdict).length;
  const filters = FILTERS.filter((f) => googleOn || !f.needsGoogle);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Indexing</h1>
        <p className="mt-1 max-w-2xl text-slate-600">
          Every sitemap URL with Google&apos;s own verdict, our crawl of the live site, and how many
          pages link to it. Pages with few content links are the ones Google is slowest to index.
        </p>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {loading && !data ? <p className="mt-6 text-sm text-slate-500">Loading…</p> : null}

      {data ? (
        <>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
            <div className="space-y-0.5 text-slate-600">
              <p>
                {data.audit.lastSuccessAt ? (
                  <>
                    Crawled <span className="font-semibold text-slate-900">{data.pages.length}</span> sitemap URLs ·{" "}
                    {formatAgo(data.audit.lastSuccessAt)}
                  </>
                ) : (
                  "The live site has not been crawled yet."
                )}
              </p>
              <p className="text-xs">
                {googleOn ? (
                  <>Google verdict for {inspectedCount} of {data.pages.length} URLs · each refreshed every 3 days</>
                ) : (
                  <>
                    Google&apos;s verdict appears once Search Console is connected (
                    <Link to="/seo" className="font-semibold text-sky-700 hover:underline">
                      SEO performance
                    </Link>
                    ).
                  </>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={onCrawl}
              disabled={running || crawling}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${running || crawling ? "animate-spin" : ""}`} aria-hidden />
              {running || crawling ? "Crawling…" : "Re-crawl site"}
            </button>
          </div>
          {notice ? <p className="mt-2 text-sm text-amber-700">{notice}</p> : null}
          {lastRun?.status === "error" ? (
            <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <p className="font-semibold">Last crawl failed</p>
              <p className="mt-0.5 break-words">{lastRun.error}</p>
            </div>
          ) : null}

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => {
                  setFilter(f.id);
                  setVisible(PAGE_SIZE);
                }}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  filter === f.id ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{f.label}</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">{counts[f.id]}</p>
                <p className="mt-0.5 text-xs text-slate-500">{f.hint}</p>
              </button>
            ))}
          </div>

          {data.audit.brokenLinks.length ? (
            <section className="mt-6 rounded-xl border border-red-200 bg-white">
              <h2 className="border-b border-red-100 px-4 py-3 text-sm font-semibold text-red-800">
                Internal links that do not reach a live page ({data.audit.brokenLinks.length})
              </h2>
              <ul className="divide-y divide-slate-100 text-sm">
                {data.audit.brokenLinks.map((b) => (
                  <li key={b.path} className="px-4 py-2.5">
                    <p className="font-medium text-slate-900">
                      {b.path}{" "}
                      <span className="ml-1 rounded bg-red-50 px-1.5 py-0.5 text-xs font-semibold text-red-700">
                        {b.status === 0 ? "No response" : b.status >= 400 ? `HTTP ${b.status}` : `Redirects → ${b.location}`}
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Linked from {b.count} page{b.count === 1 ? "" : "s"}: {b.sources.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="mt-6 rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-900">
                {filters.find((f) => f.id === filter)?.label} ({rows.length})
              </h2>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisible(PAGE_SIZE);
                }}
                placeholder="Filter by path or title"
                aria-label="Filter pages"
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm sm:w-64"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5">Page</th>
                    <th className="px-3 py-2.5">Google</th>
                    <th className="px-3 py-2.5">Site check</th>
                    <th className="px-3 py-2.5">Links in</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                        {data.pages.length ? "Nothing in this view. Good news." : "No crawl results yet."}
                      </td>
                    </tr>
                  ) : (
                    rows.slice(0, visible).map((p) => (
                      <tr key={p.url} className="align-top hover:bg-slate-50">
                        <td className="max-w-[240px] px-4 py-3">
                          <p className="truncate font-medium text-slate-900" title={p.title}>
                            {p.title || p.path}
                          </p>
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block truncate text-xs text-slate-600 hover:text-sky-700 hover:underline"
                            title={p.path}
                          >
                            {p.path}
                          </a>
                        </td>
                        <td className="min-w-[240px] px-3 py-3">
                          <GoogleCell page={p} />
                        </td>
                        <td className="px-3 py-3">
                          <SiteCell page={p} />
                        </td>
                        <td className="px-3 py-3">
                          <LinksCell page={p} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col items-end gap-1.5 whitespace-nowrap text-xs font-semibold">
                            {googleOn ? (
                              <button
                                type="button"
                                onClick={() => void onInspect(p.url)}
                                disabled={inspecting !== null}
                                className="text-sky-700 hover:underline disabled:opacity-50"
                              >
                                {inspecting === p.url ? "Checking…" : "Check now"}
                              </button>
                            ) : null}
                            {siteUrl ? (
                              <a
                                href={`https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(siteUrl)}&id=${encodeURIComponent(p.url)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-700 hover:underline"
                              >
                                Open in Search Console
                              </a>
                            ) : null}
                            {p.articleId ? (
                              <Link to={`/articles/${p.articleId}`} className="text-sky-700 hover:underline">
                                Edit
                              </Link>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {rows.length > visible ? (
              <div className="border-t border-slate-100 px-4 py-3 text-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="text-sm font-semibold text-sky-700 hover:underline"
                >
                  Show {Math.min(PAGE_SIZE, rows.length - visible)} more
                </button>
              </div>
            ) : null}
          </section>
        </>
      ) : null}
    </div>
  );
}
