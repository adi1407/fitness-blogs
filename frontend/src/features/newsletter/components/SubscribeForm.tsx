"use client";

import { useId, useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { Check, Loader2, Mail } from "lucide-react";
import { trackEvent } from "@/lib/analytics/openpanel";
import { cn } from "@/lib/utils";

const SUBSCRIBED_KEY = "fk_subscribed";

type Status = "idle" | "submitting" | "done" | "error";

type SubscribeFormProps = {
  /** Where the signup happened, e.g. `calc_tdee`, `article_end`, `start`. Lowercase, `_`/`-` only. */
  source: string;
  /** `card` = headline block, `inline` = one-row strip for tight spots. */
  variant?: "card" | "inline";
  title?: string;
  description?: string;
  className?: string;
};

function readSubscribed(): boolean {
  try {
    return localStorage.getItem(SUBSCRIBED_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribeStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function SubscribeForm({
  source,
  variant = "card",
  title = "Get new guides by email",
  description = "New calculators, Indian meal ideas and evidence-based guides — a short email when something useful goes live. No spam.",
  className,
}: SubscribeFormProps) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const alreadySubscribed = useSyncExternalStore(subscribeStorage, readSubscribed, () => false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source, website }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(
          res.status === 429
            ? "Too many attempts. Please try again in a few minutes."
            : data.message || "Could not subscribe right now. Please try again.",
        );
      }
      try {
        localStorage.setItem(SUBSCRIBED_KEY, "1");
      } catch {
        /* private mode */
      }
      trackEvent("newsletter_signup", { source });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not subscribe right now.");
    }
  }

  if (status === "done" || (alreadySubscribed && status === "idle")) {
    return (
      <div
        role="status"
        className={cn(
          "flex items-start gap-3 rounded-xl border border-border bg-brand-50 px-4 py-3 text-sm text-foreground",
          className,
        )}
      >
        <Check className="mt-0.5 size-4 shrink-0 text-[#FF9800]" aria-hidden="true" />
        <p className="leading-relaxed">
          {status === "done"
            ? "You're on the list. We'll email you when new guides and calculators go live."
            : "You're subscribed to fitlives updates. Thanks for reading."}
        </p>
      </div>
    );
  }

  const form = (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${inputId}-error` : undefined}
          className="h-11 min-w-0 flex-1 rounded-full border border-border bg-white px-4 text-sm outline-none transition focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#FF9800]/40"
        />
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-5 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none disabled:opacity-60"
        >
          {status === "submitting" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : null}
          Subscribe
        </button>
      </div>
      {status === "error" && error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      ) : null}
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
        Unsubscribe anytime. See our{" "}
        <Link href="/privacy#collect" className="underline underline-offset-2 hover:text-foreground">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "relative flex flex-col gap-3 rounded-xl border border-border bg-muted/60 p-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6",
          className,
        )}
      >
        <div className="min-w-0 lg:max-w-xs">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Mail className="size-4 text-[#FF9800]" aria-hidden="true" />
            {title}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="lg:max-w-md lg:flex-1">{form}</div>
      </div>
    );
  }

  return (
    <aside className={cn("fk-callout relative", className)} aria-label={title}>
      <p className="fk-meta-accent">Newsletter</p>
      <p className="mt-1 text-lg font-bold text-foreground">{title}</p>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4">{form}</div>
    </aside>
  );
}
