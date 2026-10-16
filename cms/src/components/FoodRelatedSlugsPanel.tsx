import { useEffect, useRef, useState } from "react";
import { apiFetch, type CmsFood } from "@/lib/api/client";

const MAX_RELATED = 8;

type Props = {
  relatedSlugs: string[];
  excludeSlug?: string;
  disabled?: boolean;
  onChange: (slugs: string[]) => void;
};

export function FoodRelatedSlugsPanel({
  relatedSlugs,
  excludeSlug,
  disabled,
  onChange,
}: Props) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<CmsFood[]>([]);
  const [error, setError] = useState("");
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    const q = query.trim();
    if (q.length < 2) {
      setHits([]);
      return;
    }
    debounce.current = setTimeout(() => {
      void apiFetch<{ foods: CmsFood[] }>(
        `/foods?q=${encodeURIComponent(q)}`,
      )
        .then((data) =>
          setHits(
            (data.foods ?? []).filter(
              (f) => f.slug !== excludeSlug && !relatedSlugs.includes(f.slug),
            ),
          ),
        )
        .catch(() => setHits([]));
    }, 250);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [query, excludeSlug, relatedSlugs]);

  function add(slug: string) {
    setError("");
    if (relatedSlugs.includes(slug)) {
      setError("Already linked");
      return;
    }
    if (relatedSlugs.length >= MAX_RELATED) {
      setError(`Maximum ${MAX_RELATED} related foods`);
      return;
    }
    onChange([...relatedSlugs, slug]);
    setQuery("");
    setHits([]);
  }

  function remove(slug: string) {
    onChange(relatedSlugs.filter((s) => s !== slug));
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold">Related foods</h3>
      <p className="mt-1 text-xs text-slate-500">
        Search and pick up to {MAX_RELATED} related food pages.
      </p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={disabled}
        placeholder="Search foods…"
        className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
      />
      {hits.length > 0 ? (
        <ul className="mt-2 max-h-40 overflow-auto rounded-lg border border-slate-200 bg-slate-50">
          {hits.slice(0, 10).map((f) => (
            <li
              key={f.id}
              className="flex items-center justify-between gap-2 border-b border-slate-100 px-3 py-2 text-sm last:border-0"
            >
              <span className="truncate">
                {f.name}{" "}
                <span className="font-mono text-xs text-slate-400">
                  {f.slug}
                </span>
              </span>
              <button
                type="button"
                disabled={disabled}
                onClick={() => add(f.slug)}
                className="shrink-0 rounded bg-sky-500 px-2 py-1 text-xs font-semibold text-white"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      <ul className="mt-3 flex flex-wrap gap-2">
        {relatedSlugs.length === 0 ? (
          <li className="text-xs text-slate-500">None yet.</li>
        ) : (
          relatedSlugs.map((slug) => (
            <li
              key={slug}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs"
            >
              {slug}
              <button
                type="button"
                disabled={disabled}
                onClick={() => remove(slug)}
                className="font-sans font-semibold text-red-600"
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
