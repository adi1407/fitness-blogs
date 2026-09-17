import type { Metadata } from "next";
import { noIndexMetadata } from "@/components/shared/PlatformHub";
import BentoDemo from "@/components/bento-demo";

export const metadata: Metadata = noIndexMetadata(
  "Bento Demo",
  "Component playground — not indexed.",
);

export default function BentoPage() {
  return <BentoDemo />;
}
