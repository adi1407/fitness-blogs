import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "@/components/RichTextEditor";
import { RelatedArticlesPanel } from "@/components/RelatedArticlesPanel";
import { BLOG_TAXONOMY, BLOG_TOPICS } from "@/constants/blogTaxonomy";
import { canPublish } from "@/constants/roles";
import { useAuth } from "@/context/AuthContext";
import {
  apiFetch,
  type Article,
  type TaxonomyCategory,
} from "@/lib/api/client";
import { trackCmsEvent } from "@/lib/analytics/openpanel";
import { normalizeSlugInput, slugFromTitle } from "@/utils/articleSlug";

type FaqItem = { question: string; answer: string };
type SourceItem = { title: string; url: string; note: string };
type LinkedArticle = {
  articleNumber: number;
  title: string;
  path: string | null;
};

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  categoryId: string;
  subcategoryId: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  primaryKeyword: string;
  ogImage: string;
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageCaption: string;
  quickAnswer: string;
  tagsCsv: string;
  topics: string[];
  faq: FaqItem[];
  sources: SourceItem[];
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  categoryId: "",
  subcategoryId: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  primaryKeyword: "",
  ogImage: "",
  featuredImage: "",
  featuredImageAlt: "",
  featuredImageCaption: "",
  quickAnswer: "",
  tagsCsv: "",
  topics: [],
  faq: [],
  sources: [],
};

const SITE_ORIGIN =
  import.meta.env.VITE_PUBLIC_SITE_URL ?? "http://localhost:3000";

const WRITER_EDITABLE = new Set([
  "draft",
  "rejected",
  "changes_requested",
]);

type SaveState = "idle" | "unsaved" | "saving" | "saved" | "error";

function statusLabel(status: Article["status"]) {
  if (status === "changes_requested") return "Needs changes";
  return status.replace("_", " ");
}

