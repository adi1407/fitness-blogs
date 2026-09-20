import { Link } from "react-router-dom";
import type { Article } from "@/lib/api/client";
import {
  PILLAR_LABELS,
  PILLAR_SLUGS,
  type PillarSlug,
} from "@/features/dashboard/utils/writerMetrics";

type Props = {
  articles: Article[];
};

type PillarStats = {
  slug: PillarSlug;
  label: string;
  draft: number;
  inReview: number;
  live: number;
  recent: Article[];
};

function buildPillars(articles: Article[]): PillarStats[] {
  return PILLAR_SLUGS.map((slug) => {
    const inPillar = articles.filter((a) => a.categorySlug === slug);
    const recent = [...inPillar]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .slice(0, 3);
    return {
      slug,
      label: PILLAR_LABELS[slug],
      draft: inPillar.filter(
        (a) =>
          a.status === "draft" ||
          a.status === "changes_requested" ||
          a.status === "rejected",
      ).length,
      inReview: inPillar.filter((a) => a.status === "submitted").length,
      live: inPillar.filter((a) => a.status === "published").length,
      recent,
    };
  });
}

/** Cluster focus — counts + recent titles per locked pillar. */
export function WriterPillarClusters({ articles }: Props) {
  const pillars = buildPillars(articles);

  return (
    <section>
      <div className="mb-3">
        <h2 className="font-semibold text-slate-900">Articles by pillar</h2>
        <p className="text-xs text-slate-500">
          Deepen clusters — prefer depth in a pillar over random volume.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((p) => (
          <div
            key={p.slug}
            className={`rounded-xl border bg-white p-4 ${
              p.live === 0
                ? "border-amber-300 ring-1 ring-amber-100"
                : "border-slate-200"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-900">{p.label}</h3>
              {p.live === 0 ? (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-900">
                  Needs depth
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {p.draft} draft · {p.inReview} in review · {p.live} live
            </p>
            <ul className="mt-3 space-y-1.5">
              {p.recent.length === 0 ? (
                <li className="text-sm text-slate-400">No articles yet.</li>
              ) : (
                p.recent.map((a) => (
                  <li key={a.id}>
                    <Link
                      to={`/articles/${a.id}`}
                      className="line-clamp-1 text-sm font-medium text-sky-700 hover:underline"
                    >
                      {a.title || "Untitled"}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
