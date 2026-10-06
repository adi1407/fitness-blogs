import { useState, type ReactNode } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { haptic } from "@/lib/haptics";
import { colors, fonts, radius, shadow, space } from "@/theme";
import { Text } from "./Text";

type NumberFieldProps = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  unit: string;
  error?: string | null;
  placeholder?: string;
};

export function NumberField({ label, value, onChangeText, unit, error, placeholder }: NumberFieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrap, focused && styles.inputFocused, !!error && styles.inputError]}>
        <TextInput
          value={value}
          onChangeText={(t) => onChangeText(t.replace(/[^0-9.]/g, ""))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType="decimal-pad"
          inputMode="decimal"
          placeholder={placeholder}
          placeholderTextColor={colors.subtle}
          selectionColor={colors.accent}
          style={styles.input}
          maxLength={6}
          accessibilityLabel={`${label} in ${unit}`}
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
      {error ? (
        <Text variant="small" style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

type Option<T extends string> = { id: T; label: string };

/** Website segmented control: muted track, black active segment; wraps when options don't fit. */
export function SegmentField<T extends string>({
  label,
  options,
  value,
  onChange,
  hint,
}: {
  label: string;
  options: readonly Option<T>[];
  value: T;
  onChange: (v: T) => void;
  hint?: ReactNode;
}) {
  const wraps = options.length > 3;
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.track} accessibilityRole="radiogroup" accessibilityLabel={label}>
        {options.map((o) => {
          const active = o.id === value;
          return (
            <Pressable
              key={o.id}
              onPress={() => {
                if (active) return;
                haptic.tap();
                onChange(o.id);
              }}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              style={[styles.segment, wraps && styles.segmentWrap, active && styles.segmentActive]}
            >
              <Text style={[styles.segmentText, active && styles.segmentTextActive]} numberOfLines={1}>
                {o.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {hint ? (
        <Text variant="small" style={styles.hint}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

/** Parse a numeric field and check it's within a sane range. */
export function parseRange(raw: string, min: number, max: number, name: string) {
  if (!raw.trim()) return { value: null, error: null };
  const n = Number(raw);
  if (!Number.isFinite(n) || n < min || n > max) {
    return { value: null, error: `Enter a ${name} between ${min} and ${max}.` };
  }
  return { value: n, error: null };
}

const styles = StyleSheet.create({
  field: { gap: space.sm },
  label: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.ink },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.bg,
    paddingHorizontal: space.md,
    minHeight: 48,
  },
  inputFocused: { borderColor: colors.ink, boxShadow: "0 0 0 3px rgba(255,152,0,0.3)" },
  inputError: { borderColor: colors.danger },
  input: { flex: 1, minWidth: 0, fontFamily: fonts.semibold, fontSize: 17, color: colors.ink, paddingVertical: space.sm },
  unit: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.subtle },
  error: { color: colors.danger },
  hint: { lineHeight: 18 },
  track: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    padding: 4,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(245,245,245,0.6)",
  },
  segment: {
    flex: 1,
    minHeight: 38,
    paddingHorizontal: space.sm,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
  },
  segmentWrap: { flexBasis: "30%", flexGrow: 1 },
  segmentActive: { backgroundColor: colors.ink, ...shadow.sm },
  segmentText: { fontFamily: fonts.medium, fontSize: 13, color: colors.muted },
  segmentTextActive: { color: colors.bg },
});
