import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { MacroCalculatorForm } from "@/features/tools/components/MacroCalculatorForm";
import { macroContent, macroMeta } from "@/features/tools/content/macro";
import { calculatorMetadata } from "@/features/tools/content/meta";

export const metadata = calculatorMetadata("macro-calculator", macroMeta);

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
