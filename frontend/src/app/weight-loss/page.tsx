import type { Metadata } from "next";
import Link from "next/link";
import { TrackedHubLink } from "@/components/analytics/TrackedHubLink";
import { FaqAccordion } from "@/features/shared/components/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { MaybeArticleLink } from "@/features/blog/components/MaybeArticleLink";
import { PillarGuides } from "@/features/blog/components/PillarGuides";
import { ARTICLES } from "@/features/tools/content/links";
import { publishedFilter } from "@/features/tools/content/liveArticles";
import { WeightLossSplitSection } from "@/features/weight-loss/components/WeightLossSplitSection";
import { ogImageUrl } from "@/lib/og/url";
import { OG_DEFAULTS, breadcrumbLd, faqPageLd } from "@/lib/seo";

export const revalidate = 600;

const TITLE = "Weight Loss Guide: How to Lose Weight Safely";
const DESCRIPTION =
  "How to lose weight safely: find your maintenance calories, set a moderate deficit, eat enough protein, lift and walk. Indian diet tips and free calculators.";
const OG_IMAGE = ogImageUrl({
  title: "Lose weight safely",
  eyebrow: "Deficit · Protein · Walking",
});

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/weight-loss" },
  openGraph: {
    ...OG_DEFAULTS,
    title: `${TITLE} | fitlives`,
    description: DESCRIPTION,
    url: "/weight-loss",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "fitlives weight loss guide" }],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
};

const faq = [
  {
    q: "How do I start losing weight safely?",
    a: "Estimate your maintenance calories (TDEE), eat about 300–500 kcal a day below it, get enough protein, strength train two to four times a week and walk more. Aim to lose roughly 0.5–1% of your body weight per week; extreme restriction is harder to sustain and costs more muscle.",
  },
  {
    q: "How fast can I safely lose weight?",
    a: "For most adults, about 0.5–1 kg per week is a realistic, sustainable pace once the first week of water loss has passed. People with more weight to lose can lose faster at first; leaner people should aim for the lower end to protect muscle.",
  },
  {
    q: "Do I need cardio for fat loss?",
    a: "Cardio can help increase energy expenditure and support heart health, but the calorie deficit is what drives fat loss. Strength training helps you keep muscle while dieting, and daily walking is the easiest way to raise activity.",
  },
  {
    q: "Can I lose weight eating Indian food?",
    a: "Yes. Dal, roti, rice, sabzi, curd, paneer, eggs and chicken all fit a weight-loss diet. The levers are portion sizes, cooking oil and ghee, fried snacks and sugary drinks, and adding a protein source to every meal.",
  },
  {
    q: "Why did my weight loss stall?",
    a: "Plateaus usually come from under-counted calories, less daily movement (NEAT), water retention, or a target that is no longer accurate after losing weight. Recheck your intake and TDEE before cutting calories drastically.",
  },
];

