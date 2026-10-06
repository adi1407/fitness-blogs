import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Linking } from "react-native";

import { SITE_URL } from "@/config";

/**
 * Route fitlives.in links to native screens when we have one
 * (articles by trailing number, foods by slug); everything else opens in a browser.
 */
export function openLink(url: string) {
  let parsed: URL;
  try {
    parsed = new URL(url, SITE_URL);
  } catch {
    return;
  }

  if (parsed.protocol === "mailto:" || parsed.protocol === "tel:") {
    Linking.openURL(parsed.href).catch(() => {});
    return;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return;

  const site = new URL(SITE_URL);
  const host = parsed.hostname.replace(/^www\./, "");
  if (host === site.hostname.replace(/^www\./, "")) {
    const article = parsed.pathname.match(/^\/blog\/.+\/(\d{9})\/?$/);
    if (article) {
      router.push(`/article/${article[1]}`);
      return;
    }
    const food = parsed.pathname.match(/^\/foods\/([a-z0-9-]+)\/?$/);
    if (food && food[1] !== "indian") {
      router.push(`/food/${food[1]}`);
      return;
    }
  }

  WebBrowser.openBrowserAsync(parsed.href).catch(() => {
    Linking.openURL(parsed.href).catch(() => {});
  });
}
