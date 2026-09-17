import type { Metadata } from "next";
import { noIndexMetadata } from "@/components/shared/PlatformHub";
import ConnectedCarouselDemo from "@/components/connected-carousel-demo";

export const metadata: Metadata = noIndexMetadata(
  "Connected Carousel Demo",
  "Component playground — not indexed.",
);

export default function ConnectedCarouselPage() {
  return <ConnectedCarouselDemo />;
}
