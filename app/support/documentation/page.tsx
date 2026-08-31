import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import DocumentationPage from "./documentation-content";

export const metadata = pageSeo({
  title: "Documentation | Set Up Your Store",
  description:
    "Softune docs for products, categories, orders, Theme Editor, payments (COD, bKash, Nagad, SSLCommerz), couriers, domains, and fraud tools.",
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
