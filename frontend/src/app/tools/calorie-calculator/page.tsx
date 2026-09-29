import type { Metadata } from "next";
import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { CalorieCalculatorForm } from "@/features/tools/components/CalorieCalculatorForm";
import { calorieContent, calorieMeta } from "@/features/tools/content/calorie";

export const metadata: Metadata = {
  title: calorieMeta.title,
  description: calorieMeta.description,
  alternates: { canonical: "/tools/calorie-calculator" },
  openGraph: {
    title: `${calorieMeta.title} | fitlives`,
    description: calorieMeta.description,
    url: "/tools/calorie-calculator",
    type: "website",
  },
};

export default function Page() {
  return (
    <CalculatorPageShell
      slug="calorie-calculator"
      title={calorieMeta.h1}
      intro={calorieMeta.intro}
      description={calorieMeta.description}
      form={<CalorieCalculatorForm />}
      content={calorieContent}
    />
  );
}