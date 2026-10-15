import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, BarChart3 } from "lucide-react";
import { apiFetch } from "@/lib/api/client";

const GA_URL = "https://analytics.google.com/";

type Summary = {
  eventsAllTime: number;
  last24h: { logins: number; publishes: number; newUsers: number };
};

/** Admin analytics hub — Google Analytics link + editorial audit summary. */
export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState("");

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
            Site traffic and funnels live in Google Analytics. Editorial ops
            (publishes, logins) stay in the fitlives activity log.
          </p>
        </div>
        <a
          href={GA_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Open Google Analytics
          <ExternalLink className="size-4" />
        </a>
      </div>

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
            Build this funnel in GA4 under Explore → Funnel exploration.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Editorial ops</h2>
          <p className="mt-2 text-sm text-slate-600">
            Audit trail for EEAT and staff actions stays in fitlives.
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
