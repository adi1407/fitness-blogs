import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AccountHub } from "@/features/account/AccountHub";
import { MEMBER_COOKIE } from "@/lib/auth/memberCookie";
import { OG_DEFAULTS } from "@/lib/seo";

const TITLE = "Your account";
const DESCRIPTION =
  "Saved calculator results, guides, upvotes, and fitlives member settings.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: { canonical: "/account" },
  openGraph: {
    ...OG_DEFAULTS,
    title: `${TITLE} | fitlives`,
    description: DESCRIPTION,
    url: "/account",
  },
};

export default async function AccountPage() {
  const token = (await cookies()).get(MEMBER_COOKIE)?.value;
  if (!token) {
    redirect("/login?next=/account");
  }

  return (
    <main className="fk-page fk-page--content flex-1 py-12 sm:py-16">
      <AccountHub />
    </main>
  );
}
