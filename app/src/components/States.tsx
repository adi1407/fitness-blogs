import Ionicons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

import { colors, fonts, radius, space } from "@/theme";
import { Text } from "./Text";

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <View style={styles.center} accessibilityRole="progressbar" accessibilityLabel={label}>
      <ActivityIndicator color={colors.accent} size="large" />
      <Text variant="small">{label}</Text>
      <Text variant="small" style={styles.hint}>
        First load can take a few seconds while the server wakes up.
      </Text>
    </View>
  );
}

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const message = error instanceof Error ? error.message : "Something went wrong.";
  return (
    <View style={styles.center}>
      <Ionicons name="cloud-offline-outline" size={36} color={colors.subtle} />
      <Text variant="heading">Couldn&apos;t load this</Text>
      <Text variant="small" style={styles.hint}>
        {message}
      </Text>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          accessibilityRole="button"
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}
        >
          <Text variant="body" style={styles.buttonText}>
            Try again
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <View style={styles.center}>
      <Ionicons name="search-outline" size={32} color={colors.subtle} />
      <Text variant="heading">{title}</Text>
      {hint ? (
        <Text variant="small" style={styles.hint}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: space.xxl,
    gap: space.sm,
    minHeight: 240,
  },
  hint: { textAlign: "center", maxWidth: 300 },
  button: {
    marginTop: space.md,
    backgroundColor: colors.ink,
    borderRadius: radius.pill,
    paddingHorizontal: space.xl,
    paddingVertical: space.md,
  },
  buttonText: { color: colors.bg, fontFamily: fonts.semibold },
});
