import type { Metadata } from "next";
import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { BmrCalculatorForm } from "@/features/tools/components/BmrCalculatorForm";

export const metadata: Metadata = {
  title: "BMR Calculator — Basal Metabolic Rate Estimate",
  description:
    "Estimate basal metabolic rate with Mifflin–St Jeor, then continue to TDEE for daily calorie planning.",
  alternates: { canonical: "/tools/bmr-calculator" },
};

export default function Page() {
  return (
    <CalculatorPageShell
      slug="bmr-calculator"
      title="BMR calculator"
      description="Estimate calories burned at complete rest using the Mifflin–St Jeor equation."
      form={<BmrCalculatorForm />}
      howItWorks={
        <p>
          BMR is not your daily calorie target. Multiply by an activity factor
          (TDEE) for maintenance estimates used in fat-loss or muscle-gain
          planning.
        </p>
      }
    />
  );
}
