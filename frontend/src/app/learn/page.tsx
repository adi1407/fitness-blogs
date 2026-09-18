import { redirect } from "next/navigation";

/** Learn hub retired — Latest lives at /blog. */
export default function LearnRedirectPage() {
  redirect("/blog");
}
