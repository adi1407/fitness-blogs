import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Back Exercises",
  "Pulling patterns for upper and mid-back strength and hypertrophy.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Back Exercises"}
      description={"Pulling patterns for upper and mid-back strength and hypertrophy."}
      links={[

      ]}
    />
  );
}
