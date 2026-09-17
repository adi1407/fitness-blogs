import type { Metadata } from "next";
import { noIndexMetadata } from "@/components/shared/PlatformHub";
import HaloReelDemo from "@/components/halo-reel-demo";

export const metadata: Metadata = noIndexMetadata(
  "Halo Reel Demo",
  "Component playground — not indexed.",
);

export default function HaloReelPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <HaloReelDemo />
    </main>
  );
}
