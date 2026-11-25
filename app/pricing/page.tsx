import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, pricingSchema, productSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import PricingPage from "./pricing-content";

export const metadata = pageSeo({
  title: "SoftuneBD Pricing in Taka",
  description:
    "SoftuneBD has a Free plan, then Starter, Growth and Business in BDT for 1, 3, 6 or 12 months - no per-order cut, no setup fee.",
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
