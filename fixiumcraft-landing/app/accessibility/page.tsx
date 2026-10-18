import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { business } from "@/components/contentData";

const pageTitle = `Accessibility Statement | ${business.name}`;
const pageDescription = `${business.name} is committed to making this website usable for people with disabilities and aims to meet WCAG 2.1 Level AA. Contact us if you need help.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/accessibility" },
  ...socialMetadata({ title: pageTitle, description: pageDescription, path: "/accessibility" }),
};

// Static, hand-set date: only change it when the statement itself changes.
const LAST_UPDATED = "October 17, 2026";

const LINK =
  "font-semibold text-blue-800 underline underline-offset-2 hover:text-blue-900";

export default function AccessibilityStatementPage() {
  return (
    <LegalPageLayout title="Accessibility Statement" updated={LAST_UPDATED}>
      <LegalSection heading="Our commitment">
        <p>
          {business.name} wants everyone to be able to use this website,
          including people with disabilities. We work to meet the Web Content
          Accessibility Guidelines (WCAG) 2.1 at Level AA, the standard most
          commonly used to measure accessibility under the Americans with
          Disabilities Act (ADA).
        </p>
      </LegalSection>

      <LegalSection heading="What we have done">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Pages use clear headings and page regions, so screen reader users
            can move through them, and a &quot;Skip to main content&quot; link
            appears when you press Tab.
          </li>
          <li>
            Links, buttons, menus, the quote form and the photo uploader can be
            used with a keyboard alone, and show a visible focus outline.
          </li>
          <li>
            Informative images have text descriptions, and icon-only buttons
            (such as call, text and WhatsApp) have text labels for assistive
            technology.
          </li>
          <li>Form fields have labels, and error messages are announced.</li>
          <li>
            Text and buttons use colors with enough contrast against their
            backgrounds.
          </li>
          <li>
            Animations and smooth scrolling are turned off if your device is set
            to reduce motion.
          </li>
          <li>Pages adapt to phone, tablet and desktop screens.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Known limitations">
        <p>
          We review the site regularly, but we cannot promise it is free of
          barriers. Newly added pages, guides or photos may contain issues we
          have not found yet. This statement describes our good-faith effort. It
          is not a formal certification or a third-party audit.
        </p>
      </LegalSection>

      <LegalSection heading="Need help, or found a problem?">
        <p>
          If something on this site is hard to use, or you need information in
          another way, please tell us. Include the page address and what you
          were trying to do, and we will help directly and work on a fix. We aim
          to reply within two business days.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Email:{" "}
            <a href={`mailto:${business.email}`} className={LINK}>
              {business.email}
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href={business.phoneHref} className={LINK}>
              {business.phoneDisplay}
            </a>
          </li>
          <li>
            Text message:{" "}
            <a href={business.smsHref} className={LINK}>
              {business.phoneDisplay}
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Other ways to book a service">
        <p>
          You never need the website to get a quote. Call or text us at{" "}
          <a href={business.phoneHref} className={LINK}>
            {business.phoneDisplay}
          </a>{" "}
          or email us, and we will give you the same flat-rate quote and book the
          visit.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
