import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiFetch, type CmsExercise } from "@/lib/api/client";
import RichTextEditor from "@/components/RichTextEditor";

const GROUPS = [
  "chest",
  "back",
  "shoulders",
  "arms",
  "legs",
  "core",
  "cardio",
] as const;

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function arrayToLines(value: string[]): string {
  return (value ?? []).join("\n");
}

const empty = {
  muscleGroup: "chest" as (typeof GROUPS)[number],
  title: "",
  slug: "",
  excerpt: "",
  quickAnswer: "",
  bodyHtml: "",
  formCues: "",
  commonMistakes: "",
  programmingNotes: "",
  equipment: "",
  difficulty: "intermediate" as CmsExercise["difficulty"],
  primaryMuscles: "",
  secondaryMuscles: "",
  metaTitle: "",
  metaDescription: "",
  status: "draft" as CmsExercise["status"],
  robotsIndex: true,
  sortOrder: 0,
};

export default function ExerciseEditorPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    void apiFetch<{ exercise: CmsExercise }>(`/exercises/${id}`)
      .then((data) => {
        const ex = data.exercise;
        setForm({
          muscleGroup: ex.muscleGroup as (typeof GROUPS)[number],
          title: ex.title,
          slug: ex.slug,
          excerpt: ex.excerpt,
          quickAnswer: ex.quickAnswer,
          bodyHtml: ex.bodyHtml,
          formCues: arrayToLines(ex.formCues),
          commonMistakes: arrayToLines(ex.commonMistakes),
          programmingNotes: ex.programmingNotes,
          equipment: arrayToLines(ex.equipment),
          difficulty: ex.difficulty,
          primaryMuscles: arrayToLines(ex.primaryMuscles),
          secondaryMuscles: arrayToLines(ex.secondaryMuscles),
          metaTitle: ex.metaTitle,
          metaDescription: ex.metaDescription,
          status: ex.status,
          robotsIndex: ex.robotsIndex,
          sortOrder: ex.sortOrder,
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
      muscleGroup: form.muscleGroup,
      title: form.title,
      slug: form.slug || null,
      excerpt: form.excerpt,
      quickAnswer: form.quickAnswer,
      bodyHtml: form.bodyHtml,
      formCues: linesToArray(form.formCues),
      commonMistakes: linesToArray(form.commonMistakes),
      programmingNotes: form.programmingNotes,
      equipment: linesToArray(form.equipment),
      difficulty: form.difficulty,
      primaryMuscles: linesToArray(form.primaryMuscles),
      secondaryMuscles: linesToArray(form.secondaryMuscles),
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      status: form.status,
      robotsIndex: form.robotsIndex,
      sortOrder: Number(form.sortOrder) || 0,
    };
    try {
      if (isNew) {
        const data = await apiFetch<{ exercise: CmsExercise }>("/exercises", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setMessage("Created.");
        navigate(`/exercises/${data.exercise.id}`, { replace: true });
      } else {
        await apiFetch(`/exercises/${id}`, {
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
    if (!confirm("Delete this exercise?")) return;
    await apiFetch(`/exercises/${id}`, { method: "DELETE" });
    navigate("/exercises");
  }

  if (loading) return <p className="text-slate-600">Loading…</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/exercises" className="text-sm text-sky-700 hover:underline">
            ← Exercises
          </Link>
          <h1 className="mt-1 text-2xl font-bold">
            {isNew ? "New exercise" : "Edit exercise"}
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
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm"
              placeholder="auto from title"
            />
          </label>
          <label className="text-sm font-medium">
            Muscle group
            <select
              value={form.muscleGroup}
              onChange={(e) =>
                setForm({
                  ...form,
                  muscleGroup: e.target.value as (typeof GROUPS)[number],
                })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              {GROUPS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Difficulty
            <select
              value={form.difficulty}
              onChange={(e) =>
                setForm({
                  ...form,
                  difficulty: e.target.value as CmsExercise["difficulty"],
                })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              <option value="beginner">beginner</option>
              <option value="intermediate">intermediate</option>
              <option value="advanced">advanced</option>
            </select>
          </label>
          <label className="text-sm font-medium">
            Status
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as CmsExercise["status"],
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
        <label className="text-sm font-medium">
          Quick answer
          <textarea
            value={form.quickAnswer}
            onChange={(e) => setForm({ ...form, quickAnswer: e.target.value })}
            rows={3}
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
            Form cues (one per line)
            <textarea
              value={form.formCues}
              onChange={(e) => setForm({ ...form, formCues: e.target.value })}
              rows={5}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Common mistakes (one per line)
            <textarea
              value={form.commonMistakes}
              onChange={(e) =>
                setForm({ ...form, commonMistakes: e.target.value })
              }
              rows={5}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Equipment (one per line)
            <textarea
              value={form.equipment}
              onChange={(e) => setForm({ ...form, equipment: e.target.value })}
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Programming notes
            <textarea
              value={form.programmingNotes}
              onChange={(e) =>
                setForm({ ...form, programmingNotes: e.target.value })
              }
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Primary muscles (one per line)
            <textarea
              value={form.primaryMuscles}
              onChange={(e) =>
                setForm({ ...form, primaryMuscles: e.target.value })
              }
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Secondary muscles (one per line)
            <textarea
              value={form.secondaryMuscles}
              onChange={(e) =>
                setForm({ ...form, secondaryMuscles: e.target.value })
              }
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
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
