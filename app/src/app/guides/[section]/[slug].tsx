import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Share, StyleSheet, View } from "react-native";

import { fetchKnowledgePage } from "@/api/library";
import { GradientHero } from "@/components/GradientHero";
import { HtmlBody } from "@/components/HtmlBody";
import { KnowledgeRow } from "@/components/KnowledgeRow";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { KNOWLEDGE_SECTIONS, isKnowledgeSection } from "@/lib/knowledge";
import { openLink } from "@/lib/links";
import { colors, space } from "@/theme";

export default function KnowledgePageScreen() {
  const { section, slug } = useLocalSearchParams<{ section: string; slug: string }>();
  const valid = isKnowledgeSection(section);
  const query = useQuery({
    queryKey: ["knowledge", section, slug],
    queryFn: ({ signal }) => fetchKnowledgePage(section as "programs" | "reviews", String(slug), signal),
    enabled: valid && !!slug,
  });

  const page = query.data?.page;
  const webUrl = `${SITE_URL}${page?.path ?? `/${section}/${slug}`}`;
  const header = (
    <Stack.Screen
      options={{
        title: valid ? KNOWLEDGE_SECTIONS[section].eyebrow : "",
        headerRight: () =>
          page ? (
            <Ionicons
              name="share-outline"
              size={22}
              color={colors.ink}
              accessibilityLabel="Share"
              onPress={() => Share.share({ message: `${page.title} — ${webUrl}` }).catch(() => {})}
            />
          ) : null,
      }}
    />
  );

  if (!valid) return <EmptyState title="Section not found" />;
  if (query.isPending) return <>{header}<LoadingState label="Loading…" /></>;
  if (query.isError) return <>{header}<ErrorState error={query.error} onRetry={() => query.refetch()} /></>;

  const { page: p, related } = query.data;
  const meta = KNOWLEDGE_SECTIONS[section];

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      {header}
      <GradientHero eyebrow={meta.label} title={p.title} subtitle={p.excerpt ?? undefined} />

      {p.bodyHtml ? (
        <View style={styles.bodyWrap}>
          <HtmlBody html={p.bodyHtml} />
        </View>
      ) : null}

      {section === "programs" ? (
        <Text variant="small" style={styles.cta} onPress={() => router.push("/exercises")}>
          Look up any lift in the exercise library →
        </Text>
      ) : null}

      {related.length ? (
        <View style={styles.section}>
          <SectionHeader eyebrow="Related" title={`More ${meta.eyebrow.toLowerCase()}`} />
          {related.map((r) => (
            <KnowledgeRow key={r.id} page={r} />
          ))}
        </View>
      ) : null}

      <Text variant="small" style={styles.link} onPress={() => openLink(webUrl)}>
        View on fitlives.in
      </Text>
      <Text variant="small" style={styles.disclaimer}>
        Educational only — not medical advice. Check with a professional if you have an injury or health condition.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bodyWrap: { marginHorizontal: -space.lg },
  section: { gap: space.md },
  cta: { color: colors.ink, fontWeight: "600", textAlign: "center" },
  link: { color: colors.ink, textDecorationLine: "underline", textAlign: "center" },
  disclaimer: { textAlign: "center", color: colors.subtle },
});
