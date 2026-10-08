import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Linking } from "react-native";

import { SITE_URL } from "@/config";
import { isPillarSlug } from "./pillars";
import { toolByWebPath } from "./tools";

/**
 * Route fitlives.in links to native screens when we have one (articles, foods,
 * calculators, topic hubs, guides…); everything else opens in a browser.
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
    if (/^\/about\/?$/.test(parsed.pathname)) {
      router.push("/about");
      return;
    }
    const guide = parsed.pathname.match(/^\/(programs|reviews)(?:\/([a-z0-9-]+))?\/?$/);
    if (guide) {
      router.push(guide[2] ? `/guides/${guide[1]}/${guide[2]}` : `/guides/${guide[1]}`);
      return;
    }
    const recipe = parsed.pathname.match(/^\/recipes\/([a-z0-9-]+)\/?$/);
    if (recipe) {
      router.push(`/recipe/${recipe[1]}`);
      return;
    }
    if (/^\/recipes\/?$/.test(parsed.pathname)) {
      router.push("/recipes");
      return;
    }
    const exercise = parsed.pathname.match(/^\/exercises\/([a-z0-9-]+)\/([a-z0-9-]+)\/?$/);
    if (exercise) {
      router.push(`/exercise/${exercise[1]}/${exercise[2]}`);
      return;
    }
    const group = parsed.pathname.match(/^\/exercises\/([a-z0-9-]+)\/?$/);
    if (group) {
      router.push(`/exercises/${group[1]}`);
      return;
    }
    const tool = toolByWebPath(parsed.pathname);
    if (tool) {
      router.push(`/calculator/${tool.id}`);
      return;
    }
    if (/^\/tools\/?$/.test(parsed.pathname)) {
      router.push("/tools");
      return;
    }
    const subcategory = parsed.pathname.match(/^\/blog\/([a-z0-9-]+)\/([a-z0-9-]+)\/?$/);
    if (subcategory && isPillarSlug(subcategory[1])) {
      router.push(`/hub/${subcategory[1]}/${subcategory[2]}`);
      return;
    }
    const pillar = parsed.pathname.match(/^\/([a-z0-9-]+)\/?$/);
    if (pillar && isPillarSlug(pillar[1])) {
      router.push(`/hub/${pillar[1]}`);
      return;
    }
  }

  WebBrowser.openBrowserAsync(parsed.href).catch(() => {
    Linking.openURL(parsed.href).catch(() => {});
  });
}
