import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Training",
  "Programming, volume, recovery, and practical workout guidance.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Training"}
      description={"Programming, volume, recovery, and practical workout guidance."}
      links={[
    { href: "/exercises", label: "Exercise library" },
    { href: "/programs", label: "Programs" },
      ]}
    />
  );
}
