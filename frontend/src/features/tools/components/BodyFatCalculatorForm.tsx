"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  CalcInput,
  CalcWorkspace,
  FieldLabel,
  ResultChip,
  ResultHero,
  SegmentedControl,
} from "@/features/tools/components/CalcWorkspace";
import { BodyStatsFields } from "@/features/tools/components/BodyStatsFields";
import { CalcSaveBar } from "@/features/tools/components/CalcSaveBar";
import { numField, parseNum, setNumField, type NumField } from "@/features/tools/lib/calcFields";
import { BODY_FAT_BAND_LABEL, calcBodyFat } from "@/features/tools/lib/calcMathMore";
import { takeHandoff } from "@/features/tools/lib/calcHandoff";
import { useBodyStats } from "@/features/tools/hooks/useBodyStats";
import { useCalcMember } from "@/features/tools/hooks/useCalcMember";
import { useCalcResult } from "@/features/tools/hooks/useCalcResult";
import type { CalcSavePayload } from "@/features/tools/types";

const TOOL = "body-fat-calculator" as const;
const IN_TO_CM = 2.54;

type TapeUnit = "cm" | "in";

function toCm(v: NumField, unit: TapeUnit): number | null {
  const n = parseNum(v);
  if (n == null || n <= 0) return null;
  return unit === "cm" ? n : n * IN_TO_CM;
}

function convert(v: NumField, to: TapeUnit): NumField {
  const n = parseNum(v);
  if (n == null) return v;
  return numField(Math.round((to === "in" ? n / IN_TO_CM : n * IN_TO_CM) * 10) / 10);
}

