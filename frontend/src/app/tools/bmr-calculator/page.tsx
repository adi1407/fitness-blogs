import type { Metadata } from "next";
import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { BmrCalculatorForm } from "@/features/tools/components/BmrCalculatorForm";
import { bmrContent, bmrMeta } from "@/features/tools/content/bmr";

export const metadata: Metadata = {
  title: bmrMeta.title,
  description: bmrMeta.description,
  alternates: { canonical: "/tools/bmr-calculator" },
  openGraph: {
    title: `${bmrMeta.title} | fitlives`,
    description: bmrMeta.description,
    url: "/tools/bmr-calculator",
    type: "website",
  },
};

export default function Page() {
  return (
    <CalculatorPageShell
      slug="bmr-calculator"
      title={bmrMeta.h1}
      intro={bmrMeta.intro}
      description={bmrMeta.description}
      form={<BmrCalculatorForm />}
      content={bmrContent}
    />
  );
}