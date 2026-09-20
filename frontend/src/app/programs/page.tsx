import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programs",
  robots: { index: false },
  alternates: { canonical: "/programs" },
};

/** Scaffold hub — expand when program content ships. */
export default function ProgramsPage() {
  return (
    <main className="fk-page flex-1 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Programs</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Structured training plans are expanding. Start with the{" "}
        <Link href="/exercises" className="font-semibold text-primary hover:underline">
          exercise library
        </Link>{" "}
        or{" "}
        <Link
          href="/muscle-building"
          className="font-semibold text-primary hover:underline"
        >
          muscle building guides
        </Link>
        .
      </p>
    </main>
  );
}
