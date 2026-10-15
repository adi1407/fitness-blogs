import { Link } from "react-router-dom";

type Props = {
  submitted: number;
  published: number;
  totalViews: number;
  role: "editor" | "admin" | "writer";
};

/** Compact analytics strip for role dashboards. */
export function AnalyticsOverviewCards({
  submitted,
  published,
  totalViews,
  role,
}: Props) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Analytics
        </h2>
        {role === "admin" ? (
          <Link
            to="/admin/analytics"
            className="text-sm font-semibold text-sky-700 hover:underline"
          >
            Full analytics →
          </Link>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card
          label={role === "writer" ? "Your live articles" : "In review"}
          value={role === "writer" ? published : submitted}
          hint={role === "writer" ? "Published" : "Submitted queue"}
        />
        <Card
          label={role === "writer" ? "Total views" : "Published"}
          value={role === "writer" ? totalViews : published}
          hint={role === "writer" ? "Across live pieces" : "Live library"}
        />
      </div>
    </section>
  );
}

function Card({
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
