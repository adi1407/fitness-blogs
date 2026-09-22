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
import { calcCalorieTarget } from "@/features/tools/lib/calcMath";
import { loadCalcPrefs, saveCalcPrefs } from "@/features/tools/lib/calcPrefs";

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
  const [tdee, setTdee] = useState(2200);
  const [goal, setGoal] = useState<"loss" | "maintain" | "gain">("loss");

  useEffect(() => {
    if (!memberId) return;
    const prefs = loadCalcPrefs(memberId);
    if (prefs.tdee) setTdee(prefs.tdee);
    else if (prefs.calorieTarget) setTdee(prefs.calorieTarget);
  }, [memberId]);

  const result = useMemo(
    () => calcCalorieTarget(tdee, goal),
    [tdee, goal],
  );

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
              onChange={(e) => setTdee(Number(e.target.value) || 0)}
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
        !acknowledged ? (
          <Button
            type="button"
            onClick={() => {
              requestAck();
              saveCalcPrefs(memberId, {
                tdee,
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
            show={acknowledged}
            label="Daily calorie target"
            value={result.target}
            unit="kcal"
          />
          {acknowledged && goal === "loss" ? (
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
            onClick={() =>
              saveCalcPrefs(memberId, {
                tdee,
                calorieTarget: result.target,
              })
            }
          >
            Split into macros
          </Link>
        </div>
      }
    />
  );
}
