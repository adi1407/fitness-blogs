import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { CountUp } from "@/components/CountUp";
import { NumberField, SegmentField, parseRange } from "@/components/Field";
import { Text } from "@/components/Text";
import { usePersistentState } from "@/hooks/usePersistentState";
import { ACTIVITY_LEVELS, type ActivityId, type Sex } from "@/lib/calc";
import { haptic } from "@/lib/haptics";
import { colors, gradients, radius, shadow, space } from "@/theme";

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
  aside?: ReactNode;
  children?: ReactNode;
};

export type ReportedResult = { label: string; value: number; unit?: string };

/** Lets a calculator screen know the current headline result (e.g. to save it to the account). */
export const CalcResultContext = createContext<((r: ReportedResult | null) => void) | null>(null);

/** Dark result card with an animated headline number. Fires a light haptic when the result settles. */
export function ResultHero({ label, value, decimals = 0, unit, caption, aside, children }: ResultHeroProps) {
  const report = useContext(CalcResultContext);
  useEffect(() => {
    if (!report) return;
    report({ label, value, unit });
    return () => report(null);
  }, [report, label, value, unit]);

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
    <Animated.View entering={FadeIn.duration(300)} style={styles.heroShadow}>
      <LinearGradient
        colors={gradients.inkGlow}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, compact && styles.heroCompact]}
      >
        <View style={styles.glow} pointerEvents="none" />
        <View style={styles.heroTop} accessible accessibilityLabel={[label, `${value}${unit ? ` ${unit}` : ""}`, caption].filter(Boolean).join(", ")}>
          <View style={styles.heroMain}>
            <Text variant="label" style={styles.heroLabel}>
              {label}
            </Text>
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
        {children}
      </LinearGradient>
    </Animated.View>
  );
}

/** Small stat cell for use inside ResultHero. */
export function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.heroStat} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text variant="label" style={styles.heroStatLabel}>
        {label}
      </Text>
      <Text variant="heading" style={styles.heroStatValue}>
        {value}
      </Text>
    </View>
  );
}

export function HeroStats({ children }: { children: ReactNode }) {
  return <View style={styles.heroStats}>{children}</View>;
}

export function Notice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" }) {
  return (
    <View style={[styles.notice, tone === "warn" && styles.noticeWarn]}>
      <Ionicons name={tone === "warn" ? "warning-outline" : "information-circle-outline"} size={18} color={colors.ink} />
      <Text variant="small" style={styles.noticeText}>
        {children}
      </Text>
    </View>
  );
}

export function FormCard({ children }: { children: ReactNode }) {
  return <View style={styles.form}>{children}</View>;
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
    backgroundColor: colors.bg,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: space.lg,
    ...shadow.sm,
  },
  heroShadow: { borderRadius: radius.xl, ...shadow.lg },
  hero: { borderRadius: radius.xl, padding: space.xl, gap: space.lg, overflow: "hidden" },
  glow: {
    position: "absolute",
    right: -70,
    bottom: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.accent,
    opacity: 0.16,
  },
  heroTop: { flexDirection: "row", alignItems: "center", gap: space.lg },
  heroMain: { flex: 1, gap: 2 },
  heroLabel: { color: colors.accent },
  heroValueRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  heroValue: { color: colors.bg, fontSize: 44, lineHeight: 52 },
  heroValueCompact: { fontSize: 36, lineHeight: 44 },
  heroCompact: { padding: space.lg },
  heroUnit: { color: colors.inkMuted },
  heroCaption: { color: colors.inkMuted },
  heroStats: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  heroStat: {
    flexGrow: 1,
    flexBasis: "30%",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: radius.md,
    padding: space.md,
    gap: 2,
  },
  heroStatLabel: { color: colors.inkMuted, fontSize: 10 },
  heroStatValue: { color: colors.bg },
  notice: {
    flexDirection: "row",
    gap: space.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: space.md,
    alignItems: "flex-start",
  },
  noticeWarn: { backgroundColor: colors.accentSoft },
  noticeText: { flex: 1, color: colors.ink },
});
