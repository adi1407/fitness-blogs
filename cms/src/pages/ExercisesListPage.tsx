import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, type CmsExercise } from "@/lib/api/client";

const GROUPS = [
  "chest",
  "back",
  "shoulders",
  "arms",
  "legs",
  "core",
  "cardio",
] as const;

export default function ExercisesListPage() {
  const [exercises, setExercises] = useState<CmsExercise[]>([]);
  const [group, setGroup] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState("");

  async function load() {
    const qs = new URLSearchParams();
    if (group) qs.set("group", group);
    if (status) qs.set("status", status);
    const q = qs.toString();
    const data = await apiFetch<{ exercises: CmsExercise[] }>(
      `/exercises${q ? `?${q}` : ""}`,
    );
    setExercises(data.exercises);
  }

  useEffect(() => {
    void load().catch((err) =>
      setError(err instanceof Error ? err.message : "Failed to load"),
    );
  }, [group, status]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Exercises</h1>
          <p className="mt-1 text-slate-600">
            Muscle-group library — publish form cues and programming notes.
          </p>
        </div>
        <Link
          to="/exercises/new"
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          New exercise
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">All groups</option>
          {GROUPS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Group</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {exercises.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No exercises yet.
                </td>
              </tr>
            ) : (
              exercises.map((ex) => (
                <tr key={ex.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      to={`/exercises/${ex.id}`}
                      className="font-medium text-sky-700 hover:underline"
                    >
                      {ex.title}
                    </Link>
                    <div className="font-mono text-xs text-slate-400">
                      {ex.path}
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{ex.muscleGroup}</td>
                  <td className="px-4 py-3">{ex.status}</td>
                  <td className="px-4 py-3">{ex.sortOrder}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
