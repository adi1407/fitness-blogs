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
import { calcCalorieTarget } from "@/features/tools/lib/calcMath";
import {
  handoffHref,
  handoffNumber,
  takeHandoff,
} from "@/features/tools/lib/calcHandoff";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";

type Goal = "loss" | "maintain" | "gain";

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
  const [goal, setGoal] = useState<Goal>("loss");

  /* eslint-disable react-hooks/set-state-in-effect -- the URL is only readable after hydration */
  useEffect(() => {
    const h = takeHandoff(["tdee", "goal"] as const);
    const t = handoffNumber(h.tdee, 1000, 6000);
    if (t != null) setTdee(roundNumField(t));
    if (h.goal === "loss" || h.goal === "maintain" || h.goal === "gain") {
      setGoal(h.goal);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const tdeeN = parseNum(tdee);

  const computed = useMemo(() => {
    if (tdeeN == null || tdeeN <= 0) return null;
    return { ...calcCalorieTarget(tdeeN, goal), goal };
  }, [tdeeN, goal]);

  const { shown: result, runId, runCalculate } = useCalcResult<NonNullable<typeof computed>>(
    acknowledged,
    requestAck,
    [memberId, tdee, goal].join("|"),
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
              onChange={(e) => setNumField(e.target.value, setTdee)}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Don&apos;t know it?{" "}
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
            disabled={!computed}
            onClick={() => {
              if (computed) runCalculate(computed);
            }}
          >
            Calculate calories
          </Button>
        ) : null
      }
      results={
        <>
          <ResultHero
            key={runId}
            show={result != null}
            label="Daily calorie target"
            value={result?.target ?? ""}
            unit="kcal"
          />
          {result && result.goal === "loss" ? (
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
            href={
              result
                ? handoffHref("/tools/macro-calculator", {
                    calories: result.target,
                  })
                : "/tools/macro-calculator"
            }
            className="fk-link font-semibold"
          >
            Split into macros
          </Link>
        </div>
      }
    />
  );
}
