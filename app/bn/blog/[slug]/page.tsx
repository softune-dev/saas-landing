import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { ARTICLES } from "@/lib/blog-data";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import ArticlePage from "@/app/blog/[slug]/article-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return {};
  const parsedDate = new Date(article.date);
  const publishedTime = Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString();
  return pageSeo({
    title: article.title,
    description: article.desc,
    path: `/bn/blog/${slug}`,
    image: article.image,
    imageAlt: article.title,
    lang: "bn",
    article: { publishedTime, author: article.author },
  });
}

export default async function BanglaBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "ব্লগ", path: "/bn/blog" },
          { name: article.title, path: `/bn/blog/${slug}` },
        ])}
      />
      <StructuredData
        data={articleSchema({
          title: article.title,
          description: article.desc,
          image: article.image || "/og-image.png",
          path: `/bn/blog/${slug}`,
          datePublished: article.date,
          author: article.author,
          lang: "bn",
        })}
      />
      <ArticlePage params={params} locale="bn" />
    </>
  );
}

