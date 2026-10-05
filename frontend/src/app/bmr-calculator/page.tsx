import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { BmrCalculatorForm } from "@/features/tools/components/BmrCalculatorForm";
import { bmrContent, bmrMeta } from "@/features/tools/content/bmr";
import { calculatorMetadata } from "@/features/tools/content/meta";

export const metadata = calculatorMetadata("bmr-calculator", bmrMeta);

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
