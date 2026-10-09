import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Pressable, Share, StyleSheet, View } from "react-native";

import { MUSCLE_GROUP_LABEL, fetchExercise } from "@/api/library";
import { capitalise } from "@/components/ExerciseRow";
import { HtmlBody } from "@/components/HtmlBody";
import { KnowledgeDisclaimer, PageIntro } from "@/components/PageIntro";
import { PillButton } from "@/components/PillButton";
import { Screen } from "@/components/Screen";
import { Skeleton } from "@/components/Skeleton";
import { ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { openLink } from "@/lib/links";
import { colors, fonts, radius, space } from "@/theme";

function SectionTitle({ children }: { children: string }) {
  return (
    <Text variant="title" style={styles.sectionTitle} accessibilityRole="header">
      {children}
    </Text>
  );
}

function MuscleRow({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <View style={styles.muscleRow}>
      <Text variant="label" style={styles.muscleLabel}>
        {label}
      </Text>
      <View style={styles.tags}>
        {items.map((t) => (
          <View key={t} style={styles.tag}>
            <Text style={styles.tagText}>{capitalise(t)}</Text>
          </View>
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
        title: "",
        headerRight: () =>
          ex ? (
            <Pressable
              onPress={() => Share.share({ message: `${ex.title} — ${webUrl}` }).catch(() => {})}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Share exercise"
            >
              <Ionicons name="share-outline" size={22} color={colors.ink} />
            </Pressable>
          ) : null,
      }}
    />
  );

  if (query.isError) {
    return (
      <>
        {header}
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      </>
    );
  }

  if (!query.data) {
    return (
      <Screen>
        {header}
        <Skeleton height={14} width="70%" />
        <Skeleton height={36} width="80%" />
        <Skeleton height={60} />
        <Skeleton height={120} rounded={radius.lg} />
      </Screen>
    );
  }

  const { exercise: e, related } = query.data;
  const groupLabel = MUSCLE_GROUP_LABEL[e.muscleGroup] ?? capitalise(e.muscleGroup);

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      {header}
      <PageIntro
        crumbs={[
          { label: "Exercises", href: "/exercises" },
          { label: groupLabel, href: `/exercises/${e.muscleGroup}` },
          { label: e.title },
        ]}
        kicker={[e.difficulty, e.muscleGroup].filter(Boolean).join(" · ")}
        title={e.title}
        lede={e.excerpt}
      />

      {e.quickAnswer ? (
        <View style={styles.quick}>
          <Text style={styles.quickLabel}>Quick answer</Text>
          <Text variant="body" style={styles.quickText}>
            {e.quickAnswer}
          </Text>
        </View>
      ) : null}

      {e.primaryMuscles.length || e.secondaryMuscles.length || e.equipment.length ? (
        <View style={styles.facts}>
          <MuscleRow label="Primary muscles" items={e.primaryMuscles} />
          <MuscleRow label="Secondary muscles" items={e.secondaryMuscles} />
          <MuscleRow label="Equipment" items={e.equipment} />
        </View>
      ) : null}

      {e.bodyHtml ? (
        <View style={styles.bodyWrap}>
          <HtmlBody html={e.bodyHtml} />
        </View>
      ) : null}

      {e.formCues.length ? (
        <View style={styles.section}>
          <SectionTitle>Form cues</SectionTitle>
          {e.formCues.map((c, i) => (
            <View key={c} style={styles.step}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
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
          <SectionTitle>Common mistakes</SectionTitle>
          {e.commonMistakes.map((m) => (
            <View key={m} style={styles.step}>
              <Ionicons name="close-circle-outline" size={20} color={colors.accent} style={styles.mistakeIcon} />
              <Text variant="body" style={styles.stepText}>
                {m}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {e.programmingNotes ? (
        <View style={styles.section}>
          <SectionTitle>Programming notes</SectionTitle>
          <Text variant="body" style={styles.muted}>
            {e.programmingNotes}
          </Text>
        </View>
      ) : null}

      <View style={styles.pills}>
        <PillButton label="Protein calculator" onPress={() => router.push("/calculator/protein")} style={styles.pill} />
        <PillButton
          label="One rep max"
          variant="ghost"
          onPress={() => router.push("/calculator/one-rep-max")}
          style={styles.pill}
        />
      </View>

      {related.length ? (
        <View style={styles.section}>
          <SectionTitle>{`Related ${groupLabel.toLowerCase()} work`}</SectionTitle>
          {related.map((r) => (
            <Pressable
              key={r.id}
              onPress={() => router.push(`/exercise/${r.muscleGroup}/${r.slug}`)}
              accessibilityRole="link"
              style={({ pressed }) => [styles.related, pressed && styles.relatedPressed]}
            >
              <Text variant="body" style={styles.relatedText}>
                {r.title}
              </Text>
              <Ionicons name="arrow-forward" size={15} color={colors.muted} />
            </Pressable>
          ))}
        </View>
      ) : null}

      <KnowledgeDisclaimer />

      <Pressable onPress={() => openLink(webUrl)} accessibilityRole="link" style={styles.webLink}>
        <Ionicons name="globe-outline" size={14} color={colors.muted} />
        <Text variant="small">View on fitlives.in</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  quick: {
    gap: space.sm,
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(245,245,245,0.4)",
  },
  quickLabel: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.muted,
  },
  quickText: { fontSize: 16, lineHeight: 25 },
  facts: { gap: space.md },
  muscleRow: { gap: 6 },
  muscleLabel: { color: colors.subtle },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: space.xs },
  tag: { borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, paddingHorizontal: space.md, paddingVertical: 4 },
  tagText: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink },
  bodyWrap: { marginHorizontal: -space.lg },
  section: { gap: space.md },
  sectionTitle: { fontSize: 21, lineHeight: 27 },
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
  stepNumText: { fontFamily: fonts.semibold, fontSize: 12, color: colors.accent },
  stepText: { flex: 1, color: colors.muted, lineHeight: 23 },
  mistakeIcon: { marginTop: 2 },
  muted: { color: colors.muted, lineHeight: 24 },
  pills: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  pill: { minHeight: 40, paddingHorizontal: space.lg },
  related: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    minHeight: 48,
    paddingHorizontal: space.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  relatedPressed: { borderColor: colors.accent },
  relatedText: { flex: 1 },
  webLink: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: space.sm },
});
