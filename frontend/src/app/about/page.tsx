import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "About",
  "Why this platform exists, editorial philosophy, and how we use sources.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"About"}
      description={"Why this platform exists, editorial philosophy, and how we use sources."}
      links={[
    { href: "/editorial-policy", label: "Editorial policy" },
      ]}
    />
  );
}
