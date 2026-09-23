import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  KnowledgeBreadcrumbs,
  KnowledgeDisclaimer,
} from "@/features/knowledge/components/KnowledgeUi";
import {
  fetchExercises,
  isMuscleGroup,
  MUSCLE_GROUP_LABELS,
  MUSCLE_GROUPS,
  type MuscleGroup,
} from "@/lib/api/knowledge";

export const revalidate = 120;

type Props = { params: Promise<{ group: string }> };

const GROUP_INTRO: Record<MuscleGroup, string> = {
  chest:
    "Presses, flyes, and push-up progressions — coached with cues you can use on a busy commercial-gym floor.",
  back: "Rows, pulldowns, hinges, and shoulder-friendly pulls for thickness and posture.",
  shoulders:
    "Overhead strength and side/rear delt work so presses stay healthy long-term.",
  arms: "Biceps and triceps that actually transfer — compounds plus honest isolation.",
  legs: "Squats, hinges, lunges, and machine work for strength you can feel walking upstairs.",
  core: "Anti-extension, anti-rotation, and controlled flexion — not endless crunches.",
  cardio:
    "Conditioning options that support fat loss and recovery without wrecking your lifting.",
};

export function generateStaticParams() {
  return MUSCLE_GROUPS.map((group) => ({ group }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group } = await params;
  if (!isMuscleGroup(group)) return { title: "Exercises" };
  const label = MUSCLE_GROUP_LABELS[group];
  const title = `${label} Exercises — Form, Cues & Programming`;
  const description = GROUP_INTRO[group];
  return {
    title,
    description,
    alternates: { canonical: `/exercises/${group}` },
    openGraph: { title: `${title} | fitlives`, description, url: `/exercises/${group}` },
  };
}

export default async function ExerciseGroupPage({ params }: Props) {
  const { group } = await params;
  if (!isMuscleGroup(group)) notFound();

  const exercises = await fetchExercises(group);
  const label = MUSCLE_GROUP_LABELS[group];

  return (
    <main className="fk-page flex-1 py-16">
      <KnowledgeBreadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/exercises", label: "Exercises" },
          { label },
        ]}
      />

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {label} exercises
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        {GROUP_INTRO[group]}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/muscle-building"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Muscle building guide
        </Link>
        <Link
          href="/programs"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
        >
          Training programs
        </Link>
      </div>

      {exercises.length === 0 ? (
        <p className="mt-10 text-muted-foreground">
          Exercises for this group are being published — check back soon.
        </p>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {exercises.map((ex) => (
            <li key={ex.id}>
              <Link
                href={ex.path ?? `/exercises/${group}/${ex.slug}`}
                className="block h-full rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent hover:bg-accent-soft/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold">{ex.title}</h2>
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground">
                    {ex.difficulty}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{ex.excerpt}</p>
                {ex.equipment.length > 0 ? (
                  <p className="mt-3 text-xs text-muted-foreground">
                    {ex.equipment.join(" · ")}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <KnowledgeDisclaimer />
    </main>
  );
}
