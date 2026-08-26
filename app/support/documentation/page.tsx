import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import DocumentationPage from "./documentation-content";

export const metadata = pageSeo({
  title: "Documentation",
  description: "Guides for setting up your Softune store — products, categories, orders, themes, payments, and couriers.",
  path: "/support/documentation",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Documentation", path: "/support/documentation" },
        ])}
      />
      <DocumentationPage />
    </>
  );
}
