import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { fetchArticles } from "@/api/articles";
import { fetchFoods } from "@/api/foods";
import { SearchInput } from "@/components/SearchInput";
import { EmptyState } from "@/components/States";
import { Text } from "@/components/Text";
import { colors, layout, space } from "@/theme";

type Hit = { key: string; kind: string; title: string; subtitle?: string; go: () => void };

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [q, setQ] = useState("");
  const articles = useQuery({ queryKey: ["articles"], queryFn: ({ signal }) => fetchArticles(signal) });
  const foods = useQuery({ queryKey: ["foods"], queryFn: ({ signal }) => fetchFoods(signal) });

  const hits = useMemo<Hit[]>(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    const a = (articles.data ?? [])
      .filter((x) => x.title.toLowerCase().includes(term))
      .slice(0, 12)
      .map<Hit>((x) => ({
        key: `a-${x.id}`,
        kind: "Article",
        title: x.title,
        subtitle: x.categoryLabel ?? undefined,
        go: () => router.push(`/article/${x.articleNumber}`),
      }));
    const f = (foods.data ?? [])
      .filter((x) => x.name.toLowerCase().includes(term) || x.hindiName.toLowerCase().includes(term))
      .slice(0, 12)
      .map<Hit>((x) => ({
        key: `f-${x.slug}`,
        kind: "Food",
        title: x.name,
        subtitle: `${x.kcal} kcal · ${x.proteinG} g protein per 100 g`,
        go: () => router.push(`/food/${x.slug}`),
      }));
    return [...a, ...f];
  }, [q, articles.data, foods.data]);

  return (
    <View style={[styles.root, { paddingTop: insets.top + space.md }]}>
      <View style={styles.bar}>
        <View style={styles.input}>
          <SearchInput value={q} onChangeText={setQ} placeholder="Search articles and foods" />
        </View>
        <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button">
          <Text variant="body">Cancel</Text>
        </Pressable>
      </View>
      <FlatList
        data={hits}
        keyExtractor={(h) => h.key}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={item.go} style={({ pressed }) => [styles.hit, pressed && styles.pressed]}>
            <View style={styles.hitText}>
              <Text variant="label" style={styles.kind}>
                {item.kind}
              </Text>
              <Text variant="heading" numberOfLines={2}>
                {item.title}
              </Text>
              {item.subtitle ? <Text variant="small">{item.subtitle}</Text> : null}
            </View>
            <Ionicons name="arrow-forward" size={18} color={colors.subtle} />
          </Pressable>
        )}
        ListEmptyComponent={
          q.trim().length >= 2 ? (
            <EmptyState title="No results" hint="Try a simpler word, like “protein” or “dal”." />
          ) : (
            <EmptyState title="Search fitlives" hint="Articles and foods, all in one place." />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  bar: { flexDirection: "row", alignItems: "center", gap: space.md, paddingHorizontal: space.lg },
  input: { flex: 1 },
  list: { padding: space.lg, paddingBottom: layout.bottomClearance },
  hit: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingVertical: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  pressed: { opacity: 0.6 },
  hitText: { flex: 1, gap: 2 },
  kind: { color: colors.accent },
});
