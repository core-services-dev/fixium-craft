import ServicePage, { getServicePageMetadata } from "@/components/ServicePage";

export const metadata = getServicePageMetadata("furniture-assembly-pittsburgh");

export default function Page() {
  return <ServicePage slug="furniture-assembly-pittsburgh" />;
}
