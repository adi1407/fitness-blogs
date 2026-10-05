import { macroSplit } from "@/features/foods/lib/nutrition";

/** Share of calories from protein, carbs and fat. */
export function MacroSplitBar({ proteinG, carbsG, fatG }: { proteinG: number; carbsG: number; fatG: number }) {
  const { proteinPct, carbsPct, fatPct } = macroSplit({ proteinG, carbsG, fatG });
  const parts = [
    { label: "Protein", pct: proteinPct, color: "bg-[#0A0A0A]" },
    { label: "Carbs", pct: carbsPct, color: "bg-[#FF9800]" },
    { label: "Fat", pct: fatPct, color: "bg-[#D4D4D4]" },
  ];
  return (
    <div>
      <div
        className="flex h-3 overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`Calories from protein ${proteinPct}%, carbs ${carbsPct}%, fat ${fatPct}%`}
      >
        {parts.map((p) => (
          <div key={p.label} className={p.color} style={{ width: `${p.pct}%` }} />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {parts.map((p) => (
          <span key={p.label} className="inline-flex items-center gap-1.5">
            <span className={`inline-block size-2 rounded-full ${p.color}`} aria-hidden="true" />
            {p.label} {p.pct}%
          </span>
        ))}
      </div>
    </div>
  );
}
