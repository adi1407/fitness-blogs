import { permanentRedirect } from "next/navigation";

/** Learn hub retired — Latest lives at /blog. */
export default function LearnRedirectPage() {
  permanentRedirect("/blog");
}
