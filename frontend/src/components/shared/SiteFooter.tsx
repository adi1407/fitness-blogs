import Link from "next/link";

const explore = [
  { href: "/learn", label: "Learn" },
  { href: "/nutrition", label: "Nutrition" },
  { href: "/weight-loss", label: "Weight Loss" },
  { href: "/muscle-building", label: "Muscle Building" },
  { href: "/training", label: "Training" },
  { href: "/exercises", label: "Exercises" },
  { href: "/foods", label: "Foods" },
  { href: "/recipes", label: "Recipes" },
];

const tools = [
  { href: "/tools", label: "All Calculators" },
  { href: "/tools/tdee-calculator", label: "TDEE Calculator" },
  { href: "/tools/protein-calculator", label: "Protein Calculator" },
  { href: "/tools/calorie-calculator", label: "Calorie Calculator" },
  { href: "/tools/macro-calculator", label: "Macro Calculator" },
  { href: "/tools/bmi-calculator", label: "BMI Calculator" },
];

const resources = [
  { href: "/about", label: "About" },
  { href: "/authors", label: "Authors" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/medical-disclaimer", label: "Medical Disclaimer" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-brand-50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <p className="text-lg font-semibold text-foreground">FitKnowledge</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Evidence-informed fitness, nutrition, and training — built as a
            searchable knowledge platform, not a thin blog.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {explore.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Tools
          </p>
          <ul className="mt-4 space-y-2">
            {tools.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Resources
          </p>
          <ul className="mt-4 space-y-2">
            {resources.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} FitKnowledge. Educational use only.</p>
          <p>
            Not medical advice — see our{" "}
            <Link href="/medical-disclaimer" className="underline hover:text-primary">
              disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
