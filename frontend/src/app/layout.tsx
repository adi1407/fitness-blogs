import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Roboto_Slab } from "next/font/google";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { OpenPanelProvider } from "@/components/analytics/OpenPanelProvider";
import { MemberAuthProvider } from "@/features/auth/MemberAuthContext";
import { CookieConsentProvider } from "@/features/cookies/CookieConsentContext";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { BRAND_LOGO_SRC, BRAND_NAME } from "@/lib/brand";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND_NAME} — Fitness, Nutrition & Training Guides`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Evidence-informed fitness knowledge platform: nutrition guides, weight loss, muscle building, exercise library, Indian foods, and free calculators.",
  applicationName: BRAND_NAME,
  authors: [{ name: BRAND_NAME }],
  keywords: [
    "fitness",
    "nutrition",
    "protein",
    "weight loss",
    "muscle building",
    "TDEE calculator",
    "Indian diet",
    "workout exercises",
    "fitlives",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} — Fitness, Nutrition & Training Guides`,
    description:
      "Guides, calculators, foods, and exercises built to answer real search questions.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} — Fitness Knowledge Platform`,
    description:
      "Evidence-informed fitness, nutrition, and training — with tools that teach.",
  },
  icons: {
    icon: [
      { url: BRAND_LOGO_SRC, type: "image/png" },
      { url: BRAND_LOGO_SRC, type: "image/png", sizes: "32x32" },
      { url: BRAND_LOGO_SRC, type: "image/png", sizes: "192x192" },
    ],
    shortcut: [{ url: BRAND_LOGO_SRC, type: "image/png" }],
    apple: [{ url: BRAND_LOGO_SRC, type: "image/png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b2533" },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND_NAME,
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  url: siteUrl,
  logo: `${siteUrl}/brand/logofitness.png`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${robotoSlab.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={orgJsonLd} />
        <MemberAuthProvider>
          <CookieConsentProvider>
            <SiteHeader />
            <div className="flex min-h-full flex-1 flex-col pt-[var(--site-header-height)]">
              <Suspense fallback={null}>
                <OpenPanelProvider>{children}</OpenPanelProvider>
              </Suspense>
            </div>
            <SiteFooter />
            <CookieBanner />
          </CookieConsentProvider>
        </MemberAuthProvider>
      </body>
    </html>
  );
}
