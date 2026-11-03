import { useCallback, useEffect, useState, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { apiFetch } from "@/lib/api/client";

type DbHealth = {
  size: string;
  cacheHitPct: number | null;
  connections: number;
  version: string;
  tables: { name: string; rows: number; size: string; seqScans: number; idxScans: number | null }[];
  unusedIndexes: { table: string; index: string; size: string }[];
  queryStats: {
    available: boolean;
    reason: string | null;
    queries: { query: string; calls: number; totalMs: number; meanMs: number; rows: number }[];
  };
  slowQueries: { at: string; ms: number; sql: string }[];
};

const num = new Intl.NumberFormat("en-IN");

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{hint}</p>
    </div>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        {hint ? <p className="mt-0.5 text-xs text-slate-500">{hint}</p> : null}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

export default function DatabaseHealthPage() {
  const [data, setData] = useState<DbHealth | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await apiFetch<DbHealth>("/admin/db-health"));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Database health</h1>
          <p className="mt-1 max-w-2xl text-slate-600">
            Size, cache, the queries that cost the most time, and anything the API logged as slow
            (200 ms or more). Counters are since the database last restarted.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden />
          Refresh
        </button>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {!data && loading ? <p className="mt-6 text-sm text-slate-500">Loading…</p> : null}

      {data ? (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Stat label="Database size" value={data.size} hint={`Postgres ${data.version.split(" ")[0]}`} />
            <Stat
              label="Cache hit rate"
              value={data.cacheHitPct == null ? "—" : `${data.cacheHitPct}%`}
              hint="Reads served from memory; aim for 99%+"
            />
            <Stat label="Connections" value={String(data.connections)} hint="Open right now (API pool max 10)" />
            <Stat
              label="Slow queries"
              value={String(data.slowQueries.length)}
              hint="Logged by this API instance since it started"
            />
          </div>

          <Section
            title="Slow queries (this API instance)"
            hint="Newest first. Query text only — parameters are never recorded."
          >
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-2.5">When</th>
                  <th className="px-3 py-2.5 text-right">Time</th>
                  <th className="px-4 py-2.5">Query</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.slowQueries.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-slate-500">
                      None since the API started.
                    </td>
                  </tr>
                ) : (
                  data.slowQueries.map((q) => (
                    <tr key={`${q.at}-${q.ms}`} className="align-top">
                      <td className="whitespace-nowrap px-4 py-2.5 text-xs text-slate-500">
                        {new Date(q.at).toLocaleString("en-IN")}
                      </td>
                      <td className="px-3 py-2.5 text-right font-semibold tabular-nums">{q.ms} ms</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-slate-700">{q.sql}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Section>

          <Section
            title="Most expensive queries"
            hint={
              data.queryStats.available
                ? "By total time across all calls (pg_stat_statements)."
                : `Query statistics aren't available on this database: ${data.queryStats.reason ?? "unknown reason"}.`
            }
          >
            {data.queryStats.available ? (
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5">Query</th>
                    <th className="px-3 py-2.5 text-right">Calls</th>
                    <th className="px-3 py-2.5 text-right">Mean</th>
                    <th className="px-3 py-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.queryStats.queries.map((q) => (
                    <tr key={q.query} className="align-top">
                      <td className="max-w-[520px] px-4 py-2.5 font-mono text-xs text-slate-700">{q.query}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{num.format(q.calls)}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{q.meanMs} ms</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{num.format(Math.round(q.totalMs))} ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </Section>

          <Section title="Tables" hint="Largest first. Many sequential scans on a big table usually means a missing index.">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-2.5">Table</th>
                  <th className="px-3 py-2.5 text-right" title="Postgres's estimate; refreshes as the table is vacuumed">
                    Rows (est.)
                  </th>
                  <th className="px-3 py-2.5 text-right">Size</th>
                  <th className="px-3 py-2.5 text-right">Seq scans</th>
                  <th className="px-3 py-2.5 text-right">Index scans</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.tables.map((t) => (
                  <tr key={t.name}>
                    <td className="px-4 py-2 font-mono text-xs">{t.name}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{num.format(t.rows)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{t.size}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{num.format(t.seqScans)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{t.idxScans == null ? "—" : num.format(t.idxScans)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section
            title={`Indexes not used yet (${data.unusedIndexes.length})`}
            hint="Never scanned since stats reset. On small tables Postgres prefers scanning the table, so this is a watch list, not a delete list."
          >
            <table className="w-full min-w-[480px] text-left text-sm">
              <tbody className="divide-y divide-slate-100">
                {data.unusedIndexes.map((i) => (
                  <tr key={i.index}>
                    <td className="px-4 py-2 font-mono text-xs">{i.index}</td>
                    <td className="px-3 py-2 font-mono text-xs text-slate-500">{i.table}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-slate-500">{i.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </>
      ) : null}
    </div>
  );
}
