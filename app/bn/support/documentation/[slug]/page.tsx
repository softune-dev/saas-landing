import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { getAllDocSlugs, getDocArticle } from "@/lib/documentation-articles";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import DocArticlePage from "@/app/support/documentation/[slug]/doc-article-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getDocArticle(slug, "bn");
  if (!article) return { title: "Not found" };
  return pageSeo({
    title: article.title,
    description: article.desc,
    path: `/bn/support/documentation/${slug}`,
    lang: "bn",
  });
}

export default async function BanglaDocArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getDocArticle(slug, "bn");
  if (!article) notFound();

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "ডকুমেন্টেশন", path: "/bn/support/documentation" },
          { name: article.title, path: `/bn/support/documentation/${slug}` },
        ])}
      />
      <DocArticlePage locale="bn" />
    </>
  );
}
