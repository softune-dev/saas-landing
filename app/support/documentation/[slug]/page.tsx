import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { getAllDocSlugs, getDocArticle } from "@/lib/documentation-articles";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import DocArticlePage from "./doc-article-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getDocArticle(slug);
  if (!article) return { title: "Not found" };
  return pageSeo({
    title: article.title,
    description: article.desc,
    path: `/support/documentation/${slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = getDocArticle(slug);
  if (!article) notFound();

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Documentation", path: "/support/documentation" },
          { name: article.title, path: `/support/documentation/${slug}` },
        ])}
      />
      <DocArticlePage />
    </>
  );
}
