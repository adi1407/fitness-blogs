import type { ReactNode } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";

import { colors, fonts, radius, space } from "@/theme";
import { Chip } from "./Chip";
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
  return (
    <View style={styles.field}>
      <Text variant="label">{label}</Text>
      <View style={[styles.inputWrap, !!error && styles.inputError]}>
        <TextInput
          value={value}
          onChangeText={(t) => onChangeText(t.replace(/[^0-9.]/g, ""))}
          keyboardType="decimal-pad"
          inputMode="decimal"
          placeholder={placeholder}
          placeholderTextColor={colors.subtle}
          style={styles.input}
          maxLength={6}
          accessibilityLabel={`${label} in ${unit}`}
        />
        <Text variant="small">{unit}</Text>
      </View>
      {error ? (
        <Text variant="small" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

type Option<T extends string> = { id: T; label: string };

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
  return (
    <View style={styles.field}>
      <Text variant="label">{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {options.map((o) => (
          <Chip key={o.id} label={o.label} active={o.id === value} onPress={() => onChange(o.id)} />
        ))}
      </ScrollView>
      {hint ? <Text variant="small">{hint}</Text> : null}
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
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: space.md,
    minHeight: 48,
  },
  inputError: { borderColor: colors.danger },
  input: { flex: 1, fontFamily: fonts.semibold, fontSize: 18, color: colors.ink, paddingVertical: space.sm },
  error: { color: colors.danger },
  chips: { gap: space.sm },
});
