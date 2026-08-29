import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { ARTICLES } from "@/lib/blog-data";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import ArticlePage from "./article-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return {};
  const parsedDate = new Date(article.date);
  const publishedTime = Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString();
  return pageSeo({
    title: article.title,
    description: article.desc,
    path: `/blog/${slug}`,
    image: article.image,
    article: { publishedTime, author: article.author },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: article.title, path: `/blog/${slug}` },
        ])}
      />
      <StructuredData
        data={articleSchema({
          title: article.title,
          description: article.desc,
          image: article.image || "/og-image.png",
          path: `/blog/${slug}`,
          datePublished: article.date,
          author: article.author,
          lang: article.lang,
        })}
      />
      <ArticlePage params={params} />
    </>
  );
}
