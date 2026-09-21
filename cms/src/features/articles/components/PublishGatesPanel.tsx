import { useCallback, useEffect, useState } from "react";
import { apiFetch, type PublishGate } from "@/lib/api/client";

type Props = {
  articleId: string | null;
  /** Bump to refetch after saves. */
  refreshKey?: number;
};

/** Live publish-gate checklist for editors. */
export function PublishGatesPanel({ articleId, refreshKey = 0 }: Props) {
  const [gates, setGates] = useState<PublishGate[]>([]);
  const [ok, setOk] = useState(false);

  const load = useCallback(async () => {
    if (!articleId) {
      setGates([]);
      setOk(false);
      return;
    }
    try {
      const data = await apiFetch<{ gates: PublishGate[]; ok: boolean }>(
        `/articles/${articleId}/publish-gates`,
      );
      setGates(data.gates);
      setOk(data.ok);
    } catch {
      setGates([]);
      setOk(false);
    }
  }, [articleId]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  if (!articleId) return null;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Publish gates</h2>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            ok
              ? "bg-emerald-50 text-emerald-800"
              : "bg-amber-50 text-amber-900"
          }`}
        >
          {ok ? "Ready" : "Blocked"}
        </span>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Editors cannot publish until every gate passes (sources, disclaimer,
        unique primary keyword, depth).
      </p>
      <ul className="mt-4 space-y-2">
        {gates.map((g) => (
          <li key={g.id} className="flex items-start gap-2 text-sm">
            <span
              className={
                g.pass ? "font-bold text-emerald-600" : "font-bold text-amber-600"
              }
            >
              {g.pass ? "✓" : "✗"}
            </span>
            <span className={g.pass ? "text-slate-700" : "text-slate-900"}>
              {g.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
