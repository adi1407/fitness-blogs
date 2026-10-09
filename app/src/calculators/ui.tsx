import Ionicons from "@expo/vector-icons/Ionicons";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { CountUp } from "@/components/CountUp";
import { NumberField, SegmentField, parseRange } from "@/components/Field";
import { Text } from "@/components/Text";
import { usePersistentState } from "@/hooks/usePersistentState";
import { ACTIVITY_LEVELS, type ActivityId, type CalorieGoal, type Sex } from "@/lib/calc";
import { haptic } from "@/lib/haptics";
import { colors, fonts, radius, space } from "@/theme";

export const SEX_OPTIONS = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
] as const;

export type BodyProfileForm = { sex: Sex; age: string; cm: string; kg: string; activity: ActivityId };

/** Body stats shared by every calculator (and synced to the account later). */
export function useBodyProfile() {
  const [form, setForm] = usePersistentState<BodyProfileForm>("calc:profile", {
    sex: "male",
    age: "28",
    cm: "170",
    kg: "70",
    activity: "moderate",
  });
  const age = parseRange(form.age, 18, 80, "age");
  const cm = parseRange(form.cm, 120, 230, "height");
  const kg = parseRange(form.kg, 30, 250, "weight");
  const values =
    age.value != null && cm.value != null && kg.value != null
      ? { sex: form.sex, age: age.value, cm: cm.value, kg: kg.value, activity: form.activity }
      : null;
  return { form, setForm, errors: { age: age.error, cm: cm.error, kg: kg.error }, values };
}

type ProfileFieldsProps = ReturnType<typeof useBodyProfile> & {
  fields?: ("sex" | "age" | "cm" | "kg" | "activity")[];
};

export function BodyProfileFields({ form, setForm, errors, fields = ["sex", "age", "cm", "kg", "activity"] }: ProfileFieldsProps) {
  const set = <K extends keyof BodyProfileForm>(k: K, v: BodyProfileForm[K]) => setForm((f) => ({ ...f, [k]: v }));
  const has = (f: (typeof fields)[number]) => fields.includes(f);
  return (
    <>
      {has("sex") ? <SegmentField label="Sex" options={SEX_OPTIONS} value={form.sex} onChange={(v) => set("sex", v)} /> : null}
      <View style={styles.row}>
        {has("age") ? (
          <View style={styles.flex}>
            <NumberField label="Age" unit="yrs" value={form.age} onChangeText={(v) => set("age", v)} error={errors.age} />
          </View>
        ) : null}
        {has("cm") ? (
          <View style={styles.flex}>
            <NumberField label="Height" unit="cm" value={form.cm} onChangeText={(v) => set("cm", v)} error={errors.cm} />
          </View>
        ) : null}
        {has("kg") ? (
          <View style={styles.flex}>
            <NumberField label="Weight" unit="kg" value={form.kg} onChangeText={(v) => set("kg", v)} error={errors.kg} />
          </View>
        ) : null}
      </View>
      {has("activity") ? (
        <SegmentField
          label="Activity"
          options={ACTIVITY_LEVELS}
          value={form.activity}
          onChange={(v) => set("activity", v)}
          hint={ACTIVITY_LEVELS.find((a) => a.id === form.activity)?.helper}
        />
      ) : null}
    </>
  );
}

type ResultHeroProps = {
  label: string;
  value: number;
  decimals?: number;
  unit?: string;
  caption?: string;
  /** Calorie goal behind the result, used to pick the next step. */
  goal?: CalorieGoal;
  aside?: ReactNode;
  children?: ReactNode;
};

export type ReportedResult = { label: string; value: number; unit?: string; goal?: CalorieGoal };

/** Lets a calculator screen know the current headline result (e.g. to save it to the account). */
export const CalcResultContext = createContext<((r: ReportedResult | null) => void) | null>(null);

/** Reports the headline result to the calculator screen while mounted; pass `null` when there is none. */
export function useReportResult(result: ReportedResult | null) {
  const report = useContext(CalcResultContext);
  const { label, value, unit, goal } = result ?? {};
  useEffect(() => {
    if (!report || label == null || value == null) return;
    report({ label, value, unit, goal });
    return () => report(null);
  }, [report, label, value, unit, goal]);
}

