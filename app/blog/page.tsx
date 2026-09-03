import { StructuredData } from "@/components/structured-data";
import { BLOG_POSTS } from "@/lib/blog-data";
import { blogIndexSchema, breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import BlogPage from "./blog-content";

export const metadata = pageSeo({
  title: "Ecommerce Guides for Bangladesh Shop Owners",
  description:
    "Short, practical Softunebd articles: move off Facebook Page orders, set up COD, cut fake deliveries, and grow a shop from one product.",
  path: "/blog",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <StructuredData data={blogIndexSchema(BLOG_POSTS)} />
      <BlogPage />
    </>
  );
}
