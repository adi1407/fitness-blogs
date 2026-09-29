import type { Metadata } from "next";
import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { ProteinCalculatorForm } from "@/features/tools/components/ProteinCalculatorForm";
import { proteinContent, proteinMeta } from "@/features/tools/content/protein";

export const metadata: Metadata = {
  title: proteinMeta.title,
  description: proteinMeta.description,
  alternates: { canonical: "/tools/protein-calculator" },
  openGraph: {
    title: `${proteinMeta.title} | fitlives`,
    description: proteinMeta.description,
    url: "/tools/protein-calculator",
    type: "website",
  },
};

export default function Page() {
  return (
    <CalculatorPageShell
      slug="protein-calculator"
      title={proteinMeta.h1}
      intro={proteinMeta.intro}
      description={proteinMeta.description}
      form={<ProteinCalculatorForm />}
      content={proteinContent}
    />
  );
}