import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import {
  fetchSeoOverview,
  startSeoSync,
  type SeoOverview,
  type SeoRangeDays,
  type SeoSegment,
  type SeoSyncStatus,
} from "@/features/seo/api/seoPerformance";
import { SeoSetupCard } from "@/features/seo/components/SeoSetupCard";
import { SeoTrendChart } from "@/features/seo/components/SeoTrendChart";
import {
  delta,
  formatAgo,
  formatCount,
  formatCtr,
  formatDay,
  formatPosition,
  type Delta,
} from "@/features/seo/format";

const RANGES: { days: SeoRangeDays; label: string }[] = [
  { days: 7, label: "7 days" },
  { days: 28, label: "28 days" },
  { days: 90, label: "3 months" },
  { days: 365, label: "12 months" },
];

const SEGMENTS: { id: SeoSegment; label: string }[] = [
  { id: "nonbrand", label: "Non-brand" },
  { id: "brand", label: "Brand" },
  { id: "all", label: "All" },
];

const POLL_MS = 4_000;

type Loaded = Extract<SeoOverview, { range: object }>;

function DeltaBadge({ d }: { d: Delta }) {
  const tone =
    d.tone === "up" ? "text-emerald-700" : d.tone === "down" ? "text-red-600" : "text-slate-500";
  return <span className={`text-xs font-semibold ${tone}`}>{d.label}</span>;
}

function MetricCard({ label, value, d, hint }: { label: string; value: string; d: Delta; hint: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold tabular-nums text-slate-900 sm:text-2xl">{value}</p>
      <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 text-xs text-slate-500">
        <DeltaBadge d={d} /> {hint}
      </p>
    </div>
  );
}

function StatusBar({
  status,
  syncing,
  onSync,
}: {
  status: SeoSyncStatus;
  syncing: boolean;
  onSync: () => void;
}) {
  const run = status.lastRun;
  const running = syncing || run?.status === "running";
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
      <p className="text-slate-600">
        {status.siteUrl ? (
          <>
            <span className="font-semibold text-slate-900">{status.siteUrl}</span>
            {status.dataThrough ? <> · data through {formatDay(status.dataThrough)}</> : null}
            {status.lastSuccessAt ? <> · synced {formatAgo(status.lastSuccessAt)}</> : null}
          </>
        ) : (
          <>Connected as {status.serviceAccountEmail}. Waiting for the first sync.</>
        )}
      </p>
      <button
        type="button"
        onClick={onSync}
        disabled={running}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${running ? "animate-spin" : ""}`} aria-hidden />
        {running ? "Syncing…" : "Sync now"}
      </button>
    </div>
  );
}

function BrandSplit({ data }: { data: Loaded }) {
  const { brand, nonBrand, hidden } = data.split.current;
  const byClicks = brand.clicks + nonBrand.clicks + hidden.clicks > 0;
  const pick = (m: { clicks: number; impressions: number }) => (byClicks ? m.clicks : m.impressions);
  const parts = [
    { label: "Non-brand", value: pick(nonBrand), className: "bg-sky-500" },
    { label: "Brand (“fitlives”)", value: pick(brand), className: "bg-slate-900" },
    { label: "Hidden by Google", value: pick(hidden), className: "bg-slate-300" },
  ];
  const total = parts.reduce((n, p) => n + p.value, 0);
  if (!total) return null;
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-slate-900">
        Where {byClicks ? "clicks" : "impressions"} come from
      </h2>
      <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-slate-100" aria-hidden>
        {parts.map((p) =>
          p.value ? (
            <div key={p.label} className={p.className} style={{ width: `${(p.value / total) * 100}%` }} />
          ) : null,
        )}
      </div>
      <ul className="mt-3 grid gap-2 text-xs text-slate-600 sm:grid-cols-3">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${p.className}`} aria-hidden />
            <span>
              <span className="font-semibold text-slate-900">{Math.round((p.value / total) * 100)}%</span>{" "}
              {p.label} ({formatCount(p.value)})
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-500">
        Non-brand means people found you without searching your name — the number SEO work should
        grow. Google hides rare queries for privacy; they count in totals but not per query.
      </p>
    </section>
  );
}

