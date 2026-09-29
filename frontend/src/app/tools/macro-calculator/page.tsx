import type { Metadata } from "next";
import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { MacroCalculatorForm } from "@/features/tools/components/MacroCalculatorForm";
import { macroContent, macroMeta } from "@/features/tools/content/macro";

export const metadata: Metadata = {
  title: macroMeta.title,
  description: macroMeta.description,
  alternates: { canonical: "/tools/macro-calculator" },
  openGraph: {
    title: `${macroMeta.title} | fitlives`,
    description: macroMeta.description,
    url: "/tools/macro-calculator",
    type: "website",
  },
};

export default function Page() {
  return (
    <CalculatorPageShell
      slug="macro-calculator"
      title={macroMeta.h1}
      intro={macroMeta.intro}
      description={macroMeta.description}
      form={<MacroCalculatorForm />}
      content={macroContent}
    />
  );
}