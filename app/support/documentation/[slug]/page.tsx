import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { getDocArticle } from "@/lib/documentation-articles";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import DocArticlePage from "./doc-article-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getDocArticle(slug);
  if (!article) {
    return pageSeo({
      title: "Documentation",
      description: "Softune documentation.",
      path: `/support/documentation/${slug}`,
      noindex: true,
    });
  }
  return pageSeo({
    title: article.title,
    description: article.desc,
    path: `/support/documentation/${slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = getDocArticle(slug);

  return (
    <>
      {article ? (
        <StructuredData
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Documentation", path: "/support/documentation" },
            { name: article.title, path: `/support/documentation/${slug}` },
          ])}
        />
      ) : null}
      <DocArticlePage />
    </>
  );
}