const buildSteps = (isPublished: (a: { slug: string; href: string }) => boolean) => [
  {
    title: "Find your maintenance calories",
    body: (
      <>
        Your maintenance calories (TDEE) are what you burn in a normal day,
        including exercise. Every weight-loss plan starts from this number. Use
        the{" "}
        <Link href="/tdee-calculator" className="fk-link">
          TDEE calculator
        </Link>{" "}
        for an estimate, then adjust after two to three weeks of real-world
        weigh-ins.
      </>
    ),
  },
  {
    title: "Eat in a moderate calorie deficit",
    body: (
      <>
        A deficit of roughly 300–500 kcal a day, or a pace of about 0.5–1% of
        body weight per week, is enough for steady fat loss without wrecking
        energy or training. The{" "}
        <Link href="/calorie-deficit-calculator" className="fk-link">
          calorie deficit calculator
        </Link>{" "}
        turns your goal into a daily target, and our guide on{" "}
        <MaybeArticleLink
          article={ARTICLES.caloriesToLoseWeight}
          isPublished={isPublished}
          className="fk-link"
        >
          how many calories to eat to lose weight
        </MaybeArticleLink>{" "}
        explains the trade-offs.
      </>
    ),
  },
  {
    title: "Eat enough protein at every meal",
    body: (
      <>
        Protein protects muscle while you diet and helps keep hunger in check.
        Around 1.6–2.2 g per kg of body weight a day suits most people who
        train. Work out your number with the{" "}
        <Link href="/protein-calculator" className="fk-link">
          protein calculator
        </Link>
        , then build meals from{" "}
        <MaybeArticleLink
          article={ARTICLES.indianProteinFoods}
          isPublished={isPublished}
          className="fk-link"
        >
          high-protein Indian foods
        </MaybeArticleLink>
        .
        {isPublished(ARTICLES.proteinForWeightLoss) ? (
          <>
            {" "}
            Not lifting yet? See{" "}
            <MaybeArticleLink
              article={ARTICLES.proteinForWeightLoss}
              isPublished={isPublished}
              className="fk-link"
            >
              protein for weight loss
            </MaybeArticleLink>{" "}
            for targets by body weight.
          </>
        ) : null}
      </>
    ),
  },
  {
    title: "Strength train and walk more",
    body: (
      <>
        Lifting two to four times a week tells your body to keep muscle, so
        more of what you lose is fat. Daily steps add a steady calorie burn that
        is easy to recover from; see{" "}
        <MaybeArticleLink
          article={ARTICLES.walking}
          isPublished={isPublished}
          className="fk-link"
        >
          does walking help you lose weight
        </MaybeArticleLink>{" "}
        and estimate the burn with the{" "}
        <Link href="/steps-to-calories-calculator" className="fk-link">
          steps to calories calculator
        </Link>
        .
      </>
    ),
  },
  {
    title: "Track progress and adjust",
    body: (
      <>
        Weigh yourself a few times a week and compare weekly averages, not
        single days. If the average has not moved for two to three weeks,
        recheck portions and activity before cutting further. Our guide to{" "}
        <MaybeArticleLink
          article={ARTICLES.notLosingWeight}
          isPublished={isPublished}
          className="fk-link"
        >
          why you might not be losing weight
        </MaybeArticleLink>{" "}
        covers the common causes.
      </>
    ),
  },
];

const pillars = [
  {
    href: "/tdee-calculator",
    title: "Energy balance",
    text: "Estimate maintenance, then set a moderate deficit.",
  },
  {
    href: "/nutrition/protein",
    title: "Protein & meals",
    text: "Protect lean mass and stay fuller while dieting.",
  },
  {
    href: "/training",
    title: "Training",
    text: "Lift to preserve muscle; add cardio for health and burn.",
  },
  {
    href: "/foods/indian",
    title: "Indian diet context",
    text: "Build deficit-friendly meals from familiar staples.",
  },
];

