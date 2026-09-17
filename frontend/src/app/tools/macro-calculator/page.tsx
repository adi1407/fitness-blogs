import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Macro Calculator",
  "Protein, carbohydrate, and fat targets from calories and goals.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Macro Calculator"}
      description={"Protein, carbohydrate, and fat targets from calories and goals."}
      links={[
    { href: "/tools/protein-calculator", label: "Protein" },
      ]}
    />
  );
}
