import { StructuredData } from "@/components/structured-data";
import { FEATURES_LIST } from "@/lib/features-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import FeaturesIndexPage from "@/app/features/features-content";

export const metadata = pageSeo({
  title: "Softunebd ড্যাশবোর্ড ফিচারসমূহ",
  description:
    "Softunebd-এর সব ফিচার ঘুরে দেখুন ৩ দিনের ফ্রি ট্রায়ালে — কোনো কার্ড লাগবে না। Theme Editor, অর্ডার ম্যানেজমেন্ট, Store Sale POS এবং Gemini AI ই-কমার্স বিজনেসের জন্য।",
  path: "/bn/features",
  lang: "bn",
});

function featuresListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Softunebd features",
    itemListElement: FEATURES_LIST.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      description: item.desc,
      url: `${SITE_URL}/bn/features/${item.slug}`,
    })),
  };
}

export default function BanglaFeaturesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "ফিচারসমূহ", path: "/bn/features" },
        ])}
      />
      <StructuredData data={featuresListSchema()} />
      <FeaturesIndexPage locale="bn" />
    </>
  );
}

