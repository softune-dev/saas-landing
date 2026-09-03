import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { faqDataBn } from "@/lib/faq-data";
import FAQPage from "@/app/support/faq/faq-content";

export const metadata = pageSeo({
  title: "FAQ | পেমেন্ট, কুরিয়ার ও প্ল্যানসমূহ",
  description:
    "Softunebd-এর ৩ দিনের ফ্রি ট্রায়াল, প্ল্যান, COD, bKash, Nagad, SSLCommerz এবং বাংলাদেশে অনলাইন স্টোর চালু করা সংক্রান্ত প্রশ্ন ও উত্তর।",
  path: "/bn/support/faq",
  lang: "bn",
});

export default function BanglaFaqPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "FAQ", path: "/bn/support/faq" },
        ])}
      />
      <StructuredData data={faqPageSchema(faqDataBn)} />
      <FAQPage locale="bn" />
    </>
  );
}

