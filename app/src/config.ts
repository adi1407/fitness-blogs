const trimSlash = (url: string) => url.replace(/\/+$/, "");

export const API_URL = trimSlash(
  process.env.EXPO_PUBLIC_API_URL || "https://fitness-blogs-xkec.onrender.com/api/v1",
);

export const SITE_URL = trimSlash(process.env.EXPO_PUBLIC_SITE_URL || "https://fitlives.in");
