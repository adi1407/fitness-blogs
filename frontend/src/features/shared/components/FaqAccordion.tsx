"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

export type FaqEntry = { question: string; answer: string };

type FaqAccordionProps = {
  items: FaqEntry[];
  title?: string;
  subtitle?: string;
  /** `split` puts the heading beside the list on large screens; `stacked` suits narrow columns. */
  variant?: "split" | "stacked";
  /** Show the "Still have a question?" contact card (split variant only). */
  showContact?: boolean;
  className?: string;
};

export function FaqAccordion({
  items,
  title = "Frequently asked questions",
  subtitle = "Quick answers from this guide. Educational information only — not medical advice.",
  variant = "split",
  showContact = true,
  className,
}: FaqAccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set([0]));

  if (items.length === 0) return null;

  const toggle = (index: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const split = variant === "split";
  const headingId = `${baseId}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        split && "grid gap-8 lg:grid-cols-12 lg:gap-12",
        className,
      )}
    >
      <header className={cn(split && "lg:col-span-4")}>
        <div className={cn(split && "lg:sticky lg:top-[calc(var(--site-header-height)+2rem)]")}>
          {split ? (
            <p className="fk-meta flex items-center gap-2 text-muted-foreground">
              <span className="size-1.5 rounded-full bg-[#FF9800]" aria-hidden />
              FAQ
            </p>
          ) : null}
          <h2
            id={headingId}
            className={cn(
              "font-semibold tracking-tight text-balance text-foreground",
              split ? "mt-2 text-3xl sm:text-4xl" : "text-xl sm:text-2xl",
            )}
          >
            {title}
          </h2>
          {subtitle ? (
            <p
              className={cn(
                "text-muted-foreground",
                split ? "mt-3 max-w-md text-base sm:text-lg" : "mt-2 text-sm sm:text-base",
              )}
            >
              {subtitle}
            </p>
          ) : null}
          {split && showContact ? (
            <Link
              href="/contact"
              className="group mt-6 hidden items-center gap-3 rounded-2xl border border-border bg-white p-4 transition-colors hover:border-[#FF9800] focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none lg:flex"
            >
              <span className="flex-1">
                <span className="block text-sm font-semibold text-foreground">
                  Still have a question?
                </span>
                <span className="block text-sm text-muted-foreground">
                  Ask us — we read every message.
                </span>
              </span>
              <ArrowRight
                className="size-4 text-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          ) : null}
        </div>
      </header>

      <ul
        className={cn(
          "flex flex-col gap-3",
          split ? "lg:col-span-8" : "mt-5",
        )}
      >
        {items.map((item, i) => {
          const isOpen = open.has(i);
          const buttonId = `${baseId}-q-${i}`;
          const panelId = `${baseId}-a-${i}`;
          return (
            <li
              key={`${item.question}-${i}`}
              className={cn(
                "rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300",
                isOpen
                  ? "border-foreground/15 shadow-[0_8px_30px_-12px_rgba(10,10,10,0.18)]"
                  : "border-border hover:border-foreground/20",
              )}
            >
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className="flex min-h-14 w-full items-start gap-3 rounded-2xl px-4 py-4 text-left focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:ring-offset-2 focus-visible:outline-none sm:gap-4 sm:px-6 sm:py-5"
                >
                  <span
                    className="mt-0.5 hidden w-6 shrink-0 text-sm font-semibold text-muted-foreground tabular-nums sm:block"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[15px] leading-snug font-semibold text-foreground sm:text-base">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color,rotate] duration-300 motion-reduce:transition-none",
                      isOpen
                        ? "rotate-45 border-[#0A0A0A] bg-[#0A0A0A] text-white"
                        : "border-border text-foreground",
                    )}
                    aria-hidden
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!isOpen}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-5 text-sm leading-relaxed text-muted-foreground sm:pr-16 sm:pb-6 sm:pl-16 sm:text-[15px]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {split && showContact ? (
        <p className="text-sm text-muted-foreground lg:hidden">
          Still have a question?{" "}
          <Link href="/contact" className="fk-link">
            Contact us
          </Link>
          .
        </p>
      ) : null}
    </section>
  );
}
