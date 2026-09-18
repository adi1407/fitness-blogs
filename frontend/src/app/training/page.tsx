import type { Metadata } from "next";
import Link from "next/link";
import { TrainingScrollMorph } from "@/features/training/components/TrainingScrollMorph";

export const metadata: Metadata = {
  title: "Training Guides — Programming, Volume, Recovery & Workouts",
  description:
    "Learn training fundamentals: progressive overload, volume, recovery, and how to use the exercise library inside a program.",
  alternates: { canonical: "/training" },
  openGraph: {
    title: "Training Guides | FitKnowledge",
    description: "Programming principles that connect to exercises and goals.",
    url: "/training",
  },
};

export default function TrainingPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Training</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Training fundamentals
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Training content should answer how to progress — not just list
        exercises. Start with principles, then drill into muscle groups and
        programs.
      </p>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          {
            href: "/exercises",
            title: "Exercise library",
            text: "Technique and variations by muscle group.",
          },
          {
            href: "/muscle-building",
            title: "Hypertrophy hub",
            text: "How training + nutrition drive muscle growth.",
          },
          {
            href: "/weight-loss",
            title: "Fat-loss training",
            text: "Preserve muscle while in a calorie deficit.",
          },
          {
            href: "/programs",
            title: "Programs",
            text: "Structured plans as content depth grows.",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-border bg-card p-5 hover:border-primary hover:bg-brand-50"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
          </Link>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Programming basics</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Train each major muscle group enough times per week to progress</li>
          <li>Leave most sets near technical failure, not total failure every set</li>
          <li>Add load, reps, or better form over weeks (progressive overload)</li>
          <li>Protect sleep and manage stress — recovery is part of training</li>
        </ul>
      </section>

      <TrainingScrollMorph />
    </main>
  );
}
