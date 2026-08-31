import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, pricingSchema, productSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import PricingPage from "./pricing-content";

export const metadata = pageSeo({
  title: "Softune Pricing in Taka",
  description:
    "Starter, Growth, and Business plans priced in BDT. Pick a monthly or yearly Softune subscription — no per-order cut, no setup fee.",
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
