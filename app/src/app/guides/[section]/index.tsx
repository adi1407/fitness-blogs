import { useQuery } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { fetchKnowledge } from "@/api/library";
import { HtmlBody } from "@/components/HtmlBody";
import { KnowledgeRow } from "@/components/KnowledgeRow";
import { KnowledgeDisclaimer, PageIntro } from "@/components/PageIntro";
import { PillButton } from "@/components/PillButton";
import { Screen } from "@/components/Screen";
import { SkeletonList } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/States";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { KNOWLEDGE_SECTIONS, isKnowledgeSection } from "@/lib/knowledge";
import { openLink } from "@/lib/links";
import { colors, space } from "@/theme";

export default function KnowledgeHubScreen() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const valid = isKnowledgeSection(section);
  const query = useQuery({
    queryKey: ["knowledge", section],
    queryFn: ({ signal }) => fetchKnowledge(section as "programs" | "reviews", signal),
    enabled: valid,
  });

  if (!valid) return <EmptyState title="Section not found" />;

  const meta = KNOWLEDGE_SECTIONS[section];
  const hub = query.data?.hub;
  const pages = query.data?.pages ?? [];
  const programs = section === "programs";

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      <Stack.Screen options={{ title: "" }} />
      <PageIntro
        crumbs={[{ label: "Library", href: "/library" }, { label: meta.eyebrow }]}
        title={hub?.title ?? meta.label}
        lede={hub?.excerpt ?? meta.lede}
      >
        <View style={styles.pills}>
          {programs ? (
            <>
              <PillButton label="Exercise library" onPress={() => router.push("/exercises")} style={styles.pill} />
              <PillButton
                label="Muscle building"
                variant="ghost"
                onPress={() => router.push("/hub/muscle-building")}
                style={styles.pill}
              />
            </>
          ) : (
            <>
              <PillButton label="Nutrition hub" onPress={() => router.push("/hub/nutrition")} style={styles.pill} />
              <PillButton
                label="Affiliate disclosure"
                variant="ghost"
                onPress={() => openLink(`${SITE_URL}/affiliate-disclosure`)}
                style={styles.pill}
              />
            </>
          )}
        </View>
      </PageIntro>

      <View style={styles.section}>
        <Text variant="title" style={styles.sectionTitle} accessibilityRole="header">
          {meta.listTitle}
          {pages.length ? <Text style={styles.count}> ({pages.length})</Text> : null}
        </Text>
        {query.isPending ? (
          <SkeletonList count={3} image={false} />
        ) : query.isError ? (
          <ErrorState error={query.error} onRetry={() => query.refetch()} />
        ) : pages.length ? (
          pages.map((p, i) => (
            <Animated.View key={p.id} entering={FadeInDown.delay(i * 50).duration(320)}>
              <KnowledgeRow page={p} index={programs ? i : undefined} />
            </Animated.View>
          ))
        ) : (
          <EmptyState title="Guides are on the way" />
        )}
      </View>

      {hub?.bodyHtml ? (
        <View style={styles.bodyWrap}>
          <HtmlBody html={hub.bodyHtml} />
        </View>
      ) : null}

      <KnowledgeDisclaimer />
    </Screen>
  );
}

const styles = StyleSheet.create({
  pills: { flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.sm },
  pill: { minHeight: 40, paddingHorizontal: space.lg },
  section: { gap: space.md },
  sectionTitle: { fontSize: 21, lineHeight: 27 },
  count: { fontSize: 15, color: colors.muted },
  bodyWrap: { marginHorizontal: -space.lg },
});
