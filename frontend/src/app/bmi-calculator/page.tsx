import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { BmiCalculatorForm } from "@/features/tools/components/BmiCalculatorForm";
import { bmiContent, bmiMeta } from "@/features/tools/content/bmi";
import { calculatorMetadata } from "@/features/tools/content/meta";

export const metadata = calculatorMetadata("bmi-calculator", bmiMeta);

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
