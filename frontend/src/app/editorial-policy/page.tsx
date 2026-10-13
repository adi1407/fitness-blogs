import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How fitlives researches, reviews, updates, and corrects fitness and nutrition content.",
  alternates: { canonical: "/editorial-policy" },
};

const EXTERNAL = "fk-link font-semibold";

export default function EditorialPolicyPage() {
  return (
    <main className="fk-page fk-page--content flex-1 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">
        Editorial policy
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        How we research, write, review, update and correct the fitness and
        nutrition content on fitlives.
      </p>

      <div className="article-body mt-8 max-w-3xl">
        <h2>Our goal</h2>
        <p>
          We publish practical, evidence-informed guidance on muscle building,
          weight loss and nutrition for Indian readers. Every page should fully
          answer the question it targets, use foods and portions people in
          India actually eat, and be honest about what the evidence does and
          doesn&apos;t show. We don&apos;t publish clickbait, miracle claims or
          medical promises.
        </p>

        <h2>Who writes and reviews our content</h2>
        <p>
          Each article names the people involved, with the roles kept separate:
        </p>
        <ul>
          <li>
            <strong>Written by</strong> — the person who researched and wrote
            the article.
          </li>
          <li>
            <strong>Reviewed by</strong> — shown only when a qualified reviewer
            has checked the content for accuracy and safety.
          </li>
        </ul>
        <p>
          You can see every contributor and the articles they have worked on on
          our <Link href="/authors">authors page</Link>.
        </p>

        <h2>How we research</h2>
        <ul>
          <li>
            We start from the reader&apos;s question and answer it directly
            near the top of the page, then add the detail.
          </li>
          <li>
            Health and nutrition claims are based on peer-reviewed research,
            systematic reviews and guidance from recognised organisations.
          </li>
          <li>
            We separate strong consensus, emerging evidence and opinion, and say
            so when the evidence is limited or mixed.
          </li>
          <li>
            Sources are listed on each article so you can check them yourself.
          </li>
        </ul>

        <h2>Sources we rely on</h2>
        <ul>
          <li>
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL}
            >
              World Health Organization
            </a>{" "}
            guidance on healthy diets and physical activity.
          </li>
          <li>
            ICMR–National Institute of Nutrition dietary guidelines for Indians.
          </li>
          <li>
            The Indian Food Composition Tables (IFCT 2017) for the calories and
            nutrients in our <Link href="/foods/indian">food database</Link>.
          </li>
          <li>
            Peer-reviewed journals in nutrition, exercise science and sports
            medicine, and position stands from professional bodies.
          </li>
        </ul>

        <h2>Data, calculators and recipes</h2>
        <p>
          Food values come from IFCT 2017 and are shown per 100 g and per
          common serving. Where a food isn&apos;t covered by IFCT, we use
          typical label values and say so. Our{" "}
          <Link href="/tools">calculators</Link> use published, widely used
          equations, and each one explains how the result is calculated and
          its limits. Recipe macros are calculated ingredient by ingredient
          from weighed quantities.
        </p>

        <h2>Updates</h2>
        <p>
          We review pages when guidelines or important research change, and
          when readers point out problems. Articles show when they were last
          updated. Minor edits such as typos or formatting don&apos;t change
          the update date; changes to advice, numbers or conclusions do.
        </p>

        <h2>Corrections</h2>
        <p>
          If we get something wrong, we fix it. Material corrections are made
          promptly once verified. To report an error, follow our{" "}
          <Link href="/corrections">corrections policy</Link> or{" "}
          <Link href="/contact">contact us</Link> with the page link and the
          details.
        </p>

        <h2>Independence and advertising</h2>
        <p>
          fitlives is free to read and may display advertising to cover running
          costs. Advertisers have no say in what we write, and ads are kept
          visually separate from content. We currently have no paid affiliate
          links or sponsored content; if that changes, it will be clearly
          labelled and explained on our{" "}
          <Link href="/affiliate-disclosure">affiliate disclosure</Link> page.
        </p>

        <h2>Health and safety</h2>
        <p>
          Our content is educational and is not a substitute for advice from a
          doctor, registered dietitian or physiotherapist. We don&apos;t make
          claims that food or exercise cures disease, and we don&apos;t give
          medication advice. Pages that touch on medical conditions, pregnancy
          or supplements remind readers to consult a qualified professional.
          See our <Link href="/medical-disclaimer">medical disclaimer</Link>.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        <Link href="/about" className="fk-link">
          About
        </Link>
        <Link href="/medical-disclaimer" className="fk-link">
          Medical disclaimer
        </Link>
        <Link href="/corrections" className="fk-link">
          Corrections
        </Link>
        <Link href="/authors" className="fk-link">
          Authors
        </Link>
        <Link href="/privacy" className="fk-link">
          Privacy
        </Link>
      </div>
    </main>
  );
}
