import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "@/lib/api/client";

type Counts = {
  "missing-image": number;
  thin: number;
  "no-faq": number;
  "no-related": number;
};

/** Compact quality-gap counts for editor/admin desks. */
export function QualityGapsCards() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    void apiFetch<{ counts: Counts }>(
      "/articles/quality-gaps?kind=missing-image&limit=1",
    )
      .then((data) => setCounts(data.counts))
      .catch(() => setCounts(null));
  }, []);

  if (!counts) return null;

  const tiles: { kind: keyof Counts; label: string }[] = [
    { kind: "missing-image", label: "Missing cover" },
    { kind: "no-faq", label: "No FAQ" },
    { kind: "no-related", label: "No related" },
    { kind: "thin", label: "Thin body" },
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-900">Quality queues</h2>
        <Link
          to="/quality"
          className="text-sm font-semibold text-sky-700 hover:underline"
        >
          Open queues
        </Link>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Published pieces that still fail today&apos;s publish gates.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <Link
            key={t.kind}
            to={`/quality?kind=${t.kind}`}
            className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 hover:border-sky-200 hover:bg-sky-50"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {counts[t.kind]}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
