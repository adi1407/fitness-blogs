import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "BMI Calculator",
  "Body mass index calculator — educational output with links to deeper guides.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"BMI Calculator"}
      description={"Body mass index calculator — educational output with links to deeper guides."}
      links={[
    { href: "/tools", label: "All tools" },
      ]}
    />
  );
}
