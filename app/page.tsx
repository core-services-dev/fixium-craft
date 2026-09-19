import LandingPage from "@/components/LandingPage";
import { localBusinessSchema } from "@/components/contentData";

export default function Home() {
  return (
    <>
      {/* JSON-LD structured data (schema.org HomeAndConstructionBusiness) —
          rendered server-side here rather than inside LandingPage (a client
          component) so it's present in the initial HTML crawlers see,
          with no hydration involved. See contentData.js for the schema
          itself and why this type/shape was chosen. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <LandingPage />
    </>
  );
}
