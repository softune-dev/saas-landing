import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { FEATURE_PAGES } from "@/lib/features-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import FeaturePage from "./feature-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = FEATURE_PAGES[slug] || FEATURE_PAGES["multiple-themes"];
  return pageSeo({
    title: `${feature.titleStart} ${feature.titleHighlight} ${feature.titleEnd}`,
    description: feature.description,
    path: `/features/${slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const feature = FEATURE_PAGES[slug] || FEATURE_PAGES["multiple-themes"];

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          {
            name: `${feature.titleStart} ${feature.titleHighlight}`.trim(),
            path: `/features/${slug}`,
          },
        ])}
      />
      <FeaturePage />
    </>
  );
}
