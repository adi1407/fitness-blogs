import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Calorie Calculator",
  "Daily calorie targets based on goals and activity.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Calorie Calculator"}
      description={"Daily calorie targets based on goals and activity."}
      links={[
    { href: "/weight-loss", label: "Weight loss guide" },
      ]}
    />
  );
}
