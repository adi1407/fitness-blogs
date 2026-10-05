import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { TdeeCalculatorForm } from "@/features/tools/components/TdeeCalculatorForm";
import { tdeeContent, tdeeMeta } from "@/features/tools/content/tdee";
import { calculatorMetadata } from "@/features/tools/content/meta";

export const metadata = calculatorMetadata("tdee-calculator", tdeeMeta);

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
