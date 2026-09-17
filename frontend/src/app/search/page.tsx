import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Search",
  "Search articles, foods, exercises, recipes, and calculators.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Search"}
      description={"Search articles, foods, exercises, recipes, and calculators."}
      links={[

      ]}
    />
  );
}