/** Website result panel with an animated headline number. Fires a light haptic when the result settles. */
export function ResultHero({ label, value, decimals = 0, unit, caption, goal, aside, children }: ResultHeroProps) {
  useReportResult({ label, value, unit, goal });

  const compact = useWindowDimensions().width < 360;
  const last = useRef<number | null>(null);
  useEffect(() => {
    const t = setTimeout(() => {
      if (last.current !== null && last.current !== value) haptic.light();
      last.current = value;
    }, 450);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <Animated.View entering={FadeInDown.duration(320)} style={styles.results}>
      <SectionLabel>Results</SectionLabel>
      <View style={[styles.hero, compact && styles.heroCompact]} accessibilityLiveRegion="polite">
        <View style={styles.heroTop} accessible accessibilityLabel={[label, `${value}${unit ? ` ${unit}` : ""}`, caption].filter(Boolean).join(", ")}>
          <View style={styles.heroMain}>
            <Text style={styles.heroLabel}>{label}</Text>
            <View style={styles.heroValueRow}>
              <CountUp
                value={value}
                decimals={decimals}
                variant="display"
                style={[styles.heroValue, compact && styles.heroValueCompact]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
              />
              {unit ? (
                <Text variant="body" style={styles.heroUnit}>
                  {unit}
                </Text>
              ) : null}
            </View>
            {caption ? (
              <Text variant="small" style={styles.heroCaption}>
                {caption}
              </Text>
            ) : null}
          </View>
          {aside}
        </View>
      </View>
      {children}
    </Animated.View>
  );
}

/** Website "Your inputs" / "Results" overline. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Text variant="label" style={styles.sectionLabel}>
      {children}
    </Text>
  );
}

/** White result chip (website ResultChip) shown under the result panel. */
export function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.heroStat} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.heroStatLabel} numberOfLines={1}>
        {label}
      </Text>
      <Text variant="heading" style={styles.heroStatValue} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.75}>
        {value}
      </Text>
    </View>
  );
}

export function HeroStats({ children }: { children: ReactNode }) {
  return <View style={styles.heroStats}>{children}</View>;
}

export function Notice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" }) {
  const warn = tone === "warn";
  return (
    <View style={[styles.notice, warn && styles.noticeWarn]}>
      <Ionicons
        name={warn ? "warning-outline" : "information-circle-outline"}
        size={17}
        color={warn ? colors.accent : colors.muted}
        style={styles.noticeIcon}
      />
      <Text variant="small" style={styles.noticeText}>
        {children}
      </Text>
    </View>
  );
}

/** "Your inputs" block, separated from the results by a hairline like the website workspace. */
export function FormCard({ children }: { children: ReactNode }) {
  return (
    <View style={styles.form}>
      <SectionLabel>Your inputs</SectionLabel>
      {children}
    </View>
  );
}

export const calcStyles = StyleSheet.create({
  wrap: { gap: space.lg },
  row: { flexDirection: "row", gap: space.md },
  flex: { flex: 1 },
});

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: space.md },
  flex: { flex: 1 },
  form: {
    gap: space.lg,
    paddingBottom: space.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionLabel: { color: colors.muted },
  results: { gap: space.md },
  hero: { borderRadius: radius.lg, padding: space.xl, backgroundColor: colors.surface },
  heroTop: { flexDirection: "row", alignItems: "center", gap: space.lg },
  heroMain: { flex: 1, gap: 2 },
  heroLabel: { fontFamily: fonts.regular, fontSize: 14, color: colors.muted },
  heroValueRow: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  heroValue: { fontFamily: fonts.semibold, color: colors.ink, fontSize: 46, lineHeight: 54, letterSpacing: -1.4 },
  heroValueCompact: { fontSize: 36, lineHeight: 44 },
  heroCompact: { padding: space.lg },
  heroUnit: { fontFamily: fonts.medium, fontSize: 16, color: colors.muted },
  heroCaption: { color: colors.muted, marginTop: 2 },
  heroStats: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  heroStat: {
    flexGrow: 1,
    flexBasis: "30%",
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: space.md,
    paddingVertical: space.md - 2,
    gap: 2,
  },
  heroStatLabel: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.muted },
  heroStatValue: { fontSize: 17, lineHeight: 23 },
  notice: {
    flexDirection: "row",
    gap: space.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(245,245,245,0.6)",
    padding: space.md,
    alignItems: "flex-start",
  },
  noticeWarn: { backgroundColor: "#FFF8EE", borderColor: colors.accentBorder },
  noticeIcon: { marginTop: 1 },
  noticeText: { flex: 1, color: "#3D3D3D", lineHeight: 19 },
});
