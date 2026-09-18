import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../lib/api/client";

const ACTION_LABELS: Record<string, string> = {
  "auth.login": "Login",
  "auth.logout": "Logout",
  "auth.login_failed": "Login failed",
  "article.created": "Article created",
  "article.updated": "Article updated",
  "article.submitted": "Submitted",
  "article.published": "Published",
  "article.unpublished": "Unpublished",
  "article.rejected": "Rejected",
  "article.deleted": "Article deleted",
  "user.created": "User created",
};

type AuditEvent = {
  id: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  summary: string;
  ip: string;
  createdAt: string;
};

type Summary = {
  eventsAllTime: number;
  last24h: { logins: number; publishes: number; newUsers: number };
};

/** Admin activity log — ported UX from news-kothari ghost ActivityLog. */
export default function ActivityLogPage() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 50;

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search.trim()) params.set("search", search.trim());
      if (actionFilter) params.set("action", actionFilter);

      const [act, sum] = await Promise.all([
        apiFetch<{ events: AuditEvent[]; total: number }>(
          `/admin/activity?${params}`,
        ),
        apiFetch<Summary>("/admin/activity/summary"),
      ]);
      setEvents(act.events);
      setTotal(act.total);
      setSummary(sum);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load activity");
    } finally {
      setLoading(false);
    }
  }, [page, search, actionFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Activity log</h1>
          <p className="mt-1 text-sm text-slate-500">
            Logins, edits, publishes, and failures — admin only.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      {summary ? (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Logins (24h)" value={summary.last24h.logins} />
          <Stat label="Published (24h)" value={summary.last24h.publishes} />
          <Stat label="New users (24h)" value={summary.last24h.newUsers} />
          <Stat label="Events (all time)" value={summary.eventsAllTime} />
        </div>
      ) : null}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search email, action, summary…"
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <select
          value={actionFilter}
          onChange={(e) => {
            setActionFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">All actions</option>
          {Object.entries(ACTION_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="mb-4 text-sm text-red-600">{error}</p>
      ) : null}

      {loading ? (
        <p className="py-12 text-center text-slate-500">Loading…</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Summary</th>
                <th className="px-4 py-3">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No events yet.
                  </td>
                </tr>
              ) : (
                events.map((ev) => (
                  <tr key={ev.id}>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                      {new Date(ev.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{ev.actorEmail || "—"}</div>
                      <div className="text-xs text-slate-400">{ev.actorRole}</div>
                    </td>
                    <td className="px-4 py-3">
                      {ACTION_LABELS[ev.action] || ev.action}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{ev.summary}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">
                      {ev.ip || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
        >
          Previous
        </button>
        <span className="px-2 py-1.5 text-sm text-slate-500">
          Page {page}
          {total > 0 ? ` · ${total} events` : ""}
        </span>
        <button
          type="button"
          disabled={page * limit >= total}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
