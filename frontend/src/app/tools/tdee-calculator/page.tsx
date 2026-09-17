import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "TDEE Calculator",
  "Maintenance, fat-loss, and muscle-gain calorie ranges with learning links.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"TDEE Calculator"}
      description={"Maintenance, fat-loss, and muscle-gain calorie ranges with learning links."}
      links={[
    { href: "/tools/macro-calculator", label: "Macros" },
      ]}
    />
  );
}
