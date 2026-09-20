import { useEffect, useState } from "react";

type Props = {
  userId: string;
  publishedThisWeek: number;
};

const DEFAULT_GOAL = 2;

function goalKey(userId: string) {
  return `cms_writer_goal_${userId}`;
}

/** Personal weekly publish target — stored per user in localStorage. */
export function WriterWeeklyGoal({ userId, publishedThisWeek }: Props) {
  const [goal, setGoal] = useState(DEFAULT_GOAL);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(goalKey(userId));
      const n = raw ? Number(raw) : DEFAULT_GOAL;
      if (Number.isFinite(n) && n >= 1 && n <= 7) setGoal(n);
    } catch {
      /* ignore */
    }
  }, [userId]);

  function updateGoal(next: number) {
    const clamped = Math.min(7, Math.max(1, next));
    setGoal(clamped);
    try {
      localStorage.setItem(goalKey(userId), String(clamped));
    } catch {
      /* ignore */
    }
  }

  const pct = Math.min(100, Math.round((publishedThisWeek / goal) * 100));
  const met = publishedThisWeek >= goal;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-slate-900">Weekly publish goal</h2>
          <p className="mt-1 text-sm text-slate-600">
            {publishedThisWeek} of {goal} published this week
            {met ? " — goal met." : "."}
          </p>
        </div>
        <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
          Target
          <select
            value={goal}
            onChange={(e) => updateGoal(Number(e.target.value))}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm font-semibold text-slate-900"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={n}>
                {n}/week
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${
            met ? "bg-emerald-500" : "bg-sky-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </section>
  );
}
