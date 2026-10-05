import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { BodyFatCalculatorForm } from "@/features/tools/components/BodyFatCalculatorForm";
import { bodyFatContent, bodyFatMeta } from "@/features/tools/content/body-fat";
import { calculatorMetadata } from "@/features/tools/content/meta";

export const metadata = calculatorMetadata("body-fat-calculator", bodyFatMeta);

export default function Page() {
  return (
    <CalculatorPageShell
      slug="body-fat-calculator"
      title={bodyFatMeta.h1}
      intro={bodyFatMeta.intro}
      description={bodyFatMeta.description}
      form={<BodyFatCalculatorForm />}
      content={bodyFatContent}
    />
  );
}
