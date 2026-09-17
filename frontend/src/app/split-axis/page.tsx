import type { Metadata } from "next";
import { noIndexMetadata } from "@/components/shared/PlatformHub";
import SplitAxisConvergence from "@/components/ui/split-axis-convergence";

export const metadata: Metadata = noIndexMetadata(
  "Split Axis Demo",
  "Component playground — not indexed.",
);

export default function SplitAxisPage() {
  return (
    <main className="min-h-screen w-full bg-neutral-100 text-neutral-900 transition-colors dark:bg-neutral-950 dark:text-neutral-50">
      <SplitAxisConvergence />
    </main>
  );
}
