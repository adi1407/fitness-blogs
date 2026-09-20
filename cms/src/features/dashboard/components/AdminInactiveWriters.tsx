import { Link } from "react-router-dom";
import type { InactiveWriter } from "@/features/dashboard/utils/adminMetrics";

type Props = {
  writers: InactiveWriter[];
};

/** Active writers with no live publish in 30+ days. */
export function AdminInactiveWriters({ writers }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-slate-100 px-4 py-3">
        <div>
          <h2 className="font-semibold text-slate-900">Inactive writers</h2>
          <p className="text-xs text-slate-500">
            No live article in the last 30 days (or never published).
          </p>
        </div>
        <Link
          to="/users"
          className="text-xs font-semibold text-sky-700 hover:underline"
        >
          Manage users →
        </Link>
      </div>
      <ul className="divide-y divide-slate-100">
        {writers.length === 0 ? (
          <li className="px-4 py-6 text-sm text-slate-500">
            All active writers have recent live pieces.
          </li>
        ) : (
          writers.map((w) => (
            <li
              key={w.user.id}
              className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
            >
              <div>
                <p className="font-medium text-slate-900">{w.user.name}</p>
                <p className="text-xs text-slate-500">{w.user.email}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                {w.daysSinceLive === null
                  ? "Never published"
                  : `${w.daysSinceLive}d since live`}
              </span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
