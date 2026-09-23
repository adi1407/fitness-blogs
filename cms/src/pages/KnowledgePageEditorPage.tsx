import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { apiFetch, type CmsKnowledgePage } from "@/lib/api/client";
import RichTextEditor from "@/components/RichTextEditor";

function sectionFromPath(pathname: string): "programs" | "reviews" {
  return pathname.startsWith("/reviews") ? "reviews" : "programs";
}

export default function KnowledgePageEditorPage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const section = sectionFromPath(pathname);
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    bodyHtml: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft" as CmsKnowledgePage["status"],
    robotsIndex: true,
    sortOrder: 0,
    isHub: false,
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    void apiFetch<{ page: CmsKnowledgePage }>(`/knowledge-pages/${id}`)
      .then((data) => {
        const p = data.page;
        setForm({
          title: p.title,
          slug: p.isHub ? "_hub" : p.slug,
          excerpt: p.excerpt,
          bodyHtml: p.bodyHtml,
          metaTitle: p.metaTitle,
          metaDescription: p.metaDescription,
          status: p.status,
          robotsIndex: p.robotsIndex,
          sortOrder: p.sortOrder,
          isHub: p.isHub,
        });
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load"),
      )
      .finally(() => setLoading(false));
  }, [id, isNew]);

  async function save(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    const payload = {
      section,
      title: form.title,
      slug: form.isHub ? "_hub" : form.slug || null,
      excerpt: form.excerpt,
      bodyHtml: form.bodyHtml,
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      status: form.status,
      robotsIndex: form.robotsIndex,
      sortOrder: Number(form.sortOrder) || 0,
      isHub: form.isHub,
    };
    try {
      if (isNew) {
        const data = await apiFetch<{ page: CmsKnowledgePage }>(
          "/knowledge-pages",
          { method: "POST", body: JSON.stringify(payload) },
        );
        setMessage("Created.");
        navigate(`/${section}/${data.page.id}`, { replace: true });
      } else {
        await apiFetch(`/knowledge-pages/${id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        setMessage("Saved.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  async function remove() {
    if (isNew || !id) return;
    if (!confirm("Delete this page?")) return;
    await apiFetch(`/knowledge-pages/${id}`, { method: "DELETE" });
    navigate(`/${section}`);
  }

  if (loading) return <p className="text-slate-600">Loading…</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            to={`/${section}`}
            className="text-sm text-sky-700 hover:underline"
          >
            ← {section}
          </Link>
          <h1 className="mt-1 text-2xl font-bold">
            {isNew ? `New ${section} page` : "Edit page"}
          </h1>
        </div>
        {!isNew ? (
          <button
            type="button"
            onClick={() => void remove()}
            className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700"
          >
            Delete
          </button>
        ) : null}
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {message ? (
        <p className="mt-3 text-sm text-emerald-700">{message}</p>
      ) : null}

      <form onSubmit={(e) => void save(e)} className="mt-6 grid gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isHub}
            onChange={(e) =>
              setForm({
                ...form,
                isHub: e.target.checked,
                slug: e.target.checked ? "_hub" : form.slug,
              })
            }
          />
          This is the section hub (slug <code>_hub</code>)
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Title
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Slug
            <input
              disabled={form.isHub}
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm disabled:bg-slate-50"
            />
          </label>
          <label className="text-sm font-medium">
            Status
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as CmsKnowledgePage["status"],
                })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
          </label>
          <label className="text-sm font-medium">
            Sort order
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) =>
                setForm({ ...form, sortOrder: Number(e.target.value) })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
        </div>

        <label className="text-sm font-medium">
          Excerpt
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>

        <div>
          <p className="text-sm font-medium">Body</p>
          <div className="mt-1 rounded-lg border border-slate-200 bg-white p-2">
            <RichTextEditor
              value={form.bodyHtml}
              onChange={(html) => setForm({ ...form, bodyHtml: html })}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Meta title
            <input
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Meta description
            <input
              value={form.metaDescription}
              onChange={(e) =>
                setForm({ ...form, metaDescription: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.robotsIndex}
            onChange={(e) =>
              setForm({ ...form, robotsIndex: e.target.checked })
            }
          />
          Allow search indexing when published
        </label>

        <button
          type="submit"
          className="w-fit rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Save
        </button>
      </form>
    </div>
  );
}
