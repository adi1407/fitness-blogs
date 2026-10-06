import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Platform, Pressable, Share, StyleSheet, View } from "react-native";
import { WebView, type WebViewNavigation } from "react-native-webview";

import { fetchArticle } from "@/api/articles";
import { EmptyState, ErrorState, LoadingState } from "@/components/States";
import { Text } from "@/components/Text";
import { SITE_URL } from "@/config";
import { buildArticleHtml } from "@/lib/articleHtml";
import { openLink } from "@/lib/links";
import { colors, space } from "@/theme";

const BASE_URL = `${SITE_URL}/`;

export default function ArticleScreen() {
  const params = useLocalSearchParams<{ number: string }>();
  const articleNumber = Number(params.number);
  const valid = Number.isInteger(articleNumber) && articleNumber >= 100_000_000 && articleNumber <= 999_999_999;

  const query = useQuery({
    queryKey: ["article", articleNumber],
    queryFn: ({ signal }) => fetchArticle(articleNumber, signal),
    enabled: valid,
  });
  const [webError, setWebError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const html = useMemo(
    () => (query.data ? buildArticleHtml(query.data.article, query.data.related) : null),
    [query.data],
  );

  const article = query.data?.article;
  const shareUrl = article?.path ? `${SITE_URL}${article.path}` : null;

  const header = (
    <Stack.Screen
      options={{
        title: article?.categoryLabel ?? "Article",
        headerRight: shareUrl
          ? () => (
              <Pressable
                hitSlop={10}
                accessibilityLabel="Share article"
                onPress={() => Share.share({ message: `${article!.title}\n${shareUrl}`, url: shareUrl })}
              >
                <Ionicons name="share-outline" size={22} color={colors.ink} />
              </Pressable>
            )
          : undefined,
      }}
    />
  );

  if (!valid) return <EmptyState title="Article not found" hint="This link looks broken." />;
  if (query.isPending) return <>{header}<LoadingState label="Loading article…" /></>;
  if (query.isError) return <>{header}<ErrorState error={query.error} onRetry={() => query.refetch()} /></>;

  if (Platform.OS === "web") {
    return (
      <View style={styles.webFallback}>
        {header}
        <Text variant="title">{article!.title}</Text>
        {shareUrl ? (
          <Text variant="body" style={styles.link} onPress={() => openLink(shareUrl)}>
            Read on fitlives.in
          </Text>
        ) : null}
      </View>
    );
  }

  const onNavigate = (req: WebViewNavigation) => {
    const url = req.url;
    if (url === BASE_URL || url === SITE_URL || url.startsWith("about:") || url.startsWith("data:")) return true;
    if (url.startsWith(`${BASE_URL}#`)) return true;
    openLink(url);
    return false;
  };

  return (
    <View style={styles.root}>
      {header}
      {webError ? (
        <ErrorState
          error={new Error("The article couldn't be displayed.")}
          onRetry={() => {
            setWebError(false);
            setReloadKey((k) => k + 1);
          }}
        />
      ) : (
        <WebView
          key={reloadKey}
          originWhitelist={["*"]}
          source={{ html: html!, baseUrl: BASE_URL }}
          onShouldStartLoadWithRequest={onNavigate}
          setSupportMultipleWindows={false}
          javaScriptEnabled={false}
          pullToRefreshEnabled
          onError={() => setWebError(true)}
          startInLoadingState
          renderLoading={() => <LoadingState label="Rendering…" />}
          style={styles.web}
          textZoom={100}
          allowsLinkPreview={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  web: { flex: 1, backgroundColor: colors.bg },
  webFallback: { flex: 1, padding: space.lg, gap: space.md, backgroundColor: colors.bg },
  link: { textDecorationLine: "underline" },
});
