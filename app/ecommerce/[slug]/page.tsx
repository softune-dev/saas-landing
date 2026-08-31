import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { KeywordLanding } from "@/components/seo/keyword-landing";
import { INDUSTRY_PAGES } from "@/lib/industry-data";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(INDUSTRY_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRY_PAGES[slug];
  if (!industry) return { title: "Not found" };
  return pageSeo({
    title: industry.title,
    description: industry.description,
    path: `/ecommerce/${slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const industry = INDUSTRY_PAGES[slug];
  if (!industry) notFound();

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: `${industry.h1Start} ${industry.h1Highlight}`, path: `/ecommerce/${slug}` },
        ])}
      />
      {industry.faqs?.length ? <StructuredData data={faqPageSchema(industry.faqs)} /> : null}
      <KeywordLanding data={industry} />
    </>
  );
}
