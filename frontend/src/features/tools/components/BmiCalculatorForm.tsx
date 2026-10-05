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
import {
  BMI_CATEGORY_LABEL,
  calcBmi,
  type BmiCategoryId,
} from "@/features/tools/lib/calcMath";
import { takeHandoff } from "@/features/tools/lib/calcHandoff";
import { useBodyStats } from "@/features/tools/hooks/useBodyStats";
import { useCalcMember } from "@/features/tools/hooks/useCalcMember";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";
import type { CalcSavePayload } from "@/features/tools/types";
import { cn } from "@/lib/utils";

const TOOL = "bmi-calculator" as const;

function CategoryRow({
  scale,
  category,
  bands,
}: {
  scale: string;
  category: BmiCategoryId;
  bands: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3">
      <div>
        <p className="text-xs font-medium text-muted-foreground">{scale}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{bands}</p>
      </div>
      <span
        className={cn(
          "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
          category === "normal"
            ? "bg-brand-50 text-foreground"
            : "bg-[#FFF3E0] text-foreground",
        )}
      >
        {BMI_CATEGORY_LABEL[category]}
      </span>
    </div>
  );
}

export function BmiCalculatorForm() {
  const calc = useCalcMember(TOOL);
  const stats = useBodyStats({ profile: calc.profile });

  /* eslint-disable react-hooks/exhaustive-deps -- the URL is only readable after hydration; runs once */
  useEffect(() => {
    stats.applyHandoff(takeHandoff(["kg", "cm"] as const));
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const { kg, cm } = stats;
  const computed = useMemo(() => {
    if (kg == null || cm == null) return null;
    return calcBmi(kg, cm);
  }, [kg, cm]);

  const { shown: result, runId, runCalculate } = useCalcResult<
    NonNullable<typeof computed>
  >(TOOL, stats.key);

  const payload: CalcSavePayload | null =
    result && kg != null && cm != null
      ? {
          tool: TOOL,
          inputs: { kg: Math.round(kg * 10) / 10, cm: Math.round(cm) },
          result: {
            label: "BMI",
            value: result.bmi,
            unit: "",
            category: BMI_CATEGORY_LABEL[result.categoryId],
            asianCategory: BMI_CATEGORY_LABEL[result.asianCategoryId],
          },
          profile: {
            kg: Math.round(kg * 10) / 10,
            cm: Math.round(cm),
            weightUnit: stats.weightUnit,
            heightUnit: stats.heightUnit,
          },
        }
      : null;

  const differs = result != null && result.categoryId !== result.asianCategoryId;

  return (
    <CalcWorkspace
      title="Screening metric"
      purpose="BMI is a quick screening number — not a diagnosis or a body-fat measurement."
      signedInAs={calc.memberName}
      inputs={
        <BodyStatsFields stats={stats} showSex={false} showAge={false} />
      }
      calculateSlot={
        <Button
          type="button"
          disabled={!computed}
          onClick={() => {
            if (computed) runCalculate(computed);
          }}
        >
          Calculate BMI
        </Button>
      }
      results={
        <>
          <ResultHero
            key={runId}
            show={result != null}
            label="Your BMI"
            value={result?.bmi ?? ""}
            unit="kg/m²"
          />
          {result ? (
            <div className="mt-4 space-y-2">
              <CategoryRow
                scale="International (WHO)"
                bands="Healthy 18.5–24.9 · Overweight 25–29.9 · Obesity 30+"
                category={result.categoryId}
              />
              <CategoryRow
                scale="Indian & Asian cut-offs"
                bands="Healthy 18.5–22.9 · Overweight 23–24.9 · Obesity 25+"
                category={result.asianCategoryId}
              />
              {differs ? (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  The two scales disagree for you. South Asians tend to carry
                  more body fat and face higher metabolic risk at a lower BMI,
                  which is why Indian guidelines use lower cut-offs.
                </p>
              ) : null}
              <p className="rounded-xl border border-accent/30 bg-[#FFF8E1] px-4 py-3 text-xs leading-relaxed text-foreground/80">
                Screening only — BMI can&apos;t tell muscle from fat. Pair it
                with your waist measurement: aim to keep your waist under half
                your height.
              </p>
            </div>
          ) : null}
        </>
      }
      afterResults={<CalcSaveBar key={runId} calc={calc} payload={payload} />}
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/calorie-calculator" className="fk-link font-semibold">
            Calorie calculator
          </Link>
          <Link href="/tdee-calculator" className="fk-link font-semibold">
            TDEE calculator
          </Link>
          <Link href="/weight-loss" className="fk-link font-semibold">
            Weight loss guide
          </Link>
        </div>
      }
    />
  );
}
