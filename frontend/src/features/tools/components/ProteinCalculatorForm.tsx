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
  numField,
  parseNum,
  roundNumField,
  setNumField,
  type NumField,
} from "@/features/tools/lib/calcFields";
import {
  PROTEIN_GOALS,
  calcProtein,
  kgToLb,
  lbToKg,
  type ProteinGoalId,
} from "@/features/tools/lib/calcMath";
import { loadCalcPrefs, saveCalcPrefs } from "@/features/tools/lib/calcPrefs";
import { useCalcReveal } from "@/features/tools/hooks/useCalcReveal";
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
  const [weight, setWeight] = useState<NumField>(numField(70));
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [goal, setGoal] = useState<ProteinGoalId>("muscle");
  const [prefsReady, setPrefsReady] = useState(!memberId);
  const { revealed, runCalculate } = useCalcReveal(
    acknowledged,
    requestAck,
    memberId,
  );

  useEffect(() => {
    if (!memberId) {
      setPrefsReady(true);
      return;
    }
    setPrefsReady(false);
    const prefs = loadCalcPrefs(memberId);
    if (prefs.weightKg) {
      setWeight(
        prefs.weightUnit === "lb"
          ? roundNumField(kgToLb(prefs.weightKg))
          : roundNumField(prefs.weightKg),
      );
      setUnit(prefs.weightUnit ?? "kg");
    }
    if (prefs.proteinGoal) setGoal(prefs.proteinGoal);
    setPrefsReady(true);
  }, [memberId]);

  const weightN = parseNum(weight);
  const weightKg =
    weightN == null ? null : unit === "kg" ? weightN : lbToKg(weightN);
  const inputsValid = weightKg != null && weightKg > 0;

  const result = useMemo(() => {
    if (!inputsValid || weightKg == null) return null;
    return calcProtein(weightKg, goal);
  }, [inputsValid, weightKg, goal]);

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
                onChange={(e) => setNumField(e.target.value, setWeight)}
              />
              <SegmentedControl
                value={unit}
                onChange={(u) => {
                  if (u === unit) return;
                  if (weightN != null) {
                    setWeight(
                      u === "lb"
                        ? roundNumField(kgToLb(weightN))
                        : roundNumField(lbToKg(weightN)),
                    );
                  }
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
        isSignedIn ? (
          <Button
            type="button"
            disabled={!prefsReady || !inputsValid || !result}
            onClick={() => {
              if (!inputsValid || weightKg == null || !result) return;
              runCalculate();
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
            show={revealed && result != null}
            label="Estimated daily protein"
            value={result?.grams ?? ""}
            unit="g/day"
          />
          {revealed && result ? (
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
