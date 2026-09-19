import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, BarChart3 } from "lucide-react";
import { apiFetch } from "@/lib/api/client";
import {
  isOpenPanelEnabled,
  openPanelDashboardUrl,
} from "@/lib/analytics/openpanel";

type Summary = {
  eventsAllTime: number;
  last24h: { logins: number; publishes: number; newUsers: number };
};

/** Admin product analytics hub — OpenPanel deep link + editorial audit summary. */
export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState("");
  const dashboardUrl = openPanelDashboardUrl();
  const trackingOn = isOpenPanelEnabled();
  const opReady = trackingOn || Boolean(dashboardUrl);

  useEffect(() => {
    void (async () => {
      try {
        const sum = await apiFetch<Summary>("/admin/activity/summary");
        setSummary(sum);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load summary");
      }
    })();
  }, []);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Product traffic and funnels live in OpenPanel. Editorial ops
            (publishes, logins) stay in the FitKnowledge activity log.
          </p>
        </div>
        {dashboardUrl ? (
          <a
            href={dashboardUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Open OpenPanel
            <ExternalLink className="size-4" />
          </a>
        ) : null}
      </div>

      {!opReady ? (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          OpenPanel is optional. To enable the dashboard link and tracking, add
          to <code className="font-mono text-xs">cms/.env</code>:{" "}
          <code className="font-mono text-xs">VITE_OPENPANEL_DASHBOARD_URL</code>{" "}
          and{" "}
          <code className="font-mono text-xs">VITE_OPENPANEL_CLIENT_ID</code>,
          then restart the CMS. See{" "}
          <span className="font-medium">docs/ANALYTICS_OPENPANEL.md</span>.
        </div>
      ) : !trackingOn ? (
        <div className="mb-6 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">
          Dashboard link is set. Add{" "}
          <code className="font-mono text-xs">VITE_OPENPANEL_CLIENT_ID</code>{" "}
          (from the OpenPanel project) to send CMS events. Restart Vite after
          changing <code className="font-mono text-xs">cms/.env</code>.
        </div>
      ) : null}

      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile
          label="Events (all time)"
          value={summary?.eventsAllTime ?? "—"}
        />
        <Tile label="Logins (24h)" value={summary?.last24h.logins ?? "—"} />
        <Tile
          label="Publishes (24h)"
          value={summary?.last24h.publishes ?? "—"}
        />
        <Tile
          label="New users (24h)"
          value={summary?.last24h.newUsers ?? "—"}
        />
      </div>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-sky-600" />
            <h2 className="font-semibold text-slate-900">Suggested funnel</h2>
          </div>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>
              <code className="rounded bg-slate-100 px-1 text-xs">page_view</code>{" "}
              — site visit
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1 text-xs">
                article_open
              </code>{" "}
              /{" "}
              <code className="rounded bg-slate-100 px-1 text-xs">hub_click</code>{" "}
              — content engagement
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1 text-xs">calc_open</code>{" "}
              →{" "}
              <code className="rounded bg-slate-100 px-1 text-xs">
                calc_complete
              </code>{" "}
              — tool conversion
            </li>
          </ol>
          <p className="mt-4 text-xs text-slate-500">
            Build this funnel inside OpenPanel after events start flowing.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Editorial ops</h2>
          <p className="mt-2 text-sm text-slate-600">
            Audit trail for EEAT and staff actions stays in FitKnowledge.
          </p>
          <Link
            to="/admin/activity"
            className="mt-4 inline-flex text-sm font-semibold text-sky-700 hover:underline"
          >
            Open activity log →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Tile({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
