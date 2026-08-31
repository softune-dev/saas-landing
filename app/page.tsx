import { StructuredData } from "@/components/structured-data";
import { faqPageSchema, softwareApplicationSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { homeFaqs } from "@/lib/home-faq-data";
import HomePage from "./home-content";

export const metadata = pageSeo({
  title: null,
  description:
    "Launch an online store in Bangladesh with Softune. COD, bKash, Nagad, SSLCommerz, Steadfast, Pathao, RedX, eCourier, Store Sale POS, Theme Editor, and Gemini AI — one dashboard, no code.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <StructuredData data={softwareApplicationSchema()} />
      <StructuredData data={faqPageSchema(homeFaqs)} />
      <HomePage />
    </>
  );
}
