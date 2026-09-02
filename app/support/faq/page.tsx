import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { faqData } from "@/lib/faq-data";
import FAQPage from "./faq-content";

export const metadata = pageSeo({
  title: "FAQ | Payments, Couriers & Plans",
  description:
    "Answers about Softune's 3-day free trial (no credit card), plans, COD, bKash, Nagad, SSLCommerz, courier connects, and launching a store in Bangladesh.",
  path: "/support/faq",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/support/faq" },
        ])}
      />
      <StructuredData data={faqPageSchema(faqData)} />
      <FAQPage />
    </>
  );
}
