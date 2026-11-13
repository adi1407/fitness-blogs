import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/ui/premium-auth";
import { OG_DEFAULTS } from "@/lib/seo";

const TITLE = "Sign in — fitlives";
const DESCRIPTION = "Sign in or create an account with Google.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: { canonical: "/login" },
  openGraph: {
    ...OG_DEFAULTS,
    title: TITLE,
    description: DESCRIPTION,
    url: "/login",
  },
};

export default function LoginPage() {
  return (
    <main className="fk-page flex flex-1 items-center justify-center py-16">
      <div className="w-full max-w-md">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-muted-foreground">
              Loading…
            </div>
          }
        >
          <AuthForm />
        </Suspense>
      </div>
    </main>
  );
}
