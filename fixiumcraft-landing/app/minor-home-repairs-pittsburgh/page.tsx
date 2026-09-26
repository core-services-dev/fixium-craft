import ServicePage, { getServicePageMetadata } from "@/components/ServicePage";

export const metadata = getServicePageMetadata("minor-home-repairs-pittsburgh");

export default function Page() {
  return <ServicePage slug="minor-home-repairs-pittsburgh" />;
}
