"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  CalcWorkspace,
  ResultHero,
} from "@/features/tools/components/CalcWorkspace";
import { BodyStatsFields } from "@/features/tools/components/BodyStatsFields";
import { CalcSaveBar } from "@/features/tools/components/CalcSaveBar";
import { mifflinBmr } from "@/features/tools/lib/calcMath";
import { handoffHref, takeHandoff } from "@/features/tools/lib/calcHandoff";
import { useBodyStats } from "@/features/tools/hooks/useBodyStats";
import { useCalcMember } from "@/features/tools/hooks/useCalcMember";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";
import type { CalcSavePayload } from "@/features/tools/types";

const TOOL = "bmr-calculator" as const;

export function BmrCalculatorForm() {
  const calc = useCalcMember(TOOL);
  const stats = useBodyStats({ profile: calc.profile });

  /* eslint-disable react-hooks/exhaustive-deps -- the URL is only readable after hydration; runs once */
  useEffect(() => {
    stats.applyHandoff(takeHandoff(["sex", "age", "kg", "cm"] as const));
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const { ageN, kg, cm, sex } = stats;
  const computed = useMemo(() => {
    if (ageN == null || kg == null || cm == null) return null;
    return {
      bmr: Math.round(mifflinBmr(sex, kg, cm, ageN)),
      sex,
      age: ageN,
      kg: Math.round(kg),
      cm: Math.round(cm),
    };
  }, [sex, kg, cm, ageN]);

  const { shown: result, runId, runCalculate } = useCalcResult<
    NonNullable<typeof computed>
  >(TOOL, stats.key);

  const payload: CalcSavePayload | null = result
    ? {
        tool: TOOL,
        inputs: { sex: result.sex, age: result.age, kg: result.kg, cm: result.cm },
        result: { label: "BMR", value: result.bmr, unit: "kcal/day" },
        profile: stats.toProfile(),
      }
    : null;

  const tdeeHref = result
    ? handoffHref("/tdee-calculator", {
        sex: result.sex,
        age: result.age,
        kg: result.kg,
        cm: result.cm,
      })
    : "/tdee-calculator";

  return (
    <CalcWorkspace
      title="Resting burn"
      purpose="Estimate the calories your body uses at complete rest (Mifflin–St Jeor)."
      signedInAs={calc.memberName}
      inputs={<BodyStatsFields stats={stats} />}
      calculateSlot={
        <Button
          type="button"
          disabled={!computed}
          onClick={() => {
            if (computed) runCalculate(computed);
          }}
        >
          Calculate BMR
        </Button>
      }
      results={
        <>
          <ResultHero
            key={runId}
            show={result != null}
            label="Estimated BMR"
            value={result?.bmr.toLocaleString("en-IN") ?? ""}
            unit="kcal/day"
          />
          {result ? (
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p>
                This is roughly what you would burn lying still all day. It is
                not an eating target — daily movement and training come on top.
              </p>
              <p>
                <Link href={tdeeHref} className="fk-link font-semibold">
                  Add your activity level to get maintenance calories (TDEE)
                </Link>
              </p>
            </div>
          ) : null}
        </>
      }
      afterResults={<CalcSaveBar key={runId} calc={calc} payload={payload} />}
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href={tdeeHref} className="fk-link font-semibold">
            TDEE calculator
          </Link>
          <Link href="/calorie-calculator" className="fk-link font-semibold">
            Calorie calculator
          </Link>
        </div>
      }
    />
  );
}