export function BodyFatCalculatorForm() {
  const calc = useCalcMember(TOOL);
  const stats = useBodyStats({ profile: calc.profile });
  const [tape, setTapeRaw] = useState<TapeUnit>("cm");
  const [neck, setNeck] = useState<NumField>(numField(38));
  const [waist, setWaist] = useState<NumField>(numField(88));
  const [hip, setHip] = useState<NumField>(numField(98));

  /* eslint-disable react-hooks/exhaustive-deps -- the URL is only readable after hydration; runs once */
  useEffect(() => {
    stats.applyHandoff(takeHandoff(["sex", "kg", "cm"] as const));
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  function setTape(u: TapeUnit) {
    if (u === tape) return;
    setNeck((v) => convert(v, u));
    setWaist((v) => convert(v, u));
    setHip((v) => convert(v, u));
    setTapeRaw(u);
  }

  const { sex, cm, kg } = stats;
  const neckCm = toCm(neck, tape);
  const waistCm = toCm(waist, tape);
  const hipCm = toCm(hip, tape);
  const needsHip = sex === "female";

  const computed = useMemo(() => {
    if (cm == null || neckCm == null || waistCm == null) return null;
    if (needsHip && hipCm == null) return null;
    return calcBodyFat({ sex, cm, neckCm, waistCm, hipCm: hipCm ?? undefined, kg });
  }, [sex, cm, kg, neckCm, waistCm, hipCm, needsHip]);

  const inputsReady =
    cm != null && neckCm != null && waistCm != null && (!needsHip || hipCm != null);

  const { shown: result, runId, runCalculate } = useCalcResult<NonNullable<typeof computed>>(
    TOOL,
    `${stats.key}|${tape}|${neck}|${waist}|${hip}`,
  );

  const payload: CalcSavePayload | null =
    result && cm != null && neckCm != null && waistCm != null
      ? {
          tool: TOOL,
          inputs: {
            sex,
            cm: Math.round(cm),
            neckCm: Math.round(neckCm * 10) / 10,
            waistCm: Math.round(waistCm * 10) / 10,
            ...(needsHip && hipCm != null ? { hipCm: Math.round(hipCm * 10) / 10 } : {}),
          },
          result: {
            label: "Body fat",
            value: result.pct,
            unit: "%",
            category: BODY_FAT_BAND_LABEL[result.band],
          },
          profile: { ...stats.toProfile(), bodyFatPct: result.pct },
        }
      : null;

  const tapeField = (label: string, value: NumField, set: (v: NumField) => void, hint: string) => (
    <FieldLabel label={`${label} (${tape})`}>
      <CalcInput
        type="number"
        min={1}
        value={value}
        onChange={(e) => setNumField(e.target.value, set)}
        aria-label={`${label} in ${tape === "cm" ? "centimetres" : "inches"}`}
      />
      <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
    </FieldLabel>
  );

  return (
    <CalcWorkspace
      title="Tape-measure estimate"
      purpose="Estimate body fat % from a few circumference measurements — no scale or scanner needed."
      signedInAs={calc.memberName}
      inputs={
        <>
          <BodyStatsFields stats={stats} showAge={false} weightLabel="Weight (for fat & lean mass)" />
          <FieldLabel label="Tape measurements in">
            <SegmentedControl
              value={tape}
              onChange={setTape}
              options={[
                { id: "cm", label: "cm" },
                { id: "in", label: "inches" },
              ]}
            />
          </FieldLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            {tapeField("Neck", neck, setNeck, "Just below the Adam's apple, tape sloping slightly down at the front.")}
            {tapeField(
              "Waist",
              waist,
              setWaist,
              sex === "male" ? "At the belly button, relaxed, after breathing out." : "At the narrowest point, relaxed, after breathing out.",
            )}
            {needsHip
              ? tapeField("Hips", hip, setHip, "Around the widest part of the buttocks.")
              : null}
          </div>
        </>
      }
      calculateSlot={
        <Button
          type="button"
          disabled={!inputsReady}
          onClick={() => {
            if (computed) runCalculate(computed);
          }}
        >
          Estimate body fat
        </Button>
      }
      results={
        <>
          <ResultHero
            key={runId}
            show={result != null}
            label="Estimated body fat"
            value={result?.pct ?? ""}
            unit="%"
          />
          {inputsReady && computed == null ? (
            <p className="mt-4 text-xs text-red-700">
              Those measurements don&apos;t give a valid estimate. Check that
              your waist{needsHip ? " plus hips" : ""} is larger than your
              neck, and that all values use the same unit.
            </p>
          ) : null}
          {result ? (
            <div className="mt-4 space-y-3">
              <div className="grid gap-2 sm:grid-cols-3">
                <ResultChip label="Category (ACE)" value={BODY_FAT_BAND_LABEL[result.band]} />
                {result.fatKg != null ? <ResultChip label="Fat mass" value={`${result.fatKg} kg`} /> : null}
                {result.leanKg != null ? <ResultChip label="Lean mass" value={`${result.leanKg} kg`} /> : null}
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Waist-to-height ratio: <strong>{result.waistToHeight}</strong>
                {result.waistToHeight >= 0.5
                  ? " — above the 0.5 rule of thumb, which is linked with higher metabolic risk."
                  : " — under the 0.5 rule of thumb."}
              </p>
              <p className="rounded-xl border border-accent/30 bg-[#FFF8E1] px-4 py-3 text-xs leading-relaxed text-foreground/80">
                Tape methods are typically within about 3–4 percentage points
                of lab scans. South Asians often carry more fat at the same
                waist size, so treat this as a trend tracker — measure the same
                way every 2–4 weeks.
              </p>
            </div>
          ) : null}
        </>
      }
      afterResults={<CalcSaveBar key={runId} calc={calc} payload={payload} />}
      footer={
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/bmi-calculator" className="fk-link font-semibold">
            BMI calculator
          </Link>
          <Link href="/calorie-deficit-calculator" className="fk-link font-semibold">
            Calorie deficit calculator
          </Link>
          <Link href="/muscle-building" className="fk-link font-semibold">
            Muscle building guide
          </Link>
        </div>
      }
    />
  );
}
