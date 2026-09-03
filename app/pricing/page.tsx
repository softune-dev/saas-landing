import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, pricingSchema, productSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import PricingPage from "./pricing-content";

export const metadata = pageSeo({
  title: "Softunebd Pricing in Taka",
  description:
    "Start a free 3-day Softunebd trial with no credit card. Then pick Starter, Growth, or Business in BDT — no per-order cut, no setup fee.",
  path: "/pricing",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <StructuredData data={productSchema()} />
      <StructuredData data={pricingSchema()} />
      <PricingPage />
    </>
  );
}
