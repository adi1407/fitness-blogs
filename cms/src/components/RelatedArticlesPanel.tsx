import { useEffect, useRef, useState } from "react";
import { apiFetch, type Article } from "@/lib/api/client";
import {
  buildReadAlsoHtml,
  insertRelatedLinkBlock,
  MAX_RELATED_LINKS,
  removeRelatedLinkFromHtml,
} from "@/utils/relatedArticleLinks";

type Linked = {
  articleNumber: number;
  title: string;
  path: string | null;
};

type SearchHit = {
  articleNumber: number | null;
  title: string;
  path: string | null;
  status: string;
  slug: string | null;
};

type Props = {
  linked: Linked[];
  body: string;
  currentArticleNumber: number | null;
  disabled?: boolean;
  onChange: (next: {
    linked: Linked[];
    relatedArticleNumbers: number[];
    body?: string;
  }) => void;
};

export function RelatedArticlesPanel({
  linked,
  body,
  currentArticleNumber,
  disabled,
  onChange,
}: Props) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    const q = query.trim();
    if (q.length < 2) {
      setHits([]);
      return;
    }
    // Pure 9-digit ID → no search; use Link buttons
    if (/^\d{9}$/.test(q.replace(/\D/g, "")) && q.replace(/\D/g, "").length === 9) {
      setHits([]);
      return;
    }
    debounce.current = setTimeout(() => {
      void apiFetch<{ articles: SearchHit[] }>(
        `/articles/search?q=${encodeURIComponent(q)}&limit=10`,
      )
        .then((data) => setHits(data.articles ?? []))
        .catch(() => setHits([]));
    }, 250);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [query]);

  async function addArticle(hit: SearchHit, alsoInsertBody: boolean) {
    setError("");
    const num = hit.articleNumber;
    if (!num) {
      setError("Article has no public ID yet");
      return;
    }
    if (currentArticleNumber && num === currentArticleNumber) {
      setError("Cannot link an article to itself");
      return;
    }
    if (linked.some((l) => l.articleNumber === num)) {
      setError("Already linked");
      return;
    }
    if (linked.length >= MAX_RELATED_LINKS) {
      setError(`Maximum ${MAX_RELATED_LINKS} linked articles`);
      return;
    }

    const nextLinked = [
      ...linked,
      {
        articleNumber: num,
        title: hit.title || `Article #${num}`,
        path: hit.path,
      },
    ];
    let nextBody: string | undefined;
    if (alsoInsertBody) {
      const block = buildReadAlsoHtml(
        num,
        hit.title || `Article #${num}`,
        hit.path,
      );
      nextBody = insertRelatedLinkBlock(body, block, linked.length);
    }
    onChange({
      linked: nextLinked,
      relatedArticleNumbers: nextLinked.map((l) => l.articleNumber),
      body: nextBody,
    });
    setQuery("");
    setHits([]);
  }

  async function addById(alsoInsertBody: boolean) {
    setError("");
    const raw = query.trim().replace(/\D/g, "");
    const num = Number(raw);
    if (!Number.isInteger(num) || raw.length !== 9) {
      setError("Search by title, or paste a 9-digit article ID");
      return;
    }
    if (currentArticleNumber && num === currentArticleNumber) {
      setError("Cannot link an article to itself");
      return;
    }
    if (linked.some((l) => l.articleNumber === num)) {
      setError("Already linked");
      return;
    }
    if (linked.length >= MAX_RELATED_LINKS) {
      setError(`Maximum ${MAX_RELATED_LINKS} linked articles`);
      return;
    }

    setBusy(true);
    try {
      const data = await apiFetch<{ article: Article }>(
        `/articles/lookup-by-number/${num}`,
      );
      const a = data.article;
      if (!a.articleNumber) {
        setError("Article has no public ID yet");
        return;
      }
      await addArticle(
        {
          articleNumber: a.articleNumber,
          title: a.title || `Article #${a.articleNumber}`,
          path: a.path,
          status: a.status,
          slug: a.slug,
        },
        alsoInsertBody,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed");
    } finally {
      setBusy(false);
    }
  }

  function remove(num: number) {
    const nextLinked = linked.filter((l) => l.articleNumber !== num);
    onChange({
      linked: nextLinked,
      relatedArticleNumbers: nextLinked.map((l) => l.articleNumber),
      body: removeRelatedLinkFromHtml(body, num),
    });
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold">Linked articles</h2>
      <p className="mt-1 text-sm text-slate-500">
        Search by title or slug, or paste a 9-digit article ID. Optional “Read
        also” insert into the body. Max {MAX_RELATED_LINKS}.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={disabled || busy}
          placeholder="Search title… or 482917365"
          className="min-w-[12rem] flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <button
          type="button"
          disabled={disabled || busy}
          onClick={() => void addById(false)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          Link ID
        </button>
        <button
          type="button"
          disabled={disabled || busy}
          onClick={() => void addById(true)}
          className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Link ID + Read also
        </button>
      </div>

      {hits.length > 0 ? (
        <ul className="mt-2 max-h-48 overflow-auto rounded-lg border border-slate-200 bg-slate-50">
          {hits.map((h) => (
            <li
              key={`${h.articleNumber}-${h.slug}`}
              className="flex items-center justify-between gap-2 border-b border-slate-100 px-3 py-2 text-sm last:border-0"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-800">{h.title}</p>
                <p className="font-mono text-xs text-slate-500">
                  #{h.articleNumber ?? "—"} · {h.status}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  disabled={disabled || !h.articleNumber}
                  onClick={() => void addArticle(h, false)}
                  className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-semibold hover:bg-slate-50"
                >
                  Link
                </button>
                <button
                  type="button"
                  disabled={disabled || !h.articleNumber}
                  onClick={() => void addArticle(h, true)}
                  className="rounded bg-sky-500 px-2 py-1 text-xs font-semibold text-white hover:bg-sky-600"
                >
                  + Read also
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

      <ul className="mt-4 divide-y divide-slate-100 rounded-lg border border-slate-100">
        {linked.length === 0 ? (
          <li className="px-3 py-4 text-sm text-slate-500">No links yet.</li>
        ) : (
          linked.map((l) => (
            <li
              key={l.articleNumber}
              className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-800">{l.title}</p>
                <p className="font-mono text-xs text-slate-500">
                  #{l.articleNumber}
                </p>
              </div>
              <button
                type="button"
                disabled={disabled}
                onClick={() => remove(l.articleNumber)}
                className="shrink-0 text-xs font-semibold text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
