import { StructuredData } from "@/components/structured-data";
import { THEMES } from "@/lib/themes-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import ThemesIndexPage from "./themes-index-content";

export const metadata = pageSeo({
  title: "Storefront Themes for Bangladesh Ecommerce",
  description:
    "Browse every Softunebd storefront theme — fashion, general/multi-category, and digital goods layouts. Every theme is fully editable in the Theme Editor.",
  path: "/themes",
});

function themesListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Softunebd storefront themes",
    itemListElement: THEMES.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      description: t.vibe,
      url: `${SITE_URL}/themes`,
    })),
  };
}

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Themes", path: "/themes" },
        ])}
      />
      <StructuredData data={themesListSchema()} />
      <ThemesIndexPage />
    </>
  );
}
