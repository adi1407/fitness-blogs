import type { Metadata } from "next";
import Link from "next/link";
import { UnsubscribeConfirm } from "@/features/newsletter/components/UnsubscribeConfirm";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
  alternates: { canonical: "/unsubscribe" },
};

type Props = { searchParams: Promise<{ token?: string | string[] }> };

export default async function UnsubscribePage({ searchParams }: Props) {
  const raw = (await searchParams).token;
  const token = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";
  const valid = /^[A-Za-z0-9_-]{16,64}$/.test(token);

  return (
    <main className="fk-page flex-1 py-16 sm:py-24">
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl font-semibold tracking-tight">Unsubscribe from fitlives emails</h1>
        {valid ? (
          <>
            <p className="mt-3 text-muted-foreground">
              Confirm below and we&apos;ll stop emailing you. You can subscribe again anytime.
            </p>
            <UnsubscribeConfirm token={token} />
          </>
        ) : (
          <p className="mt-3 text-muted-foreground">
            This unsubscribe link is missing or incomplete. Use the link from the bottom of our
            email, or{" "}
            <Link href="/contact" className="fk-link">
              contact us
            </Link>{" "}
            and we&apos;ll remove you.
          </p>
        )}
      </div>
    </main>
  );
}
