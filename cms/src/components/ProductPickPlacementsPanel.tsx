import { useEffect, useRef, useState } from "react";
import { CALCULATOR_PAGES } from "@/constants/calculators";
import {
  apiFetch,
  type Article,
  type CmsKnowledgePage,
  type ProductPickPlacement,
} from "@/lib/api/client";

type SearchHit = {
  articleNumber: number | null;
  title: string;
  status: string;
};

type Props = {
  placements: ProductPickPlacement[];
  onChange: (next: ProductPickPlacement[]) => void;
};

function calcLabel(path: string) {
  return CALCULATOR_PAGES.find((c) => c.path === path)?.label ?? path;
}

export function ProductPickPlacementsPanel({ placements, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [reviews, setReviews] = useState<CmsKnowledgePage[]>([]);
  const [articleTitles, setArticleTitles] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    void apiFetch<{ pages: CmsKnowledgePage[] }>("/knowledge-pages?section=reviews")
      .then((data) => setReviews((data.pages ?? []).filter((p) => !p.isHub)))
      .catch(() => setReviews([]));
  }, []);

  useEffect(() => {
    const missing = placements
      .map((p) => p.target)
      .filter((t) => t.startsWith("article:") && !articleTitles[t]);
    if (!missing.length) return;
    void Promise.all(
      missing.map(async (target) => {
        const num = target.slice("article:".length);
        try {
          const data = await apiFetch<{ article: Article }>(
            `/articles/lookup-by-number/${num}`,
          );
          return [target, data.article.title || `Article #${num}`] as const;
        } catch {
          return [target, `Article #${num} (not found)`] as const;
        }
      }),
    ).then((pairs) =>
      setArticleTitles((prev) => ({ ...prev, ...Object.fromEntries(pairs) })),
    );
  }, [placements, articleTitles]);

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    const q = query.trim();
    if (q.length < 2) {
      setHits([]);
      return;
    }
    debounce.current = setTimeout(() => {
      void apiFetch<{ articles: SearchHit[] }>(
        `/articles/search?q=${encodeURIComponent(q)}&limit=8`,
      )
        .then((data) => setHits(data.articles ?? []))
        .catch(() => setHits([]));
    }, 250);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [query]);

  function add(target: string, label?: string) {
    setError("");
    if (placements.some((p) => p.target === target)) {
      setError("Already placed there");
      return;
    }
    if (label && target.startsWith("article:")) {
      setArticleTitles((prev) => ({ ...prev, [target]: label }));
    }
    onChange([...placements, { target, sortOrder: 0 }]);
  }

  function labelFor(target: string) {
    if (target.startsWith("article:")) {
      return `Article · ${articleTitles[target] ?? target.slice(8)}`;
    }
    if (target.startsWith("calc:")) return `Calculator · ${calcLabel(target.slice(5))}`;
    if (target.startsWith("review:")) {
      const slug = target.slice(7);
      return `Review · ${reviews.find((r) => r.slug === slug)?.title ?? slug}`;
    }
    return target;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold">Where this pick appears</h2>
      <p className="mt-1 text-sm text-slate-500">
        Each page shows at most 3 published picks, in the order set below
        (lower number first).
      </p>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <div>
          <label className="text-sm font-medium" htmlFor="pick-article-search">
            Add an article
          </label>
          <input
            id="pick-article-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title…"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          {hits.length > 0 ? (
            <ul className="mt-2 max-h-48 overflow-auto rounded-lg border border-slate-200 bg-slate-50">
              {hits.map((h) => (
                <li
                  key={`${h.articleNumber}-${h.title}`}
                  className="flex items-center justify-between gap-2 border-b border-slate-100 px-3 py-2 text-sm last:border-0"
                >
                  <span className="min-w-0 truncate">
                    {h.title}
                    <span className="ml-1 text-xs text-slate-400">{h.status}</span>
                  </span>
                  <button
                    type="button"
                    disabled={!h.articleNumber}
                    onClick={() => {
                      add(`article:${h.articleNumber}`, h.title);
                      setQuery("");
                      setHits([]);
                    }}
                    className="shrink-0 rounded bg-sky-500 px-2 py-1 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <label className="text-sm font-medium">
          Add a calculator
          <select
            value=""
            onChange={(e) => e.target.value && add(`calc:${e.target.value}`)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Choose…</option>
            {CALCULATOR_PAGES.map((c) => (
              <option key={c.path} value={c.path}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium">
          Add a review page
          <select
            value=""
            onChange={(e) => e.target.value && add(`review:${e.target.value}`)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">{reviews.length ? "Choose…" : "No review pages"}</option>
            {reviews.map((r) => (
              <option key={r.id} value={r.slug}>
                {r.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

      <ul className="mt-4 divide-y divide-slate-100 rounded-lg border border-slate-100">
        {placements.length === 0 ? (
          <li className="px-3 py-4 text-sm text-slate-500">
            Not placed anywhere yet.
          </li>
        ) : (
          placements.map((p) => (
            <li
              key={p.target}
              className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 text-sm"
            >
              <span className="min-w-0 truncate font-medium text-slate-800">
                {labelFor(p.target)}
              </span>
              <span className="flex items-center gap-3">
                <label className="flex items-center gap-1 text-xs text-slate-500">
                  Order
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={p.sortOrder}
                    onChange={(e) =>
                      onChange(
                        placements.map((x) =>
                          x.target === p.target
                            ? { ...x, sortOrder: Math.max(0, Number(e.target.value) || 0) }
                            : x,
                        ),
                      )
                    }
                    className="w-16 rounded border border-slate-200 px-2 py-1 text-sm"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => onChange(placements.filter((x) => x.target !== p.target))}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
