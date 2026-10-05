import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { CalorieDeficitCalculatorForm } from "@/features/tools/components/CalorieDeficitCalculatorForm";
import { calorieDeficitContent, calorieDeficitMeta } from "@/features/tools/content/calorie-deficit";
import { calculatorMetadata } from "@/features/tools/content/meta";

export const metadata = calculatorMetadata("calorie-deficit-calculator", calorieDeficitMeta);

export default function Page() {
  return (
    <CalculatorPageShell
      slug="calorie-deficit-calculator"
      title={calorieDeficitMeta.h1}
      intro={calorieDeficitMeta.intro}
      description={calorieDeficitMeta.description}
      form={<CalorieDeficitCalculatorForm />}
      content={calorieDeficitContent}
    />
  );
}
