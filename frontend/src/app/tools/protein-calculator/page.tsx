import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Protein Calculator",
  "Protein needs by body weight, activity, and goal — with food next steps.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Protein Calculator"}
      description={"Protein needs by body weight, activity, and goal — with food next steps."}
      links={[
    { href: "/nutrition/protein", label: "Protein guide" },
    { href: "/foods", label: "Foods" },
      ]}
    />
  );
}
