import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchClusterMap,
  type ClusterCategory,
  type ClusterSubcategory,
} from "@/features/linking/clusterMap";

const STATUS_LABEL: Record<string, string> = {
  published: "Live",
  submitted: "In review",
  draft: "Draft",
  changes_requested: "Changes requested",
  rejected: "Rejected",
};

function topicHealth(sub: ClusterSubcategory): { label: string; tone: string } {
  if (sub.published === 0) return { label: "Gap", tone: "bg-red-100 text-red-800" };
  if (sub.published < 3) return { label: "Thin", tone: "bg-amber-100 text-amber-800" };
  if (sub.noLinksIn > 0 || sub.unlinkedPairCount > sub.published) {
    return { label: "Needs links", tone: "bg-amber-100 text-amber-800" };
  }
  return { label: "Healthy", tone: "bg-emerald-100 text-emerald-800" };
}

function SubcategoryCard({ categoryLabel, sub }: { categoryLabel: string; sub: ClusterSubcategory }) {
  const [open, setOpen] = useState(false);
  const health = topicHealth(sub);
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50"
      >
        <div className="min-w-0">
          <p className="font-semibold text-slate-900">{sub.label}</p>
          <p className="mt-0.5 text-xs text-slate-500">
            {sub.published} live · {sub.inProgress} in progress
            {sub.published > 0 ? (
              <>
                {" "}
                · {sub.noLinksIn} with no links in · {sub.unlinkedPairCount} unlinked pair
                {sub.unlinkedPairCount === 1 ? "" : "s"}
              </>
            ) : null}
          </p>
        </div>
        <span className="flex items-center gap-2">
          <span className={`rounded px-2 py-0.5 text-xs font-semibold ${health.tone}`}>{health.label}</span>
          <span className="text-xs text-slate-400" aria-hidden>
            {open ? "▲" : "▼"}
          </span>
        </span>
      </button>

      {open ? (
        <div className="border-t border-slate-100 px-4 py-3">
          {sub.published === 0 ? (
            <p className="text-sm text-slate-600">
              No live article yet.{" "}
              <Link
                to={`/assignments?q=${encodeURIComponent(`${categoryLabel}: ${sub.label}`)}`}
                className="font-semibold text-sky-700 hover:underline"
              >
                Create a brief
              </Link>
            </p>
          ) : null}

          {sub.articles.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-xs uppercase text-slate-500">
                  <tr>
                    <th className="py-2 pr-3">Article</th>
                    <th className="px-3 py-2 text-right" title="Live articles linking here (body links and related picks)">
                      Links in
                    </th>
                    <th className="px-3 py-2 text-right" title="Of those, from this topic">
                      From topic
                    </th>
                    <th className="px-3 py-2 text-right" title="Links from this article to others in the topic">
                      To topic
                    </th>
                    <th className="py-2 pl-3 text-right" title="Content links counted on the live site by the latest crawl">
                      Live
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sub.articles.map((a) => {
                    const live = a.status === "published";
                    return (
                      <tr key={a.id}>
                        <td className="max-w-[320px] py-2 pr-3">
                          <Link
                            to={`/articles/${a.id}`}
                            className="block truncate font-medium text-sky-700 hover:underline"
                            title={a.title}
                          >
                            {a.title || "Untitled"}
                          </Link>
                          {!live ? (
                            <span className="text-xs text-slate-500">{STATUS_LABEL[a.status] ?? a.status}</span>
                          ) : null}
                        </td>
                        <td
                          className={`px-3 py-2 text-right tabular-nums ${
                            live && a.linksIn === 0 ? "font-semibold text-red-700" : ""
                          }`}
                        >
                          {live ? a.linksIn : "—"}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">{live ? a.linksInSameTopic : "—"}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{live ? a.linksOutSameTopic : "—"}</td>
                        <td className="py-2 pl-3 text-right tabular-nums text-slate-500">
                          {a.liveContentLinks ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}

          {sub.unlinkedPairs.length ? (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Same-topic articles that don&apos;t link to each other
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {sub.unlinkedPairs.map((p) => (
                  <li key={`${p.a.id}-${p.b.id}`} className="text-slate-700">
                    <Link to={`/articles/${p.a.id}`} className="text-sky-700 hover:underline">
                      {p.a.title}
                    </Link>{" "}
                    <span className="text-slate-400">↔</span>{" "}
                    <Link to={`/articles/${p.b.id}`} className="text-sky-700 hover:underline">
                      {p.b.title}
                    </Link>
                  </li>
                ))}
                {sub.unlinkedPairCount > sub.unlinkedPairs.length ? (
                  <li className="text-xs text-slate-500">
                    and {sub.unlinkedPairCount - sub.unlinkedPairs.length} more
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default function TopicClustersPage() {
  const [data, setData] = useState<ClusterCategory[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetchClusterMap()
      .then((d) => active && setData(d))
      .catch((err) => active && setError(err instanceof Error ? err.message : "Failed to load"));
    return () => {
      active = false;
    };
  }, []);

  const totals = useMemo(() => {
    const subs = (data ?? []).flatMap((c) => c.subcategories);
    return {
      topics: subs.length,
      gaps: subs.filter((s) => s.published === 0).length,
      thin: subs.filter((s) => s.published > 0 && s.published < 3).length,
      noLinksIn: subs.reduce((n, s) => n + s.noLinksIn, 0),
      unlinkedPairs: subs.reduce((n, s) => n + s.unlinkedPairCount, 0),
    };
  }, [data]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Topic clusters</h1>
      <p className="mt-1 max-w-2xl text-slate-600">
        Coverage and internal links for every pillar and topic. Google ranks clusters, not lone
        posts: each topic needs several live articles that link to each other.
      </p>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {!data && !error ? <p className="mt-6 text-sm text-slate-500">Loading…</p> : null}

      {data ? (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
            {(
              [
                ["Topics", totals.topics, "Subcategories in the taxonomy"],
                ["Gaps", totals.gaps, "No live article yet"],
                ["Thin", totals.thin, "Only 1–2 live articles"],
                ["No links in", totals.noLinksIn, "Live articles nothing links to"],
                ["Unlinked pairs", totals.unlinkedPairs, "Same-topic articles not linked"],
              ] as const
            ).map(([label, value, hint]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">{value}</p>
                <p className="mt-0.5 text-xs text-slate-500">{hint}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-8">
            {data.map((cat) => (
              <section key={cat.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold text-slate-900">{cat.label}</h2>
                  <p className="text-sm text-slate-500">
                    {cat.published} live article{cat.published === 1 ? "" : "s"}
                    {cat.gaps ? ` · ${cat.gaps} topic gap${cat.gaps === 1 ? "" : "s"}` : ""}
                  </p>
                </div>
                <div className="mt-3 grid items-start gap-3 lg:grid-cols-2">
                  {cat.subcategories.map((sub) => (
                    <SubcategoryCard key={sub.slug} categoryLabel={cat.label} sub={sub} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
