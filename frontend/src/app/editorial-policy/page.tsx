import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Editorial Policy",
  "How we research, review, update, and correct content.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Editorial Policy"}
      description={"How we research, review, update, and correct content."}
      links={[

      ]}
    />
  );
}
