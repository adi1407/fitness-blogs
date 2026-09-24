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
  LEGAL_OPERATOR,
  LEGAL_OPERATOR_NOTE,
  LEGAL_RELATED,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for fitlives — educational fitness content, calculators, and Google member accounts. Not medical advice.",
  alternates: { canonical: "/terms" },
};

const toc = [
  { id: "agreement", label: "Agreement" },
  { id: "who", label: "Who we are" },
  { id: "eligibility", label: "Eligibility (18+)" },
  { id: "educational", label: "Educational use only" },
  { id: "calculators", label: "Calculators and databases" },
  { id: "accounts", label: "Accounts and Google sign-in" },
  { id: "conduct", label: "Acceptable use" },
  { id: "ip", label: "Intellectual property" },
  { id: "third-party", label: "Third-party services" },
  { id: "disclaimers", label: "No warranties" },
  { id: "liability", label: "Limitation of liability" },
  { id: "indemnity", label: "Indemnity" },
  { id: "termination", label: "Suspension and termination" },
  { id: "changes", label: "Changes" },
  { id: "law", label: "Governing law" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Use"
      intro="These Terms govern your use of the fitlives website, calculators, and member features (including Google sign-in, upvotes, bookmarks, and sharing)."
      toc={toc}
      related={[
        LEGAL_RELATED.privacy,
        LEGAL_RELATED.medical,
        LEGAL_RELATED.nutrition,
        LEGAL_RELATED.cookies,
        LEGAL_RELATED.contact,
      ]}
    >
      <LegalH2 id="agreement">1. Agreement to these Terms</LegalH2>
      <p>
        By accessing or using fitlives (the “Site”), including signing in
        with Google, you agree to these Terms of Use and to our{" "}
        <Link href="/privacy" className="fk-link">
          Privacy Policy
        </Link>
        ,{" "}
        <Link href="/medical-disclaimer" className="fk-link">
          Medical Disclaimer
        </Link>
        , and{" "}
        <Link href="/nutrition-disclaimer" className="fk-link">
          Nutrition Disclaimer
        </Link>
        . If you do not agree, do not use the Site.
      </p>

      <LegalH2 id="who">2. Who we are</LegalH2>
      <p>
        {LEGAL_OPERATOR_NOTE} In these Terms, “we”, “us”, and “{LEGAL_OPERATOR}”
        mean the operator of this Site. We are not a hospital, clinic,
        pharmacy, or licensed healthcare practice.
      </p>

      <LegalH2 id="eligibility">3. Eligibility (18+)</LegalH2>
      <p>
        The Site, including member accounts, is intended for people who are{" "}
        <strong>18 years of age or older</strong> and able to form a binding
        contract under Indian law. If you are under 18, do not create an
        account or use member features. Parents and guardians should supervise
        any use of educational content by minors.
      </p>

      <LegalH2 id="educational">4. Educational information only — not medical care</LegalH2>
      <p>
        All content — articles, guides, calculators, food listings, exercise
        descriptions, and community actions — is for <strong>general
        education</strong> only. It is not medical advice, diagnosis, treatment,
        or a substitute for a qualified doctor, dietitian, physiotherapist, or
        other professional. Use of the Site does{" "}
        <strong>not</strong> create a doctor–patient, dietitian–client, or
        similar professional relationship.
      </p>
      <LegalUl>
        <li>
          Do not start, stop, or change medication, supplements, or treatment
          because of something on this Site.
        </li>
        <li>
          If you think you have a medical emergency, contact local emergency
          services immediately. Do not email us for emergencies.
        </li>
        <li>
          High-risk situations (pregnancy, eating disorders, kidney disease,
          heart disease, injury, or other diagnosed conditions) require
          individualized professional guidance before diet or training changes.
        </li>
      </LegalUl>

      <LegalH2 id="calculators">5. Calculators, foods, and exercises</LegalH2>
      <p>
        Protein, TDEE, calorie, macro, BMR, and BMI tools use simplified
        formulas. Outputs are <strong>estimates</strong>, not clinical
        measurements or medical devices. Food entries (including Indian foods)
        are approximate and can differ by brand, recipe, and portion. Exercise
        descriptions do not replace in-person coaching; poor form can cause
        injury. You assume the risk of using any estimate or routine.
      </p>

      <LegalH2 id="accounts">6. Accounts and Google sign-in</LegalH2>
      <p>
        Optional member accounts use Google OAuth (openid, email, profile
        only). We do not receive your Gmail inbox. You must keep your Google
        account secure. You are responsible for activity under your session.
        Member features currently include saving (bookmarks), upvoting
        articles, and sharing. We may store a session token in your browser
        (for example local storage). We may suspend accounts that violate these
        Terms.
      </p>

      <LegalH2 id="conduct">7. Acceptable use</LegalH2>
      <p>You agree not to:</p>
      <LegalUl>
        <li>Use the Site for unlawful purposes, scams, or harassment.</li>
        <li>
          Scrape, overload, reverse-engineer, or attempt unauthorized access
          to our systems or other users’ data.
        </li>
        <li>
          Post or submit medical claims, personal health data of others, or
          content we reasonably consider harmful, defamatory, or misleading.
        </li>
        <li>
          Impersonate fitlives, staff, or another person.
        </li>
        <li>
          Circumvent educational disclaimers or calculator gates.
        </li>
      </LegalUl>
      <p>
        We may remove engagement (upvotes, bookmarks) or disable access at our
        discretion to protect readers and the Site.
      </p>

      <LegalH2 id="ip">8. Intellectual property</LegalH2>
      <p>
        Site design, original text, branding, and software are owned by us or
        our licensors. You may share links to public pages. You may not copy
        substantial article text, databases, or calculators for a competing
        product without permission. Third-party trademarks (for example Google)
        belong to their owners.
      </p>

      <LegalH2 id="third-party">9. Third-party services and links</LegalH2>
      <p>
        The Site relies on providers such as Google (sign-in), hosting
        (currently Vercel and Render), and analytics (OpenPanel / Google
        Analytics). Outbound
        links (research, social share windows) are not under our control. Their
        terms and privacy policies apply.
      </p>

      <LegalH2 id="disclaimers">10. No warranties</LegalH2>
      <p>
        The Site is provided <strong>“as is”</strong> and{" "}
        <strong>“as available”</strong> without warranties of any kind, whether
        express or implied, including accuracy, completeness, fitness for a
        particular purpose, or uninterrupted operation. We do not warrant that
        content is error-free or that calculators match your physiology.
      </p>

      <LegalH2 id="liability">11. Limitation of liability</LegalH2>
      <p>
        To the maximum extent permitted by applicable Indian law, fitlives
        and its operator will not be liable for indirect, incidental, special,
        consequential, or punitive damages, or for loss of data, profits, or
        health outcomes arising from your use of the Site. Our total liability
        for claims relating to the Site will not exceed the greater of (a) the
        amount you paid us in the three months before the claim (currently
        typically zero, as the Site is free) or (b) INR 1,000. Nothing in these
        Terms excludes liability that cannot be excluded by law (for example
        fraud).
      </p>

      <LegalH2 id="indemnity">12. Indemnity</LegalH2>
      <p>
        You agree to indemnify and hold harmless fitlives and its operator
        from claims, damages, and reasonable legal costs arising from your
        misuse of the Site, your violation of these Terms, or your
        infringement of another person’s rights, except to the extent caused
        by our willful misconduct.
      </p>

      <LegalH2 id="termination">13. Suspension and termination</LegalH2>
      <p>
        You may stop using the Site at any time. We may suspend or terminate
        access, including member sessions, if we believe these Terms are
        breached, if required by law, or if we discontinue the service. Some
        sections (including disclaimers, liability, and indemnity) survive
        termination.
      </p>

      <LegalH2 id="changes">14. Changes to these Terms</LegalH2>
      <p>
        We may update these Terms. The “Last updated” date at the top will
        change. Continued use after an update constitutes acceptance of the
        revised Terms. Material changes may also be noted on the Site.
      </p>

      <LegalH2 id="law">15. Governing law</LegalH2>
      <p>
        These Terms are governed by the laws of India. Subject to mandatory
        consumer protections that apply to you, courts in India shall have
        exclusive jurisdiction over disputes arising from the Site. If a
        provision is held unenforceable, the rest remains in effect.
      </p>

      <LegalH2 id="contact">16. Contact</LegalH2>
      <p>
        Legal notices and Terms questions:{" "}
        <a href={LEGAL_CONTACT_MAILTO} className="fk-link">
          {LEGAL_CONTACT_EMAIL}
        </a>
        . Do not use this address for medical emergencies.
      </p>
    </LegalDocument>
  );
}
