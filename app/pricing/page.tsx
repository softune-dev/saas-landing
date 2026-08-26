import { StructuredData } from "@/components/structured-data";
import { plans } from "@/lib/pricing-data";
import { breadcrumbSchema, pricingSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import PricingPage from "./pricing-content";

export const metadata = pageSeo({
  title: "Pricing",
  description:
    "Simple, transparent pricing for Softune's ecommerce platform — pick a plan for AI credits, storage, and features that fit your store's stage.",
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
      <StructuredData data={pricingSchema(plans)} />
      <PricingPage />
    </>
  );
}
