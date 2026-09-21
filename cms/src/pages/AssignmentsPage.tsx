import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  apiFetch,
  type AssignmentBrief,
  type StaffUser,
  type TaxonomyCategory,
} from "@/lib/api/client";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm";

function statusLabel(status: AssignmentBrief["status"]) {
  if (status === "in_progress") return "In progress";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function dueLabel(dueOn: string | null) {
  if (!dueOn) return "No due date";
  return `Due ${dueOn}`;
}

export default function AssignmentsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isWriter = user?.role === "writer";
  const [briefs, setBriefs] = useState<AssignmentBrief[]>([]);
  const [writers, setWriters] = useState<StaffUser[]>([]);
  const [taxonomy, setTaxonomy] = useState<TaxonomyCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    targetQuery: "",
    workingTitle: "",
    categoryId: "",
    subcategoryId: "",
    outline: "",
    requiredLinks: "",
    notes: "",
    dueOn: "",
    writerId: "",
  });

  const subcategories = useMemo(() => {
    return (
      taxonomy.find((cat) => cat.id === form.categoryId)?.subcategories ?? []
    );
  }, [taxonomy, form.categoryId]);

  async function load() {
    setError("");
    const briefData = await apiFetch<{ briefs: AssignmentBrief[] }>("/briefs");
    setBriefs(briefData.briefs);
  }

  useEffect(() => {
    void (async () => {
      try {
        const jobs: Promise<void>[] = [load()];
        if (!isWriter) {
          jobs.push(
            apiFetch<{ users: StaffUser[] }>("/admin/users?role=writer").then(
              (data) => {
                setWriters(data.users.filter((w) => w.isActive));
              },
            ),
            apiFetch<{ categories: TaxonomyCategory[] }>("/public/taxonomy").then(
              (data) => setTaxonomy(data.categories),
            ),
          );
        }
        await Promise.all(jobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load assignments");
      } finally {
        setLoading(false);
      }
    })();
  }, [isWriter]);

  async function createBrief(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await apiFetch("/briefs", {
        method: "POST",
        body: JSON.stringify({
          targetQuery: form.targetQuery,
          workingTitle: form.workingTitle,
          categoryId: form.categoryId,
          subcategoryId: form.subcategoryId,
          outline: form.outline,
          requiredLinks: form.requiredLinks,
          notes: form.notes,
          dueOn: form.dueOn || null,
          writerId: form.writerId,
        }),
      });
      setForm({
        targetQuery: "",
        workingTitle: "",
        categoryId: "",
        subcategoryId: "",
        outline: "",
        requiredLinks: "",
        notes: "",
        dueOn: "",
        writerId: "",
      });
      setMessage("Assignment created.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create assignment");
    } finally {
      setBusy(false);
    }
  }

  async function cancelBrief(id: string) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await apiFetch(`/briefs/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ cancel: true }),
      });
      setMessage("Assignment cancelled.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not cancel");
    } finally {
      setBusy(false);
    }
  }

  async function startDraft(id: string) {
    setBusy(true);
    setError("");
    try {
      const data = await apiFetch<{ articleId: string }>(`/briefs/${id}/start`, {
        method: "POST",
      });
      navigate(`/articles/${data.articleId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start draft");
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Assignments</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        {isWriter
          ? "Briefs assigned to you. Start a draft when you are ready — you can still write an article without one."
          : "Hand a writer one query, a pillar, and an outline. They start the draft, so the byline stays theirs."}
      </p>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {message ? (
        <p className="mt-4 text-sm text-emerald-700">{message}</p>
      ) : null}

      {!isWriter ? (
        <form
          onSubmit={(e) => void createBrief(e)}
          className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2"
        >
          <label className="block text-sm font-medium sm:col-span-2">
            Target query
            <input
              required
              value={form.targetQuery}
              onChange={(e) =>
                setForm((f) => ({ ...f, targetQuery: e.target.value }))
              }
              className={inputClass}
              placeholder="how much protein per day"
            />
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            Working title
            <span className="ml-2 font-normal text-slate-400">optional</span>
            <input
              value={form.workingTitle}
              onChange={(e) =>
                setForm((f) => ({ ...f, workingTitle: e.target.value }))
              }
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium">
            Category
            <select
              required
              value={form.categoryId}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  categoryId: e.target.value,
                  subcategoryId: "",
                }))
              }
              className={inputClass}
            >
              <option value="">Select</option>
              {taxonomy.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Subcategory
            <select
              required
              value={form.subcategoryId}
              onChange={(e) =>
                setForm((f) => ({ ...f, subcategoryId: e.target.value }))
              }
              className={inputClass}
            >
              <option value="">Select</option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Writer
            <select
              required
              value={form.writerId}
              onChange={(e) =>
                setForm((f) => ({ ...f, writerId: e.target.value }))
              }
              className={inputClass}
            >
              <option value="">Select</option>
              {writers.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Due date
            <input
              type="date"
              value={form.dueOn}
              onChange={(e) => setForm((f) => ({ ...f, dueOn: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            Outline
            <span className="ml-2 font-normal text-slate-400">
              one heading per line
            </span>
            <textarea
              value={form.outline}
              onChange={(e) =>
                setForm((f) => ({ ...f, outline: e.target.value }))
              }
              rows={4}
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            Required links
            <textarea
              value={form.requiredLinks}
              onChange={(e) =>
                setForm((f) => ({ ...f, requiredLinks: e.target.value }))
              }
              rows={2}
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            Notes
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={2}
              className={inputClass}
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60"
            >
              Assign
            </button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <p className="mt-8 text-slate-500">Loading…</p>
      ) : briefs.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">No assignments yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {briefs.map((brief) => (
            <li
              key={brief.id}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {statusLabel(brief.status)} · {brief.categoryLabel} /{" "}
                    {brief.subcategoryLabel}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-900">
                    {brief.workingTitle || brief.targetQuery}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Query: {brief.targetQuery}
                    {" · "}
                    {dueLabel(brief.dueOn)}
                    {isWriter ? null : ` · ${brief.writerName}`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {isWriter && brief.status === "open" ? (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void startDraft(brief.id)}
                      className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60"
                    >
                      Start draft
                    </button>
                  ) : null}
                  {brief.articleId ? (
                    <Link
                      to={`/articles/${brief.articleId}`}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                    >
                      Open draft
                    </Link>
                  ) : null}
                  {!isWriter && brief.status !== "done" && brief.status !== "cancelled" ? (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void cancelBrief(brief.id)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  ) : null}
                </div>
              </div>
              {brief.outline ? (
                <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
                  {brief.outline}
                </pre>
              ) : null}
              {brief.requiredLinks ? (
                <p className="mt-2 text-sm text-slate-600">
                  Links: {brief.requiredLinks}
                </p>
              ) : null}
              {brief.notes ? (
                <p className="mt-2 text-sm text-slate-600">{brief.notes}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
