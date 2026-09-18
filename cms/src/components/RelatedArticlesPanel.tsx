import { useState } from "react";
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
  const [lookup, setLookup] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function addById(alsoInsertBody: boolean) {
    setError("");
    const raw = lookup.trim().replace(/\D/g, "");
    const num = Number(raw);
    if (!Number.isInteger(num) || raw.length !== 9) {
      setError("Enter a 9-digit article ID");
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
      const nextLinked = [
        ...linked,
        {
          articleNumber: a.articleNumber,
          title: a.title || `Article #${a.articleNumber}`,
          path: a.path,
        },
      ];
      let nextBody: string | undefined;
      if (alsoInsertBody) {
        const block = buildReadAlsoHtml(
          a.articleNumber,
          a.title || `Article #${a.articleNumber}`,
          a.path,
        );
        nextBody = insertRelatedLinkBlock(body, block, linked.length);
      }
      onChange({
        linked: nextLinked,
        relatedArticleNumbers: nextLinked.map((l) => l.articleNumber),
        body: nextBody,
      });
      setLookup("");
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
        Link by 9-digit article ID (newsroom style). Optional “Read also”
        insert into the body. Max {MAX_RELATED_LINKS}.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <input
          value={lookup}
          onChange={(e) => setLookup(e.target.value)}
          disabled={disabled || busy}
          placeholder="e.g. 482917365"
          className="min-w-[12rem] flex-1 rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm"
        />
        <button
          type="button"
          disabled={disabled || busy}
          onClick={() => void addById(false)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          Link
        </button>
        <button
          type="button"
          disabled={disabled || busy}
          onClick={() => void addById(true)}
          className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Link + Read also
        </button>
      </div>
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
