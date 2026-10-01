export type SocialNetwork = "instagram" | "facebook";

export type SocialProfile = {
  id: SocialNetwork;
  label: string;
  handle: string;
  href: string;
  /** Verb for labelled buttons, e.g. "Follow on Instagram". */
  cta: string;
};

export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@fitlivesofficial",
    href: "https://www.instagram.com/fitlivesofficial/",
    cta: "Follow on Instagram",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "fitlivesofficial",
    href: "https://www.facebook.com/profile.php?id=61594862282269",
    cta: "Like on Facebook",
  },
];

/** Profile URLs for Organization `sameAs` structured data. */
export const SOCIAL_SAME_AS = SOCIAL_PROFILES.map((p) => p.href);
