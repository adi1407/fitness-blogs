import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "@/components/RichTextEditor";
import { BLOG_TAXONOMY, BLOG_TOPICS } from "@/constants/blogTaxonomy";
import { canPublish } from "@/constants/roles";
import { useAuth } from "@/context/AuthContext";
import {
  apiFetch,
  type Article,
  type TaxonomyCategory,
} from "@/lib/api/client";
import { normalizeSlugInput, slugFromTitle } from "@/utils/articleSlug";

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
  quickAnswer: string;
  tagsCsv: string;
  topics: string[];
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
  quickAnswer: "",
  tagsCsv: "",
  topics: [],
};

const SITE_ORIGIN =
  import.meta.env.VITE_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function ArticleEditorPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [taxonomy, setTaxonomy] = useState<TaxonomyCategory[]>([]);
  const [status, setStatus] = useState<Article["status"]>("draft");
  const [rejectReason, setRejectReason] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [articleId, setArticleId] = useState<string | null>(isNew ? null : id);
  const [articleNumber, setArticleNumber] = useState<number | null>(null);
  const [publicPath, setPublicPath] = useState<string | null>(null);
  const [views, setViews] = useState(0);

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
        setArticleId(a.id);
        setStatus(a.status);
        setRejectReason(a.rejectReason || "");
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
          quickAnswer: a.quickAnswer,
          tagsCsv: (a.tags || []).join(", "),
          topics: a.topics || [],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
    })();
  }, [id, isNew]);

  const subcategories = useMemo(() => {
    const cat = taxonomy.find((c) => c.id === form.categoryId);
    return cat?.subcategories ?? [];
  }, [taxonomy, form.categoryId]);

  function patch<K extends keyof FormState>(key: K, value: FormState[K]) {
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
  }

  function buildPayload() {
    const tags = form.tagsCsv
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    return {
      title: form.title,
      slug: normalizeSlugInput(form.slug) || slugFromTitle(form.title),
      excerpt: form.excerpt,
      body: form.body,
      categoryId: form.categoryId || null,
      subcategoryId: form.subcategoryId || null,
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      metaKeywords: form.metaKeywords,
      primaryKeyword: form.primaryKeyword,
      ogImage: form.ogImage,
      featuredImage: form.featuredImage,
      quickAnswer: form.quickAnswer,
      tags,
      topics: form.topics,
    };
  }

  function applyArticle(a: Article) {
    setArticleId(a.id);
    setStatus(a.status);
    setArticleNumber(a.articleNumber);
    setPublicPath(a.path);
    setViews(a.views);
  }

  async function persistDraft(): Promise<string> {
    const payload = buildPayload();
    if (!articleId) {
      const data = await apiFetch<{ article: Article }>("/articles", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      applyArticle(data.article);
      navigate(`/articles/${data.article.id}`, { replace: true });
      return data.article.id;
    }

    const data = await apiFetch<{ article: Article }>(
      `/articles/${articleId}`,
      { method: "PUT", body: JSON.stringify(payload) },
    );
    applyArticle(data.article);
    return data.article.id;
  }

  async function save(e?: FormEvent) {
    e?.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await persistDraft();
      setMessage(articleId ? "Saved" : "Draft created");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function transition(
    path: "submit" | "publish" | "reject" | "unpublish",
  ) {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const currentId = await persistDraft();
      const data = await apiFetch<{ article: Article }>(
        `/articles/${currentId}/${path}`,
        {
          method: "PATCH",
          body:
            path === "reject"
              ? JSON.stringify({ reason: rejectReason })
              : undefined,
        },
      );
      applyArticle(data.article);
      setMessage(
        path === "publish"
          ? "Published"
          : path === "submit"
            ? "Submitted"
            : path === "unpublish"
              ? "Unpublished"
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

  const publisher = user ? canPublish(user.role) : false;
  const publicUrl = publicPath ? `${SITE_ORIGIN}${publicPath}` : null;
  const numberUrl = articleNumber
    ? `${SITE_ORIGIN}/blog/${articleNumber}`
    : null;

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
            Status: <span className="font-semibold capitalize">{status}</span>
            {rejectReason ? ` · Rejected: ${rejectReason}` : ""}
            {status === "published" ? ` · ${views} views` : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            {saving ? "Saving…" : "Save draft"}
          </button>
          {(status === "draft" || status === "rejected") && (
            <button
              type="button"
              disabled={saving}
              onClick={() => void transition("submit")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Submit
            </button>
          )}
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
        </div>
      </div>

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
        {publisher && status === "submitted" ? (
          <label className="block text-sm font-medium sm:col-span-2">
            Reject reason
            <input
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
        ) : null}
      </section>
    </form>
  );
}
