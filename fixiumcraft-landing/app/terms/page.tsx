import type { Metadata } from "next";
import Link from "next/link";
import { socialMetadata } from "@/lib/seo";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { business, services } from "@/components/contentData";

const pageTitle = `Terms of Service | ${business.name}`;
const pageDescription = `The terms that apply to furniture assembly, wall mounting, and home repair services booked through ${business.name}.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/terms" },
  ...socialMetadata({ title: pageTitle, description: pageDescription, path: "/terms" }),
};

// See the matching note in app/privacy/page.tsx — a static, hand-set date,
// not `new Date()`.
const LAST_UPDATED = "November 18, 2026";

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" updated={LAST_UPDATED}>
      <LegalSection heading="Agreement to Terms">
        <p>
          These Terms of Service ("Terms") govern any furniture assembly,
          wall mounting, or home repair service booked with{" "}
          {business.name} ("we," "us," or "our") in{" "}
          {business.serviceArea}. By requesting a quote, booking a job, or
          otherwise using our services, you agree to these Terms.
        </p>
      </LegalSection>

      <LegalSection heading="Services We Provide">
        <p>Fixium Craft technicians currently provide:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          {services.map((service) => (
            <li key={service.id}>
              <strong>{service.title}</strong> — {service.description}
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection heading="Quotes & Pricing">
        <p>
          Quotes are prepared based on the details and photos you provide
          when you submit a request. The "starting at" prices shown on the
          Site reflect typical jobs of that type — your actual quote may
          differ once we know the specifics of your job. We give you a firm,
          flat-rate price before any work begins, and we do not add charges
          beyond that quote unless the scope of the job changes once we
          arrive (for example, unexpected damage found during the job) — in
          which case we'll explain the change and get your approval before
          proceeding.
        </p>
      </LegalSection>

      <LegalSection heading="Scheduling & Access">
        <p>
          Same-day and next-day appointments are offered subject to
          availability. You're responsible for making sure our technician
          can safely access the area where the work will be done, and for
          providing accurate information about the job (including any
          specific furniture model, mounting surface, or existing damage)
          when you request your quote — inaccurate details may affect the
          final price or require rescheduling.
        </p>
      </LegalSection>

      <LegalSection heading="Cancellations & Rescheduling">
        <p>
          We understand plans change — please give us as much notice as
          possible if you need to cancel or reschedule, so we can offer that
          time slot to another customer. Repeated last-minute cancellations
          or no-shows may affect our ability to offer future same-day
          scheduling.
        </p>
      </LegalSection>

      <LegalSection heading="Payment">
        <p>
          Payment is due upon completion of the work, unless another
          arrangement has been confirmed with you in writing beforehand. The
          price you're charged is the flat-rate quote you agreed to, subject
          only to the scope changes described above.
        </p>
      </LegalSection>

      <LegalSection heading="Our Guarantee">
        <p>
          If you're not satisfied with completed work, let us know and
          we'll make it right at no extra cost. This guarantee covers the
          quality of our workmanship on the job as quoted; it does not cover
          pre-existing damage, defects in materials or furniture you
          supplied, or issues arising from normal wear after completion.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          We take care to protect your home
          and belongings on every job. That said, to the fullest extent
          permitted by law, our liability for any claim relating to a
          service is limited to the amount you paid for that service. We
          are not responsible for pre-existing structural issues, defects in
          customer-supplied furniture or hardware, or damage arising from
          conditions not disclosed to us before the job (for example,
          weakened drywall behind a mounting point that wasn't visible or
          mentioned beforehand).
        </p>
      </LegalSection>

      <LegalSection heading="SMS Text Messaging" id="sms-messaging">
        <p>
          If you check the SMS consent box on our quote form, you agree to
          receive text messages from {business.name} about appointment
          reminders, estimates, project updates, and customer support. You
          can still request a quote without checking the box, and consent is
          not a condition of purchase.
        </p>
        <p>
          Message frequency varies. Message and data rates may apply. Reply
          STOP at any time to opt out, or HELP for assistance. After you
          opt out we may send one last message confirming it. For help you
          can also call {business.phoneDisplay} or email {business.email}.
          Carriers are not liable for delayed or undelivered messages.
        </p>
        <p>
          We do not sell your mobile number or share it with third parties
          for their marketing. See our{" "}
          <Link href="/privacy" className="font-semibold text-blue-800 underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          for how we handle your information.
        </p>
      </LegalSection>

      <LegalSection heading="Governing Law">
        <p>
          These Terms are governed by the laws of the Commonwealth of
          Pennsylvania, without regard to its conflict-of-laws principles.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to These Terms">
        <p>
          We may update these Terms from time to time. The "Last updated"
          date at the top of this page reflects the most recent revision.
          Continuing to book or use our services after changes are posted
          means you accept the updated Terms.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Us">
        <p>
          Questions about these Terms? Reach us at{" "}
          <a href={`mailto:${business.email}`} className="font-semibold text-blue-800 underline underline-offset-2 hover:text-blue-900">
            {business.email}
          </a>{" "}
          or{" "}
          <a href={business.phoneHref} className="font-semibold text-blue-800 underline underline-offset-2 hover:text-blue-900">
            {business.phoneDisplay}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
