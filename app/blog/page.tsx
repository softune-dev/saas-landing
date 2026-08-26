import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import BlogPage from "./blog-content";

export const metadata = pageSeo({
  title: "Blog",
  description:
    "Guides on conversion optimization, storefront design, courier automation, and running an online store — from the team building Softune.",
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
      <BlogPage />
    </>
  );
}
