"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqRow = {
  id: string;
  speed?: string;
  direction?: "left" | "right";
  faqItems: FaqItem[];
};

export type FaqSectionData = {
  mainTitle: string;
  mainSubtitle: string;
  rows: FaqRow[];
};

type FaqCardProps = {
  question: string;
  answer: string;
  className?: string;
};

/** Reusable card for a single FAQ item. */
export function FaqCard({ question, answer, className }: FaqCardProps) {
  return (
    <div
      className={cn(
        "faq-card flex w-[min(18rem,85vw)] flex-shrink-0 flex-col items-start gap-3 rounded-xl border border-brand-100 bg-white p-5 shadow-md sm:w-96",
        className,
      )}
    >
      <h3 className="faq-title line-clamp-3 text-base font-semibold tracking-tight text-foreground sm:text-lg">
        {question}
      </h3>
      <p className="faq-answer line-clamp-6 text-sm leading-relaxed text-muted-foreground">
        {answer}
      </p>
    </div>
  );
}

type HorizontalScrollerProps = {
  children: ReactNode;
  speed?: string;
  direction?: "left" | "right";
  className?: string;
};

/** Seamless horizontal looping row. */
export function HorizontalScroller({
  children,
  speed = "40s",
  direction = "left",
  className,
}: HorizontalScrollerProps) {
  const animationClass =
    direction === "right"
      ? "animate-scroll-horizontal-reverse"
      : "animate-scroll-horizontal";

  const style = { "--scroll-duration": speed } as CSSProperties;

  return (
    <div
      className={cn(
        "scroller-mask group relative w-full overflow-hidden",
        className,
      )}
    >
      <div className={cn("flex w-max motion-reduce:animate-none", animationClass)} style={style}>
        <div className="flex flex-shrink-0 items-stretch justify-center gap-6 px-3 sm:gap-8 sm:px-4">
          {children}
        </div>
        <div
          className="flex flex-shrink-0 items-stretch justify-center gap-6 px-3 sm:gap-8 sm:px-4"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

type FaqSectionProps = {
  data: FaqSectionData;
  className?: string;
};

/** Assembles title, subtitle, and multiple horizontal FAQ rows. */
export default function FaqSection({ data, className }: FaqSectionProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 overflow-x-clip py-4",
        className,
      )}
    >
      <div className="z-10 flex max-w-2xl flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {data.mainTitle}
        </h2>
        <p className="text-base text-muted-foreground sm:text-lg">
          {data.mainSubtitle}
        </p>
      </div>

      <div className="z-10 flex w-full flex-col gap-6 sm:gap-8">
        {data.rows.map((row) => (
          <HorizontalScroller
            key={row.id}
            speed={row.speed ?? "50s"}
            direction={row.direction ?? "left"}
          >
            {row.faqItems.map((item) => (
              <FaqCard
                key={item.id}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </div>
  );
}

/** Build scroller rows from a flat FAQ list (chunks of 2–3, alternating direction). */
export function buildFaqSectionData(
  items: { question: string; answer: string }[],
  opts?: { title?: string; subtitle?: string },
): FaqSectionData {
  const chunkSize = items.length <= 3 ? Math.max(items.length, 1) : 2;
  const rows: FaqRow[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const slice = items.slice(i, i + chunkSize);
    const rowIndex = rows.length;
    rows.push({
      id: `row-${rowIndex + 1}`,
      speed: rowIndex % 2 === 0 ? "55s" : "45s",
      direction: rowIndex % 2 === 0 ? "left" : "right",
      faqItems: slice.map((item, j) => ({
        id: `q-${rowIndex}-${j}`,
        question: item.question,
        answer: item.answer,
      })),
    });
  }

  return {
    mainTitle: opts?.title ?? "Frequently asked questions",
    mainSubtitle:
      opts?.subtitle ??
      "Quick answers from this guide. Educational information only — not medical advice.",
    rows,
  };
}