function QueriesTable({
  data,
  segment,
  onSegment,
}: {
  data: Loaded;
  segment: SeoSegment;
  onSegment: (s: SeoSegment) => void;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Top queries</h2>
        <div className="flex gap-1.5" role="group" aria-label="Query segment">
          {SEGMENTS.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={segment === s.id}
              onClick={() => onSegment(s.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                segment === s.id
                  ? "bg-sky-500 text-white"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-2.5">Query</th>
              <th className="px-3 py-2.5 text-right">Clicks</th>
              <th className="px-3 py-2.5 text-right">Impr.</th>
              <th className="px-3 py-2.5 text-right">CTR</th>
              <th className="px-3 py-2.5 text-right">Position</th>
              <th className="px-4 py-2.5">Top page</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.queries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No {segment === "nonbrand" ? "non-brand " : segment === "brand" ? "brand " : ""}queries
                  in this range yet.
                </td>
              </tr>
            ) : (
              data.queries.map((q) => (
                <tr key={q.query} className="hover:bg-slate-50">
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-slate-900">{q.query}</p>
                    <div className="mt-0.5 flex flex-wrap gap-2 text-xs">
                      {q.pageCount > 1 ? (
                        <span
                          className="rounded bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-800"
                          title="Several of your URLs show for this query. Check they don't compete."
                        >
                          {q.pageCount} pages compete
                        </span>
                      ) : null}
                      {(q.position ?? 0) > 10 ? (
                        <Link
                          to={`/assignments?q=${encodeURIComponent(q.query)}`}
                          className="font-semibold text-sky-700 hover:underline"
                        >
                          New brief
                        </Link>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{formatCount(q.clicks)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{formatCount(q.impressions)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{formatCtr(q.ctr)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{formatPosition(q.position)}</td>
                  <td className="max-w-[260px] px-4 py-2.5">
                    {q.topPage ? (
                      <a
                        href={q.topPage.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate text-xs text-slate-600 hover:text-sky-700 hover:underline"
                        title={q.topPage.path}
                      >
                        {q.topPage.path}
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PagesTable({ data }: { data: Loaded }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <h2 className="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-900">Top pages</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-2.5">Page</th>
              <th className="px-3 py-2.5 text-right">Clicks</th>
              <th className="px-3 py-2.5 text-right">Impr.</th>
              <th className="px-3 py-2.5 text-right">CTR</th>
              <th className="px-3 py-2.5 text-right">Position</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.pages.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No pages with impressions in this range yet.
                </td>
              </tr>
            ) : (
              data.pages.map((p) => (
                <tr key={p.url} className="hover:bg-slate-50">
                  <td className="max-w-[360px] px-4 py-2.5">
                    {p.article ? <p className="truncate font-medium text-slate-900">{p.article.title}</p> : null}
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
                  <td className="px-3 py-2.5 text-right tabular-nums">{formatCount(p.clicks)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{formatCount(p.impressions)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{formatCtr(p.ctr)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{formatPosition(p.position)}</td>
                  <td className="px-4 py-2.5 text-right">
                    {p.article ? (
                      <Link
                        to={`/articles/${p.article.id}`}
                        className="text-xs font-semibold text-sky-700 hover:underline"
                      >
                        Edit
                      </Link>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function SeoPerformancePage() {
  const [days, setDays] = useState<SeoRangeDays>(28);
  const [segment, setSegment] = useState<SeoSegment>("nonbrand");
  const [data, setData] = useState<SeoOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [notice, setNotice] = useState("");
  const requestId = useRef(0);

  const load = useCallback(
    async (silent = false) => {
      const id = ++requestId.current;
      if (!silent) setLoading(true);
      try {
        const next = await fetchSeoOverview(days, segment);
        if (id !== requestId.current) return;
        setData(next);
        setError("");
      } catch (err) {
        if (id !== requestId.current) return;
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        if (id === requestId.current) setLoading(false);
      }
    },
    [days, segment],
  );

  useEffect(() => {
    void load();
  }, [load]);

  const running = data?.status.lastRun?.status === "running";
  useEffect(() => {
    if (!running && !syncing) return;
    const timer = window.setTimeout(() => {
      setSyncing(false);
      void load(true);
    }, POLL_MS);
    return () => window.clearTimeout(timer);
  }, [running, syncing, data, load]);

  async function onSync() {
    setNotice("");
    setSyncing(true);
    try {
      await startSeoSync();
    } catch (err) {
      setSyncing(false);
      setNotice(err instanceof Error ? err.message : "Could not start a sync");
    }
  }

  const status = data?.status;
  const loaded = data && data.range ? (data as Loaded) : null;
  const lastError = status?.lastRun?.status === "error" ? status.lastRun.error : null;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">SEO performance</h1>
          <p className="mt-1 max-w-2xl text-slate-600">
            How fitlives shows up in Google search, from Search Console. Data runs 2–3 days behind
            Google, and position is an average across all searches.
          </p>
        </div>
        {loaded ? (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Date range">
            {RANGES.map((r) => (
              <button
                key={r.days}
                type="button"
                aria-pressed={days === r.days}
                onClick={() => setDays(r.days)}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                  days === r.days
                    ? "bg-sky-500 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {loading && !data ? <p className="mt-6 text-sm text-slate-500">Loading…</p> : null}

      {status && !status.configured ? <SeoSetupCard /> : null}

      {status?.configured ? (
        <>
          <StatusBar status={status} syncing={syncing} onSync={onSync} />
          {notice ? <p className="mt-2 text-sm text-amber-700">{notice}</p> : null}
          {lastError ? (
            <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <p className="font-semibold">Last sync failed</p>
              <p className="mt-0.5 break-words">{lastError}</p>
            </div>
          ) : null}
        </>
      ) : null}

      {status?.configured && !loaded && !loading ? (
        <p className="mt-6 text-sm text-slate-500">
          No Search Console data yet. The first sync backfills up to 16 months and takes about a minute.
        </p>
      ) : null}

      {loaded ? (
        <div className={`mt-6 space-y-6 transition-opacity ${loading ? "opacity-60" : ""}`}>
          <p className="text-xs text-slate-500">
            {formatDay(loaded.range.start)} – {formatDay(loaded.range.end)}, compared with{" "}
            {formatDay(loaded.range.previousStart)} – {formatDay(loaded.range.previousEnd)}
          </p>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            <MetricCard
              label="Non-brand clicks"
              value={formatCount(loaded.split.current.nonBrand.clicks)}
              d={delta(loaded.split.current.nonBrand.clicks, loaded.split.previous.nonBrand.clicks)}
              hint="vs previous period"
            />
            <MetricCard
              label="Non-brand impressions"
              value={formatCount(loaded.split.current.nonBrand.impressions)}
              d={delta(loaded.split.current.nonBrand.impressions, loaded.split.previous.nonBrand.impressions)}
              hint="vs previous period"
            />
            <MetricCard
              label="All clicks"
              value={formatCount(loaded.totals.current.clicks)}
              d={delta(loaded.totals.current.clicks, loaded.totals.previous.clicks)}
              hint="vs previous period"
            />
            <MetricCard
              label="Average CTR"
              value={formatCtr(loaded.totals.current.ctr)}
              d={delta(loaded.totals.current.ctr, loaded.totals.previous.ctr)}
              hint="clicks ÷ impressions"
            />
            <MetricCard
              label="Average position"
              value={formatPosition(loaded.totals.current.position)}
              d={delta(loaded.totals.current.position, loaded.totals.previous.position, "position")}
              hint="lower is better"
            />
          </div>
          <SeoTrendChart daily={loaded.daily} />
          <BrandSplit data={loaded} />
          <QueriesTable data={loaded} segment={segment} onSegment={setSegment} />
          <PagesTable data={loaded} />
        </div>
      ) : null}
    </div>
  );
}
