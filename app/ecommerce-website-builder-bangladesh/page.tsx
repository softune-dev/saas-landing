import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { KeywordLanding } from "@/components/seo/keyword-landing";
import { COMMERCIAL_PAGES } from "@/lib/commercial-pages-data";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";

const SLUG = "ecommerce-website-builder-bangladesh";
const page = COMMERCIAL_PAGES[SLUG];

export const metadata: Metadata = pageSeo({
  title: page.title,
  description: page.description,
  path: `/${SLUG}`,
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: `${page.h1Start} ${page.h1Highlight}`, path: `/${SLUG}` },
        ])}
      />
      {page.faqs?.length ? <StructuredData data={faqPageSchema(page.faqs)} /> : null}
      <KeywordLanding data={page} />
    </>
  );
}
