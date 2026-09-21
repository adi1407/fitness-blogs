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
    default: "FitKnowledge — Fitness, Nutrition & Training Guides",
    template: "%s | FitKnowledge",
  },
  description:
    "Evidence-informed fitness knowledge platform: nutrition guides, weight loss, muscle building, exercise library, Indian foods, and free calculators.",
  applicationName: "FitKnowledge",
  authors: [{ name: "FitKnowledge" }],
  keywords: [
    "fitness",
    "nutrition",
    "protein",
    "weight loss",
    "muscle building",
    "TDEE calculator",
    "Indian diet",
    "workout exercises",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "FitKnowledge",
    title: "FitKnowledge — Fitness, Nutrition & Training Guides",
    description:
      "Guides, calculators, foods, and exercises built to answer real search questions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitKnowledge — Fitness Knowledge Platform",
    description:
      "Evidence-informed fitness, nutrition, and training — with tools that teach.",
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
  name: "FitKnowledge",
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
  name: "FitKnowledge",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
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
