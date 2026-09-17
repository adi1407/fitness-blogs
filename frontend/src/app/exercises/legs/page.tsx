import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Leg Exercises",
  "Squats, hinges, and accessory lower-body work.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Leg Exercises"}
      description={"Squats, hinges, and accessory lower-body work."}
      links={[

      ]}
    />
  );
}
