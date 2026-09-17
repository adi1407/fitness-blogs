import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Weight Loss",
  "Calorie deficit, training, lifestyle, and evidence-informed fat-loss guidance.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Weight Loss"}
      description={"Calorie deficit, training, lifestyle, and evidence-informed fat-loss guidance."}
      links={[
    { href: "/tools/tdee-calculator", label: "TDEE Calculator" },
    { href: "/nutrition", label: "Nutrition" },
      ]}
    />
  );
}
