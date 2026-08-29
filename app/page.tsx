import { StructuredData } from "@/components/structured-data";
import { faqPageSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { homeFaqs } from "@/lib/home-faq-data";
import HomePage from "./home-content";

export const metadata = pageSeo({
  title: null,
  description:
    "Built for Bangladeshi merchants: Cash on Delivery plus bKash and Nagad checkout, courier connections, Store Sale POS, Theme Editor, and Gemini AI — one Softune dashboard to launch and grow your online store.",
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
