import { StructuredData } from "@/components/structured-data";
import { faqPageSchema, productSchema, softwareApplicationSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { homeFaqsBn } from "@/lib/home-faq-data";
import HomePage from "../home-content";

export const metadata = pageSeo({
  title: null,
  description:
    "Softunebd-এ শুরু করুন ৩ দিনের ফ্রি ট্রায়াল — কোনো ক্রেডিট কার্ড লাগবে না। আপনার ব্র্যান্ডের মতো প্রফেশনাল অনলাইন স্টোর বানান, সাথে COD, bKash, Nagad, SSLCommerz এবং লোকাল কুরিয়ার সাপোর্ট।",
  path: "/bn",
  lang: "bn",
});

export default function BanglaHomePage() {
  return (
    <>
      <StructuredData data={softwareApplicationSchema()} />
      <StructuredData data={productSchema()} />
      <StructuredData data={faqPageSchema(homeFaqsBn)} />
      <HomePage locale="bn" />
    </>
  );
}

