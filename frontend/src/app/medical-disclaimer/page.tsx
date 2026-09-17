import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Medical Disclaimer",
  "Educational information is not a substitute for professional medical care.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Medical Disclaimer"}
      description={"Educational information is not a substitute for professional medical care."}
      links={[

      ]}
    />
  );
}
