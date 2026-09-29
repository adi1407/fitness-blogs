import type { Metadata } from "next";
import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { BmiCalculatorForm } from "@/features/tools/components/BmiCalculatorForm";
import { bmiContent, bmiMeta } from "@/features/tools/content/bmi";

export const metadata: Metadata = {
  title: bmiMeta.title,
  description: bmiMeta.description,
  alternates: { canonical: "/tools/bmi-calculator" },
  openGraph: {
    title: `${bmiMeta.title} | fitlives`,
    description: bmiMeta.description,
    url: "/tools/bmi-calculator",
    type: "website",
  },
};

export default function Page() {
  return (
    <CalculatorPageShell
      slug="bmi-calculator"
      title={bmiMeta.h1}
      intro={bmiMeta.intro}
      description={bmiMeta.description}
      form={<BmiCalculatorForm />}
      content={bmiContent}
    />
  );
}