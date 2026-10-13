import type { Metadata } from "next";
import { OG_DEFAULTS } from "@/lib/seo";
import Link from "next/link";
import { TrainingScrollMorph } from "@/features/training/components/TrainingScrollMorph";

export const metadata: Metadata = {
  title: "Training Guides — Programming, Volume, Recovery & Workouts",
  description:
    "Learn training fundamentals: progressive overload, volume, recovery, and how to use the exercise library inside a program.",
  alternates: { canonical: "/training" },
  openGraph: {
    ...OG_DEFAULTS,
    title: "Training Guides | fitlives",
    description: "Programming principles that connect to exercises and goals.",
    url: "/training",
  },
};

export default function TrainingPage() {
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
          <li className="text-foreground">Training</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Training fundamentals
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        The principles behind every effective workout plan — how much to
        train, how hard, how often, and how to keep progressing. Learn them
        here, then put them into practice with our exercise guides and
        programs.
      </p>

      <TrainingScrollMorph />

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
            text: "Free 3- and 4-day plans with weekly progression.",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-border bg-card p-5 hover:border-accent hover:bg-accent-soft/40"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
          </Link>
        ))}
      </section>

      <section className="article-body mt-12 max-w-3xl">
        <h2>The five training principles</h2>

        <h3>1. Progressive overload</h3>
        <p>
          Your body adapts to the work you give it, so the work has to increase
          over time. Add a rep, a set or a small amount of weight, or perform
          the same weight with better control. Progress in small steps and
          write every session down — without a training log, most people end
          up repeating the same workout for months.
        </p>

        <h3>2. Volume</h3>
        <p>
          Volume is the amount of hard work you do, usually counted as sets per
          muscle per week. Most people build muscle well on about 10–20 hard
          sets per muscle each week. Beginners can start near 8–10 and grow
          from fewer sets; adding more only helps if you can recover from it.
        </p>

        <h3>3. Effort</h3>
        <p>
          A set only counts if it is challenging. Aim to finish most sets with
          about 1–3 reps left in reserve — close to failure, but with good
          technique. Going to complete failure on every set adds fatigue faster
          than it adds results, especially on heavy compound lifts.
        </p>

        <h3>4. Frequency</h3>
        <p>
          Training each muscle about twice a week tends to work better than
          once, because you can spread your weekly sets across sessions and
          keep each one high quality. Full-body sessions three times a week or
          an upper / lower split four times a week both achieve this.
        </p>

        <h3>5. Recovery</h3>
        <p>
          Muscle and strength are built between sessions. Sleep 7–9 hours, eat
          enough protein and calories, and take an easier week every 4–8 weeks
          or whenever performance drops and everything feels heavy. Stress
          from work and life counts too — on hard weeks, cut sets before you
          cut sleep.
        </p>

        <h2>How much to train for your goal</h2>
        <table>
          <thead>
            <tr>
              <th>Goal</th>
              <th>Reps per set</th>
              <th>Sessions per week</th>
              <th>Focus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Build muscle</td>
              <td>6–15</td>
              <td>3–5</td>
              <td>10–20 hard sets per muscle per week</td>
            </tr>
            <tr>
              <td>Get stronger</td>
              <td>3–6 on main lifts</td>
              <td>3–4</td>
              <td>Heavy compound lifts, longer rests</td>
            </tr>
            <tr>
              <td>Lose fat</td>
              <td>6–15</td>
              <td>2–4, plus daily walking</td>
              <td>Keep lifting to hold on to muscle in a deficit</td>
            </tr>
            <tr>
              <td>General health</td>
              <td>8–15</td>
              <td>2+ strength, plus 150 min moderate cardio</td>
              <td>Consistency over intensity</td>
            </tr>
          </tbody>
        </table>

        <h2>How to structure a session</h2>
        <ol>
          <li>
            <strong>Warm up for 5–10 minutes</strong> with light cardio, then a
            few lighter sets of your first exercise.
          </li>
          <li>
            <strong>Start with compound lifts</strong> such as squats,
            deadlifts, presses and rows, while you are freshest.
          </li>
          <li>
            <strong>Move to accessory exercises</strong> for individual
            muscles — curls, raises, leg curls.
          </li>
          <li>
            <strong>Finish with core work or conditioning</strong> if your
            program includes it.
          </li>
          <li>
            <strong>Rest 2–3 minutes</strong> between heavy sets and 60–90
            seconds on lighter accessory work.
          </li>
        </ol>

        <h2>Where to go next</h2>
        <p>
          New to lifting? Start with the{" "}
          <Link href="/programs/beginner-3-day-full-body">
            beginner 3-day full-body program
          </Link>
          . Training at home? Try the{" "}
          <Link href="/programs/home-minimal-equipment">
            home minimal-equipment plan
          </Link>
          . For technique, every exercise in the{" "}
          <Link href="/exercises">exercise library</Link> has step-by-step
          instructions, common mistakes and sets-and-reps guidance. To plan
          your heaviest lifts, estimate your max with the{" "}
          <Link href="/one-rep-max-calculator">one-rep max calculator</Link>,
          and match your diet to your training with the{" "}
          <Link href="/protein-calculator">protein calculator</Link>.
        </p>
        <p className="text-sm text-muted-foreground">
          Educational content only. If you have an injury, pain or a medical
          condition, speak to a doctor or physiotherapist before starting a new
          training program.
        </p>
      </section>
    </main>
  );
}
