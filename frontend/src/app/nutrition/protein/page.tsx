import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Protein",
  "Requirements, muscle growth, fat loss, timing, and food sources — cluster hub.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Protein"}
      description={"Requirements, muscle growth, fat loss, timing, and food sources — cluster hub."}
      links={[
    { href: "/tools/protein-calculator", label: "Protein Calculator" },
    { href: "/foods", label: "High-protein foods" },
      ]}
    />
  );
}
