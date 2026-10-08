"use client";

import { ArrowRight, BookOpen, Calculator, Utensils } from "lucide-react";
import { TrackedHubLink } from "@/components/analytics/TrackedHubLink";
import { nextStepsFor, type NextStep } from "@/features/tools/content/journeys";
import type { CalcSavePayload } from "@/features/tools/types";
import { cn } from "@/lib/utils";

const ICONS: Record<NextStep["kind"], typeof Calculator> = {
  calculator: Calculator,
  article: BookOpen,
  food: Utensils,
};

/** Guided "what to do with this number" links under a calculator result. */
export function NextSteps({ payload }: { payload: CalcSavePayload }) {
  const steps = nextStepsFor(payload);
  if (steps.length === 0) return null;
  const placement = `next_steps_${payload.tool.replace(/-calculator$/, "")}`;

  return (
    <nav aria-label="Next steps" className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Your next step
      </p>
      <ol className="mt-2 space-y-2">
        {steps.map((step, i) => {
          const Icon = ICONS[step.kind];
          const primary = i === 0;
          return (
            <li key={step.href}>
              <TrackedHubLink
                href={step.href}
                label={step.title}
                event="cta_click"
                placement={placement}
                className={cn(
                  "group flex items-start gap-3 rounded-xl border p-3 transition focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none",
                  primary
                    ? "border-[#0A0A0A] bg-[#0A0A0A] text-white hover:opacity-90"
                    : "border-border bg-white hover:border-[#0A0A0A]",
                )}
              >
                <Icon
                  className={cn("mt-0.5 size-4 shrink-0", primary ? "text-[#FF9800]" : "text-muted-foreground")}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{step.title}</span>
                  <span
                    className={cn(
                      "mt-0.5 block text-xs leading-relaxed",
                      primary ? "text-white/75" : "text-muted-foreground",
                    )}
                  >
                    {step.why}
                  </span>
                </span>
                <ArrowRight
                  className={cn(
                    "mt-0.5 size-4 shrink-0 transition group-hover:translate-x-0.5",
                    primary ? "text-white" : "text-muted-foreground group-hover:text-[#FF9800]",
                  )}
                  aria-hidden="true"
                />
              </TrackedHubLink>
            </li>
          );
        })}
      </ol>
      {steps[0]?.kind === "calculator" ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Your details carry over, so the next calculator opens ready to use.
        </p>
      ) : null}
    </nav>
  );
}
