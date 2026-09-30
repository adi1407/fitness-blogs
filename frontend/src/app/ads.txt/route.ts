import { adsTxtLine, isAdSenseConfigured } from "@/lib/ads/adsense";

export const dynamic = "force-static";

export function GET() {
  if (!isAdSenseConfigured()) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(`${adsTxtLine()}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
