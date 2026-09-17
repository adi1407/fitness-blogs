import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Chest Exercises",
  "Compound and isolation chest movements — index for individual exercise pages.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Chest Exercises"}
      description={"Compound and isolation chest movements — index for individual exercise pages."}
      links={[

      ]}
    />
  );
}
