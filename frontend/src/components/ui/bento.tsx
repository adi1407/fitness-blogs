"use client";

import type { ReactNode } from "react";
import { clsx } from "clsx";
import { motion } from "motion/react";
import { HUB } from "@/lib/hubImages";

/** Dark bento grid used on the Tools hub. */
export default function FUIBentoGridDark() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col rounded-2xl bg-foreground p-6 sm:p-10">
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Calculator ecosystem
      </h2>
      <p className="mt-2 max-w-3xl text-lg text-white/70">
        Educational outputs that route into guides, foods, and programs — not
        dead-end numbers.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          dark
          eyebrow="Energy"
          title="TDEE clarity"
          description="Estimate maintenance calories, then set a deficit or surplus with next-step education."
          graphic={
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HUB.powerBowl})` }}
            />
          }
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          dark
          eyebrow="Protein"
          title="Daily targets"
          description="Body-weight based protein ranges tied to Indian foods and meal ideas."
          graphic={
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HUB.chickenBowl})` }}
            />
          }
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          dark
          eyebrow="Macros"
          title="Split with purpose"
          description="Convert calories into protein, carbs, and fat that match your goal."
          graphic={
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HUB.veggieBowl})` }}
            />
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          dark
          eyebrow="BMI"
          title="Screening metric"
          description="A simple height-weight index — educational context, not a diagnosis."
          graphic={
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HUB.checkup})` }}
            />
          }
          className="lg:col-span-2"
        />
        <BentoCard
          dark
          eyebrow="BMR"
          title="Resting burn"
          description="Understand basal needs before layering activity and training."
          graphic={
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HUB.deadlift})` }}
            />
          }
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </div>
  );
}

export function BentoCard({
  dark = false,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
}: {
  dark?: boolean;
  className?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  graphic?: ReactNode;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "transform-gpu bg-black shadow-sm ring-1 ring-white/10 dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]",
        "data-[dark]:bg-gray-800 data-[dark]:ring-white/15",
      )}
    >
      <div className="relative h-[29rem] shrink-0">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-white to-50% opacity-25 group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-white to-50% opacity-25 group-data-[dark]:from-gray-800 group-data-[dark]:from-[-25%]" />
        )}
      </div>
      <div className="relative z-20 mt-[-110px] h-[14rem] isolate p-10 text-white backdrop-blur-xl">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-100">
          {eyebrow}
        </h3>
        <p className="mt-1 text-2xl/8 font-medium tracking-tight text-white">
          {title}
        </p>
        <p className="mt-2 max-w-[600px] text-sm/6 text-gray-100">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
