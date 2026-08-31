import { StructuredData } from "@/components/structured-data";
import { plans } from "@/lib/pricing-data";
import { breadcrumbSchema, pricingSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import PricingPage from "./pricing-content";

export const metadata = pageSeo({
  title: "Pricing in BDT | Starter, Growth, Business",
  description:
    "Softune plans in Bangladeshi Taka. Starter ৳1,190, Growth ৳2,990, Business ৳6,990 per month — themes, payments, couriers, POS, and AI credits. Annual billing is cheaper.",
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
