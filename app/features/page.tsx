import { StructuredData } from "@/components/structured-data";
import { FEATURES_LIST } from "@/lib/features-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import FeaturesIndexPage from "./features-content";

export const metadata = pageSeo({
  title: "Dashboard Features for Bangladesh Stores",
  description:
    "Tour the Softune dashboard: live Theme Editor, orders, Store Sale POS, and Gemini AI — written for merchants selling in Bangladesh.",
  path: "/features",
});

function featuresListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Softune features",
    itemListElement: FEATURES_LIST.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      description: item.desc,
      url: `${SITE_URL}/features/${item.slug}`,
    })),
  };
}

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
        ])}
      />
      <StructuredData data={featuresListSchema()} />
      <FeaturesIndexPage />
    </>
  );
}
