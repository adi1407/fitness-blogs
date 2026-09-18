"use client";

import FaqSection, {
  buildFaqSectionData,
} from "@/components/ui/habit-faq-scroller";

type FaqScrollerBlockProps = {
  items: { question: string; answer: string }[];
  title?: string;
  subtitle?: string;
  className?: string;
};

/** Client wrapper: maps flat FAQ items into the horizontal scroller. */
export function FaqScrollerBlock({
  items,
  title,
  subtitle,
  className,
}: FaqScrollerBlockProps) {
  if (items.length === 0) return null;

  const data = buildFaqSectionData(items, { title, subtitle });

  return (
    <section className={className}>
      <FaqSection data={data} />
      {/* Accessible fallback for screen readers / SEO crawlers that skip motion UI */}
      <div className="sr-only">
        <h2>{data.mainTitle}</h2>
        <ul>
          {items.map((item, i) => (
            <li key={`${item.question}-${i}`}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
