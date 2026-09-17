import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Recipes",
  "High-protein, calorie-aware, and Indian meal ideas with macros.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Recipes"}
      description={"High-protein, calorie-aware, and Indian meal ideas with macros."}
      links={[

      ]}
    />
  );
}
