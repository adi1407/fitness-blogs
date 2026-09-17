import type { Metadata } from "next";
import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { MacroCalculatorForm } from "@/features/tools/components/MacroCalculatorForm";

export const metadata: Metadata = {
  title: "Macro Calculator — Protein, Carbs & Fat Split",
  description:
    "Free macro calculator: set protein from body weight, allocate fat, and fill remaining calories with carbs.",
  alternates: { canonical: "/tools/macro-calculator" },
};

export default function Page() {
  return (
    <CalculatorPageShell
      slug="macro-calculator"
      title="Macro calculator"
      description="Translate daily calories into protein, carbohydrate, and fat grams for meal planning."
      form={<MacroCalculatorForm />}
      howItWorks={
        <p>
          Protein is set from body weight × your chosen g/kg factor. Fat starts
          near 25% of calories; remaining calories become carbohydrates. Adjust
          to preference and dietary pattern.
        </p>
      }
    />
  );
}
