import { StructuredData } from "@/components/structured-data";
import { faqPageSchema, productSchema, softwareApplicationSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { homeFaqs } from "@/lib/home-faq-data";
import HomePage from "./home-content";

export const metadata = pageSeo({
  title: null,
  description:
    "Start a free 3-day Softunebd trial — no credit card. Launch a Bangladesh store that looks like your brand, with COD, bKash, Nagad, and Pathao or Steadfast.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <StructuredData data={softwareApplicationSchema()} />
      <StructuredData data={productSchema()} />
      <StructuredData data={faqPageSchema(homeFaqs)} />
      <HomePage />
    </>
  );
}
