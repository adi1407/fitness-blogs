import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { apiFetch, type Article, type StaffUser } from "@/lib/api/client";
import {
  isOpenPanelEnabled,
  openPanelDashboardUrl,
} from "@/lib/analytics/openpanel";
import { AdminContentHealth } from "@/features/dashboard/components/AdminContentHealth";
import { AdminEeatGaps } from "@/features/dashboard/components/AdminEeatGaps";
import { AdminInactiveWriters } from "@/features/dashboard/components/AdminInactiveWriters";
import { AdminTopViews } from "@/features/dashboard/components/AdminTopViews";
import { publishedThisWeek } from "@/features/dashboard/utils/writerMetrics";
import {
  eeatGaps,
  inactiveWriters,
  pillarHealth,
  queueSnapshot,
  topViewedLive,
} from "@/features/dashboard/utils/adminMetrics";

type ActivitySummary = {
  eventsAllTime: number;
  last24h: { logins: number; publishes: number; newUsers: number };
};

type Props = {
  userName: string;
};

function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}

/** Admin home — ops KPIs, content health, EEAT, staff signals. */
export function AdminDesk({ userName }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [users, setUsers] = useState<StaffUser[]>([]);
  const [summary, setSummary] = useState<ActivitySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dash = openPanelDashboardUrl();
  const opOn = isOpenPanelEnabled();

  useEffect(() => {
    void (async () => {
      setError("");
      try {
        const [arts, userData, sum] = await Promise.all([
          apiFetch<{ articles: Article[] }>("/articles?limit=100"),
          apiFetch<{ users: StaffUser[] }>("/admin/users"),
          apiFetch<ActivitySummary>("/admin/activity/summary"),
        ]);
        setArticles(arts.articles);
        setUsers(userData.users);
        setSummary(sum);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load admin desk");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const pillars = useMemo(() => pillarHealth(articles), [articles]);
  const gaps = useMemo(() => eeatGaps(articles), [articles]);
  const inactive = useMemo(
    () => inactiveWriters(users, articles),
    [users, articles],
  );
  const top = useMemo(() => topViewedLive(articles), [articles]);
  const queue = useMemo(() => queueSnapshot(articles), [articles]);
  const weekPubs = useMemo(() => publishedThisWeek(articles).length, [articles]);
  const liveCount = articles.filter((a) => a.status === "published").length;
  const activeWriters = users.filter((u) => u.role === "writer" && u.isActive)
    .length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin desk</h1>
          <p className="mt-1 text-slate-600">
            Welcome, {userName}. Content health, EEAT, staff ops, and traffic
            entry points.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/articles?status=submitted"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-sky-400"
          >
            Review queue
          </Link>
          <Link
            to="/users"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-sky-400"
          >
            Users
          </Link>
          <Link
            to="/admin/analytics"
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Analytics
          </Link>
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      {loading ? (
        <p className="mt-8 text-slate-500">Loading admin desk…</p>
      ) : (
        <div className="mt-8 space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatTile
              label="Logins (24h)"
              value={summary?.last24h.logins ?? "—"}
            />
            <StatTile
              label="Publishes (24h)"
              value={summary?.last24h.publishes ?? "—"}
            />
            <StatTile
              label="New users (24h)"
              value={summary?.last24h.newUsers ?? "—"}
            />
            <StatTile label="Live library" value={liveCount} />
            <StatTile
              label="In review"
              value={queue.submitted}
              hint={
                queue.oldestWait
                  ? `Oldest ${queue.oldestWait}d`
                  : "Queue clear"
              }
            />
            <StatTile
              label="Published this week"
              value={weekPubs}
              hint={`${activeWriters} active writers`}
            />
          </div>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="font-semibold text-slate-900">Product traffic</h2>
              <p className="mt-2 text-sm text-slate-600">
                Funnels and page_view analytics live in OpenPanel.
                {opOn
                  ? " Tracking is enabled for this CMS."
                  : " Configure VITE_OPENPANEL_* to enable."}
              </p>
              {dash ? (
                <a
                  href={dash}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:underline"
                >
                  Open OpenPanel
                  <ExternalLink className="size-4" />
                </a>
              ) : (
                <Link
                  to="/admin/analytics"
                  className="mt-4 inline-flex text-sm font-semibold text-sky-700 hover:underline"
                >
                  Analytics setup →
                </Link>
              )}
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="font-semibold text-slate-900">Editorial ops</h2>
              <p className="mt-2 text-sm text-slate-600">
                Audit trail for publishes, logins, and staff changes.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/admin/activity"
                  className="text-sm font-semibold text-sky-700 hover:underline"
                >
                  Activity log →
                </Link>
                <Link
                  to="/writers"
                  className="text-sm font-semibold text-sky-700 hover:underline"
                >
                  Writers →
                </Link>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Events all-time: {summary?.eventsAllTime ?? "—"}
              </p>
            </div>
          </section>

          <AdminContentHealth pillars={pillars} />

          <div className="grid gap-6 lg:grid-cols-2">
            <AdminEeatGaps gaps={gaps} />
            <AdminInactiveWriters writers={inactive} />
          </div>

          <AdminTopViews articles={top} />
        </div>
      )}
    </div>
  );
}
