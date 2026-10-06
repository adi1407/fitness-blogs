import { useMemo, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { WebView, type WebViewMessageEvent, type WebViewNavigation } from "react-native-webview";

import { SITE_URL } from "@/config";
import { buildBodyHtml } from "@/lib/articleHtml";
import { openLink } from "@/lib/links";
import { colors, space } from "@/theme";
import { Skeleton } from "./Skeleton";
import { Text } from "./Text";

const BASE_URL = `${SITE_URL}/`;

export type HeadingOffset = { i: number; top: number };

type Props = {
  html: string;
  /** H2 offsets (px from the top of this component) once laid out. */
  onHeadings?: (heads: HeadingOffset[]) => void;
};

/** CMS HTML rendered in a non-scrolling WebView sized to its content. */
export function HtmlBody({ html, onHeadings }: Props) {
  const [height, setHeight] = useState(0);
  const doc = useMemo(() => buildBodyHtml(html), [html]);

  if (Platform.OS === "web") {
    return (
      <View style={styles.webFallback}>
        <Text variant="small">Open this page on fitlives.in to read the full text.</Text>
      </View>
    );
  }

  const onMessage = (e: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(e.nativeEvent.data) as { height?: number; heads?: HeadingOffset[] };
      if (data.height && data.height > 0) setHeight(data.height);
      if (data.heads && onHeadings) onHeadings(data.heads);
    } catch {
      // ignore malformed messages
    }
  };

  const onNavigate = (req: WebViewNavigation) => {
    const url = req.url;
    if (url === BASE_URL || url === SITE_URL || url.startsWith("about:") || url.startsWith("data:")) return true;
    if (url.startsWith(`${BASE_URL}#`)) return true;
    openLink(url);
    return false;
  };

  return (
    <View style={{ minHeight: height || 400 }}>
      {!height ? (
        <View style={styles.placeholder} pointerEvents="none">
          {[92, 100, 84, 96, 70].map((w, i) => (
            <Skeleton key={i} width={`${w}%`} height={14} />
          ))}
        </View>
      ) : null}
      <WebView
        originWhitelist={["*"]}
        source={{ html: doc, baseUrl: BASE_URL }}
        onShouldStartLoadWithRequest={onNavigate}
        onMessage={onMessage}
        setSupportMultipleWindows={false}
        scrollEnabled={false}
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        textZoom={100}
        allowsLinkPreview={false}
        style={[styles.web, { height: height || 1, opacity: height ? 1 : 0 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  web: { backgroundColor: colors.bg },
  placeholder: { position: "absolute", left: space.xl, right: space.xl, top: space.md, gap: space.md },
  webFallback: { padding: space.xl },
});
