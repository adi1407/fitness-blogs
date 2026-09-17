import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Arm Exercises",
  "Biceps, triceps, and forearm training library.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Arm Exercises"}
      description={"Biceps, triceps, and forearm training library."}
      links={[

      ]}
    />
  );
}
