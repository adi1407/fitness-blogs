import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Exercises",
  "Exercise library by muscle group with form, programming, and variations.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Exercises"}
      description={"Exercise library by muscle group with form, programming, and variations."}
      links={[
    { href: "/exercises/chest", label: "Chest" },
    { href: "/exercises/back", label: "Back" },
    { href: "/exercises/shoulders", label: "Shoulders" },
    { href: "/exercises/arms", label: "Arms" },
    { href: "/exercises/legs", label: "Legs" },
    { href: "/exercises/core", label: "Core" },
    { href: "/exercises/cardio", label: "Cardio" },
      ]}
    />
  );
}
