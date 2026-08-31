import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { FEATURE_PAGES, FEATURES_LIST } from "@/lib/features-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import FeaturePage from "./feature-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(FEATURE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = FEATURE_PAGES[slug];
  if (!feature) return { title: "Not found" };
  const listed = FEATURES_LIST.find((f) => f.slug === slug);
  return pageSeo({
    title: listed?.title ?? feature.pillText,
    description: feature.description,
    path: `/features/${slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const feature = FEATURE_PAGES[slug];
  if (!feature) notFound();
  const listed = FEATURES_LIST.find((f) => f.slug === slug);

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          {
            name: listed?.title ?? feature.pillText,
            path: `/features/${slug}`,
          },
        ])}
      />
      <FeaturePage />
    </>
  );
}
