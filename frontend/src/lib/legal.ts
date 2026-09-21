/** Shared legal/trust metadata. Update together when policies change. */
export const LEGAL_LAST_UPDATED = "21 September 2026";
export const LEGAL_OPERATOR = "FitKnowledge";
export const LEGAL_OPERATOR_NOTE =
  "FitKnowledge is an educational fitness knowledge platform operated from India as a sole-proprietor brand (no registered company name yet).";
export const LEGAL_CONTACT_EMAIL = "aditiya236choudhary@gmail.com";
export const LEGAL_CONTACT_MAILTO = `mailto:${LEGAL_CONTACT_EMAIL}`;

export const LEGAL_RELATED = {
  terms: { href: "/terms", label: "Terms of Use" },
  privacy: { href: "/privacy", label: "Privacy Policy" },
  cookies: { href: "/cookie-policy", label: "Cookie Policy" },
  medical: { href: "/medical-disclaimer", label: "Medical Disclaimer" },
  nutrition: { href: "/nutrition-disclaimer", label: "Nutrition Disclaimer" },
  affiliate: { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  corrections: { href: "/corrections", label: "Corrections" },
  editorial: { href: "/editorial-policy", label: "Editorial Policy" },
  contact: { href: "/contact", label: "Contact" },
} as const;
