"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Loader2, X } from "lucide-react";
import { SignInGateModal } from "@/features/auth/SignInGateModal";
import { CalcShareButton } from "@/features/tools/components/CalcShareButton";
import { NextSteps } from "@/features/tools/components/NextSteps";
import {
  clearPendingSave,
  stashPendingSave,
} from "@/features/tools/lib/calcMemberApi";
import type { CalcMember } from "@/features/tools/hooks/useCalcMember";
import type { CalcSavePayload } from "@/features/tools/types";

type Status = "idle" | "saving" | "saved" | "error";

/**
 * Everything under a result: guided next steps, the optional "save to account"
 * row and sharing. Key it by the result run so each new calculation starts unsaved.
 */
export function CalcSaveBar({
  calc,
  payload,
}: {
  calc: CalcMember;
  payload: CalcSavePayload | null;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [updateProfile, setUpdateProfile] = useState(true);
  const [signInOpen, setSignInOpen] = useState(false);
  const signedIn = Boolean(calc.memberId);

  const notice = calc.notice ? (
    <div
      role="status"
      className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-brand-50 px-4 py-3 text-sm text-foreground"
    >
      <p className="flex-1 leading-relaxed">
        {calc.notice}{" "}
        <Link href="/account" className="fk-link font-semibold">
          Open account
        </Link>
      </p>
      <button
        type="button"
        onClick={calc.dismissNotice}
        className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-white hover:text-foreground"
        aria-label="Dismiss"
      >
        <X className="size-3.5" />
      </button>
    </div>
  ) : null;

  if (!payload) return notice;

  async function onSave() {
    if (!payload) return;
    if (!signedIn) {
      stashPendingSave(payload, updateProfile);
      setSignInOpen(true);
      return;
    }
    setStatus("saving");
    try {
      await calc.saveResult(payload, updateProfile);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {notice}
      <NextSteps payload={payload} />
      <div className="mt-5 rounded-xl border border-border bg-white p-4">
        {status === "saved" ? (
          <p className="flex flex-wrap items-center gap-2 text-sm text-foreground">
            <Check className="size-4 text-[#FF9800]" aria-hidden="true" />
            Saved to your account.
            <Link href="/account" className="fk-link font-semibold">
              View my numbers
            </Link>
          </p>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm">
              <p className="font-semibold text-foreground">
                {signedIn ? "Keep this result" : "Want to keep this result?"}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {signedIn
                  ? "Save it to track changes over time."
                  : "Free account: save results and pre-fill every calculator next time."}
              </p>
              {payload.profile ? (
                <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={updateProfile}
                    onChange={(e) => setUpdateProfile(e.target.checked)}
                    className="size-3.5 accent-[#0A0A0A]"
                  />
                  Also save my details for other calculators
                </label>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onSave}
              disabled={status === "saving"}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-5 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none disabled:opacity-60"
            >
              {status === "saving" ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : null}
              {signedIn ? "Save to my account" : "Sign in to save"}
            </button>
          </div>
        )}
        {status === "error" ? (
          <p role="alert" className="mt-2 text-xs text-red-700">
            Couldn&apos;t save right now. Please try again.
          </p>
        ) : null}
      </div>
      <CalcShareButton payload={payload} />

      <SignInGateModal
        open={signInOpen}
        actionLabel="save your result"
        description="Your result is already shown — signing in just lets you keep it. We'll save it automatically when you come back, and pre-fill your details in every calculator."
        onClose={() => {
          clearPendingSave();
          setSignInOpen(false);
        }}
      />
    </>
  );
}
