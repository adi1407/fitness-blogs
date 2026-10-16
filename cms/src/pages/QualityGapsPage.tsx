import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiFetch, type Article } from "@/lib/api/client";

type Kind = "missing-image" | "thin" | "no-faq" | "no-related";

const TABS: { id: Kind; label: string }[] = [
  { id: "missing-image", label: "Missing cover" },
  { id: "no-faq", label: "No FAQ" },
  { id: "no-related", label: "No related" },
  { id: "thin", label: "Thin body" },
];

const KIND_SET = new Set<string>(TABS.map((t) => t.id));

type Counts = Record<Kind, number>;

export default function QualityGapsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const kindParam = searchParams.get("kind") ?? "missing-image";
  const kind: Kind = KIND_SET.has(kindParam)
    ? (kindParam as Kind)
    : "missing-image";

  function setKind(next: Kind) {
    setSearchParams({ kind: next });
  }
  const [articles, setArticles] = useState<Article[]>([]);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch<{
        articles: Article[];
        counts: Counts;
      }>(`/articles/quality-gaps?kind=${kind}&limit=50`);
      setArticles(data.articles ?? []);
      setCounts(data.counts ?? null);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [kind]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Quality queues</h1>
        <p className="mt-1 text-slate-600">
          Published articles that would fail today&apos;s publish gates — fix
          covers, FAQ, related links, or thin bodies.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setKind(tab.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
              kind === tab.id
                ? "bg-sky-500 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {tab.label}
            {counts ? (
              <span className="ml-1.5 opacity-80">({counts[tab.id]})</span>
            ) : null}
          </button>
        ))}
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Path</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                  Loading…
                </td>
              </tr>
            ) : articles.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                  No gaps in this queue.
                </td>
              </tr>
            ) : (
              articles.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      to={`/articles/${a.id}`}
                      className="font-medium text-sky-700 hover:underline"
                    >
                      {a.title || "Untitled"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">
                    {a.path ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {a.updatedAt
                      ? new Date(a.updatedAt).toLocaleDateString("en-IN")
                      : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
