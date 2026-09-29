"use client";

import {
  CalcInput,
  FieldLabel,
  SegmentedControl,
} from "@/features/tools/components/CalcWorkspace";
import { parseNum, setNumField } from "@/features/tools/lib/calcFields";
import {
  ACTIVITY_LEVELS,
  type ActivityId,
} from "@/features/tools/lib/calcMath";
import type { BodyStats } from "@/features/tools/hooks/useBodyStats";
import { cn } from "@/lib/utils";

/** Activity level cards with plain-language descriptions. */
export function ActivityField({
  value,
  onChange,
}: {
  value: ActivityId;
  onChange: (id: ActivityId) => void;
}) {
  return (
    <FieldLabel label="Activity level">
      <div className="grid gap-2 sm:grid-cols-2">
        {ACTIVITY_LEVELS.map((a) => {
          const active = value === a.id;
          return (
            <button
              key={a.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(a.id)}
              className={cn(
                "rounded-xl border px-3 py-3 text-left transition focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:outline-none",
                active
                  ? "border-primary bg-[#0A0A0A] text-white"
                  : "border-border bg-white hover:border-primary/40",
              )}
            >
              <span className="block text-sm font-semibold">{a.label}</span>
              <span
                className={cn(
                  "mt-0.5 block text-xs",
                  active ? "text-white/70" : "text-muted-foreground",
                )}
              >
                {a.helper}
              </span>
            </button>
          );
        })}
      </div>
    </FieldLabel>
  );
}

type Props = {
  stats: BodyStats;
  showSex?: boolean;
  showAge?: boolean;
  showHeight?: boolean;
  weightLabel?: string;
};

function FieldHint({ show, children }: { show: boolean; children: string }) {
  if (!show) return null;
  return <p className="mt-1.5 text-xs text-red-700">{children}</p>;
}

/** Sex, age, weight (kg/lb) and height (cm or ft/in) inputs. */
export function BodyStatsFields({
  stats,
  showSex = true,
  showAge = true,
  showHeight = true,
  weightLabel = "Weight",
}: Props) {
  const ageRaw = parseNum(stats.age);
  const weightRaw = parseNum(stats.weight);

  return (
    <>
      {showSex ? (
        <FieldLabel label="Sex">
          <SegmentedControl
            value={stats.sex}
            onChange={stats.setSex}
            options={[
              { id: "male", label: "Male" },
              { id: "female", label: "Female" },
            ]}
          />
        </FieldLabel>
      ) : null}

      {showAge ? (
        <FieldLabel label="Age (years)">
          <CalcInput
            type="number"
            inputMode="numeric"
            min={15}
            max={100}
            value={stats.age}
            onChange={(e) => setNumField(e.target.value, stats.setAge)}
            aria-label="Age in years"
          />
          <FieldHint show={stats.age !== "" && stats.ageN == null && ageRaw != null}>
            Enter an age between 15 and 100.
          </FieldHint>
        </FieldLabel>
      ) : null}

      <FieldLabel label={weightLabel}>
        <div className="flex gap-2">
          <CalcInput
            type="number"
            min={1}
            value={stats.weight}
            onChange={(e) => setNumField(e.target.value, stats.setWeight)}
            aria-label={`${weightLabel} in ${stats.weightUnit}`}
          />
          <div className="w-32 shrink-0">
            <SegmentedControl
              value={stats.weightUnit}
              onChange={stats.setWeightUnit}
              options={[
                { id: "kg", label: "kg" },
                { id: "lb", label: "lb" },
              ]}
            />
          </div>
        </div>
        <FieldHint show={stats.weight !== "" && weightRaw != null && stats.kg == null}>
          Enter a weight above zero.
        </FieldHint>
      </FieldLabel>

      {showHeight ? (
        <FieldLabel label="Height">
          <div className="space-y-2">
            <SegmentedControl
              value={stats.heightUnit}
              onChange={stats.setHeightUnit}
              options={[
                { id: "cm", label: "cm" },
                { id: "ft", label: "ft / in" },
              ]}
            />
            {stats.heightUnit === "cm" ? (
              <CalcInput
                type="number"
                min={120}
                max={230}
                value={stats.heightCm}
                onChange={(e) => setNumField(e.target.value, stats.setHeightCm)}
                aria-label="Height in centimetres"
              />
            ) : (
              <div className="flex gap-2">
                <CalcInput
                  type="number"
                  inputMode="numeric"
                  min={4}
                  max={7}
                  value={stats.ft}
                  onChange={(e) => setNumField(e.target.value, stats.setFt)}
                  aria-label="Feet"
                  placeholder="ft"
                />
                <CalcInput
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={11}
                  value={stats.inches}
                  onChange={(e) => setNumField(e.target.value, stats.setInches)}
                  aria-label="Inches"
                  placeholder="in"
                />
              </div>
            )}
          </div>
        </FieldLabel>
      ) : null}
    </>
  );
}