export default function ArticleEditorPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [taxonomy, setTaxonomy] = useState<TaxonomyCategory[]>([]);
  const [status, setStatus] = useState<Article["status"]>("draft");
  const [editorNote, setEditorNote] = useState("");
  const [noteDraft, setNoteDraft] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [articleId, setArticleId] = useState<string | null>(isNew ? null : id);
  const [articleNumber, setArticleNumber] = useState<number | null>(null);
  const [publicPath, setPublicPath] = useState<string | null>(null);
  const [views, setViews] = useState(0);
  const [loaded, setLoaded] = useState(isNew);
  const [dirty, setDirty] = useState(false);
  const [linkedArticles, setLinkedArticles] = useState<LinkedArticle[]>([]);

  const formRef = useRef(form);
  const articleIdRef = useRef(articleId);
  const dirtyRef = useRef(dirty);
  const statusRef = useRef(status);
  const linkedRef = useRef(linkedArticles);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipAutosave = useRef(false);

  formRef.current = form;
  articleIdRef.current = articleId;
  dirtyRef.current = dirty;
  statusRef.current = status;
  linkedRef.current = linkedArticles;

  const publisher = user ? canPublish(user.role) : false;
  const isWriter = user?.role === "writer";
  const canEditContent =
    publisher || (isWriter && WRITER_EDITABLE.has(status));
  const canSubmit =
    canEditContent &&
    (status === "draft" ||
      status === "rejected" ||
      status === "changes_requested");

  useEffect(() => {
    void (async () => {
      try {
        const data = await apiFetch<{ categories: TaxonomyCategory[] }>(
          "/public/taxonomy",
        );
        setTaxonomy(data.categories);
      } catch {
        setTaxonomy(
          BLOG_TAXONOMY.map((c) => ({
            id: c.slug,
            slug: c.slug,
            label: c.label,
            description: c.description,
            subcategories: c.subcategories.map((s) => ({
              id: s.slug,
              slug: s.slug,
              label: s.label,
            })),
          })),
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (isNew) return;
    void (async () => {
      try {
        const data = await apiFetch<{ article: Article }>(`/articles/${id}`);
        const a = data.article;
        skipAutosave.current = true;
        setArticleId(a.id);
        setStatus(a.status);
        setEditorNote(a.editorNote || a.rejectReason || "");
        setNoteDraft(a.editorNote || a.rejectReason || "");
        setSlugTouched(Boolean(a.slug));
        setArticleNumber(a.articleNumber);
        setPublicPath(a.path);
        setViews(a.views);
        setForm({
          title: a.title,
          slug: a.slug || "",
          excerpt: a.excerpt,
          body: a.body,
          categoryId: a.categoryId || "",
          subcategoryId: a.subcategoryId || "",
          metaTitle: a.metaTitle,
          metaDescription: a.metaDescription,
          metaKeywords: a.metaKeywords,
          primaryKeyword: a.primaryKeyword,
          ogImage: a.ogImage,
          featuredImage: a.featuredImage,
          featuredImageAlt: a.featuredImageAlt || "",
          featuredImageCaption: a.featuredImageCaption || "",
          quickAnswer: a.quickAnswer,
          tagsCsv: (a.tags || []).join(", "),
          topics: a.topics || [],
          faq: (a.faq || []).map((f) => ({
            question: f.question,
            answer: f.answer,
          })),
          sources: (a.sources || []).map((s) => ({
            title: s.title,
            url: s.url || "",
            note: s.note || "",
          })),
        });
        setLinkedArticles(
          (a.relatedArticleNumbers || []).map((n) => ({
            articleNumber: n,
            title: `Article #${n}`,
            path: null,
          })),
        );
        // Resolve titles for linked IDs
        void Promise.all(
          (a.relatedArticleNumbers || []).map(async (n) => {
            try {
              const look = await apiFetch<{ article: Article }>(
                `/articles/lookup-by-number/${n}`,
              );
              return {
                articleNumber: n,
                title: look.article.title || `Article #${n}`,
                path: look.article.path,
              };
            } catch {
              return {
                articleNumber: n,
                title: `Article #${n}`,
                path: null,
              };
            }
          }),
        ).then((list) => {
          if (list.length) setLinkedArticles(list);
        });
        setDirty(false);
        setSaveState("saved");
        setLastSavedAt(new Date(a.updatedAt));
        setLoaded(true);
        queueMicrotask(() => {
          skipAutosave.current = false;
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
        setLoaded(true);
      }
    })();
  }, [id, isNew]);

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!dirtyRef.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  const subcategories = useMemo(() => {
    const cat = taxonomy.find((c) => c.id === form.categoryId);
    return cat?.subcategories ?? [];
  }, [taxonomy, form.categoryId]);

  function markDirty() {
    setDirty(true);
    setSaveState("unsaved");
  }

  function patch<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (!canEditContent && loaded) return;
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !slugTouched) {
        next.slug = slugFromTitle(String(value));
      }
      if (key === "categoryId") {
        next.subcategoryId = "";
      }
      return next;
    });
    markDirty();
  }

  function buildPayloadFrom(state: FormState) {
    const tags = state.tagsCsv
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    return {
      title: state.title,
      slug: normalizeSlugInput(state.slug) || slugFromTitle(state.title),
      excerpt: state.excerpt,
      body: state.body,
      categoryId: state.categoryId || null,
      subcategoryId: state.subcategoryId || null,
      metaTitle: state.metaTitle,
      metaDescription: state.metaDescription,
      metaKeywords: state.metaKeywords,
      primaryKeyword: state.primaryKeyword,
      ogImage: state.ogImage,
      featuredImage: state.featuredImage,
      featuredImageAlt: state.featuredImageAlt,
      featuredImageCaption: state.featuredImageCaption,
      quickAnswer: state.quickAnswer,
      tags,
      topics: state.topics,
      relatedArticleNumbers: linkedRef.current.map((l) => l.articleNumber),
      faq: state.faq.filter((f) => f.question.trim() && f.answer.trim()),
      sources: state.sources.filter((s) => s.title.trim()),
    };
  }

  function applyArticle(a: Article) {
    setArticleId(a.id);
    setStatus(a.status);
    setArticleNumber(a.articleNumber);
    setPublicPath(a.path);
    setViews(a.views);
    setEditorNote(a.editorNote || a.rejectReason || "");
  }

  async function persistDraft(opts?: {
    createIfEmpty?: boolean;
  }): Promise<string | null> {
    const state = formRef.current;
    const currentId = articleIdRef.current;
    const payload = buildPayloadFrom(state);

    if (!currentId) {
      if (!opts?.createIfEmpty && !state.title.trim() && !state.body.trim()) {
        return null;
      }
      const data = await apiFetch<{ article: Article }>("/articles", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      applyArticle(data.article);
      setDirty(false);
      setSaveState("saved");
      setLastSavedAt(new Date());
      navigate(`/articles/${data.article.id}`, { replace: true });
      return data.article.id;
    }

    const data = await apiFetch<{ article: Article }>(
      `/articles/${currentId}`,
      { method: "PUT", body: JSON.stringify(payload) },
    );
    applyArticle(data.article);
    setDirty(false);
    setSaveState("saved");
    setLastSavedAt(new Date());
    return data.article.id;
  }

  // Debounced autosave for existing drafts the writer/editor can edit
  useEffect(() => {
    if (!loaded || skipAutosave.current || !dirty) return;
    if (!articleId) return;
    if (!canEditContent) return;

    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      void (async () => {
        if (!dirtyRef.current || !articleIdRef.current) return;
        setSaveState("saving");
        try {
          await persistDraft();
        } catch {
          setSaveState("error");
        }
      })();
    }, 2500);

    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- persistDraft reads refs
  }, [form, dirty, articleId, loaded, canEditContent]);

  async function save(e?: FormEvent) {
    e?.preventDefault();
    setSaving(true);
    setSaveState("saving");
    setError("");
    setMessage("");
    try {
      const idSaved = await persistDraft({ createIfEmpty: true });
      if (!idSaved) {
        setError("Add a title or body before saving");
        setSaveState("error");
        return;
      }
      setMessage("Draft saved safely");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaveState("error");
    } finally {
      setSaving(false);
    }
  }

  async function transition(
    path: "submit" | "publish" | "reject" | "unpublish" | "request-changes",
  ) {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const currentId = await persistDraft({ createIfEmpty: true });
      if (!currentId) {
        setError("Save the article before continuing");
        return;
      }
      const needsReason = path === "reject" || path === "request-changes";
      const data = await apiFetch<{ article: Article }>(
        `/articles/${currentId}/${path}`,
        {
          method: "PATCH",
          body: needsReason
            ? JSON.stringify({ reason: noteDraft })
            : undefined,
        },
      );
      applyArticle(data.article);
      setNoteDraft(data.article.editorNote || data.article.rejectReason || "");
      setDirty(false);
      if (path === "submit") {
        trackCmsEvent("cms_article_submit", { articleId: data.article.id });
      } else if (path === "publish") {
        trackCmsEvent("cms_article_publish", { articleId: data.article.id });
      } else if (path === "reject") {
        trackCmsEvent("cms_article_reject", { articleId: data.article.id });
      }
      setMessage(
        path === "publish"
          ? "Published"
          : path === "submit"
            ? "Submitted for review"
            : path === "unpublish"
              ? "Unpublished"
              : path === "request-changes"
                ? "Sent back for changes"
                : "Rejected",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setSaving(false);
    }
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Copied to clipboard");
    } catch {
      setError("Could not copy");
    }
  }

  const publicUrl = publicPath ? `${SITE_ORIGIN}${publicPath}` : null;
  const numberUrl = articleNumber
    ? `${SITE_ORIGIN}/blog/${articleNumber}`
    : null;

  const saveChip =
    saveState === "saving"
      ? "Saving…"
      : saveState === "unsaved"
        ? "Unsaved changes"
        : saveState === "saved" && lastSavedAt
          ? `Saved ${lastSavedAt.toLocaleTimeString()}`
          : saveState === "error"
            ? "Save failed"
            : articleId
              ? "All changes saved"
              : "Not saved yet";

  return (
    <form onSubmit={save} className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link to="/articles" className="text-sm text-sky-600 hover:underline">
            ← Articles
          </Link>
          <h1 className="mt-2 text-2xl font-bold">
            {isNew ? "New article" : "Edit article"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Status:{" "}
            <span className="font-semibold capitalize">
              {statusLabel(status)}
            </span>
            {status === "published" ? ` · ${views} views` : ""}
            {" · "}
            <span
              className={
                saveState === "unsaved" || saveState === "error"
                  ? "font-medium text-amber-700"
                  : "text-slate-400"
              }
            >
              {saveChip}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canEditContent ? (
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              {saving ? "Saving…" : "Save draft"}
            </button>
          ) : null}
          {canSubmit ? (
            <button
              type="button"
              disabled={saving}
              onClick={() => void transition("submit")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Submit
            </button>
          ) : null}
          {publisher && status === "submitted" ? (
            <button
              type="button"
              disabled={saving}
              onClick={() => void transition("request-changes")}
              className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100"
            >
              Request changes
            </button>
          ) : null}
          {publisher && status === "submitted" ? (
            <button
              type="button"
              disabled={saving}
              onClick={() => void transition("reject")}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
            >
              Reject
            </button>
          ) : null}
          {publisher && status !== "published" ? (
            <button
              type="button"
              disabled={saving}
              onClick={() => void transition("publish")}
              className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
            >
              Publish
            </button>
          ) : null}
          {publisher && status === "published" ? (
            <button
              type="button"
              disabled={saving}
              onClick={() => void transition("unpublish")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Unpublish
            </button>
          ) : null}
        </div>
      </div>

      {!canEditContent && status === "submitted" ? (
        <p className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2 text-sm text-sky-900">
          In review — waiting for an editor. You can view but not edit until it
          comes back.
        </p>
      ) : null}

      {status === "changes_requested" || status === "rejected" ? (
        <p
          className={`rounded-lg border px-3 py-2 text-sm ${
            status === "rejected"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          <span className="font-semibold">
            {status === "rejected" ? "Rejected" : "Editor notes"}:{" "}
          </span>
          {editorNote || "No note provided."}
        </p>
      ) : null}

      {message ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {articleNumber ? (
        <section className="rounded-xl border border-sky-100 bg-sky-50/60 p-4 text-sm">
          <p className="font-semibold text-slate-800">
            Article ID:{" "}
            <span className="font-mono text-sky-800">{articleNumber}</span>
          </p>
          {publicUrl ? (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <code className="rounded bg-white px-2 py-1 text-xs text-slate-700">
                {publicUrl}
              </code>
              <button
                type="button"
                onClick={() => void copyText(publicUrl)}
                className="text-xs font-semibold text-sky-700 hover:underline"
              >
                Copy URL
              </button>
            </div>
          ) : (
            <p className="mt-1 text-xs text-slate-500">
              Public URL appears after category, subcategory, and slug are set.
            </p>
          )}
          {numberUrl ? (
            <p className="mt-1 text-xs text-slate-500">
              Number resolve: {numberUrl}
            </p>
          ) : null}
        </section>
      ) : null}

      <fieldset disabled={!canEditContent} className="space-y-8 disabled:opacity-70">
        <section className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
          <label className="block text-sm font-medium sm:col-span-2">
            Title
            <input
              value={form.title}
              onChange={(e) => patch("title", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            Slug
            <input
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                patch("slug", normalizeSlugInput(e.target.value));
              }}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm"
              placeholder="how-much-protein-do-i-need"
            />
          </label>
          <label className="block text-sm font-medium">
            Category
            <select
              value={form.categoryId}
              onChange={(e) => patch("categoryId", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            >
              <option value="">Select category</option>
              {taxonomy.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Subcategory
            <select
              value={form.subcategoryId}
              onChange={(e) => patch("subcategoryId", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
              disabled={!form.categoryId}
            >
              <option value="">Select subcategory</option>
              {subcategories.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Primary keyword
            <input
              value={form.primaryKeyword}
              onChange={(e) => patch("primaryKeyword", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="block text-sm font-medium">
            Tags (comma-separated)
            <input
              value={form.tagsCsv}
              onChange={(e) => patch("tagsCsv", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              placeholder="protein, indian diet, beginners"
            />
          </label>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-medium">Topics</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {BLOG_TOPICS.map((topic) => {
                const checked = form.topics.includes(topic);
                return (
                  <label
                    key={topic}
                    className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium ${
                      checked
                        ? "border-sky-400 bg-sky-50 text-sky-800"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => {
                        patch(
                          "topics",
                          checked
                            ? form.topics.filter((t) => t !== topic)
                            : [...form.topics, topic],
                        );
                      }}
                    />
                    {topic}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <label className="block text-sm font-medium sm:col-span-2">
            Excerpt
            <textarea
              value={form.excerpt}
              onChange={(e) => patch("excerpt", e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            Quick answer
            <textarea
              value={form.quickAnswer}
              onChange={(e) => patch("quickAnswer", e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold">Body</h2>
          <div className="mt-3">
            <RichTextEditor
              value={form.body}
              onChange={(html) => patch("body", html)}
              placeholder="Write the full article…"
            />
          </div>
        </section>

        <section className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
          <h2 className="text-lg font-semibold sm:col-span-2">SEO metadata</h2>
          <label className="block text-sm font-medium sm:col-span-2">
            Meta title
            <input
              value={form.metaTitle}
              onChange={(e) => patch("metaTitle", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            Meta description
            <textarea
              value={form.metaDescription}
              onChange={(e) => patch("metaDescription", e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            Meta keywords
            <input
              value={form.metaKeywords}
              onChange={(e) => patch("metaKeywords", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
        <label className="block text-sm font-medium">
          Featured image URL
          <input
            value={form.featuredImage}
            onChange={(e) => patch("featuredImage", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium">
          OG image URL
          <input
            value={form.ogImage}
            onChange={(e) => patch("ogImage", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Cover alt text
          <input
            value={form.featuredImageAlt}
            onChange={(e) => patch("featuredImageAlt", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Cover caption
          <input
            value={form.featuredImageCaption}
            onChange={(e) => patch("featuredImageCaption", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
      </section>

      <RelatedArticlesPanel
        linked={linkedArticles}
        body={form.body}
        currentArticleNumber={articleNumber}
        disabled={!canEditContent}
        onChange={({ linked, body: nextBody }) => {
          setLinkedArticles(linked);
          if (nextBody !== undefined) {
            patch("body", nextBody);
          } else {
            markDirty();
          }
        }}
      />

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">FAQ</h2>
          <button
            type="button"
            disabled={!canEditContent}
            onClick={() =>
              patch("faq", [...form.faq, { question: "", answer: "" }])
            }
            className="text-sm font-semibold text-sky-700 hover:underline"
          >
            Add question
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {form.faq.length === 0 ? (
            <p className="text-sm text-slate-500">No FAQ items yet.</p>
          ) : (
            form.faq.map((item, i) => (
              <div
                key={i}
                className="grid gap-2 rounded-lg border border-slate-100 p-3"
              >
                <input
                  value={item.question}
                  disabled={!canEditContent}
                  onChange={(e) => {
                    const next = [...form.faq];
                    next[i] = { ...next[i], question: e.target.value };
                    patch("faq", next);
                  }}
                  placeholder="Question"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
                <textarea
                  value={item.answer}
                  disabled={!canEditContent}
                  onChange={(e) => {
                    const next = [...form.faq];
                    next[i] = { ...next[i], answer: e.target.value };
                    patch("faq", next);
                  }}
                  placeholder="Answer"
                  rows={2}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  disabled={!canEditContent}
                  onClick={() =>
                    patch(
                      "faq",
                      form.faq.filter((_, idx) => idx !== i),
                    )
                  }
                  className="justify-self-start text-xs font-semibold text-red-600"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Sources</h2>
          <button
            type="button"
            disabled={!canEditContent}
            onClick={() =>
              patch("sources", [
                ...form.sources,
                { title: "", url: "", note: "" },
              ])
            }
            className="text-sm font-semibold text-sky-700 hover:underline"
          >
            Add source
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {form.sources.length === 0 ? (
            <p className="text-sm text-slate-500">No sources yet.</p>
          ) : (
            form.sources.map((item, i) => (
              <div
                key={i}
                className="grid gap-2 rounded-lg border border-slate-100 p-3 sm:grid-cols-2"
              >
                <input
                  value={item.title}
                  disabled={!canEditContent}
                  onChange={(e) => {
                    const next = [...form.sources];
                    next[i] = { ...next[i], title: e.target.value };
                    patch("sources", next);
                  }}
                  placeholder="Source title"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
                />
                <input
                  value={item.url}
                  disabled={!canEditContent}
                  onChange={(e) => {
                    const next = [...form.sources];
                    next[i] = { ...next[i], url: e.target.value };
                    patch("sources", next);
                  }}
                  placeholder="URL (optional)"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
                <input
                  value={item.note}
                  disabled={!canEditContent}
                  onChange={(e) => {
                    const next = [...form.sources];
                    next[i] = { ...next[i], note: e.target.value };
                    patch("sources", next);
                  }}
                  placeholder="Note (optional)"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  disabled={!canEditContent}
                  onClick={() =>
                    patch(
                      "sources",
                      form.sources.filter((_, idx) => idx !== i),
                    )
                  }
                  className="justify-self-start text-xs font-semibold text-red-600"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </fieldset>

      {publisher && status === "submitted" ? (
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <label className="block text-sm font-medium">
            Editor note (for request changes / reject)
            <input
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              placeholder="What should the writer fix?"
            />
          </label>
        </section>
      ) : null}
    </form>
  );
}
