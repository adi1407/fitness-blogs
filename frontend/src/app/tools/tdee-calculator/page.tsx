import type { Metadata } from "next";
import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { TdeeCalculatorForm } from "@/features/tools/components/TdeeCalculatorForm";
import { tdeeContent, tdeeMeta } from "@/features/tools/content/tdee";

export const metadata: Metadata = {
  title: tdeeMeta.title,
  description: tdeeMeta.description,
  alternates: { canonical: "/tools/tdee-calculator" },
  openGraph: {
    title: `${tdeeMeta.title} | fitlives`,
    description: tdeeMeta.description,
    url: "/tools/tdee-calculator",
    type: "website",
  },
};

export default function Page() {
  return (
    <CalculatorPageShell
      slug="tdee-calculator"
      title={tdeeMeta.h1}
      intro={tdeeMeta.intro}
      description={tdeeMeta.description}
      form={<TdeeCalculatorForm />}
      content={tdeeContent}
    />
  );
}