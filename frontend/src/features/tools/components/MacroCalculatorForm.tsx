"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { CalcAuthGate } from "@/features/tools/components/CalcAuthGate";
import {
  CalcInput,
  CalcWorkspace,
  FieldLabel,
  MacroBar,
  ResultHero,
  SegmentedControl,
} from "@/features/tools/components/CalcWorkspace";
import { calcMacros, kgToLb, lbToKg } from "@/features/tools/lib/calcMath";
import { loadCalcPrefs, saveCalcPrefs } from "@/features/tools/lib/calcPrefs";
import { cn } from "@/lib/utils";

const PROTEIN_OPTIONS = [
  { id: 1.2, label: "1.2 g/kg", helper: "General" },
  { id: 1.6, label: "1.6 g/kg", helper: "Active" },
  { id: 1.8, label: "1.8 g/kg", helper: "Fat loss" },
  { id: 2.0, label: "2.0 g/kg", helper: "Muscle" },
] as const;

export function MacroCalculatorForm() {
  return (
    <CalcAuthGate
      toolName="macro calculator"
      tool="macro-calculator"
      actionLabel="unlock your macro split"
    >
      {(gate) => <MacroInner {...gate} />}
    </CalcAuthGate>
  );
}

function MacroInner({
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
  const [calories, setCalories] = useState(2000);
  const [weight, setWeight] = useState(70);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [proteinPerKg, setProteinPerKg] = useState(1.8);

  useEffect(() => {
    if (!memberId) return;
    const prefs = loadCalcPrefs(memberId);
    if (prefs.calorieTarget) setCalories(prefs.calorieTarget);
    else if (prefs.tdee) setCalories(prefs.tdee);
    if (prefs.weightKg) {
      setWeight(
        prefs.weightUnit === "lb"
          ? Math.round(kgToLb(prefs.weightKg))
          : Math.round(prefs.weightKg),
      );
      setWeightUnit(prefs.weightUnit ?? "kg");
    }
    if (prefs.proteinPerKg) setProteinPerKg(prefs.proteinPerKg);
  }, [memberId]);

  const weightKg = weightUnit === "kg" ? weight : lbToKg(weight);
  const result = useMemo(
    () => calcMacros(calories, weightKg, proteinPerKg),
    [calories, weightKg, proteinPerKg],
  );

  return (
    <CalcWorkspace
      title="Split with purpose"
      purpose="Turn calorie targets into protein, carbs, and fat — educational ranges only."
      signedInAs={isSignedIn ? memberName : null}
      locked={!isSignedIn}
      lockTitle="Sign in to calculate macros"
      onUnlockClick={requestSignIn}
      inputs={
        <>
          <FieldLabel label="Daily calories">
            <CalcInput
              type="number"
              min={1000}
              max={6000}
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value) || 0)}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Prefills from your last calorie or TDEE target when signed in.
            </p>
          </FieldLabel>
          <FieldLabel label="Body weight">
            <div className="flex gap-2">
              <CalcInput
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value) || 0)}
              />
              <SegmentedControl
                value={weightUnit}
                onChange={(u) => {
                  if (u === weightUnit) return;
                  setWeight(
                    u === "lb"
                      ? Math.round(kgToLb(weight))
                      : Math.round(lbToKg(weight)),
                  );
                  setWeightUnit(u);
                }}
                options={[
                  { id: "kg", label: "kg" },
                  { id: "lb", label: "lb" },
                ]}
              />
            </div>
          </FieldLabel>
          <div>
            <p className="text-sm font-medium">Protein intensity</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {PROTEIN_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setProteinPerKg(opt.id)}
                  className={cn(
                    "rounded-xl border px-3 py-2.5 text-left transition",
                    proteinPerKg === opt.id
                      ? "border-primary bg-[#0A0A0A] text-white"
                      : "border-border bg-white hover:border-primary/40",
                  )}
                >
                  <span className="block text-sm font-semibold">{opt.label}</span>
                  <span
                    className={cn(
                      "text-xs",
                      proteinPerKg === opt.id
                        ? "text-white/70"
                        : "text-muted-foreground",
                    )}
                  >
                    {opt.helper}
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
                calorieTarget: calories,
                weightKg,
                proteinPerKg,
                weightUnit,
              });
            }}
          >
            Calculate macros
          </Button>
        ) : null
      }
      results={
        acknowledged ? (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-brand-50 p-4">
                <p className="text-xs text-muted-foreground">Protein</p>
                <p className="mt-1 text-2xl font-semibold">
                  {result.protein}
                  <span className="ml-1 text-sm font-medium text-muted-foreground">
                    g
                  </span>
                </p>
              </div>
              <div className="rounded-xl bg-brand-50 p-4">
                <p className="text-xs text-muted-foreground">Carbs</p>
                <p className="mt-1 text-2xl font-semibold">
                  {result.carbs}
                  <span className="ml-1 text-sm font-medium text-muted-foreground">
                    g
                  </span>
                </p>
              </div>
              <div className="rounded-xl bg-brand-50 p-4">
                <p className="text-xs text-muted-foreground">Fat</p>
                <p className="mt-1 text-2xl font-semibold">
                  {result.fat}
                  <span className="ml-1 text-sm font-medium text-muted-foreground">
                    g
                  </span>
                </p>
              </div>
            </div>
            <MacroBar
              proteinPct={result.pct.protein}
              carbsPct={result.pct.carbs}
              fatPct={result.pct.fat}
            />
          </>
        ) : (
          <ResultHero show={false} label="" value="" />
        )
      }
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/foods/indian" className="fk-link font-semibold">
            Indian foods
          </Link>
          <Link href="/nutrition/protein" className="fk-link font-semibold">
            Protein guide
          </Link>
        </div>
      }
    />
  );
}
