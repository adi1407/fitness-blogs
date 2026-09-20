import { Link } from "react-router-dom";
import type { PillarHealth } from "@/features/dashboard/utils/adminMetrics";

type Props = {
  pillars: PillarHealth[];
};

/** Content depth by locked pillar. */
export function AdminContentHealth({ pillars }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="font-semibold text-slate-900">Content health</h2>
        <p className="text-xs text-slate-500">
          Live depth by pillar — thin = published below quality gates.
        </p>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        {pillars.map((p) => (
          <div
            key={p.slug}
            className={`rounded-lg border p-4 ${
              p.empty
                ? "border-amber-300 bg-amber-50/50"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-900">{p.label}</h3>
              {p.empty ? (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-900">
                  Empty
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{p.live}</span> live
              {p.thinLive > 0 ? (
                <span className="text-amber-800">
                  {" "}
                  · {p.thinLive} thin
                </span>
              ) : null}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {p.inReview} in review · {p.drafts} drafts
            </p>
            <Link
              to={`/articles?category=${p.slug}&status=published`}
              className="mt-3 inline-block text-xs font-semibold text-sky-700 hover:underline"
            >
              Browse live →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
