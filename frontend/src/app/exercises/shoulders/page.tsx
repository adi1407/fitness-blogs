import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Shoulder Exercises",
  "Pressing and isolation work for delts.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Shoulder Exercises"}
      description={"Pressing and isolation work for delts."}
      links={[

      ]}
    />
  );
}
