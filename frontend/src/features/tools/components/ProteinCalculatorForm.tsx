"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { CalcAuthGate } from "@/features/tools/components/CalcAuthGate";
import {
  CalcInput,
  CalcWorkspace,
  FieldLabel,
  ResultHero,
  SegmentedControl,
} from "@/features/tools/components/CalcWorkspace";
import {
  PROTEIN_GOALS,
  calcProtein,
  kgToLb,
  lbToKg,
  type ProteinGoalId,
} from "@/features/tools/lib/calcMath";
import { loadCalcPrefs, saveCalcPrefs } from "@/features/tools/lib/calcPrefs";
import { cn } from "@/lib/utils";

export function ProteinCalculatorForm() {
  return (
    <CalcAuthGate
      toolName="protein calculator"
      tool="protein-calculator"
      actionLabel="unlock your protein estimate"
    >
      {(gate) => <ProteinInner {...gate} />}
    </CalcAuthGate>
  );
}

function ProteinInner({
  memberId,
  memberName,
  isSignedIn,
  acknowledged,
  requestAck,
  requestSignIn,
}: {
  memberId: string | null;
  memberName: string | null;
  isSignedIn: boolean;
  acknowledged: boolean;
  requestAck: () => void;
  requestSignIn: () => void;
}) {
  const [weight, setWeight] = useState(70);
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [goal, setGoal] = useState<ProteinGoalId>("muscle");

  useEffect(() => {
    if (!memberId) return;
    const prefs = loadCalcPrefs(memberId);
    if (prefs.weightKg) {
      setWeight(
        prefs.weightUnit === "lb"
          ? Math.round(kgToLb(prefs.weightKg))
          : Math.round(prefs.weightKg),
      );
      setUnit(prefs.weightUnit ?? "kg");
    }
    if (prefs.proteinGoal) setGoal(prefs.proteinGoal);
  }, [memberId]);

  const weightKg = unit === "kg" ? weight : lbToKg(weight);
  const result = useMemo(
    () => calcProtein(weightKg, goal),
    [weightKg, goal],
  );

  return (
    <CalcWorkspace
      title="Daily protein"
      purpose="Estimate grams per day from body weight and goal — then use foods to hit the target."
      signedInAs={isSignedIn ? memberName : null}
      locked={!isSignedIn}
      lockTitle="Sign in to calculate protein"
      onUnlockClick={requestSignIn}
      inputs={
        <>
          <FieldLabel label="Body weight">
            <div className="flex gap-2">
              <CalcInput
                type="number"
                min={30}
                max={400}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value) || 0)}
              />
              <SegmentedControl
                value={unit}
                onChange={(u) => {
                  if (u === unit) return;
                  setWeight(
                    u === "lb"
                      ? Math.round(kgToLb(weight))
                      : Math.round(lbToKg(weight)),
                  );
                  setUnit(u);
                }}
                options={[
                  { id: "kg", label: "kg" },
                  { id: "lb", label: "lb" },
                ]}
              />
            </div>
          </FieldLabel>
          <div>
            <p className="text-sm font-medium">Goal</p>
            <div className="mt-2 grid gap-2">
              {PROTEIN_GOALS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition",
                    goal === g.id
                      ? "border-primary bg-[#0A0A0A] text-white"
                      : "border-border bg-white hover:border-primary/40",
                  )}
                >
                  <span className="text-sm font-semibold">{g.label}</span>
                  <span
                    className={cn(
                      "text-xs",
                      goal === g.id ? "text-white/70" : "text-muted-foreground",
                    )}
                  >
                    {g.factor} g/kg
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      }
      calculateSlot={
        !acknowledged ? (
          <Button
            type="button"
            onClick={() => {
              requestAck();
              saveCalcPrefs(memberId, {
                weightKg,
                weightUnit: unit,
                proteinGoal: goal,
                proteinPerKg: result.factor,
              });
            }}
          >
            Calculate protein
          </Button>
        ) : null
      }
      results={
        <>
          <ResultHero
            show={acknowledged}
            label="Estimated daily protein"
            value={result.grams}
            unit="g/day"
          />
          {acknowledged ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Practical range ~{result.low}–{result.high} g based on ~
              {result.kg.toFixed(1)} kg. Educational estimate only.
            </p>
          ) : null}
        </>
      }
      footer={
        <div className="flex flex-wrap gap-3">
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
      }
    />
  );
}
