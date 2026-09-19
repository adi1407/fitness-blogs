import Link from "next/link";
import { noIndexMetadata } from "@/components/shared/PlatformHub";
import { ProgramsCarousel } from "@/features/programs/components/ProgramsCarousel";

export const metadata = noIndexMetadata(
  "Programs",
  "Beginner, fat loss, muscle gain, strength, and athletic performance tracks.",
);

export default function Page() {
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
          <li className="text-foreground">Programs</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Programs
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Structured tracks for beginners, fat loss, and muscle gain — growing
        alongside the exercise library and calculators.
      </p>

      <ProgramsCarousel />

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/exercises"
          className="rounded-xl border border-border bg-card p-5 hover:border-accent hover:bg-accent-soft/40"
        >
          <h2 className="text-lg font-semibold">Exercise library</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Technique by muscle group to plug into any program.
          </p>
        </Link>
        <Link
          href="/training"
          className="rounded-xl border border-border bg-card p-5 hover:border-accent hover:bg-accent-soft/40"
        >
          <h2 className="text-lg font-semibold">Training principles</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Progressive overload, volume, and recovery fundamentals.
          </p>
        </Link>
      </div>
    </main>
  );
}
