import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalDocument,
  LegalH2,
  LegalUl,
} from "@/components/shared/LegalDocument";
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_CONTACT_MAILTO,
  LEGAL_OPERATOR_NOTE,
  LEGAL_RELATED,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How fitlives collects and uses personal data for Google sign-in, member features, hosting, and analytics. India-operated educational site.",
  alternates: { canonical: "/privacy" },
};

const toc = [
  { id: "who", label: "Who we are" },
  { id: "collect", label: "What we collect" },
  { id: "purpose", label: "Why we use data" },
  { id: "google", label: "Google sign-in" },
  { id: "legal-basis", label: "Legal basis (India)" },
  { id: "sharing", label: "Sharing and processors" },
  { id: "cookies", label: "Cookies and analytics" },
  { id: "retention", label: "Retention" },
  { id: "rights", label: "Your rights" },
  { id: "security", label: "Security" },
  { id: "children", label: "Children" },
  { id: "transfers", label: "Where data is processed" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro="This notice explains what personal data fitlives processes when you read the Site, sign in with Google, save or upvote articles, or when we measure traffic."
      toc={toc}
      related={[
        LEGAL_RELATED.cookies,
        LEGAL_RELATED.terms,
        LEGAL_RELATED.contact,
        LEGAL_RELATED.medical,
      ]}
    >
      <LegalH2 id="who">1. Who we are</LegalH2>
      <p>
        {LEGAL_OPERATOR_NOTE} For India’s Digital Personal Data Protection Act,
        2023 (DPDP Act), we act as a <strong>Data Fiduciary</strong> for
        personal data we control on this Site. Contact:{" "}
        <a href={LEGAL_CONTACT_MAILTO} className="fk-link">
          {LEGAL_CONTACT_EMAIL}
        </a>
        .
      </p>
      <p>
        We do <strong>not</strong> sell your personal data. We are not a
        covered US “HIPAA” healthcare provider; do not send us clinical records
        expecting hospital-grade privacy rules.
      </p>

      <LegalH2 id="collect">2. What we collect</LegalH2>
      <p>Depending on how you use the Site, we may process:</p>
      <LegalUl>
        <li>
          <strong>Google account data</strong> you authorize: email address,
          name, profile photo URL, and Google user id (sub). We do not get
          access to your Gmail, Drive, or contacts.
        </li>
        <li>
          <strong>Member profile</strong> stored in our database: email, name,
          picture URL, Google id, account status, last login time.
        </li>
        <li>
          <strong>Engagement</strong>: article upvotes and bookmarks tied to
          your member id.
        </li>
        <li>
          <strong>Session</strong>: an HttpOnly cookie (fk_member) on this
          site after Google sign-in. JavaScript cannot read it. Next.js
          forwards it to our API as a Bearer token server-side.
        </li>
        <li>
          <strong>Technical logs</strong>: IP address, user agent, request
          paths, and timestamps on our API host (typical server logs).
        </li>
        <li>
          <strong>Analytics</strong>: page views and similar events via
          OpenPanel (see{" "}
          <Link href="/cookie-policy" className="fk-link">
            Cookie Policy
          </Link>
          ).
        </li>
        <li>
          <strong>Email you send us</strong> (corrections, privacy requests).
        </li>
      </LegalUl>
      <p>
        We do not ask you to submit diagnoses, lab results, or other sensitive
        health records. Please do not email those to us.
      </p>

      <LegalH2 id="purpose">3. Why we use data</LegalH2>
      <LegalUl>
        <li>To operate the Site and member features (sign-in, save, upvote).</li>
        <li>To keep accounts secure and prevent abuse.</li>
        <li>To understand which pages help readers (aggregated analytics).</li>
        <li>To respond to your emails and correction requests.</li>
        <li>To comply with law if we are legally required to.</li>
      </LegalUl>

      <LegalH2 id="google">4. Google sign-in</LegalH2>
      <p>
        Sign-in uses Google OAuth with scopes limited to{" "}
        <strong>openid, email, and profile</strong>. Google’s own privacy
        policy applies to your Google account. You can revoke fitlives’s
        access in your Google account settings. After revoke, your Site session
        will stop working; you may also email us to delete your member row.
      </p>

      <LegalH2 id="legal-basis">5. Legal basis (India)</LegalH2>
      <p>
        We process personal data for specified purposes: providing the service
        you request (consent when you sign in or contact us), legitimate
        operation and security of the Site, and compliance with applicable law.
        You may withdraw consent for the account by asking us to delete it;
        we may retain limited records if required for security or legal
        claims.
      </p>

      <LegalH2 id="sharing">6. Sharing and processors</LegalH2>
      <p>We share data only as needed to run the Site:</p>
      <LegalUl>
        <li>
          <strong>Google</strong> — authentication.
        </li>
        <li>
          <strong>Hosting</strong> — currently Vercel (frontend) and Render
          (API and database).
        </li>
        <li>
          <strong>OpenPanel</strong> — product analytics (optional, consent).
        </li>
        <li>
          <strong>Google Analytics 4</strong> — traffic analytics (optional,
          consent).
        </li>
      </LegalUl>
      <p>
        We may disclose information if required by Indian law, court order, or
        to protect the Site, our users, or the public from serious harm. We do
        not sell mailing lists or member emails to advertisers.
      </p>

      <LegalH2 id="cookies">7. Cookies and similar technologies</LegalH2>
      <p>
        See the{" "}
        <Link href="/cookie-policy" className="fk-link">
          Cookie Policy
        </Link>{" "}
        for essential vs analytics use. A consent banner lets you accept all,
        keep essential only, or customize. You can reopen{" "}
        <strong>Cookie settings</strong> from the footer at any time. Analytics
        (OpenPanel / Google Analytics) does not run until you opt in.
      </p>

      <LegalH2 id="retention">8. Retention</LegalH2>
      <p>
        Member accounts and engagement records are kept while the account is
        active and for a reasonable period after last login (or until you
        request deletion). Server logs are rotated on a typical hosting
        schedule. Analytics data follows OpenPanel and Google Analytics
        retention for our properties. Backups may persist for a limited time
        after deletion requests complete.
      </p>

      <LegalH2 id="rights">9. Your rights</LegalH2>
      <p>
        Subject to the DPDP Act and other applicable law, you may request:
        access to personal data we hold about you; correction of inaccurate
        data; erasure of your member account and associated upvotes/bookmarks;
        and withdrawal of consent for optional processing. Email{" "}
        <a href={LEGAL_CONTACT_MAILTO} className="fk-link">
          {LEGAL_CONTACT_EMAIL}
        </a>{" "}
        from the same address as your Google account when possible, so we can
        verify the request. We may refuse requests that are unlawful, excessive,
        or would prevent us from securing the Site.
      </p>

      <LegalH2 id="security">10. Security</LegalH2>
      <p>
        We use HTTPS, access-controlled hosting, and signed session tokens.
        No method of transmission or storage is 100% secure. You are
        responsible for the security of your Google account.
      </p>

      <LegalH2 id="children">11. Children</LegalH2>
      <p>
        Member accounts are for users 18+. We do not knowingly create accounts
        for children. If you believe a minor has an account, email us and we
        will delete it.
      </p>

      <LegalH2 id="transfers">12. Where data is processed</LegalH2>
      <p>
        We operate from India. Processors (Google, Vercel, Render, OpenPanel /
        Google Analytics)
        may store or process data in other countries. By using the Site you
        understand that data may be processed outside India subject to those
        providers’ safeguards.
      </p>

      <LegalH2 id="changes">13. Changes</LegalH2>
      <p>
        We may update this Policy. The “Last updated” date will change.
        Continued use after an update means you acknowledge the revised notice.
      </p>

      <LegalH2 id="contact">14. Contact</LegalH2>
      <p>
        Privacy and data-protection requests:{" "}
        <a href={LEGAL_CONTACT_MAILTO} className="fk-link">
          {LEGAL_CONTACT_EMAIL}
        </a>
        . For medical emergencies, contact local emergency services — we cannot
        provide clinical care.
      </p>
    </LegalDocument>
  );
}
