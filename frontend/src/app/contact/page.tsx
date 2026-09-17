import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Contact",
  "Reach the team for corrections, partnerships, and support.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Contact"}
      description={"Reach the team for corrections, partnerships, and support."}
      links={[

      ]}
    />
  );
}
