import ServicePage, { getServicePageMetadata } from "@/components/ServicePage";

export const metadata = getServicePageMetadata("handyman-pittsburgh");

export default function Page() {
  return <ServicePage slug="handyman-pittsburgh" />;
}
