import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";

import { ApiError } from "@/api/client";
import { subscribe } from "@/api/newsletter";
import { SITE_URL } from "@/config";
import { usePersistentState } from "@/hooks/usePersistentState";
import { haptic } from "@/lib/haptics";
import { openLink } from "@/lib/links";
import { colors, fonts, radius, space } from "@/theme";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  /** Where the signup happened, e.g. `app_calc_tdee`. Lowercase, `_`/`-` only. */
  source: string;
  title?: string;
  description?: string;
};

function errorMessage(err: unknown) {
  if (err instanceof ApiError && err.status === 429) return "Too many attempts. Please try again in a few minutes.";
  return err instanceof Error ? err.message : "Could not subscribe right now. Please try again.";
}

/** Website newsletter callout; remembers on this device once you've subscribed. */
export function SubscribeCard({
  source,
  title = "Get new guides by email",
  description = "New calculators, Indian meal ideas and evidence-based guides — a short email when something useful goes live. No spam.",
}: Props) {
  const [stored, setStored] = usePersistentState("newsletter", { subscribed: false });
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const mutation = useMutation({
    mutationFn: (value: string) => subscribe(value, source),
    onSuccess: () => {
      haptic.success();
      setStored({ subscribed: true });
    },
  });

  const submit = () => {
    if (mutation.isPending) return;
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    mutation.mutate(value);
  };

  if (stored.subscribed) {
    return (
      <View style={styles.done} accessibilityRole="text" accessibilityLiveRegion="polite">
        <Ionicons name="checkmark" size={18} color={colors.accent} style={styles.doneIcon} />
        <Text variant="small" style={styles.doneText}>
          {mutation.isSuccess
            ? "You're on the list. We'll email you when new guides and calculators go live."
            : "You're subscribed to fitlives updates. Thanks for reading."}
        </Text>
      </View>
    );
  }

  const error = invalid ? "Please enter a valid email address." : mutation.isError ? errorMessage(mutation.error) : null;

  return (
    <View style={styles.card} accessibilityLabel={title}>
      <Text variant="label" style={styles.kicker}>
        Newsletter
      </Text>
      <Text variant="heading" style={styles.title}>
        {title}
      </Text>
      <Text variant="small" style={styles.description}>
        {description}
      </Text>
      <TextInput
        value={email}
        onChangeText={(v) => {
          setEmail(v);
          if (invalid) setInvalid(false);
          if (mutation.isError) mutation.reset();
        }}
        placeholder="you@example.com"
        placeholderTextColor={colors.subtle}
        keyboardType="email-address"
        autoComplete="email"
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={254}
        returnKeyType="send"
        onSubmitEditing={submit}
        accessibilityLabel="Email address"
        style={[styles.input, error ? styles.inputError : null]}
      />
      <PressableScale onPress={submit} disabled={mutation.isPending} accessibilityLabel="Subscribe" style={styles.button}>
        {mutation.isPending ? <ActivityIndicator color={colors.bg} /> : null}
        <Text style={styles.buttonText}>Subscribe</Text>
      </PressableScale>
      {error ? (
        <Text variant="small" style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
      <Text variant="small" style={styles.fine}>
        Unsubscribe anytime. See our{" "}
        <Text
          variant="small"
          style={styles.link}
          onPress={() => openLink(`${SITE_URL}/privacy#collect`)}
          accessibilityRole="link"
          suppressHighlighting
        >
          privacy policy
        </Text>
        .
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: space.sm,
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    backgroundColor: colors.accentSoft,
  },
  kicker: { color: colors.muted },
  title: { fontSize: 18, lineHeight: 24 },
  description: { lineHeight: 19, marginBottom: space.xs },
  input: {
    minHeight: 46,
    paddingHorizontal: space.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.ink,
  },
  inputError: { borderColor: colors.danger },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.sm,
    minHeight: 46,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
  },
  buttonText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.bg },
  error: { color: colors.danger },
  fine: { fontSize: 11.5, lineHeight: 16 },
  link: { fontSize: 11.5, color: colors.ink, textDecorationLine: "underline" },
  done: {
    flexDirection: "row",
    gap: space.sm,
    padding: space.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.accentSoft,
  },
  doneIcon: { marginTop: 1 },
  doneText: { flex: 1, color: colors.ink, lineHeight: 19 },
});
