import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalDocument,
  LegalH2,
  LegalUl,
} from "@/components/shared/LegalDocument";
import { LEGAL_RELATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How fitlives uses essential cookies, optional analytics (OpenPanel and Google Analytics), and how you can change your choices. We do not use advertising cookies.",
  alternates: { canonical: "/cookie-policy" },
};

const toc = [
  { id: "what", label: "What cookies are" },
  { id: "uses", label: "What they can be used for" },
  { id: "we-use", label: "What fitlives uses" },
  { id: "essential", label: "Essential" },
  { id: "analytics", label: "Analytics" },
  { id: "ads", label: "Advertising" },
  { id: "control", label: "How to control" },
];

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      intro="This page explains cookies and similar storage on fitlives. Use Accept or Reject on the banner (or Cookie settings in the footer). Reject turns off analytics only — sign-in still uses an essential HttpOnly session cookie."
      toc={toc}
      related={[LEGAL_RELATED.privacy, LEGAL_RELATED.terms, LEGAL_RELATED.contact]}
    >
      <LegalH2 id="what">1. What cookies are</LegalH2>
      <p>
        A cookie is a small text file a site stores in your browser. Similar
        tools include local storage and session storage. Together they let a
        site remember a choice, keep you signed in, or measure how the site
        is used. They are not programs and cannot install software on your
        device.
      </p>

      <LegalH2 id="uses">2. What cookies can be used for (in general)</LegalH2>
      <p>
        On the wider web, cookies are commonly used for:
      </p>
      <LegalUl>
        <li>
          <strong>Strictly necessary / security</strong> — load balancing,
          fraud prevention, CSRF protection, remembering that you are in a
          logged-in session.
        </li>
        <li>
          <strong>Preferences</strong> — language, theme, dismissed banners,
          “I already acknowledged this calculator disclaimer.”
        </li>
        <li>
          <strong>Analytics / performance</strong> — which pages are read,
          where people drop off, which tools are used. This can be first-party
          or a vendor (for us, OpenPanel and Google Analytics).
        </li>
        <li>
          <strong>Functional extras</strong> — embedded video, maps, chat
          widgets that set their own cookies.
        </li>
        <li>
          <strong>Advertising and retargeting</strong> — identify a browser
          across sites to show ads or build a marketing profile. We do{" "}
          <strong>not</strong> use these.
        </li>
        <li>
          <strong>Affiliate / conversion tracking</strong> — attribute a
          purchase to a click. We do not currently use these.
        </li>
        <li>
          <strong>Social plugins</strong> — share buttons that phone home to
          a network. Our share links open the network in a new tab rather
          than embedding a tracking pixel on every article.
        </li>
      </LegalUl>
      <p>
        A cookie is not automatically “bad.” The risk depends on{" "}
        <em>purpose, who reads it, how long it lasts, and whether it can
        identify you</em>. Essential cookies keep the product working.
        Marketing cookies are optional and should be off until you agree.
      </p>

      <LegalH2 id="we-use">3. What fitlives uses today</LegalH2>
      <p>
        We keep the set small on purpose:
      </p>
      <LegalUl>
        <li>
          <strong>fk_cookie_consent</strong> — remembers Accept vs Reject
          (and Customize). Lasts about 1 year. Essential so we do not keep
          asking on every page.
        </li>
        <li>
          <strong>fk_member</strong> — HttpOnly first-party session cookie set
          after Google sign-in on this site’s domain. JavaScript cannot read
          it. Required for upvote, bookmark, and staying signed in. Rejecting
          optional cookies does <strong>not</strong> delete this cookie.
        </li>
        <li>
          Calculator educational-gate flag in local storage — remembers that
          you acknowledged the educational disclaimer on a tool.
        </li>
        <li>
          Optional analytics (OpenPanel and Google Analytics) — only after you
          choose <strong>Accept cookies</strong> or enable Analytics in
          Customize. <strong>Reject optional cookies</strong> keeps this off.
        </li>
      </LegalUl>

      <LegalH2 id="essential">4. Essential / functional</LegalH2>
      <LegalUl>
        <li>
          Member session and cookie-consent choice cannot be switched off if
          you want those features (sign-in, not seeing the banner every visit).
        </li>
        <li>
          Hosting (Vercel / Render) may set strictly necessary cookies for
          routing or abuse protection.
        </li>
      </LegalUl>

      <LegalH2 id="analytics">5. Analytics (OpenPanel + Google Analytics) — optional</LegalH2>
      <p>
        If you allow analytics, we send page views and product events (for
        example share, upvote, calculator use) to OpenPanel and Google Analytics
        4 so we can improve guides and understand search traffic. This is for
        operating the Site, not for selling your identity to advertisers. Until
        you opt in, those scripts and events are not loaded.
      </p>
      <p>
        See{" "}
        <a
          href="https://openpanel.dev"
          className="fk-link"
          rel="noopener noreferrer"
          target="_blank"
        >
          OpenPanel
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          className="fk-link"
          rel="noopener noreferrer"
          target="_blank"
        >
          Google’s partner sites policy
        </a>{" "}
        for vendor documentation.
      </p>

      <LegalH2 id="ads">6. Advertising cookies</LegalH2>
      <p>
        We do <strong>not</strong> run third-party advertising pixels,
        remarketing tags, or affiliate tracking cookies. If that changes, we
        will update this policy, the{" "}
        <Link href="/affiliate-disclosure" className="fk-link">
          Affiliate Disclosure
        </Link>
        , and the consent banner.
      </p>

      <LegalH2 id="control">7. How to control</LegalH2>
      <LegalUl>
        <li>
          Use <strong>Cookie settings</strong> in the site footer:{" "}
          <strong>Accept cookies</strong>,{" "}
          <strong>Reject optional cookies</strong>, or Customize.
        </li>
        <li>
          Browser settings can block or delete cookies and site data. Blocking
          all storage may break sign-in.
        </li>
        <li>
          Signing out clears the HttpOnly session cookie. Clearing site data
          also removes the consent cookie.
        </li>
      </LegalUl>
    </LegalDocument>
  );
}
