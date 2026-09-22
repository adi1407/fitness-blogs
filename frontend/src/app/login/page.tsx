import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/ui/premium-auth";

export const metadata: Metadata = {
  title: "Sign in — fitlives",
  description: "Sign in or create an account with Google.",
  robots: { index: false, follow: false },
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
