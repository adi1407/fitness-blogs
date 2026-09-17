import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Foods",
  "Structured nutrition database — calories, macros, and related guides.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Foods"}
      description={"Structured nutrition database — calories, macros, and related guides."}
      links={[
    { href: "/foods/indian", label: "Indian foods" },
    { href: "/recipes", label: "Recipes" },
      ]}
    />
  );
}
