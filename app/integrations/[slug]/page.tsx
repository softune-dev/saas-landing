import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { KeywordLanding } from "@/components/seo/keyword-landing";
import { INTEGRATIONS } from "@/lib/integrations-data";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(INTEGRATIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const integration = INTEGRATIONS[slug];
  if (!integration) return { title: "Not found" };
  return pageSeo({
    title: integration.title,
    description: integration.description,
    path: `/integrations/${slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const integration = INTEGRATIONS[slug];
  if (!integration) notFound();

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: `${integration.h1Start} ${integration.h1Highlight}`, path: `/integrations/${slug}` },
        ])}
      />
      {integration.faqs?.length ? <StructuredData data={faqPageSchema(integration.faqs)} /> : null}
      <KeywordLanding data={integration} />
    </>
  );
}
