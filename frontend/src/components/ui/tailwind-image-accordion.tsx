"use client";

import Image from "next/image";
import Link from "next/link";

export type AccordionItem = {
  id: string;
  url: string;
  title: string;
  description: string;
  href?: string;
  tags?: string[];
};

const DEFAULT_ITEMS: AccordionItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=960&auto=format&fit=crop",
    title: "Editorial",
    description: "Writers & guides",
    href: "/authors",
    tags: ["Articles", "Clusters", "EEAT"],
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=960&auto=format&fit=crop",
    title: "Review desk",
    description: "Fact check & sources",
    href: "/editorial-policy",
    tags: ["Sources", "Accuracy", "Safety"],
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=960&auto=format&fit=crop",
    title: "Tools team",
    description: "Calculators & education",
    href: "/tools",
    tags: ["Protein", "TDEE", "Macros"],
  },
];

type Props = {
  items?: AccordionItem[];
  className?: string;
};

export default function TailwindImageAccordion({
  items = DEFAULT_ITEMS,
  className = "",
}: Props) {
  return (
    <div
      className={`group mx-auto mb-10 mt-3 flex w-[90%] max-w-5xl justify-center gap-2 max-md:flex-col ${className}`}
    >
      {items.map((item) => (
        <article
          key={item.id}
          className="group/article relative w-full overflow-hidden rounded-xl transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-linear-to-t before:from-black/50 before:transition-opacity after:absolute after:inset-0 after:rounded-lg after:bg-white/30 after:opacity-0 after:backdrop-blur-sm after:transition-all focus-within:ring-3 focus-within:ring-orange-300 focus-within:before:opacity-100 md:before:opacity-0 md:hover:before:opacity-100 md:not-[&:hover]:group-hover:w-[20%] md:not-[&:hover]:group-hover:after:opacity-100 md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[20%] md:[&:not(:focus-within):not(:hover)]:group-focus-within:after:opacity-100"
        >
          <Link
            className="absolute inset-0 z-10 flex flex-col justify-end p-3 text-white"
            href={item.href || "#"}
          >
            <h3 className="text-xl font-medium transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] md:translate-y-2 md:truncate md:whitespace-nowrap md:opacity-0 group-hover/article:translate-y-0 group-hover/article:opacity-100 group-hover/article:delay-300 group-focus-within/article:translate-y-0 group-focus-within/article:opacity-100 group-focus-within/article:delay-300">
              {item.title}
            </h3>
            <span className="text-2xl font-medium transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] md:translate-y-2 md:truncate md:whitespace-nowrap md:opacity-0 group-hover/article:translate-y-0 group-hover/article:opacity-100 group-hover/article:delay-500 group-focus-within/article:translate-y-0 group-focus-within/article:opacity-100 group-focus-within/article:delay-500 sm:text-3xl">
              {item.description}
            </span>
          </Link>
          <Image
            className="h-72 w-full object-cover md:h-[420px]"
            src={item.url}
            width={960}
            height={480}
            alt={item.title}
          />
        </article>
      ))}
    </div>
  );
}
