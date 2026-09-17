import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Core Exercises",
  "Anti-extension, rotation, and flexion core training.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Core Exercises"}
      description={"Anti-extension, rotation, and flexion core training."}
      links={[

      ]}
    />
  );
}
