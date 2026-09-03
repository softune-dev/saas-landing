import { StructuredData } from "@/components/structured-data";
import { BLOG_POSTS } from "@/lib/blog-data";
import { blogIndexSchema, breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import BlogPage from "@/app/blog/blog-content";

export const metadata = pageSeo({
  title: "ই-কমার্স গাইড ও ব্লগ | Softunebd",
  description:
    "বাংলাদেশের অনলাইন মার্চেন্টদের জন্য বাস্তবমুখী নিবন্ধ: ফেসবুক পেজ অর্ডার থেকে ওয়েবসাইটে স্থানান্তর, COD সেটআপ এবং ফেক ডেলিভারি কমানোর কৌশল।",
  path: "/bn/blog",
  lang: "bn",
});

export default function BanglaBlogPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "ব্লগ", path: "/bn/blog" },
        ])}
      />
      <StructuredData data={blogIndexSchema(BLOG_POSTS)} />
      <BlogPage locale="bn" />
    </>
  );
}

