import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Pressable, Share, StyleSheet, View } from "react-native";

import { fetchKnowledgePage } from "@/api/library";
import { HtmlBody } from "@/components/HtmlBody";
import { KnowledgeRow } from "@/components/KnowledgeRow";
import { KnowledgeDisclaimer, PageIntro } from "@/components/PageIntro";
import { PillButton } from "@/components/PillButton";
import { Screen } from "@/components/Screen";
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
        title: "",
        headerRight: () =>
          page ? (
            <Pressable
              onPress={() => Share.share({ message: `${page.title} — ${webUrl}` }).catch(() => {})}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Share guide"
            >
              <Ionicons name="share-outline" size={22} color={colors.ink} />
            </Pressable>
          ) : null,
      }}
    />
  );

  if (!valid) return <EmptyState title="Section not found" />;
  if (query.isPending) return <>{header}<LoadingState label="Loading…" /></>;
  if (query.isError) return <>{header}<ErrorState error={query.error} onRetry={() => query.refetch()} /></>;

  const { page: p, related } = query.data;
  const meta = KNOWLEDGE_SECTIONS[section];
  const programs = section === "programs";

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      {header}
      <PageIntro
        crumbs={[
          { label: "Library", href: "/library" },
          { label: meta.eyebrow, href: `/guides/${section}` },
          { label: p.title },
        ]}
        title={p.title}
        lede={p.excerpt}
      />

      {p.bodyHtml ? (
        <View style={styles.bodyWrap}>
          <HtmlBody html={p.bodyHtml} />
        </View>
      ) : null}

      <View style={styles.pills}>
        {programs ? (
          <>
            <PillButton label="Browse exercises" onPress={() => router.push("/exercises")} style={styles.pill} />
            <PillButton label="All programs" variant="ghost" onPress={() => router.navigate("/guides/programs")} style={styles.pill} />
          </>
        ) : (
          <>
            <PillButton label="All guides" variant="ghost" onPress={() => router.navigate("/guides/reviews")} style={styles.pill} />
            <PillButton
              label="Affiliate disclosure"
              variant="ghost"
              onPress={() => openLink(`${SITE_URL}/affiliate-disclosure`)}
              style={styles.pill}
            />
          </>
        )}
      </View>

      {related.length ? (
        <View style={styles.section}>
          <Text variant="title" style={styles.sectionTitle} accessibilityRole="header">
            {meta.relatedTitle}
          </Text>
          {related.map((r) => (
            <KnowledgeRow key={r.id} page={r} compact />
          ))}
        </View>
      ) : null}

      <KnowledgeDisclaimer />
    </Screen>
  );
}

const styles = StyleSheet.create({
  bodyWrap: { marginHorizontal: -space.lg },
  pills: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  pill: { minHeight: 40, paddingHorizontal: space.lg },
  section: { gap: space.sm },
  sectionTitle: { fontSize: 21, lineHeight: 27 },
});
