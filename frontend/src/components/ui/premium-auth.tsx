"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, Loader2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { getApiBase } from "@/lib/api/client";

type AuthMode = "login" | "signup";

export type AuthFormProps = {
  onSuccess?: (userData: { email: string; name?: string }) => void;
  onClose?: () => void;
  initialMode?: AuthMode;
  className?: string;
  /** Path to return to after Google OAuth (must start with /). */
  nextPath?: string;
};

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.2-1.9 2.9l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.4-.2-2H12z"
      />
      <path
        fill="#34A853"
        d="M6.6 14.3l-.8.6-2.7 2.1C4.8 20.1 8.1 22 12 22c2.7 0 5-.9 6.7-2.4l-3.1-2.4c-.9.6-2 .9-3.6.9-2.8 0-5.1-1.9-5.9-4.4z"
      />
      <path
        fill="#4A90E2"
        d="M3.1 7c-.6 1.2-1 2.6-1 4s.4 2.8 1 4c0 .1 3.5-2.7 3.5-2.7-.2-.6-.3-1.2-.3-1.3s.1-.8.3-1.3L3.1 7z"
      />
      <path
        fill="#FBBC05"
        d="M12 4.9c1.5 0 2.8.5 3.9 1.5l2.9-2.9C16.9 1.8 14.7 1 12 1 8.1 1 4.8 2.9 3.1 7l3.5 2.7C7 7.1 9.2 4.9 12 4.9z"
      />
    </svg>
  );
}

/**
 * Google-only public auth card (FitKnowledge members).
 * Email/password flows are deferred — use Continue with Google.
 */
export function AuthForm({
  initialMode = "login",
  className,
  nextPath,
}: AuthFormProps) {
  const search = useSearchParams();
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    const err = search.get("error");
    if (!err) return;
    const messages: Record<string, string> = {
      google_not_configured: "Google sign-in is not configured yet.",
      missing_code: "Google did not return an authorization code.",
      token_exchange_failed: "Could not complete Google sign-in.",
      profile_failed: "Could not load your Google profile.",
      incomplete_profile: "Google account is missing email.",
      email_not_verified: "Verify your Google email, then try again.",
      account_disabled: "This account is disabled.",
      unexpected_error: "Something went wrong. Please try again.",
    };
    setError(messages[err] ?? "Sign-in failed. Please try again.");
  }, [search]);

  async function startGoogle() {
    setIsLoading(true);
    setError("");
    try {
      const next =
        nextPath && nextPath.startsWith("/")
          ? nextPath
          : search.get("next")?.startsWith("/")
            ? (search.get("next") as string)
            : "/";
      const res = await fetch(
        `${getApiBase()}/public/auth/google?next=${encodeURIComponent(next)}`,
        { cache: "no-store" },
      );
      const data = (await res.json()) as { url?: string; message?: string };
      if (!res.ok || !data.url) {
        throw new Error(
          data.message ||
            "Google sign-in is not available. Add Google credentials on the API.",
        );
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start Google sign-in");
      setIsLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      {error ? (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 animate-in fade-in-0 slide-in-from-top-2">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <span className="text-sm text-destructive">{error}</span>
        </div>
      ) : null}

      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 inline-flex size-12 items-center justify-center rounded-full bg-muted">
          <Shield className="size-6 text-foreground" />
        </div>
        <h2 id="auth-title" className="text-2xl font-bold tracking-tight">
          {authMode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {authMode === "login"
            ? "Sign in with Google to save guides and pick up where you left off."
            : "One tap with Google — no password to remember."}
        </p>
      </div>

      <div className="mb-6 flex rounded-xl bg-muted p-1">
        <button
          type="button"
          onClick={() => setAuthMode("login")}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-medium transition",
            authMode === "login"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setAuthMode("signup")}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-medium transition",
            authMode === "signup"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Sign up
        </button>
      </div>

      <button
        type="button"
        disabled={isLoading}
        onClick={() => void startGoogle()}
        className={cn(
          "flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5 text-sm font-semibold text-foreground transition",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--fk-accent,#FF9800)]",
          "disabled:opacity-60",
        )}
      >
        {isLoading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <GoogleGlyph className="size-5" />
        )}
        {isLoading
          ? "Redirecting to Google…"
          : authMode === "login"
            ? "Continue with Google"
            : "Sign up with Google"}
      </button>

      <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
        By continuing you agree to our{" "}
        <Link href="/terms" className="font-medium text-foreground underline-offset-2 hover:underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="font-medium text-foreground underline-offset-2 hover:underline"
        >
          Privacy Policy
        </Link>
        . Educational content only — not medical advice.
      </p>
    </div>
  );
}
