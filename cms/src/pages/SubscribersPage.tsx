import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  apiDownload,
  apiFetch,
  type Subscriber,
  type SubscriberSummary,
} from "@/lib/api/client";
import { useAuth } from "@/context/AuthContext";

type Status = "active" | "unsubscribed" | "all";

type ListResponse = {
  subscribers: Subscriber[];
  total: number;
  page: number;
  limit: number;
  summary: SubscriberSummary;
};

const PAGE_SIZE = 50;

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SubscribersPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [status, setStatus] = useState<Status>("active");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);

  const load = useCallback(async () => {
    const params = new URLSearchParams({
      status,
      page: String(page),
      limit: String(PAGE_SIZE),
    });
    if (search) params.set("search", search);
    try {
      const res = await apiFetch<ListResponse>(`/admin/subscribers?${params}`);
      setData(res);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  }, [status, page, search]);

  useEffect(() => {
    void load();
  }, [load]);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setPage(1);
    setSearch(searchInput.trim());
  }

  async function onExport() {
    setExporting(true);
    setError("");
    try {
      const day = new Date().toISOString().slice(0, 10);
      await apiDownload(
        `/admin/subscribers/export.csv?status=${status}`,
        `fitlives-subscribers-${day}.csv`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setExporting(false);
    }
  }

  const summary = data?.summary;
  const totalPages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Subscribers</h1>
          <p className="mt-1 max-w-2xl text-slate-600">
            Email signups from calculators, articles and the /start page. Source
            shows where each person subscribed.
          </p>
        </div>
        {isAdmin ? (
          <button
            type="button"
            onClick={() => void onExport()}
            disabled={exporting}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {exporting ? "Exporting…" : "Export CSV"}
          </button>
        ) : null}
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-slate-500">Active</p>
          <p className="mt-1 text-2xl font-bold">{summary?.active ?? "—"}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-slate-500">Unsubscribed</p>
          <p className="mt-1 text-2xl font-bold">{summary?.unsubscribed ?? "—"}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-slate-500">Top sources</p>
          {summary && summary.bySource.length > 0 ? (
            <ul className="mt-1 space-y-0.5 text-sm">
              {summary.bySource.slice(0, 4).map((s) => (
                <li key={s.source} className="flex justify-between gap-2">
                  <span className="font-mono text-xs text-slate-700">{s.source}</span>
                  <span className="font-semibold">{s.active}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-slate-500">No signups yet</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
          {(["active", "unsubscribed", "all"] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={status === s}
              onClick={() => {
                setLoading(true);
                setPage(1);
                setStatus(s);
              }}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize ${
                status === s ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={onSearch} className="flex gap-2">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search email"
            className="w-56 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Subscribed</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && !data ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  Loading…
                </td>
              </tr>
            ) : !data || data.subscribers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No subscribers match.
                </td>
              </tr>
            ) : (
              data.subscribers.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3 font-mono text-xs">{s.source}</td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(s.createdAt)}</td>
                  <td className="px-4 py-3">
                    {s.unsubscribedAt ? (
                      <span className="text-slate-500">
                        Unsubscribed {formatDate(s.unsubscribedAt)}
                      </span>
                    ) : (
                      <span className="font-medium text-emerald-700">Active</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data && data.total > PAGE_SIZE ? (
        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-slate-500">
            Page {page} of {totalPages} · {data.total} total
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-semibold disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-semibold disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
