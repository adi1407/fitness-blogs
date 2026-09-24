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
  setNumField,
  type NumField,
} from "@/features/tools/lib/calcFields";
import { calcCalorieTarget } from "@/features/tools/lib/calcMath";
import { loadCalcPrefs, saveCalcPrefs } from "@/features/tools/lib/calcPrefs";
import { useCalcReveal } from "@/features/tools/hooks/useCalcReveal";

export function CalorieCalculatorForm() {
  return (
    <CalcAuthGate
      toolName="calorie calculator"
      tool="calorie-calculator"
      actionLabel="unlock your calorie target"
    >
      {(gate) => <CalorieInner {...gate} />}
    </CalcAuthGate>
  );
}

function CalorieInner({
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
  const [tdee, setTdee] = useState<NumField>(numField(2200));
  const [goal, setGoal] = useState<"loss" | "maintain" | "gain">("loss");
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
    if (prefs.tdee) setTdee(numField(prefs.tdee));
    else if (prefs.calorieTarget) setTdee(numField(prefs.calorieTarget));
    setPrefsReady(true);
  }, [memberId]);

  const tdeeN = parseNum(tdee);
  const inputsValid = tdeeN != null && tdeeN > 0;

  const result = useMemo(() => {
    if (!inputsValid || tdeeN == null) return null;
    return calcCalorieTarget(tdeeN, goal);
  }, [inputsValid, tdeeN, goal]);

  return (
    <CalcWorkspace
      title="Goal calorie target"
      purpose="Turn maintenance calories into a fat-loss, maintain, or surplus target."
      signedInAs={isSignedIn ? memberName : null}
      locked={!isSignedIn}
      lockTitle="Sign in to calculate calories"
      onUnlockClick={requestSignIn}
      inputs={
        <>
          <FieldLabel label="Maintenance calories (TDEE)">
            <CalcInput
              type="number"
              min={1000}
              max={6000}
              value={tdee}
              onChange={(e) => setNumField(e.target.value, setTdee)}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Prefills from your last TDEE when signed in.{" "}
              <Link href="/tools/tdee-calculator" className="fk-link">
                Estimate TDEE
              </Link>
            </p>
          </FieldLabel>
          <FieldLabel label="Goal">
            <SegmentedControl
              value={goal}
              onChange={setGoal}
              options={[
                { id: "loss", label: "Fat loss" },
                { id: "maintain", label: "Maintain" },
                { id: "gain", label: "Gain" },
              ]}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Loss ≈ 20% below · Gain ≈ 10% above maintenance
            </p>
          </FieldLabel>
        </>
      }
      calculateSlot={
        isSignedIn ? (
          <Button
            type="button"
            disabled={!prefsReady || !inputsValid || !result}
            onClick={() => {
              if (!inputsValid || tdeeN == null || !result) return;
              runCalculate();
              saveCalcPrefs(memberId, {
                tdee: tdeeN,
                calorieTarget: result.target,
              });
            }}
          >
            Calculate calories
          </Button>
        ) : null
      }
      results={
        <>
          <ResultHero
            show={revealed && result != null}
            label="Daily calorie target"
            value={result?.target ?? ""}
            unit="kcal"
          />
          {revealed && result && goal === "loss" ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Rough weekly deficit ≈ {result.weeklyDeficit} kcal (not a fat-loss
              guarantee).
            </p>
          ) : null}
        </>
      }
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/tools/tdee-calculator" className="fk-link font-semibold">
            Estimate TDEE first
          </Link>
          <Link
            href="/tools/macro-calculator"
            className="fk-link font-semibold"
            onClick={() => {
              if (tdeeN != null && result) {
                saveCalcPrefs(memberId, {
                  tdee: tdeeN,
                  calorieTarget: result.target,
                });
              }
            }}
          >
            Split into macros
          </Link>
        </div>
      }
    />
  );
}
