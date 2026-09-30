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
    "How fitlives uses cookieless analytics, optional Google Analytics cookies, Google AdSense advertising cookies, the sign-in session cookie, and how you can change your choices.",
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
      intro="This page explains cookies and similar storage on fitlives. Use Accept or Reject on the banner (or Cookie settings in the footer). Cookieless page counts run for everyone. Accept also allows Google Analytics cookies and sign-in; Reject keeps sign-in off."
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
          across sites to show ads or build a marketing profile. We show ads
          through Google AdSense; see section 6.
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
          it. Required for upvote, bookmark, saved calculator results, and
          staying signed in. It is only set after you choose{" "}
          <strong>Accept cookies</strong>; rejecting cookies later signs you
          out and removes it.
        </li>
        <li>
          <strong>_ga, _ga_*</strong> — Google Analytics cookies, only set
          after <strong>Accept cookies</strong>. Rejecting deletes them.
        </li>
        <li>
          Cookieless measurement (OpenPanel and Google Analytics Consent Mode)
          — runs for everyone without setting cookies. See section 5.
        </li>
        <li>
          Google AdSense advertising cookies — set by Google (for example on
          google.com and doubleclick.net) to show and measure ads. See
          section 6.
        </li>
      </LegalUl>

      <LegalH2 id="essential">4. Essential / functional</LegalH2>
      <LegalUl>
        <li>
          The cookie-consent choice is always stored so we do not ask on every
          visit. The member session requires Accept cookies.
        </li>
        <li>
          Hosting (Vercel / Render) may set strictly necessary cookies for
          routing or abuse protection.
        </li>
      </LegalUl>

      <LegalH2 id="analytics">5. Analytics (OpenPanel + Google Analytics)</LegalH2>
      <p>
        We send page views and product events (for example share, upvote,
        calculator use) to OpenPanel and Google Analytics 4 so we can improve
        guides and understand search traffic. This is for operating the Site,
        not for selling your identity to advertisers.
      </p>
      <LegalUl>
        <li>
          <strong>Without consent</strong> — OpenPanel runs without cookies,
          and Google Analytics runs in Consent Mode: it sends cookieless,
          IP-anonymised pings that cannot recognise you across visits. No
          analytics cookies are written.
        </li>
        <li>
          <strong>After Accept cookies</strong> — Google Analytics may also set
          its _ga cookies so repeat visits can be counted more accurately.
        </li>
      </LegalUl>
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

      <LegalH2 id="ads">6. Advertising (Google AdSense)</LegalH2>
      <p>
        We show ads through Google AdSense to keep guides and calculators
        free. Google and its partners use cookies to serve ads based on your
        visits to this and other sites, limit how often you see an ad, and
        measure performance.
      </p>
      <LegalUl>
        <li>
          <strong>Before you choose</strong> — ads may be personalised. In
          the EEA, UK and Switzerland, ads stay non-personalised until you
          choose <strong>Accept cookies</strong>.
        </li>
        <li>
          <strong>Reject optional cookies</strong> — ads are still shown but
          are non-personalised (based on the page, not your history), and
          Google limits its use of advertising cookies.
        </li>
        <li>
          You can also opt out of personalised advertising across the web at{" "}
          <a
            href="https://adssettings.google.com"
            className="fk-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Ads Settings
          </a>
          . See{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            className="fk-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            how Google uses cookies in advertising
          </a>
          .
        </li>
      </LegalUl>
      <p>
        We do not run remarketing tags or affiliate tracking cookies. If that
        changes, we will update this policy and the{" "}
        <Link href="/affiliate-disclosure" className="fk-link">
          Affiliate Disclosure
        </Link>
        .
      </p>

      <LegalH2 id="control">7. How to control</LegalH2>
      <LegalUl>
        <li>
          Use <strong>Cookie settings</strong> in the site footer:{" "}
          <strong>Accept cookies</strong>,{" "}
          <strong>Reject optional cookies</strong>, or Customize. Rejecting
          signs you out, deletes Google Analytics cookies and switches ads to
          non-personalised.
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
