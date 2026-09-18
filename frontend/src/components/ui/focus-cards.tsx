"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CardData = {
  title: string;
  src: string;
  href?: string;
};

export const Card = React.memo(function Card({
  card,
  index,
  hovered,
  setHovered,
  alwaysShowLabel,
}: {
  card: CardData;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  alwaysShowLabel: boolean;
}) {
  const showLabel = alwaysShowLabel || hovered === index;

  const inner = (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative h-60 w-full overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ease-out md:h-96 dark:bg-neutral-900",
        hovered !== null && hovered !== index && "scale-[0.98] blur-sm",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.src}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className={cn(
          "absolute inset-0 flex items-end bg-black/50 px-4 py-8 transition-opacity duration-300",
          showLabel ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="line-clamp-2 bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-xl font-medium text-transparent md:text-2xl">
          {card.title}
        </div>
      </div>
    </div>
  );

  if (card.href) {
    return (
      <Link
        href={card.href}
        className="block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {inner}
      </Link>
    );
  }

  return inner;
});

export function FocusCards({ cards }: { cards: CardData[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [alwaysShowLabel, setAlwaysShowLabel] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setAlwaysShowLabel(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          alwaysShowLabel={alwaysShowLabel}
        />
      ))}
    </div>
  );
}
