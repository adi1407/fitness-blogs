import Link from "next/link";
import { CookieSettingsButton } from "@/components/shared/CookieBanner";

const explore = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Latest" },
  { href: "/blog/muscle-building", label: "Muscle Building" },
  { href: "/blog/weight-loss", label: "Weight Loss" },
  { href: "/blog/nutrition", label: "Nutrition" },
  { href: "/exercises", label: "Exercises" },
  { href: "/foods/indian", label: "Indian Foods" },
];

const tools = [
  { href: "/tools", label: "All Calculators" },
  { href: "/tools/tdee-calculator", label: "TDEE Calculator" },
  { href: "/tools/protein-calculator", label: "Protein Calculator" },
  { href: "/tools/calorie-calculator", label: "Calorie Calculator" },
  { href: "/tools/macro-calculator", label: "Macro Calculator" },
  { href: "/tools/bmi-calculator", label: "BMI Calculator" },
];

const trust = [
  { href: "/about", label: "About" },
  { href: "/authors", label: "Authors" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/medical-disclaimer", label: "Medical Disclaimer" },
  { href: "/nutrition-disclaimer", label: "Nutrition Disclaimer" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/corrections", label: "Corrections" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-white">
      <div className="fk-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <p className="text-lg font-semibold text-foreground">FitKnowledge</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Evidence-informed fitness, nutrition, and training — built as a
            searchable knowledge platform, not a thin blog.
          </p>
        </div>
        <div>
          <p className="fk-meta text-foreground">Explore</p>
          <ul className="mt-4 space-y-2">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="fk-link-muted">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="fk-meta text-foreground">Tools</p>
          <ul className="mt-4 space-y-2">
            {tools.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="fk-link-muted">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="fk-meta text-foreground">Trust</p>
          <ul className="mt-4 space-y-2">
            {trust.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="fk-link-muted">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="fk-meta text-foreground">Legal</p>
          <ul className="mt-4 space-y-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="fk-link-muted">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="fk-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FitKnowledge. Educational use only.</p>
          <p>
            Not medical advice —{" "}
            <Link href="/medical-disclaimer" className="fk-link text-xs">
              Medical disclaimer
            </Link>
            {" · "}
            <Link href="/terms" className="fk-link text-xs">
              Terms
            </Link>
            {" · "}
            <Link href="/privacy" className="fk-link text-xs">
              Privacy
            </Link>
            {" · "}
            <CookieSettingsButton />
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
