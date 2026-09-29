"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  CalcWorkspace,
  ResultChip,
  ResultHero,
} from "@/features/tools/components/CalcWorkspace";
import {
  ActivityField,
  BodyStatsFields,
} from "@/features/tools/components/BodyStatsFields";
import { CalcSaveBar } from "@/features/tools/components/CalcSaveBar";
import {
  calcTdee,
  isActivityId,
  type ActivityId,
} from "@/features/tools/lib/calcMath";
import { handoffHref, takeHandoff } from "@/features/tools/lib/calcHandoff";
import { useBodyStats } from "@/features/tools/hooks/useBodyStats";
import { useCalcMember } from "@/features/tools/hooks/useCalcMember";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";
import type { CalcSavePayload } from "@/features/tools/types";

const TOOL = "tdee-calculator" as const;

export function TdeeCalculatorForm() {
  const calc = useCalcMember(TOOL);
  const [activity, setActivity] = useState<ActivityId>("moderate");
  const stats = useBodyStats({
    profile: calc.profile,
    applyProfileExtras: (p) => {
      if (p.activity) setActivity(p.activity);
    },
  });

  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps -- the URL is only readable after hydration; runs once */
  useEffect(() => {
    const h = takeHandoff(["sex", "age", "kg", "cm", "activity"] as const);
    stats.applyHandoff(h);
    if (isActivityId(h.activity)) setActivity(h.activity);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  const { ageN, kg, cm, sex } = stats;
  const computed = useMemo(() => {
    if (ageN == null || kg == null || cm == null) return null;
    return calcTdee(sex, kg, cm, ageN, activity);
  }, [sex, kg, cm, ageN, activity]);

  const { shown: result, runId, runCalculate } = useCalcResult<
    NonNullable<typeof computed>
  >(TOOL, `${stats.key}|${activity}`);

  const statsParams = {
    sex,
    age: ageN,
    kg: kg != null ? Math.round(kg) : null,
    cm: cm != null ? Math.round(cm) : null,
    activity,
  };

  const payload: CalcSavePayload | null = result
    ? {
        tool: TOOL,
        inputs: { sex, age: ageN ?? 0, kg: Math.round(kg ?? 0), cm: Math.round(cm ?? 0), activity },
        result: {
          label: "TDEE (maintenance)",
          value: result.tdee,
          unit: "kcal/day",
          bmr: result.bmr,
        },
        profile: { ...stats.toProfile(), activity },
      }
    : null;

  return (
    <CalcWorkspace
      title="Know your daily calories"
      purpose="Estimate the calories you burn in a day from body stats and activity."
      signedInAs={calc.memberName}
      inputs={
        <>
          <BodyStatsFields stats={stats} />
          <ActivityField value={activity} onChange={setActivity} />
        </>
      }
      calculateSlot={
        <Button
          type="button"
          className="w-full sm:w-auto"
          disabled={!computed}
          onClick={() => {
            if (computed) runCalculate(computed);
          }}
        >
          Calculate TDEE
        </Button>
      }
      results={
        <>
          <ResultHero
            key={runId}
            show={result != null}
            label="Estimated TDEE (maintenance)"
            value={result?.tdee.toLocaleString("en-IN") ?? ""}
            unit="kcal/day"
          />
          {result ? (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                BMR (at rest) ≈ {result.bmr.toLocaleString("en-IN")} kcal/day.
                Eating around your TDEE keeps weight roughly stable.
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                <ResultChip
                  label="Fat loss start (−20%)"
                  value={`~${result.cut.toLocaleString("en-IN")} kcal`}
                  href={handoffHref("/tools/calorie-calculator", {
                    ...statsParams,
                    goal: "loss",
                  })}
                />
                <ResultChip
                  label="Maintain"
                  value={`~${result.maintain.toLocaleString("en-IN")} kcal`}
                  href={handoffHref("/tools/macro-calculator", {
                    calories: result.maintain,
                    kg: statsParams.kg,
                  })}
                />
                <ResultChip
                  label="Lean gain (+10%)"
                  value={`~${result.bulk.toLocaleString("en-IN")} kcal`}
                  href={handoffHref("/tools/calorie-calculator", {
                    ...statsParams,
                    goal: "gain",
                  })}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Tap a card to open it in the next calculator with your details
                filled in.
              </p>
            </div>
          ) : null}
        </>
      }
      afterResults={<CalcSaveBar key={runId} calc={calc} payload={payload} />}
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href={
              result
                ? handoffHref("/tools/calorie-calculator", statsParams)
                : "/tools/calorie-calculator"
            }
            className="fk-link font-semibold"
          >
            Full calorie plan
          </Link>
          <Link
            href={
              result
                ? handoffHref("/tools/macro-calculator", {
                    calories: result.tdee,
                    kg: statsParams.kg,
                  })
                : "/tools/macro-calculator"
            }
            className="fk-link font-semibold"
          >
            Macro calculator
          </Link>
          <Link href="/weight-loss" className="fk-link font-semibold">
            Weight loss guide
          </Link>
        </div>
      }
    />
  );
}
