import type { Metadata } from "next";
import {
  ORG_REF,
  OG_DEFAULTS,
  absoluteUrl,
  pageTitle,
} from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  KnowledgeBreadcrumbs,
  KnowledgeDisclaimer,
  ProseHtml,
} from "@/features/knowledge/components/KnowledgeUi";
import { CoverImage } from "@/components/shared/CoverImage";
import {
  fetchRecipe,
  fetchRecipes,
  staticParamsOrEmpty,
  type PublicRecipe,
} from "@/lib/api/knowledge";
import { structuredDataImages } from "@/lib/imageVariants";

export const revalidate = 120;

type Props = { params: Promise<{ slug: string }> };

function totalMinutes(r: PublicRecipe): number | null {
  if (r.totalMinutes != null) return r.totalMinutes;
  if (r.prepMinutes == null && r.cookMinutes == null) return null;
  return (r.prepMinutes ?? 0) + (r.cookMinutes ?? 0);
}

/** ISO 8601 duration for schema.org, e.g. 200 → "PT3H20M". */
function isoDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `PT${h ? `${h}H` : ""}${m || !h ? `${m}M` : ""}`;
}

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}

export async function generateStaticParams() {
  return staticParamsOrEmpty(async () =>
    (await fetchRecipes()).map((r) => ({ slug: r.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchRecipe(slug);
  if (!data) return { title: "Recipe" };
  const { recipe } = data;
  const title = pageTitle(recipe.metaTitle || recipe.title);
  const description = recipe.metaDescription || recipe.excerpt;
  return {
    title,
    description,
    robots: recipe.robotsIndex === false ? { index: false, follow: true } : undefined,
    alternates: { canonical: `/recipes/${slug}` },
    openGraph: {
      ...OG_DEFAULTS,
      title: `${title} | fitlives`,
      description,
      url: `/recipes/${slug}`,
      ...(recipe.imageUrl
        ? { images: [{ url: recipe.imageUrl, alt: recipe.imageAlt || recipe.title }] }
        : {}),
    },
  };
}

export default async function RecipeDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await fetchRecipe(slug);
  if (!data) notFound();
  const { recipe, related } = data;

  const ingredients = (recipe.ingredients ?? []).map(String);
  const steps = (recipe.steps ?? []).map(String);
  const path = `/recipes/${recipe.slug}`;

  const nutrition = {
    ...(recipe.calories != null ? { calories: `${recipe.calories} calories` } : {}),
    ...(recipe.proteinG != null ? { proteinContent: `${recipe.proteinG} g` } : {}),
    ...(recipe.carbsG != null ? { carbohydrateContent: `${recipe.carbsG} g` } : {}),
    ...(recipe.fatG != null ? { fatContent: `${recipe.fatG} g` } : {}),
  };

  const total = totalMinutes(recipe);
  const servings = recipe.servings ?? null;
  const timeFacts = [
    recipe.prepMinutes != null ? ["Prep", formatMinutes(recipe.prepMinutes)] : null,
    recipe.cookMinutes ? ["Cook", formatMinutes(recipe.cookMinutes)] : null,
    total != null ? ["Total", formatMinutes(total)] : null,
    servings != null ? ["Serves", String(servings)] : null,
  ].filter((f): f is [string, string] => f !== null);

  const recipeLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.metaDescription || recipe.excerpt,
    url: absoluteUrl(path),
    ...(recipe.imageUrl ? { image: structuredDataImages(recipe.imageUrl) } : {}),
    ...(recipe.prepMinutes != null ? { prepTime: isoDuration(recipe.prepMinutes) } : {}),
    ...(recipe.cookMinutes ? { cookTime: isoDuration(recipe.cookMinutes) } : {}),
    ...(total != null ? { totalTime: isoDuration(total) } : {}),
    ...(servings != null ? { recipeYield: `${servings} serving${servings === 1 ? "" : "s"}` } : {}),
    author: ORG_REF,
    publisher: ORG_REF,
    inLanguage: "en-IN",
    ...(recipe.publishedAt ? { datePublished: recipe.publishedAt } : {}),
    ...(recipe.updatedAt ? { dateModified: recipe.updatedAt } : {}),
    ...(recipe.mealType ? { recipeCategory: recipe.mealType } : {}),
    ...(recipe.cuisineTags.length
      ? { recipeCuisine: recipe.cuisineTags.join(", "), keywords: recipe.cuisineTags.join(", ") }
      : {}),
    ...(ingredients.length ? { recipeIngredient: ingredients } : {}),
    ...(steps.length
      ? {
          recipeInstructions: steps.map((text, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            text,
          })),
        }
      : {}),
    ...(Object.keys(nutrition).length
      ? { nutrition: { "@type": "NutritionInformation", ...nutrition } }
      : {}),
  };

  return (
    <main className="fk-page flex-1 py-16">
      {/* Google requires an image for Recipe results; without one the markup is an invalid item. */}
      {recipe.robotsIndex !== false && recipe.imageUrl ? <JsonLd data={recipeLd} /> : null}
      <KnowledgeBreadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/recipes", label: "Recipes" },
          { label: recipe.title },
        ]}
      />

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {recipe.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        {recipe.excerpt}
      </p>

      {recipe.imageUrl ? (
        <CoverImage
          src={recipe.imageUrl}
          alt={recipe.imageAlt || recipe.title}
          sizes="(min-width: 1024px) 960px, 100vw"
          priority
          className="mt-6 aspect-video w-full max-w-4xl rounded-xl object-cover"
        />
      ) : null}

      {timeFacts.length ? (
        <div className="mt-6 max-w-4xl">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {timeFacts.map(([label, value]) => (
              <div key={label} className="rounded-xl border border-border px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1 text-lg font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          {recipe.timeNote ? (
            <p className="mt-2 text-sm text-muted-foreground">{recipe.timeNote}</p>
          ) : null}
        </div>
      ) : null}

      {(recipe.calories != null || recipe.proteinG != null) && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[280px] text-left text-sm">
            <caption className="px-4 pt-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Per serving
            </caption>
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Calories</th>
                <th className="px-4 py-3">Protein</th>
                <th className="px-4 py-3">Carbs</th>
                <th className="px-4 py-3">Fat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3">{recipe.calories ?? "—"}</td>
                <td className="px-4 py-3">
                  {recipe.proteinG != null ? `${recipe.proteinG}g` : "—"}
                </td>
                <td className="px-4 py-3">
                  {recipe.carbsG != null ? `${recipe.carbsG}g` : "—"}
                </td>
                <td className="px-4 py-3">
                  {recipe.fatG != null ? `${recipe.fatG}g` : "—"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {recipe.quickAnswer ? (
        <section className="mt-8 rounded-xl border border-border bg-muted/40 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Quick answer
          </h2>
          <p className="mt-2 text-base leading-relaxed">{recipe.quickAnswer}</p>
        </section>
      ) : null}

      <ProseHtml html={recipe.bodyHtml} />

      {ingredients.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Ingredients</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {steps.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Steps</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/nutrition/protein"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Protein guide
        </Link>
        <Link
          href="/calorie-calculator"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
        >
          Calorie calculator
        </Link>
      </div>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-2xl font-semibold">More recipes</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={r.path ?? `/recipes/${r.slug}`}
                  className="block rounded-lg border border-border px-4 py-3 hover:border-accent"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <AdSlot placement="page_end" />

      <KnowledgeDisclaimer />
    </main>
  );
}
