import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Indian Foods",
  "Indian staples with practical macros for fat loss and muscle gain.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Indian Foods"}
      description={"Indian staples with practical macros for fat loss and muscle gain."}
      links={[
    { href: "/foods", label: "All foods" },
      ]}
    />
  );
}
