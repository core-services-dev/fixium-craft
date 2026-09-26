import ServicePage, { getServicePageMetadata } from "@/components/ServicePage";

export const metadata = getServicePageMetadata("tv-mounting-pittsburgh");

export default function Page() {
  return <ServicePage slug="tv-mounting-pittsburgh" />;
}
