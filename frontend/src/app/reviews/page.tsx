import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Reviews",
  "Evidence-oriented reviews of supplements, equipment, and apps.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Reviews"}
      description={"Evidence-oriented reviews of supplements, equipment, and apps."}
      links={[

      ]}
    />
  );
}
