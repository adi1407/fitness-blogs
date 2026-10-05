import { CalculatorPageShell } from "@/features/tools/components/CalculatorPageShell";
import { WaterIntakeCalculatorForm } from "@/features/tools/components/WaterIntakeCalculatorForm";
import { waterIntakeContent, waterIntakeMeta } from "@/features/tools/content/water-intake";
import { calculatorMetadata } from "@/features/tools/content/meta";

export const metadata = calculatorMetadata("water-intake-calculator", waterIntakeMeta);

export default function Page() {
  return (
    <CalculatorPageShell
      slug="water-intake-calculator"
      title={waterIntakeMeta.h1}
      intro={waterIntakeMeta.intro}
      description={waterIntakeMeta.description}
      form={<WaterIntakeCalculatorForm />}
      content={waterIntakeContent}
    />
  );
}
