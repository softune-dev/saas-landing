import { StructuredData } from "@/components/structured-data";
import { faqPageSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { homeFaqs } from "@/lib/home-faq-data";
import HomePage from "./home-content";

export const metadata = pageSeo({
  title: null,
  description:
    "Built for Bangladeshi merchants: bKash, Nagad, and Cash on Delivery checkout, plus local courier delivery, all built in. Themes, products, orders, and AI — one platform to launch and grow your online store.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <StructuredData data={faqPageSchema(homeFaqs)} />
      <HomePage />
    </>
  );
}
