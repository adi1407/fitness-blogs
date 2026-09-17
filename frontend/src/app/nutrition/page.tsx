import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Nutrition",
  "Calories, macros, hydration, meal timing, sports nutrition, and Indian diet guidance.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Nutrition"}
      description={"Calories, macros, hydration, meal timing, sports nutrition, and Indian diet guidance."}
      links={[
    { href: "/nutrition/protein", label: "Protein" },
    { href: "/tools", label: "Calculators" },
    { href: "/foods", label: "Foods" },
      ]}
    />
  );
}