export default async function WeightLossPage() {
  const isPublished = await publishedFilter(["weight-loss"]);
  const steps = buildSteps(isPublished);

  return (
    <main className="flex w-full flex-1 flex-col">
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Weight Loss", "/weight-loss"]])} />
      <JsonLd data={faqPageLd(faq)} />

      <div className="fk-page pt-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="fk-link-muted">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">Weight Loss</li>
          </ol>
        </nav>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Weight loss guide: how to lose weight safely
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Pillar hub · Educational content · Not medical advice
        </p>

        <aside className="fk-tool-card mt-8 p-6">
          <h2 className="text-lg font-semibold">Quick answer</h2>
          <p className="mt-2 text-muted-foreground">
            To lose weight, eat fewer calories than you burn for long enough.
            Find your maintenance calories, eat about 300–500 kcal below them,
            get enough protein, strength train and walk daily. Expect roughly
            0.5–1 kg a week, and judge progress by weekly averages.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <TrackedHubLink
              href="/tdee-calculator"
              label="TDEE calculator"
              className="fk-btn-accent rounded-full"
            >
              TDEE calculator →
            </TrackedHubLink>
            <TrackedHubLink
              href="/calorie-deficit-calculator"
              label="Calorie deficit calculator"
              className="fk-btn-ghost rounded-full border-orange-200"
            >
              Calorie deficit calculator
            </TrackedHubLink>
          </div>
        </aside>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">
            How to lose weight in 5 steps
          </h2>
          <ol className="mt-6 space-y-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <WeightLossSplitSection />

      <div className="fk-page py-16">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">
            A weight loss diet that works with Indian food
          </h2>
          <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-muted-foreground">
            <p>
              You do not need imported diet foods to lose weight. A typical
              Indian plate already has the right building blocks: a carb (roti
              or rice), a protein (dal, paneer, curd, eggs, chicken or fish) and
              vegetables. Weight loss comes from adjusting the proportions: a
              bigger protein and vegetable share, a measured carb portion, and
              less oil and ghee in cooking. To see it on a plate, follow our{" "}
              <MaybeArticleLink
                article={ARTICLES.indianDietPlan}
                isPublished={isPublished}
                className="fk-link"
              >
                7-day Indian diet plan for weight loss
              </MaybeArticleLink>
              {isPublished(ARTICLES.plan1500) ? (
                <>
                  {" "}
                  or the{" "}
                  <MaybeArticleLink
                    article={ARTICLES.plan1500}
                    isPublished={isPublished}
                    className="fk-link"
                  >
                    1500 calorie Indian diet plan
                  </MaybeArticleLink>{" "}
                  with gram weights
                </>
              ) : null}
              .
            </p>
            <p>
              The biggest hidden calories are usually fried snacks, sweets,
              sugary tea and coffee, and generous tadka. Rice is not the
              problem on its own; see{" "}
              <MaybeArticleLink
                article={ARTICLES.riceVsRoti}
                isPublished={isPublished}
                className="fk-link"
              >
                rice vs roti for weight loss
              </MaybeArticleLink>{" "}
              for a side-by-side comparison, and{" "}
              <MaybeArticleLink
                article={ARTICLES.indianWeightLossFoods}
                isPublished={isPublished}
                className="fk-link"
              >
                the best Indian foods for weight loss
              </MaybeArticleLink>{" "}
              for filling, lower-calorie swaps. Look up exact numbers in our{" "}
              <Link href="/foods/indian" className="fk-link">
                Indian food calorie database
              </Link>
              .
            </p>
            <p>
              Belly fat goes when overall body fat goes; no food or exercise
              burns it from one spot. Our guide on{" "}
              <MaybeArticleLink
                article={ARTICLES.bellyFat}
                isPublished={isPublished}
                className="fk-link"
              >
                how to lose belly fat
              </MaybeArticleLink>{" "}
              explains what actually works, and{" "}
              <MaybeArticleLink
                article={ARTICLES.intermittentFasting}
                isPublished={isPublished}
                className="fk-link"
              >
                does intermittent fasting work
              </MaybeArticleLink>{" "}
              covers whether eating windows help.
            </p>
          </div>
        </section>

        <PillarGuides
          category="weight-loss"
          heading="All weight loss guides"
          intro="Every fitlives weight loss article, grouped by topic. Start with the calorie deficit guides if you are new, then pick the topic that matches your question."
          path="/weight-loss"
          pageName={TITLE}
          pageDescription={DESCRIPTION}
        />

        <section className="mt-14">
          <h2 className="text-2xl font-semibold">Core pillars</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {pillars.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block h-full rounded-xl border border-border bg-card p-5 hover:border-accent hover:bg-accent-soft/40"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <FaqAccordion
          className="mt-16"
          items={faq.map((item) => ({
            question: item.q,
            answer: item.a,
          }))}
          title="Weight loss FAQs"
        />

        <p className="mt-12 text-xs text-muted-foreground">
          Educational information only. If you have a medical condition, are
          pregnant, or take medication, talk to a doctor or registered dietitian
          before changing your diet. See our{" "}
          <Link href="/medical-disclaimer" className="underline">
            medical disclaimer
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
