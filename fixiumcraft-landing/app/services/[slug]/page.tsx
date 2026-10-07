import { notFound } from "next/navigation";
import ServicePillarPage, { getPillar, getPillarMetadata } from "@/components/ServicePillarPage";
import { servicePillars } from "@/components/contentData";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  return getPillarMetadata(slug);
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  if (!getPillar(slug)) notFound();
  return <ServicePillarPage slug={slug} />;
}
