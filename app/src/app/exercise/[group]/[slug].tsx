import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { Share, StyleSheet, View } from "react-native";

import { MUSCLE_GROUP_LABEL, fetchExercise } from "@/api/library";
import { DifficultyMeter, ExerciseRow, capitalise } from "@/components/ExerciseRow";
import { GradientHero } from "@/components/GradientHero";
import { HtmlBody } from "@/components/HtmlBody";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { ErrorState, LoadingState } from "@/components/States";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { openLink } from "@/lib/links";
import { colors, fonts, radius, space } from "@/theme";

function TagRow({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <View style={styles.tagRow}>
      <Text variant="label" style={styles.tagLabel}>
        {label}
      </Text>
      <View style={styles.tags}>
        {items.map((t) => (
          <Text key={t} variant="small" style={styles.tag}>
            {capitalise(t)}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default function ExerciseScreen() {
  const { group, slug } = useLocalSearchParams<{ group: string; slug: string }>();
  const query = useQuery({
    queryKey: ["exercise", group, slug],
    queryFn: ({ signal }) => fetchExercise(String(group), String(slug), signal),
    enabled: !!group && !!slug,
  });

  const ex = query.data?.exercise;
  const webUrl = `${SITE_URL}${ex?.path ?? `/exercises/${group}/${slug}`}`;
  const header = (
    <Stack.Screen
      options={{
        title: ex?.title ?? "Exercise",
        headerRight: () =>
          ex ? (
            <Ionicons
              name="share-outline"
              size={22}
              color={colors.ink}
              accessibilityLabel="Share exercise"
              onPress={() => Share.share({ message: `${ex.title} — ${webUrl}` }).catch(() => {})}
            />
          ) : null,
      }}
    />
  );

  if (query.isPending) return <>{header}<LoadingState label="Loading exercise…" /></>;
  if (query.isError) return <>{header}<ErrorState error={query.error} onRetry={() => query.refetch()} /></>;

  const { exercise: e, related } = query.data;

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      {header}
      <GradientHero eyebrow={MUSCLE_GROUP_LABEL[e.muscleGroup] ?? e.muscleGroup} title={e.title} subtitle={e.excerpt ?? undefined}>
        <View style={styles.heroMeta}>
          <DifficultyMeter difficulty={e.difficulty} light />
          {e.equipment.length ? (
            <Text variant="small" style={styles.heroMetaText}>
              · {e.equipment.map(capitalise).join(", ")}
            </Text>
          ) : null}
        </View>
      </GradientHero>

      {e.quickAnswer ? (
        <View style={styles.quick}>
          <Text variant="label" style={styles.quickLabel}>
            Quick answer
          </Text>
          <Text variant="body" style={styles.quickText}>
            {e.quickAnswer}
          </Text>
        </View>
      ) : null}

      <View style={styles.tagsCard}>
        <TagRow label="Primary" items={e.primaryMuscles} />
        <TagRow label="Secondary" items={e.secondaryMuscles} />
      </View>

      {e.formCues.length ? (
        <View style={styles.section}>
          <SectionHeader eyebrow="Technique" title="Form cues" />
          {e.formCues.map((c, i) => (
            <View key={c} style={styles.step}>
              <View style={styles.stepNum}>
                <Text variant="label" style={styles.stepNumText}>
                  {i + 1}
                </Text>
              </View>
              <Text variant="body" style={styles.stepText}>
                {c}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {e.commonMistakes.length ? (
        <View style={styles.section}>
          <SectionHeader eyebrow="Avoid" title="Common mistakes" />
          {e.commonMistakes.map((m) => (
            <View key={m} style={styles.mistake}>
              <Ionicons name="close-circle" size={20} color={colors.danger} />
              <Text variant="body" style={styles.stepText}>
                {m}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {e.programmingNotes ? (
        <View style={styles.program}>
          <Ionicons name="calendar-outline" size={20} color={colors.accent} />
          <View style={styles.flex}>
            <Text variant="label">Programming</Text>
            <Text variant="body">{e.programmingNotes}</Text>
          </View>
        </View>
      ) : null}

      {e.bodyHtml ? (
        <View style={styles.bodyWrap}>
          <HtmlBody html={e.bodyHtml} />
        </View>
      ) : null}

      {related.length ? (
        <View style={styles.section}>
          <SectionHeader eyebrow="Keep going" title={`More ${MUSCLE_GROUP_LABEL[e.muscleGroup] ?? ""} exercises`} />
          {related.map((r) => (
            <ExerciseRow key={r.id} exercise={r} />
          ))}
        </View>
      ) : null}

      <Text variant="small" style={styles.link} onPress={() => openLink(webUrl)}>
        View on fitlives.in
      </Text>
      <Text variant="small" style={styles.disclaimer}>
        Educational only. If you have an injury or medical condition, check with a physiotherapist or doctor first.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, gap: 2 },
  heroMeta: { flexDirection: "row", alignItems: "center", gap: space.xs, marginTop: space.xs },
  heroMetaText: { color: "#D4D4D4" },
  quick: {
    backgroundColor: colors.accentSoft,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    borderRadius: radius.md,
    padding: space.lg,
    gap: space.xs,
  },
  quickLabel: { color: colors.ink },
  quickText: { fontFamily: fonts.medium, color: colors.ink },
  tagsCard: { gap: space.md },
  tagRow: { gap: space.xs },
  tagLabel: { color: colors.subtle },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: space.xs },
  tag: {
    color: colors.ink,
    backgroundColor: colors.surface,
    paddingHorizontal: space.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  section: { gap: space.md },
  step: { flexDirection: "row", gap: space.md, alignItems: "flex-start" },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  stepNumText: { color: colors.accent },
  stepText: { flex: 1 },
  mistake: { flexDirection: "row", gap: space.md, alignItems: "flex-start" },
  program: {
    flexDirection: "row",
    gap: space.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: space.lg,
  },
  bodyWrap: { marginHorizontal: -space.lg },
  link: { color: colors.ink, textDecorationLine: "underline", textAlign: "center" },
  disclaimer: { textAlign: "center", color: colors.subtle },
});
