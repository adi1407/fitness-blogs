import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { ProteinCalculatorForm } from "@/features/tools/components/ProteinCalculatorForm";
import { proteinContent, proteinMeta } from "@/features/tools/content/protein";
import { calculatorMetadata } from "@/features/tools/content/meta";

export const metadata = calculatorMetadata("protein-calculator", proteinMeta);

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
