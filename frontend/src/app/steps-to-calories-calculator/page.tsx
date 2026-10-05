import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { StepsToCaloriesCalculatorForm } from "@/features/tools/components/StepsToCaloriesCalculatorForm";
import { stepsToCaloriesContent, stepsToCaloriesMeta } from "@/features/tools/content/steps-to-calories";
import { calculatorMetadata } from "@/features/tools/content/meta";

export const metadata = calculatorMetadata("steps-to-calories-calculator", stepsToCaloriesMeta);

export default function Page() {
  return (
    <CalculatorPageShell
      slug="steps-to-calories-calculator"
      title={stepsToCaloriesMeta.h1}
      intro={stepsToCaloriesMeta.intro}
      description={stepsToCaloriesMeta.description}
      form={<StepsToCaloriesCalculatorForm />}
      content={stepsToCaloriesContent}
    />
  );
}
