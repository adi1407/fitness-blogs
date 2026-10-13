import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/seo";
import Link from "next/link";
import { ExercisesHaloSection } from "@/features/exercises/components/ExercisesHaloSection";

export const metadata: Metadata = {
  title: "Exercise Library — Chest, Back, Legs, Arms, Core & Cardio",
  description:
    "Browse exercises by muscle group with form-focused guidance. Connect training to muscle building, programs, and recovery.",
  alternates: { canonical: "/exercises" },
  openGraph: {
    ...OG_DEFAULTS,
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
        Step-by-step guides to 50 exercises, organised by muscle group — with
        setup, technique, common mistakes, variations and sets-and-reps
        guidance for each one.
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

      <section className="article-body mt-14 max-w-3xl">
        <h2>How to use the exercise library</h2>
        <p>
          Each muscle-group page explains how to train that area and lists its
          exercises. Every exercise guide covers what it trains, how to set up,
          how to perform each rep, breathing, variations for different
          equipment and levels, how many sets and reps to do, how to progress,
          and safety notes. Use the guides to learn technique, then follow a{" "}
          <Link href="/programs">training program</Link> so you know which
          exercises to do and when.
        </p>

        <h2>Compound vs isolation exercises</h2>
        <p>
          <strong>Compound exercises</strong> — squats, deadlifts, presses,
          rows and pull-ups — work several muscles and joints at once. They
          build the most strength and muscle per minute and should come first
          in a session. <strong>Isolation exercises</strong> — curls, raises,
          leg extensions — target one muscle. They&apos;re useful for adding
          volume to specific areas once the compound lifts are covered.
        </p>

        <h2>A balanced starting point</h2>
        <table>
          <thead>
            <tr>
              <th>Movement</th>
              <th>Gym option</th>
              <th>Home option</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Squat</td>
              <td>
                <Link href="/exercises/legs/back-squat">Back squat</Link>
              </td>
              <td>
                <Link href="/exercises/legs/bulgarian-split-squat">
                  Bulgarian split squat
                </Link>
              </td>
            </tr>
            <tr>
              <td>Hinge</td>
              <td>
                <Link href="/exercises/legs/romanian-deadlift">
                  Romanian deadlift
                </Link>
              </td>
              <td>Backpack Romanian deadlift</td>
            </tr>
            <tr>
              <td>Push</td>
              <td>
                <Link href="/exercises/chest/barbell-bench-press">
                  Bench press
                </Link>
              </td>
              <td>
                <Link href="/exercises/chest/push-ups">Push-ups</Link>
              </td>
            </tr>
            <tr>
              <td>Pull</td>
              <td>
                <Link href="/exercises/back/lat-pulldown">Lat pulldown</Link>
              </td>
              <td>
                <Link href="/exercises/back/pull-up">Pull-ups</Link>
              </td>
            </tr>
            <tr>
              <td>Core</td>
              <td>
                <Link href="/exercises/core/pallof-press">Pallof press</Link>
              </td>
              <td>
                <Link href="/exercises/core/dead-bug">Dead bug</Link>
              </td>
            </tr>
            <tr>
              <td>Cardio</td>
              <td>
                <Link href="/exercises/cardio/zone-2-incline-walk">
                  Incline walk
                </Link>
              </td>
              <td>
                <Link href="/exercises/cardio/jump-rope">Jump rope</Link>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          One exercise from each row, done for 2–3 sets two or three times a
          week, makes a complete beginner routine. Add weight or reps gradually
          — see the <Link href="/training">training fundamentals</Link> for how
          much to train and how to progress.
        </p>

        <h2>Choosing the right exercises for you</h2>
        <ul>
          <li>
            <strong>Pick variations that feel good on your joints.</strong>{" "}
            There is no single best exercise; several options train each muscle
            well.
          </li>
          <li>
            <strong>Match your equipment.</strong> Every guide lists dumbbell,
            machine or bodyweight alternatives.
          </li>
          <li>
            <strong>Keep the same exercises for several weeks</strong> so you
            can measure progress and keep adding load.
          </li>
          <li>
            <strong>Stop if you feel sharp pain</strong> and see a qualified
            professional if it continues.
          </li>
        </ul>
      </section>
    </main>
  );
}
