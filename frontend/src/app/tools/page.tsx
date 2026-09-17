import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Fitness Tools",
  "Calculator hub — BMI, BMR, TDEE, calories, macros, protein, and more.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Fitness Tools"}
      description={"Calculator hub — BMI, BMR, TDEE, calories, macros, protein, and more."}
      links={[
    { href: "/tools/bmi-calculator", label: "BMI" },
    { href: "/tools/bmr-calculator", label: "BMR" },
    { href: "/tools/tdee-calculator", label: "TDEE" },
    { href: "/tools/calorie-calculator", label: "Calories" },
    { href: "/tools/macro-calculator", label: "Macros" },
    { href: "/tools/protein-calculator", label: "Protein" },
      ]}
    />
  );
}
