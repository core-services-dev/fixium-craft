import type { Metadata } from "next";
import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { business, services } from "@/components/contentData";

export const metadata: Metadata = {
  title: `Terms of Service | ${business.name}`,
  description: `The terms that apply to furniture assembly, wall mounting, and home repair services booked through ${business.name}.`,
  alternates: { canonical: "/terms" },
};

// See the matching note in app/privacy/page.tsx — a static, hand-set date,
// not `new Date()`.
const LAST_UPDATED = "September 22, 2026";

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" updated={LAST_UPDATED}>
      <LegalSection heading="Agreement to Terms">
        <p>
          These Terms of Service ("Terms") govern any furniture assembly,
          wall mounting, or home repair service booked with{" "}
          {business.legalName} ("{business.name}," "we," "us," or "our") in{" "}
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
          Our technicians are insured, and we take care to protect your home
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
          <a href={`mailto:${business.email}`} className="font-medium text-sky-600 hover:underline">
            {business.email}
          </a>{" "}
          or{" "}
          <a href={business.phoneHref} className="font-medium text-sky-600 hover:underline">
            {business.phoneDisplay}
          </a>
          .
        </p>
        <p className="text-xs text-slate-400">
          This page is a general template and isn't a substitute for advice
          from a licensed attorney familiar with your local requirements —
          consider having it reviewed before relying on it as your final
          terms.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
