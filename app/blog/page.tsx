import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import BlogPage from "./blog-content";

export const metadata = pageSeo({
  title: "Ecommerce Guides for Bangladesh",
  description:
    "Practical Softune guides for Bangladeshi store owners — Facebook Page to website, COD, bKash, couriers, and launching a store without code.",
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
