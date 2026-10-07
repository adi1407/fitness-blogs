import Link from "next/link";
import { CookieSettingsButton } from "@/components/shared/CookieBanner";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { SocialFollow } from "@/components/shared/SocialFollow";
import { BRAND_NAME, BRAND_SLOGAN, BRAND_TAGLINE } from "@/lib/brand";

const explore = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Latest" },
  { href: "/muscle-building", label: "Muscle Building" },
  { href: "/weight-loss", label: "Weight Loss" },
  { href: "/nutrition", label: "Nutrition" },
  { href: "/exercises", label: "Exercises" },
  { href: "/foods/indian", label: "Indian Foods" },
];

const tools = [
  { href: "/tools", label: "All Calculators" },
  { href: "/calorie-calculator", label: "Calorie Calculator" },
  { href: "/calorie-deficit-calculator", label: "Calorie Deficit Calculator" },
  { href: "/tdee-calculator", label: "TDEE Calculator" },
  { href: "/bmr-calculator", label: "BMR Calculator" },
  { href: "/protein-calculator", label: "Protein Calculator" },
  { href: "/macro-calculator", label: "Macro Calculator" },
  { href: "/bmi-calculator", label: "BMI Calculator" },
  { href: "/body-fat-calculator", label: "Body Fat Calculator" },
  { href: "/one-rep-max-calculator", label: "One Rep Max Calculator" },
  { href: "/water-intake-calculator", label: "Water Intake Calculator" },
  { href: "/steps-to-calories-calculator", label: "Steps to Calories Calculator" },
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
          <BrandLogo size="md" variant="full" />
          <p className="mt-3 text-base font-semibold tracking-tight text-balance text-foreground">
            {BRAND_SLOGAN}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {BRAND_TAGLINE}
          </p>
          <p className="fk-meta mt-6 text-foreground">Follow us</p>
          <SocialFollow variant="icons" placement="footer" className="mt-3" />
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
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. Educational use only.
          </p>
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
