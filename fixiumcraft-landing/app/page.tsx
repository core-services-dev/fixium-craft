import LandingPage from "@/components/LandingPage";
import { localBusinessSchema, faq } from "@/components/contentData";

// FAQPage JSON-LD, built from the same `faq` array LandingPage.jsx's FAQ
// section renders — so this can't list a question the page doesn't
// actually show. Server-rendered here (not inside the client FAQ()
// component) for the same reason as localBusinessSchema below: present in
// the initial HTML with no hydration involved.
const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      {/* JSON-LD structured data (schema.org HandymanService) — rendered
          server-side here rather than inside LandingPage (a client
          component) so it's present in the initial HTML crawlers see,
          with no hydration involved. See contentData.js for the schema
          itself and why this type/shape was chosen. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <LandingPage />
    </>
  );
}
