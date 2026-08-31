import { StructuredData } from "@/components/structured-data";
import { faqPageSchema, productSchema, softwareApplicationSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { homeFaqs } from "@/lib/home-faq-data";
import HomePage from "./home-content";

export const metadata = pageSeo({
  title: null,
  description:
    "Softune helps Bangladeshi merchants launch an online store without code. Then collect COD, bKash, or Nagad and ship with Pathao or Steadfast.",
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
