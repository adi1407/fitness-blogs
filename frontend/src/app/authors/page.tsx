import { noIndexMetadata, PlatformHub } from "@/components/shared/PlatformHub";

export const metadata = noIndexMetadata(
  "Authors",
  "Writers and reviewers — credentials, expertise, and articles.",
);

export default function Page() {
  return (
    <PlatformHub
      title={"Authors"}
      description={"Writers and reviewers — credentials, expertise, and articles."}
      links={[

      ]}
    />
  );
}
