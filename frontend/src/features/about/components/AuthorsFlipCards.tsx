"use client";

import { FlipCard, type FlipCardData } from "@/components/animate-ui/components/community/flip-card";

/** Empty until real CMS author/reviewer profiles ship. */
const AUTHORS: FlipCardData[] = [];

export function AuthorsFlipCards() {
  if (AUTHORS.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-border bg-brand-50/40 px-6 py-12 text-center">
        <p className="text-base font-medium text-foreground">
          No authors or reviewers yet
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Written-by and reviewed-by profiles will appear here once editorial
          accounts are added in the CMS.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-10">
      {AUTHORS.map((author) => (
        <FlipCard key={author.username} data={author} />
      ))}
    </div>
  );
}
