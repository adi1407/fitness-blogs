"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { EducationalCalcGate } from "@/features/tools/components/EducationalCalcGate";

const GOALS = [
  { id: "general", label: "General health", factor: 1.2 },
  { id: "fat-loss", label: "Fat loss", factor: 1.8 },
  { id: "muscle", label: "Muscle building", factor: 2.0 },
] as const;

type GoalId = (typeof GOALS)[number]["id"];

export function ProteinCalculatorForm() {
  const [weight, setWeight] = useState(70);
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [goal, setGoal] = useState<GoalId>("muscle");

  const result = useMemo(() => {
    const kg = unit === "kg" ? weight : weight * 0.453592;
    const factor = GOALS.find((g) => g.id === goal)?.factor ?? 1.6;
    const grams = Math.round(kg * factor);
    return {
      kg,
      grams,
      low: Math.round(kg * (factor - 0.2)),
      high: Math.round(kg * (factor + 0.2)),
    };
  }, [weight, unit, goal]);

  return (
    <EducationalCalcGate toolName="protein calculator" tool="protein-calculator">
      {({ acknowledged, requestAck }) => (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Body weight</span>
              <div className="mt-2 flex gap-2">
                <input
                  type="number"
                  min={30}
                  max={400}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-border bg-white px-3 py-2 outline-none focus:border-primary"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as "kg" | "lb")}
                  className="rounded-xl border border-border bg-white px-3 py-2"
                >
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                </select>
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium">Goal</span>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as GoalId)}
                className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2"
              >
                {GOALS.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {!acknowledged ? (
            <div className="mt-6">
              <Button type="button" onClick={requestAck}>
                Calculate protein
              </Button>
              <p className="mt-3 text-sm text-muted-foreground">
                Acknowledge the educational disclaimer to reveal your estimate.
              </p>
            </div>
          ) : (
            <div className="mt-8 rounded-xl bg-brand-50 p-5">
              <p className="text-sm text-muted-foreground">Estimated daily protein</p>
              <p className="mt-1 text-4xl font-semibold tracking-tight">
                {result.grams}
                <span className="ml-2 text-lg font-medium text-muted-foreground">
                  g/day
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Practical range ~{result.low}–{result.high} g based on ~
                {result.kg.toFixed(1)} kg. Educational estimate only.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/nutrition/protein"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Read protein guide
            </Link>
            <Link
              href="/foods/indian"
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
            >
              Indian high-protein foods
            </Link>
          </div>
        </div>
      )}
    </EducationalCalcGate>
  );
}
