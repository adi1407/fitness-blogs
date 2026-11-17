/** Shared legal/trust metadata. Update together when policies change. */
export const LEGAL_LAST_UPDATED = "17 November 2026";
export const LEGAL_OPERATOR = "fitlives";
/** Public operator name — must stay consistent with /authors and About. */
export const LEGAL_OPERATOR_PERSON = "Aditya Choudhary";
export const LEGAL_OPERATOR_NOTE =
  "fitlives is an educational fitness knowledge platform run by Aditya Choudhary from India as a sole-proprietor brand (no registered company name yet).";
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
