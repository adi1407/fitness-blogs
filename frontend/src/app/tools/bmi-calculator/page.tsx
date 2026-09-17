import type { Metadata } from "next";
import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { BmiCalculatorForm } from "@/features/tools/components/BmiCalculatorForm";

export const metadata: Metadata = {
  title: "BMI Calculator — Body Mass Index Screening",
  description:
    "Calculate BMI from height and weight. Educational screening metric with clear limits — not a full health assessment.",
  alternates: { canonical: "/tools/bmi-calculator" },
};

export default function Page() {
  return (
    <CalculatorPageShell
      slug="bmi-calculator"
      title="BMI calculator"
      description="Compute body mass index as a population screening metric — not a direct measure of health or body fat."
      form={<BmiCalculatorForm />}
      howItWorks={
        <p>
          BMI = weight (kg) ÷ height (m)². Categories are WHO-style screening
          bands. Athletes and people with higher muscle mass may be misclassified;
          use alongside other assessments.
        </p>
      }
      faq={[
        {
          q: "Is BMI accurate for everyone?",
          a: "No. It does not distinguish muscle from fat and can misclassify muscular individuals. It is a screening tool, not a diagnosis.",
        },
      ]}
    />
  );
}
