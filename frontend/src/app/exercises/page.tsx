import type { Metadata } from "next";
import Link from "next/link";
import { ExercisesHaloSection } from "@/features/exercises/components/ExercisesHaloSection";

export const metadata: Metadata = {
  title: "Exercise Library — Chest, Back, Legs, Arms, Core & Cardio",
  description:
    "Browse exercises by muscle group with form-focused guidance. Connect training to muscle building, programs, and recovery.",
  alternates: { canonical: "/exercises" },
  openGraph: {
    title: "Exercise Library | fitlives",
    description: "Muscle-group hubs for technique and programming pathways.",
    url: "/exercises",
  },
};

const groups = [
  { href: "/exercises/chest", title: "Chest", text: "Presses, flyes, and upper-chest patterns." },
  { href: "/exercises/back", title: "Back", text: "Rows, pulldowns, and hinge-supported pulls." },
  { href: "/exercises/shoulders", title: "Shoulders", text: "Presses and raise variations." },
  { href: "/exercises/arms", title: "Arms", text: "Elbow flexors and extensors." },
  { href: "/exercises/legs", title: "Legs", text: "Squats, hinges, lunges, and accessories." },
  { href: "/exercises/core", title: "Core", text: "Anti-extension, anti-rotation, and flexion work." },
  { href: "/exercises/cardio", title: "Cardio", text: "Conditioning options for health and fat loss." },
];

export default function ExercisesPage() {
  return (
    <main className="fk-page flex-1 py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Exercises</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Exercise library
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Muscle-group hubs capture “best exercises for X” demand and feed into
        programs and hypertrophy content — without thin doorway pages.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/muscle-building"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Muscle building guide
        </Link>
        <Link
          href="/training"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
        >
          Training fundamentals
        </Link>
      </div>

      <ExercisesHaloSection />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <li key={group.href}>
            <Link
              href={group.href}
              className="block h-full rounded-xl border border-border bg-card p-5 hover:border-accent hover:bg-accent-soft/40"
            >
              <h2 className="text-lg font-semibold">{group.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{group.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
