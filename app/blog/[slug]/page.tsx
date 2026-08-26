import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { ARTICLES, DEFAULT_ARTICLE_SLUG } from "@/lib/blog-data";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import ArticlePage from "./article-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug] || ARTICLES[DEFAULT_ARTICLE_SLUG];
  return pageSeo({
    title: article.title,
    description: article.desc,
    path: `/blog/${slug}`,
    image: article.image,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES[slug] || ARTICLES[DEFAULT_ARTICLE_SLUG];

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
          image: article.image,
          path: `/blog/${slug}`,
          datePublished: article.date,
          author: article.author,
        })}
      />
      <ArticlePage params={params} />
    </>
  );
}
