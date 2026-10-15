import { notFound } from "next/navigation";
import GuidePage, { getGuideMetadata } from "@/components/GuidePage";
import { getAllGuides, getGuide } from "@/lib/guides";

// Every file in content/guides/ becomes a statically generated page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  return getGuideMetadata(slug);
}

export default async function Page({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  if (!getGuide(slug)) notFound();
  return <GuidePage slug={slug} />;
}
