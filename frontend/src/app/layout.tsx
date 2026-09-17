import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fitness",
    template: "%s | Fitness",
  },
  description:
    "Performance-focused fitness experiences optimized for every screen and search engine.",
  applicationName: "Fitness",
  authors: [{ name: "Fitness" }],
  generator: "Next.js",
  keywords: ["fitness", "training", "wellness", "health"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Fitness",
    title: "Fitness",
    description:
      "Performance-focused fitness experiences optimized for every screen and search engine.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitness",
    description:
      "Performance-focused fitness experiences optimized for every screen and search engine.",
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
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
