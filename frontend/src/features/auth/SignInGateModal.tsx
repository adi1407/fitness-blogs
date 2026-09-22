"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export function SignInGateModal({
  open,
  actionLabel,
  onClose,
}: {
  open: boolean;
  actionLabel: string;
  onClose: () => void;
}) {
  const pathname = usePathname();
  if (!open) return null;

  const next = pathname?.startsWith("/") ? pathname : "/";
  const loginHref = `/login?next=${encodeURIComponent(next)}`;

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="signin-gate-title"
        className="relative w-full max-w-sm rounded-2xl border border-border bg-white p-6 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
        <h2
          id="signin-gate-title"
          className="pr-8 text-lg font-semibold tracking-tight text-foreground"
        >
          Sign in to {actionLabel}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Use Google to save guides, upvote what helps, and share from your
          fitlives account.
        </p>
        <Link
          href={loginHref}
          className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#0A0A0A] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Continue with Google
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
