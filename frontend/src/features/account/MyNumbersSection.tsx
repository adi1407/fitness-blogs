"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";
import {
  deleteCalcResult,
  fetchCalcProfile,
  fetchCalcResults,
} from "@/features/tools/lib/calcMemberApi";
import { ACTIVITY_LEVELS } from "@/features/tools/lib/calcMath";
import {
  CALC_TOOLS,
  type CalcProfile,
  type SavedCalcResult,
} from "@/features/tools/types";

const GOAL_LABEL = { loss: "Lose fat", maintain: "Maintain", gain: "Build muscle" };

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function formatValue(value: string | number) {
  return typeof value === "number" ? value.toLocaleString("en-IN") : value;
}

function profileFacts(p: CalcProfile): string[] {
  const facts: string[] = [];
  if (p.sex) facts.push(p.sex === "male" ? "Male" : "Female");
  if (p.age != null) facts.push(`${p.age} yrs`);
  if (p.kg != null) {
    facts.push(
      p.weightUnit === "lb" ? `${Math.round(p.kg / 0.453592)} lb` : `${p.kg} kg`,
    );
  }
  if (p.cm != null) {
    if (p.heightUnit === "ft") {
      const totalIn = p.cm / 2.54;
      facts.push(`${Math.floor(totalIn / 12)} ft ${Math.round(totalIn % 12)} in`);
    } else {
      facts.push(`${p.cm} cm`);
    }
  }
  if (p.activity) {
    facts.push(ACTIVITY_LEVELS.find((a) => a.id === p.activity)?.label ?? p.activity);
  }
  if (p.goal) facts.push(GOAL_LABEL[p.goal]);
  if (p.bodyFatPct != null) facts.push(`${p.bodyFatPct}% body fat`);
  return facts;
}

/** Account "My numbers": saved calculator profile and recent results. */
export function MyNumbersSection() {
  const [profile, setProfile] = useState<CalcProfile | null>(null);
  const [results, setResults] = useState<SavedCalcResult[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchCalcProfile(), fetchCalcResults()])
      .then(([p, r]) => {
        if (cancelled) return;
        setProfile(p);
        setResults(r);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function remove(id: string) {
    setBusyId(id);
    try {
      await deleteCalcResult(id);
      setResults((prev) => prev.filter((r) => r.id !== id));
    } catch {
      /* keep the row; the button re-enables */
    } finally {
      setBusyId(null);
    }
  }

  const facts = profile ? profileFacts(profile) : [];

  return (
    <section>
      <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
        <Calculator className="size-4" />
        My numbers
      </h2>

      {status === "loading" ? (
        <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
      ) : status === "error" ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Couldn&apos;t load your saved numbers. Please refresh the page.
        </p>
      ) : (
        <div className="mt-3 space-y-4">
          <div className="rounded-2xl border border-border bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Saved details
            </p>
            {facts.length > 0 ? (
              <>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {facts.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">
                  These pre-fill every calculator. To update them, save a new
                  result with &ldquo;Also save my details&rdquo; ticked.
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                No details saved yet. Save a result from any calculator and
                your details will pre-fill the others.
              </p>
            )}
          </div>

          {results.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-6 text-sm text-muted-foreground">
              No saved results yet.{" "}
              <Link href="/tools/calorie-calculator" className="fk-link">
                Try the calorie calculator
              </Link>
            </p>
          ) : (
            <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
              {results.map((r) => (
                <li key={r.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">
                      <Link href={`/tools/${r.tool}`} className="fk-link-muted font-medium">
                        {CALC_TOOLS[r.tool] ?? r.tool}
                      </Link>{" "}
                      · {formatDate(r.createdAt)}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.result.label}</p>
                    <p className="text-xl font-semibold text-foreground">
                      {formatValue(r.result.value)}
                      {r.result.unit ? (
                        <span className="ml-1 text-sm font-medium text-muted-foreground">
                          {r.result.unit}
                        </span>
                      ) : null}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={busyId === r.id}
                    onClick={() => remove(r.id)}
                    className="shrink-0 self-start rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-foreground hover:text-foreground disabled:opacity-50 sm:self-center"
                  >
                    {busyId === r.id ? "…" : "Delete"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
