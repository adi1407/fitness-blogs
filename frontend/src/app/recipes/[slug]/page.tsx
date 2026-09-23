import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  KnowledgeBreadcrumbs,
  KnowledgeDisclaimer,
  ProseHtml,
} from "@/features/knowledge/components/KnowledgeUi";
import { fetchRecipe, fetchRecipes } from "@/lib/api/knowledge";

export const revalidate = 120;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const recipes = await fetchRecipes();
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchRecipe(slug);
  if (!data) return { title: "Recipe" };
  const { recipe } = data;
  const title = recipe.metaTitle || recipe.title;
  const description = recipe.metaDescription || recipe.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/recipes/${slug}` },
    openGraph: {
      title: `${title} | fitlives`,
      description,
      url: `/recipes/${slug}`,
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

  return (
    <main className="fk-page flex-1 py-16">
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

      {(recipe.calories != null || recipe.proteinG != null) && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[280px] text-left text-sm">
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
          href="/tools/calorie-calculator"
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

      <KnowledgeDisclaimer />
    </main>
  );
}
