import type { Metadata } from "next";
import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { CalorieCalculatorForm } from "@/features/tools/components/CalorieCalculatorForm";

export const metadata: Metadata = {
  title: "Calorie Calculator — Daily Targets by Goal",
  description:
    "Turn maintenance calories into fat-loss, maintenance, or surplus targets. Educational calorie calculator with next steps into macros and guides.",
  alternates: { canonical: "/tools/calorie-calculator" },
};

export default function Page() {
  return (
    <CalculatorPageShell
      slug="calorie-calculator"
      title="Calorie calculator"
      description="Convert your TDEE into a practical daily calorie target for fat loss, maintenance, or surplus."
      form={<CalorieCalculatorForm />}
      howItWorks={
        <p>
          Enter maintenance calories (from the TDEE tool or another estimate),
          then choose a goal. Defaults use ~20% deficit for fat loss and ~10%
          surplus for muscle gain — moderate starting points, not prescriptions.
        </p>
      }
    />
  );
}
