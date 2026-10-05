import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { OneRepMaxCalculatorForm } from "@/features/tools/components/OneRepMaxCalculatorForm";
import { oneRepMaxContent, oneRepMaxMeta } from "@/features/tools/content/one-rep-max";
import { calculatorMetadata } from "@/features/tools/content/meta";

export const metadata = calculatorMetadata("one-rep-max-calculator", oneRepMaxMeta);

export default function Page() {
  return (
    <CalculatorPageShell
      slug="one-rep-max-calculator"
      title={oneRepMaxMeta.h1}
      intro={oneRepMaxMeta.intro}
      description={oneRepMaxMeta.description}
      form={<OneRepMaxCalculatorForm />}
      content={oneRepMaxContent}
    />
  );
}
