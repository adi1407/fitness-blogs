import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "@/lib/api/client";

type SearchInsight = {
  id: string;
  query: string;
  queryNorm: string;
  hitCount: number;
  zeroCount: number;
  lastResults: number;
  lastSeenAt: string;
  createdAt: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SearchInsightsPage() {
  const [zeroOnly, setZeroOnly] = useState(true);
  const [queries, setQueries] = useState<SearchInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "50" });
    if (zeroOnly) params.set("zeroOnly", "1");
    try {
      const data = await apiFetch<{ queries: SearchInsight[] }>(
        `/admin/search-insights?${params}`,
      );
      setQueries(data.queries ?? []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [zeroOnly]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Search insights</h1>
          <p className="mt-1 text-slate-600">
            Queries from the public site search. Zero-result rows are content
            requests — turn them into briefs or articles.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={zeroOnly}
            onChange={(e) => setZeroOnly(e.target.checked)}
          />
          Zero-result only
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Query</th>
              <th className="px-4 py-3">Zeros</th>
              <th className="px-4 py-3">Hits</th>
              <th className="px-4 py-3">Last results</th>
              <th className="px-4 py-3">Last seen</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  Loading…
                </td>
              </tr>
            ) : queries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No search queries logged yet. They appear after visitors use
                  /search on the site.
                </td>
              </tr>
            ) : (
              queries.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {row.query}
                  </td>
                  <td className="px-4 py-3">{row.zeroCount}</td>
                  <td className="px-4 py-3">{row.hitCount}</td>
                  <td className="px-4 py-3">{row.lastResults}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {formatDate(row.lastSeenAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/assignments?q=${encodeURIComponent(row.query)}`}
                        className="text-xs font-semibold text-sky-700 hover:underline"
                      >
                        New brief
                      </Link>
                      <Link
                        to={`/articles/new?title=${encodeURIComponent(row.query)}`}
                        className="text-xs font-semibold text-sky-700 hover:underline"
                      >
                        New article
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
