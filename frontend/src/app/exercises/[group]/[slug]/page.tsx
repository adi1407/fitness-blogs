import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  KnowledgeBreadcrumbs,
  KnowledgeDisclaimer,
  ProseHtml,
} from "@/features/knowledge/components/KnowledgeUi";
import {
  fetchExercise,
  fetchExercises,
  isMuscleGroup,
  MUSCLE_GROUP_LABELS,
  MUSCLE_GROUPS,
} from "@/lib/api/knowledge";

export const revalidate = 120;

type Props = { params: Promise<{ group: string; slug: string }> };

export async function generateStaticParams() {
  const params: { group: string; slug: string }[] = [];
  for (const group of MUSCLE_GROUPS) {
    const list = await fetchExercises(group);
    for (const ex of list) {
      params.push({ group, slug: ex.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group, slug } = await params;
  if (!isMuscleGroup(group)) return { title: "Exercise" };
  const data = await fetchExercise(group, slug);
  if (!data) return { title: "Exercise" };
  const { exercise } = data;
  const title = exercise.metaTitle || exercise.title;
  const description = exercise.metaDescription || exercise.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/exercises/${group}/${slug}` },
    openGraph: {
      title: `${title} | fitlives`,
      description,
      url: `/exercises/${group}/${slug}`,
    },
  };
}

export default async function ExerciseDetailPage({ params }: Props) {
  const { group, slug } = await params;
  if (!isMuscleGroup(group)) notFound();

  const data = await fetchExercise(group, slug);
  if (!data) notFound();

  const { exercise, related } = data;
  const label = MUSCLE_GROUP_LABELS[group];

  return (
    <main className="fk-page flex-1 py-16">
      <KnowledgeBreadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/exercises", label: "Exercises" },
          { href: `/exercises/${group}`, label },
          { label: exercise.title },
        ]}
      />

      <p className="mt-4 text-sm capitalize text-muted-foreground">
        {exercise.difficulty} · {group}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        {exercise.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        {exercise.excerpt}
      </p>

      {exercise.quickAnswer ? (
        <section className="mt-8 rounded-xl border border-border bg-muted/40 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Quick answer
          </h2>
          <p className="mt-2 text-base leading-relaxed">{exercise.quickAnswer}</p>
        </section>
      ) : null}

      <ProseHtml html={exercise.bodyHtml} />

      {exercise.formCues.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Form cues</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {exercise.formCues.map((cue) => (
              <li key={cue}>{cue}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {exercise.commonMistakes.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Common mistakes</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {exercise.commonMistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {exercise.programmingNotes ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Programming notes</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {exercise.programmingNotes}
          </p>
        </section>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        {exercise.equipment.map((eq) => (
          <span
            key={eq}
            className="rounded-full border border-border px-3 py-1 capitalize"
          >
            {eq}
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/tools/protein-calculator"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Protein calculator
        </Link>
        <Link
          href="/training"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
        >
          Training fundamentals
        </Link>
      </div>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold">Related {label.toLowerCase()} work</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((ex) => (
              <li key={ex.id}>
                <Link
                  href={ex.path ?? `/exercises/${group}/${ex.slug}`}
                  className="block rounded-lg border border-border px-4 py-3 hover:border-accent"
                >
                  {ex.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <KnowledgeDisclaimer />
    </main>
  );
}
