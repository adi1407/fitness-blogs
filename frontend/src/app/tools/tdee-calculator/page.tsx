import type { Metadata } from "next";
import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { TdeeCalculatorForm } from "@/features/tools/components/TdeeCalculatorForm";

export const metadata: Metadata = {
  title: "TDEE Calculator — Daily Calorie Needs Estimate",
  description:
    "Free TDEE calculator using Mifflin–St Jeor. Estimate maintenance calories for fat loss or muscle gain, then continue to macros and guides.",
  alternates: { canonical: "/tools/tdee-calculator" },
};

export default function Page() {
  return (
    <CalculatorPageShell
      slug="tdee-calculator"
      title="TDEE calculator"
      description="Estimate total daily energy expenditure from BMR and activity, then set a starting calorie target."
      form={<TdeeCalculatorForm />}
      howItWorks={
        <>
          <p>
            We calculate BMR with the Mifflin–St Jeor equation, then multiply by
            an activity factor. Real needs vary with NEAT, job demands, and
            measurement error — treat this as a starting point and adjust from
            weekly trends.
          </p>
        </>
      }
      faq={[
        {
          q: "Is TDEE the same as calories to eat for fat loss?",
          a: "No. TDEE is an estimate of maintenance. Fat loss usually requires a moderate deficit below TDEE.",
        },
      ]}
    />
  );
}
