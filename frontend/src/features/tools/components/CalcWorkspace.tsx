"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type CalcWorkspaceProps = {
  title: string;
  purpose: string;
  signedInAs?: string | null;
  locked: boolean;
  lockTitle?: string;
  lockDescription?: string;
  onUnlockClick?: () => void;
  inputs: ReactNode;
  results: ReactNode;
  footer?: ReactNode;
  calculateSlot?: ReactNode;
  className?: string;
};

/** Two-column calculator chrome: inputs | results, with guest lock overlay. */
export function CalcWorkspace({
  title,
  purpose,
  signedInAs,
  locked,
  lockTitle = "Sign in to calculate",
  lockDescription = "Create a free fitlives account with Google to enter your numbers and see educational estimates.",
  onUnlockClick,
  inputs,
  results,
  footer,
  calculateSlot,
  className,
}: CalcWorkspaceProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
        className,
      )}
    >
      <div className="border-b border-border bg-brand-50/60 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{purpose}</p>
          </div>
          {signedInAs ? (
            <p className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted-foreground">
              Signed in as {signedInAs} · Prefs saved
            </p>
          ) : (
            <p className="rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-medium text-muted-foreground">
              Sign in required to unlock
            </p>
          )}
        </div>
      </div>

      <div className="relative grid gap-0 lg:grid-cols-2">
        <div
          className={cn(
            "space-y-5 border-b border-border p-5 sm:p-6 lg:border-r lg:border-b-0",
            locked && "pointer-events-none select-none blur-[2px] opacity-60",
          )}
          aria-hidden={locked}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Your inputs
          </p>
          {inputs}
          {calculateSlot ? <div className="pt-1">{calculateSlot}</div> : null}
        </div>

        <div
          className={cn(
            "relative min-h-[220px] bg-white p-5 sm:p-6",
            locked && "pointer-events-none select-none blur-[2px] opacity-50",
          )}
          aria-hidden={locked}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Results
          </p>
          <div className="mt-4">{results}</div>
        </div>

        {locked ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/55 p-4 backdrop-blur-[1px]">
            <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-6 text-center shadow-lg">
              <h3 className="text-lg font-semibold tracking-tight">
                {lockTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {lockDescription}
              </p>
              <button
                type="button"
                onClick={onUnlockClick}
                className="fk-btn-accent mt-5 w-full rounded-xl px-4 py-3 text-sm"
              >
                Sign in or create an account
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                Google only · Educational estimates, not medical advice
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {footer ? (
        <div className="border-t border-border bg-brand-50/40 px-5 py-4 sm:px-6">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  disabled,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
  disabled?: boolean;
}) {
  return (
    <div
      className="inline-flex w-full flex-wrap gap-1 rounded-xl border border-border bg-muted/40 p-1"
      role="group"
    >
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.id)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition",
              active
                ? "bg-[#0A0A0A] text-white shadow-sm"
                : "text-muted-foreground hover:bg-white hover:text-foreground",
              disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function FieldLabel({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block text-sm", className)}>
      <span className="font-medium text-foreground">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export function CalcInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-border bg-white px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/30",
        className,
      )}
    />
  );
}

export function ResultHero({
  label,
  value,
  unit,
  show,
}: {
  label: string;
  value: ReactNode;
  unit?: string;
  show: boolean;
}) {
  const reduce = useReducedMotion();
  if (!show) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-brand-50/50 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Enter your details and calculate to see an educational estimate.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl bg-brand-50 p-5 sm:p-6"
    >
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {value}
        {unit ? (
          <span className="ml-2 text-lg font-medium text-muted-foreground">
            {unit}
          </span>
        ) : null}
      </p>
    </motion.div>
  );
}

export function ResultChip({
  label,
  value,
  href,
  onClick,
}: {
  label: string;
  value: string;
  href?: string;
  onClick?: () => void;
}) {
  const className =
    "flex flex-col rounded-xl border border-border bg-white px-4 py-3 text-left transition hover:border-primary hover:bg-brand-50";
  if (href) {
    return (
      <a href={href} className={className} onClick={onClick}>
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 text-lg font-semibold">{value}</span>
      </a>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="mt-1 text-lg font-semibold">{value}</span>
    </button>
  );
}

export function MacroBar({
  proteinPct,
  carbsPct,
  fatPct,
}: {
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
}) {
  return (
    <div className="mt-4">
      <div className="flex h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="bg-[#0A0A0A]"
          style={{ width: `${proteinPct}%` }}
          title={`Protein ${proteinPct}%`}
        />
        <div
          className="bg-[#FF9800]"
          style={{ width: `${carbsPct}%` }}
          title={`Carbs ${carbsPct}%`}
        />
        <div
          className="bg-[#E5E5E5]"
          style={{ width: `${fatPct}%` }}
          title={`Fat ${fatPct}%`}
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span>
          <span className="mr-1 inline-block size-2 rounded-full bg-[#0A0A0A]" />
          Protein {proteinPct}%
        </span>
        <span>
          <span className="mr-1 inline-block size-2 rounded-full bg-[#FF9800]" />
          Carbs {carbsPct}%
        </span>
        <span>
          <span className="mr-1 inline-block size-2 rounded-full bg-[#E5E5E5]" />
          Fat {fatPct}%
        </span>
      </div>
    </div>
  );
}
