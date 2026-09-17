import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Programs",
  "Beginner, fat loss, muscle gain, strength, and athletic performance tracks.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Programs"}
      description={"Beginner, fat loss, muscle gain, strength, and athletic performance tracks."}
      links={[

      ]}
    />
  );
}
