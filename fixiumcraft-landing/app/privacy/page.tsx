import type { Metadata } from "next";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { business, seo } from "@/components/contentData";

export const metadata: Metadata = {
  title: `Privacy Policy | ${business.name}`,
  description: `How ${business.name} collects, uses, and protects the information you share when requesting a quote or booking a service.`,
  alternates: { canonical: "/privacy" },
};

// Static, hand-set date rather than `new Date()` — a "Last updated" line
// should only change when the policy text actually changes, not on every
// page load (see the same reasoning on business.hours/copyright, which
// intentionally *do* auto-update, elsewhere in this project).
const LAST_UPDATED = "September 22, 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updated={LAST_UPDATED}>
      <LegalSection heading="Introduction">
        <p>
          {business.legalName} ("{business.name}," "we," "us," or "our")
          provides furniture assembly, TV &amp; wall mounting, and minor home
          repair services in {business.serviceArea}. This Privacy Policy
          explains what information we collect through {seo.canonicalUrl}{" "}
          (the "Site"), how we use it, and the choices you have.
        </p>
        <p>
          By submitting a quote request or otherwise contacting us through
          the Site, you agree to the collection and use of information as
          described here.
        </p>
      </LegalSection>

      <LegalSection heading="Information We Collect">
        <p>
          We only collect what we need to quote, schedule, and complete your
          job. When you fill out our quote request form, we collect:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Name</strong> — so we know who we&apos;re speaking with.
          </li>
          <li>
            <strong>Phone number</strong> — required, so we can text or call
            you with your quote and confirm scheduling.
          </li>
          <li>
            <strong>Email address</strong> — optional, used only if you'd
            like us to follow up in writing.
          </li>
          <li>
            <strong>ZIP code / address details</strong> — to confirm you're
            within {business.serviceArea} and estimate travel.
          </li>
          <li>
            <strong>Service and job details</strong> — the service(s) you
            select, any notes you add, and an optional photo of the job, so
            we can give you an accurate flat-rate quote.
          </li>
        </ul>
        <p>
          We do not collect payment card details, government ID numbers, or
          any other sensitive personal information through the Site.
        </p>
      </LegalSection>

      <LegalSection heading="How We Use Your Information">
        <p>
          Everything you submit is used strictly to communicate with you
          about your request and to schedule and deliver the service you
          asked for — specifically to:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Prepare and send you a flat-rate quote.</li>
          <li>Contact you by call, text/SMS, WhatsApp, or email to confirm details and scheduling.</li>
          <li>Coordinate the technician assigned to your job.</li>
          <li>Keep a basic record of past requests for scheduling and quality purposes.</li>
        </ul>
        <p>
          We do not sell, rent, or use your information for advertising, and
          we do not share it with anyone outside of delivering the service
          you requested.
        </p>
      </LegalSection>

      <LegalSection heading="How Your Request Is Delivered to Us">
        <p>
          When you submit the quote form, it's sent directly to our team
          through two channels: an instant alert via the Telegram Bot API,
          and (when available) an email through our transactional email
          provider, Resend. Both are notification services we use
          internally to receive your request promptly — neither uses your
          information for their own marketing, and neither is a
          third-party advertiser.
        </p>
        <p>
          If you upload a photo with your request, it is sent through the
          same channels solely so we can quote your job accurately.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies & Tracking">
        <p>
          The Site does not use advertising cookies, third-party trackers,
          or analytics pixels. Our hosting provider may collect standard,
          anonymized server logs (such as request timestamps and IP
          addresses) for security and performance purposes; we do not use
          these logs to identify individual visitors.
        </p>
      </LegalSection>

      <LegalSection heading="Data Retention">
        <p>
          We retain quote request information for as long as reasonably
          necessary to complete your job, follow up on any related work, and
          maintain basic business records — and no longer than needed for
          those purposes.
        </p>
      </LegalSection>

      <LegalSection heading="Your Choices & Rights">
        <p>
          You can ask us to access, correct, or delete the information
          we hold about you at any time by contacting us using the details
          below. We'll respond promptly and honor reasonable requests.
        </p>
      </LegalSection>

      <LegalSection heading="Children's Privacy">
        <p>
          The Site is intended for adults seeking home services and is not
          directed at children. We do not knowingly collect information
          from children.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes in our practices. The "Last updated" date at the top of
          this page reflects the most recent revision. Continued use of the
          Site after changes are posted means you accept the updated policy.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Us">
        <p>
          Questions about this Privacy Policy or your information? Reach us
          at{" "}
          <a href={`mailto:${business.email}`} className="font-medium text-sky-600 hover:underline">
            {business.email}
          </a>{" "}
          or{" "}
          <a href={business.phoneHref} className="font-medium text-sky-600 hover:underline">
            {business.phoneDisplay}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
