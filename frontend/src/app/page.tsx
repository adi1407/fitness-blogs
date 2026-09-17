import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Fitness — scaffold ready for SEO-first delivery.",
};

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        Fitness
      </h1>
      <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg dark:text-neutral-400">
        Frontend scaffold initiated. Feature modules, shared UI, and SEO
        foundations are ready to build on.
      </p>
    </main>
  );
}
