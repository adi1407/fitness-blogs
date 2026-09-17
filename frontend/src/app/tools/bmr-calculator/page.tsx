import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "BMR Calculator",
  "Basal metabolic rate estimates and how they connect to TDEE.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"BMR Calculator"}
      description={"Basal metabolic rate estimates and how they connect to TDEE."}
      links={[
    { href: "/tools/tdee-calculator", label: "TDEE" },
      ]}
    />
  );
}
