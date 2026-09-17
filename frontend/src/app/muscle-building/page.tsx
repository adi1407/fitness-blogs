import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Muscle Building",
  "Hypertrophy, progressive overload, protein, bulking, recovery, and programs.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Muscle Building"}
      description={"Hypertrophy, progressive overload, protein, bulking, recovery, and programs."}
      links={[
    { href: "/exercises", label: "Exercises" },
    { href: "/tools/protein-calculator", label: "Protein Calculator" },
      ]}
    />
  );
}
