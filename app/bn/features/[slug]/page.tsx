import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { FEATURE_PAGES, getFeaturePage } from "@/lib/features-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import FeaturePage from "@/app/features/[slug]/feature-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(FEATURE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeaturePage(slug, "bn");
  if (!feature) return { title: "Not found" };
  const headline = `${feature.titleStart} ${feature.titleHighlight} ${feature.titleEnd}`.replace(/\s+/g, " ").trim();
  return pageSeo({
    title: `${feature.pillText} | ${headline}`,
    description: feature.description,
    path: `/bn/features/${slug}`,
    lang: "bn",
  });
}

export default async function BanglaFeatureDetailPage({ params }: Props) {
  const { slug } = await params;
  const feature = getFeaturePage(slug, "bn");
  if (!feature) notFound();

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "ফিচারসমূহ", path: "/bn/features" },
          {
            name: feature.pillText,
            path: `/bn/features/${slug}`,
          },
        ])}
      />
      <FeaturePage locale="bn" />
    </>
  );
}
