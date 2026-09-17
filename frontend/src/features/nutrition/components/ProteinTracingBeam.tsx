"use client";

import type { ReactNode } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";

export function ProteinTracingBeam({ children }: { children: ReactNode }) {
  return (
    <TracingBeam className="px-0 pt-4">
      <div className="relative max-w-none antialiased">{children}</div>
    </TracingBeam>
  );
}
