import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  countInternalLinks,
  findLinkSuggestions,
  insertSuggestedLink,
  loadInboundSuggestions,
  loadLinkIndex,
  type InboundSuggestion,
  type LinkSuggestion,
  type LinkTarget,
} from "../linkSuggestions";

type Props = {
  body: string;
  articleId: string | null;
  categorySlug?: string;
  subcategorySlug?: string;
  currentPath: string | null;
  /** Inbound suggestions only make sense once the article is live. */
  isPublished: boolean;
  disabled?: boolean;
  onInsert: (nextBody: string) => void;
};

const KIND_LABEL: Record<LinkTarget["kind"], string> = {
  article: "Article",
  calculator: "Calculator",
  food: "Food",
  exercise: "Exercise",
};

export function LinkSuggestionsPanel({
  body,
  articleId,
  categorySlug,
  subcategorySlug,
  currentPath,
  isPublished,
  disabled,
  onInsert,
}: Props) {
  const [targets, setTargets] = useState<LinkTarget[]>([]);
  const [indexError, setIndexError] = useState("");
  const [inbound, setInbound] = useState<InboundSuggestion[] | null>(null);
  const [inboundError, setInboundError] = useState("");
  const [notice, setNotice] = useState("");
  const deferredBody = useDeferredValue(body);

  useEffect(() => {
    let active = true;
    loadLinkIndex()
      .then((t) => active && setTargets(t))
      .catch((err) => active && setIndexError(err instanceof Error ? err.message : "Could not load pages"));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!articleId || !isPublished) return;
    let active = true;
    loadInboundSuggestions(articleId)
      .then((s) => active && setInbound(s))
      .catch((err) => active && setInboundError(err instanceof Error ? err.message : "Could not load"));
    return () => {
      active = false;
    };
  }, [articleId, isPublished]);

  const suggestions = useMemo(
    () => findLinkSuggestions(deferredBody, targets, { articleId, categorySlug, subcategorySlug, currentPath }),
    [deferredBody, targets, articleId, categorySlug, subcategorySlug, currentPath],
  );
  const linkCount = useMemo(() => countInternalLinks(deferredBody), [deferredBody]);

  function add(s: LinkSuggestion) {
    const next = insertSuggestedLink(body, s);
    if (next === null) {
      setNotice(`“${s.matched}” is no longer in the body.`);
      return;
    }
    onInsert(next);
    setNotice(`Linked “${s.matched}” to ${s.target.title}.`);
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold">Internal link suggestions</h2>
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{linkCount}</span> internal link
          {linkCount === 1 ? "" : "s"} in the body
          {linkCount < 3 ? <span className="text-amber-700"> · aim for 3–8 relevant links</span> : null}
        </p>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Phrases in your text that match another fitlives page. Same-topic articles come first —
        they build the cluster. Only add links that genuinely help the reader.
      </p>

      {indexError ? <p className="mt-3 text-sm text-red-600">{indexError}</p> : null}
      {notice ? <p className="mt-3 text-sm text-emerald-700">{notice}</p> : null}

      {suggestions.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          {targets.length ? "No new matches in the current text." : indexError ? "" : "Loading pages…"}
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100">
          {suggestions.map((s) => (
            <li key={s.target.key} className="flex flex-wrap items-start justify-between gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900">
                  <span
                    className={`mr-2 rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                      s.sameTopic ? "bg-sky-100 text-sky-800" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {s.sameTopic ? "Same topic" : KIND_LABEL[s.target.kind]}
                  </span>
                  {s.target.title}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  …{s.before}
                  <mark className="rounded bg-amber-100 px-0.5 text-slate-900">{s.matched}</mark>
                  {s.after}…
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-sm font-semibold">
                <a
                  href={`https://fitlives.in${s.target.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-sky-700 hover:underline"
                >
                  View
                </a>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => add(s)}
                  className="rounded-lg bg-sky-500 px-3 py-1.5 text-white hover:bg-sky-600 disabled:opacity-50"
                >
                  Add link
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isPublished && articleId ? (
        <div className="mt-6 border-t border-slate-100 pt-4">
          <h3 className="text-sm font-semibold text-slate-900">Articles that could link here</h3>
          <p className="mt-1 text-xs text-slate-500">
            Live articles that mention this topic without linking to it. Open one and use its
            suggestions panel to add the link.
          </p>
          {inboundError ? <p className="mt-2 text-sm text-red-600">{inboundError}</p> : null}
          {inbound === null && !inboundError ? <p className="mt-2 text-sm text-slate-500">Checking…</p> : null}
          {inbound?.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">No unlinked mentions found.</p>
          ) : null}
          <ul className="mt-2 space-y-2">
            {inbound?.map((s) => (
              <li key={s.id} className="rounded-lg border border-slate-100 px-3 py-2 text-sm">
                <Link to={`/articles/${s.id}`} className="font-semibold text-sky-700 hover:underline">
                  {s.title}
                </Link>
                <p className="mt-0.5 text-slate-600">{s.snippet}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
