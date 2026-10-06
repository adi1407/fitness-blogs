import type Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

/** Mirrors frontend/src/lib/legal.ts and social.ts — update together. */
export const CONTACT_EMAIL = "aditiya236choudhary@gmail.com";

export const TRUST_PAGES: { path: string; label: string; icon: IconName }[] = [
  { path: "/editorial-policy", label: "Editorial policy", icon: "document-text-outline" },
  { path: "/authors", label: "Authors & reviewers", icon: "people-outline" },
  { path: "/medical-disclaimer", label: "Medical disclaimer", icon: "medkit-outline" },
  { path: "/nutrition-disclaimer", label: "Nutrition disclaimer", icon: "nutrition-outline" },
  { path: "/corrections", label: "Corrections", icon: "create-outline" },
  { path: "/affiliate-disclosure", label: "Affiliate disclosure", icon: "pricetag-outline" },
];

export const LEGAL_PAGES: { path: string; label: string; icon: IconName }[] = [
  { path: "/privacy", label: "Privacy policy", icon: "lock-closed-outline" },
  { path: "/terms", label: "Terms of use", icon: "reader-outline" },
  { path: "/cookie-policy", label: "Cookie policy", icon: "ellipse-outline" },
  { path: "/contact", label: "Contact", icon: "mail-outline" },
];

export const SOCIAL: { label: string; handle: string; href: string; icon: IconName }[] = [
  { label: "Instagram", handle: "@fitlivesofficial", href: "https://www.instagram.com/fitlivesofficial/", icon: "logo-instagram" },
  { label: "Facebook", handle: "fitlives", href: "https://www.facebook.com/profile.php?id=61594862282269", icon: "logo-facebook" },
];
