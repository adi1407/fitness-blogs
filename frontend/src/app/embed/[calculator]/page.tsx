import type { ComponentType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { BmiCalculatorForm } from "@/features/tools/components/BmiCalculatorForm";
import { BmrCalculatorForm } from "@/features/tools/components/BmrCalculatorForm";
import { BodyFatCalculatorForm } from "@/features/tools/components/BodyFatCalculatorForm";
import { CalorieCalculatorForm } from "@/features/tools/components/CalorieCalculatorForm";
import { CalorieDeficitCalculatorForm } from "@/features/tools/components/CalorieDeficitCalculatorForm";
import { MacroCalculatorForm } from "@/features/tools/components/MacroCalculatorForm";
import { OneRepMaxCalculatorForm } from "@/features/tools/components/OneRepMaxCalculatorForm";
import { ProteinCalculatorForm } from "@/features/tools/components/ProteinCalculatorForm";
import { StepsToCaloriesCalculatorForm } from "@/features/tools/components/StepsToCaloriesCalculatorForm";
import { TdeeCalculatorForm } from "@/features/tools/components/TdeeCalculatorForm";
import { WaterIntakeCalculatorForm } from "@/features/tools/components/WaterIntakeCalculatorForm";
import { EmbedFrame } from "@/features/tools/embed/EmbedFrame";
import { isCalcTool } from "@/features/tools/embed/snippet";
import { CALC_TOOLS, type CalcTool } from "@/features/tools/types";

const FORMS: Record<CalcTool, ComponentType> = {
  "calorie-calculator": CalorieCalculatorForm,
  "tdee-calculator": TdeeCalculatorForm,
  "bmr-calculator": BmrCalculatorForm,
  "macro-calculator": MacroCalculatorForm,
  "protein-calculator": ProteinCalculatorForm,
  "bmi-calculator": BmiCalculatorForm,
  "calorie-deficit-calculator": CalorieDeficitCalculatorForm,
  "body-fat-calculator": BodyFatCalculatorForm,
  "one-rep-max-calculator": OneRepMaxCalculatorForm,
  "water-intake-calculator": WaterIntakeCalculatorForm,
  "steps-to-calories-calculator": StepsToCaloriesCalculatorForm,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CALC_TOOLS).map((calculator) => ({ calculator }));
}

type Props = { params: Promise<{ calculator: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { calculator } = await params;
  if (!isCalcTool(calculator)) return {};
  return {
    title: `${CALC_TOOLS[calculator]} (embed)`,
    alternates: { canonical: `/${calculator}` },
  };
}

export default async function EmbedCalculatorPage({ params }: Props) {
  const { calculator } = await params;
  if (!isCalcTool(calculator)) notFound();
  const Form = FORMS[calculator];

  return (
    <EmbedFrame tool={calculator}>
      <main className="mx-auto w-full max-w-2xl px-4 py-4">
        <h1 className="sr-only">{CALC_TOOLS[calculator]}</h1>
        <Form />
        <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <BrandLogo href={`/${calculator}`} variant="mark" size="sm" />
            Free {CALC_TOOLS[calculator].toLowerCase()} by fitlives
          </span>
          <Link href={`/${calculator}`} className="font-semibold text-foreground underline decoration-[#FF9800]/60 underline-offset-4">
            How it works &amp; full guide →
          </Link>
        </footer>
      </main>
    </EmbedFrame>
  );
}
