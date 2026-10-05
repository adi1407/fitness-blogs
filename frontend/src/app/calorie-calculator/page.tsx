import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { CalorieCalculatorForm } from "@/features/tools/components/CalorieCalculatorForm";
import { calorieContent, calorieMeta } from "@/features/tools/content/calorie";
import { calculatorMetadata } from "@/features/tools/content/meta";

export const metadata = calculatorMetadata("calorie-calculator", calorieMeta);

export default function Page() {
  return (
    <CalculatorPageShell
      slug="calorie-calculator"
      title={calorieMeta.h1}
      intro={calorieMeta.intro}
      description={calorieMeta.description}
      form={<CalorieCalculatorForm />}
      content={calorieContent}
    />
  );
}
