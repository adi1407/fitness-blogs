import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AccountHub } from "@/features/account/AccountHub";
import { MEMBER_COOKIE } from "@/lib/auth/memberCookie";

export const metadata: Metadata = {
  title: "Your account",
  description: "Saved guides, upvotes, and FitKnowledge member settings.",
  robots: { index: false, follow: false },
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
