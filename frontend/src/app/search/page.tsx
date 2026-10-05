import type { Metadata } from "next";
import Link from "next/link";
import { SearchBeacon } from "@/features/search/components/SearchBeacon";
import { normalizeQuery, siteSearch, type SearchKind } from "@/features/search/lib/search";
import { CALCULATORS } from "@/features/tools/content/links";

export const metadata: Metadata = {
  title: "Search",
  description: "Search fitlives articles, calculators and the Indian food database.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

const KIND_LABEL: Record<SearchKind, string> = {
  calculator: "Calculator",
  food: "Food",
  article: "Article",
};

const SUGGESTIONS = ["protein", "paneer", "calorie deficit", "belly fat", "roti", "body fat"];

type Props = { searchParams: Promise<{ q?: string | string[] }> };

export default async function SearchPage({ searchParams }: Props) {
  const query = normalizeQuery((await searchParams).q);
  const hits = query ? await siteSearch(query) : [];

  return (
    <main className="fk-page flex-1 py-16">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Search</h1>

      <form action="/search" method="get" role="search" className="mt-6 flex max-w-2xl gap-2">
        <label className="flex-1">
          <span className="sr-only">Search fitlives</span>
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Try “protein”, “paneer” or “calorie deficit”"
            maxLength={80}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base outline-none focus:border-[#FF9800] focus:ring-2 focus:ring-[#FF9800]/30"
            autoComplete="off"
          />
        </label>
        <button
          type="submit"
          className="rounded-xl bg-[#0A0A0A] px-5 py-3 font-semibold text-white hover:bg-[#0A0A0A]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800]"
        >
          Search
        </button>
      </form>

      {query && <SearchBeacon query={query} results={hits.length} />}

      {query ? (
        <section className="mt-10 max-w-3xl" aria-labelledby="results-heading">
          <h2 id="results-heading" className="text-sm text-muted-foreground" aria-live="polite">
            {hits.length
              ? `${hits.length} ${hits.length === 1 ? "result" : "results"} for “${query}”`
              : `No results for “${query}”`}
          </h2>
          {hits.length > 0 && (
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {hits.map((h) => (
                <li key={h.href}>
                  <Link
                    href={h.href}
                    className="group block py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800]"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#FF9800]">
                      {KIND_LABEL[h.kind]}
                    </span>
                    <span className="mt-1 block text-lg font-semibold group-hover:underline">{h.title}</span>
                    {h.description && (
                      <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">{h.description}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {hits.length === 0 && <NoResults />}
        </section>
      ) : (
        <NoResults />
      )}
    </main>
  );
}

function NoResults() {
  return (
    <div className="mt-10 grid max-w-3xl gap-8 sm:grid-cols-2">
      <section>
        <h2 className="font-semibold">Popular searches</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <li key={s}>
              <Link
                href={`/search?q=${encodeURIComponent(s)}`}
                prefetch={false}
                className="inline-block rounded-full border border-border px-3 py-1.5 text-sm hover:border-[#FF9800]"
              >
                {s}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-semibold">Or browse</h2>
        <ul className="mt-3 space-y-1.5 text-sm">
          <li>
            <Link href="/blog" className="underline hover:text-[#FF9800]">
              All articles
            </Link>
          </li>
          <li>
            <Link href="/tools" className="underline hover:text-[#FF9800]">
              All calculators ({Object.keys(CALCULATORS).length})
            </Link>
          </li>
          <li>
            <Link href="/foods/indian" className="underline hover:text-[#FF9800]">
              Indian food calories
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
