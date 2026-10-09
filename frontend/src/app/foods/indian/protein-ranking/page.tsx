import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CopySnippet } from "@/components/shared/CopySnippet";
import { JsonLd } from "@/components/seo/JsonLd";
import { fetchFoodsSafe } from "@/features/foods/api/foods";
import { ProteinRankingTable } from "@/features/foods/components/ProteinRankingTable";
import { formatG, shortName } from "@/features/foods/lib/nutrition";
import { rankBy, toRankedFoods, type RankedFood } from "@/features/foods/lib/proteinRanking";
import { ARTICLES } from "@/features/tools/content/links";
import { ogImageUrl } from "@/lib/og/url";
import { OG_DEFAULTS, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

const PATH = "/foods/indian/protein-ranking";
const INFOGRAPHIC_PATH = `${PATH}/infographic.png`;
const TITLE = "Indian Foods Ranked by Protein (Per Serving)";
const DESCRIPTION =
  "Protein in 50 Indian foods ranked per serving, per 100 kcal and per 100 g — dals, paneer, eggs, chicken, fish and more. IFCT 2017 data plus a free infographic.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    ...OG_DEFAULTS,
    title: `${TITLE} | fitlives`,
    description: DESCRIPTION,
    url: PATH,
    images: [
      {
        url: ogImageUrl({ title: "Protein in Indian foods, ranked", eyebrow: "Food data" }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

const btn =
  "rounded-full px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800]";
const btnDark = `${btn} bg-[#0A0A0A] text-white hover:bg-[#0A0A0A]/85`;
const btnLight = `${btn} border border-border bg-white hover:border-[#FF9800]`;

function names(list: RankedFood[], n: number, value: (f: RankedFood) => number) {
  return list
    .slice(0, n)
    .map((f) => `${shortName(f.name).toLowerCase()} (${formatG(value(f))})`)
    .join(", ");
}

export default async function ProteinRankingPage() {
  const foods = await fetchFoodsSafe();
  const ranked = toRankedFoods(foods);
  const perServing = rankBy([...ranked], "serving");
  const vegPerServing = rankBy([...ranked], "serving", "veg");
  const perCalorie = rankBy([...ranked], "calorie");
  const count = foods.length;

  const embedCode = [
    `<a href="${SITE_URL}${PATH}" title="Protein in Indian foods, ranked — fitlives">`,
    `  <img src="${SITE_URL}${INFOGRAPHIC_PATH}" alt="Protein in Indian foods ranked per serving (IFCT 2017 data)" width="1080" height="1350" loading="lazy" style="max-width:100%;height:auto" />`,
    `</a>`,
    `<p>Source: <a href="${SITE_URL}${PATH}">Protein in Indian foods, ranked — fitlives</a></p>`,
  ].join("\n");
  const citation = `fitlives. "Protein in Indian Foods, Ranked." ${SITE_URL}${PATH} (data: ICMR-NIN Indian Food Composition Tables 2017).`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Foods", item: `${SITE_URL}/foods` },
      { "@type": "ListItem", position: 3, name: "Indian Foods", item: `${SITE_URL}/foods/indian` },
      { "@type": "ListItem", position: 4, name: "Protein ranking", item: `${SITE_URL}${PATH}` },
    ],
  };
  const datasetLd = count
    ? {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "Protein in Indian foods, ranked",
        description: `Protein per typical serving, per 100 kcal and per 100 g for ${count} common Indian foods, derived from the Indian Food Composition Tables 2017.`,
        url: `${SITE_URL}${PATH}`,
        creator: { "@type": "Organization", name: "fitlives", url: SITE_URL },
        isBasedOn: "https://www.nin.res.in/ebooks/IFCT2017.pdf",
        variableMeasured: ["Protein per serving (g)", "Protein per 100 kcal (g)", "Protein per 100 g (g)"],
        image: `${SITE_URL}${INFOGRAPHIC_PATH}`,
      }
    : null;
  const itemListLd = count
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Indian foods ranked by protein per serving",
        itemListElement: perServing.map((f, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: shortName(f.name),
          url: `${SITE_URL}/foods/${f.slug}`,
        })),
      }
    : null;

  return (
    <main className="fk-page flex-1 py-16">
      <JsonLd data={breadcrumbLd} />
      {datasetLd && <JsonLd data={datasetLd} />}
      {itemListLd && <JsonLd data={itemListLd} />}

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/foods" className="fk-link-muted">
              Foods
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/foods/indian" className="fk-link-muted">
              Indian
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Protein ranking</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Protein in {count || 50} Indian foods, ranked
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Which everyday Indian foods give you the most protein? We ranked every food in our database three ways —
        per typical serving, per 100 calories and per 100 g — using the Indian Food Composition Tables 2017.
      </p>

      {count > 0 ? (
        <>
          <section aria-labelledby="quick-answer" className="mt-8 max-w-3xl rounded-2xl border border-border bg-[#F5F5F5] p-6">
            <h2 id="quick-answer" className="text-lg font-semibold">
              Quick answer
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong className="text-foreground">Most protein per serving:</strong>{" "}
                {names(perServing, 3, (f) => f.servingProteinG)}.
              </li>
              <li>
                <strong className="text-foreground">Best vegetarian sources per serving:</strong>{" "}
                {names(vegPerServing, 3, (f) => f.servingProteinG)}.
              </li>
              <li>
                <strong className="text-foreground">Most protein per calorie:</strong>{" "}
                {names(perCalorie, 3, (f) => f.per100KcalG)} per 100 kcal.
              </li>
            </ul>
          </section>

          <ProteinRankingTable foods={ranked} />

          <section aria-labelledby="veg-top" className="mt-12 max-w-3xl">
            <h2 id="veg-top" className="text-2xl font-semibold">
              Top 10 vegetarian protein foods per serving
            </h2>
            <ol className="mt-4 list-decimal space-y-1.5 pl-6">
              {vegPerServing.slice(0, 10).map((f) => (
                <li key={f.slug}>
                  <Link href={`/foods/${f.slug}`} className="font-medium hover:underline">
                    {shortName(f.name)}
                  </Link>{" "}
                  <span className="text-muted-foreground">
                    — {formatG(f.servingProteinG)} in {f.servingLabel} ({f.servingKcal} kcal)
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="infographic" className="mt-12">
            <h2 id="infographic" className="text-2xl font-semibold">
              Share the infographic
            </h2>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              Free to use on your website, blog or gym notice board — please link back to this page as the source.
            </p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
              <a href={INFOGRAPHIC_PATH} target="_blank" rel="noopener" className="block">
                <Image
                  src={INFOGRAPHIC_PATH}
                  alt="Infographic: Indian foods ranked by grams of protein per typical serving"
                  width={1080}
                  height={1350}
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="h-auto w-full rounded-xl border border-border"
                  unoptimized
                />
              </a>
              <div className="space-y-5">
                <div className="flex flex-wrap gap-3">
                  <a href={INFOGRAPHIC_PATH} download="fitlives-protein-in-indian-foods.png" className={btnDark}>
                    Download PNG
                  </a>
                  <Link href="/protein-calculator" className={btnLight}>
                    Find your protein target
                  </Link>
                </div>
                <CopySnippet label="Embed code (HTML)" code={embedCode} event="protein_ranking_embed" />
                <CopySnippet label="Cite this data" code={citation} event="protein_ranking_cite" />
              </div>
            </div>
          </section>
        </>
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
          The food database is temporarily unavailable. Please refresh in a minute.
        </p>
      )}

      <section aria-labelledby="how-to-read" className="mt-12 max-w-3xl">
        <h2 id="how-to-read" className="text-2xl font-semibold">
          How to read this ranking
        </h2>
        <div className="mt-3 space-y-3 text-muted-foreground">
          <p>
            <strong className="text-foreground">Per serving</strong> is the most practical view: it shows what a
            normal portion — a katori of dal, a glass of milk, 50 g of paneer — actually contributes to your day.
          </p>
          <p>
            <strong className="text-foreground">Per 100 kcal</strong> shows protein density. High numbers mean you
            get a lot of protein without many calories, which helps most when you&apos;re in a calorie deficit. Some
            vegetables score well here but are eaten in such small amounts that they add little protein in practice.
          </p>
          <p>
            <strong className="text-foreground">Per 100 g</strong> matches food labels and nutrition tables. Dals,
            grains and soybean are listed by dry (raw) weight, so 100 g dry dal cooks into roughly three katoris.
          </p>
          <p>
            Plant proteins are lower in some essential amino acids than animal proteins; combining dal or rajma with
            grains, and adding dairy or soya, covers the gap over a day. See{" "}
            <Link href={ARTICLES.indianProteinFoods.href} className="underline">
              the best high-protein Indian foods
            </Link>{" "}
            for meal ideas.
          </p>
        </div>
      </section>

      <section aria-labelledby="method" className="mt-12 max-w-3xl">
        <h2 id="method" className="text-2xl font-semibold">
          Method and source
        </h2>
        <p className="mt-3 text-muted-foreground">
          Protein and calories per 100 g come from the{" "}
          <a
            href="https://www.nin.res.in/ebooks/IFCT2017.pdf"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Indian Food Composition Tables 2017
          </a>{" "}
          (ICMR–National Institute of Nutrition). Serving sizes are typical Indian portions shown on each food&apos;s
          page; per-serving values are scaled from the 100 g figures and rounded to one decimal. The ranking updates
          automatically when foods are added or corrected.
        </p>
      </section>

      <aside className="mt-12 rounded-2xl border border-border bg-[#F5F5F5] p-6">
        <h2 className="text-lg font-semibold">How much protein do you need?</h2>
        <p className="mt-2 text-muted-foreground">
          Most active adults do well on 1.2–1.6 g per kg of body weight a day. Work out your number, then build meals
          around two or three foods from the top of the list.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/protein-calculator" className={btnDark}>
            Protein calculator
          </Link>
          <Link href={ARTICLES.proteinPerDay.href} className={btnLight}>
            How much protein per day?
          </Link>
          <Link href="/nutrition/protein" className={btnLight}>
            Protein guide
          </Link>
          <Link href="/foods/indian" className={btnLight}>
            All Indian foods
          </Link>
        </div>
      </aside>

      <p className="mt-12 text-xs text-muted-foreground">
        Educational information only. Nutrient values vary by variety, recipe and cooking method.{" "}
        <Link href="/medical-disclaimer" className="underline">
          Medical disclaimer
        </Link>
        .
      </p>
    </main>
  );
}
