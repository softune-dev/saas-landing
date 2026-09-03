import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, pricingSchema, productSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import PricingPage from "@/app/pricing/pricing-content";

export const metadata = pageSeo({
  title: "Softunebd প্রাইসিং প্ল্যান — টাকায় পেমেন্ট",
  description:
    "Softunebd-এ কোনো ক্রেডিট কার্ড ছাড়াই ৩ দিনের ফ্রি ট্রায়াল শুরু করুন। এরপর টাকাতেই বেছে নিন Starter, Growth বা Business প্ল্যান — কোনো হিডেন চার্জ বা পার-অর্ডার ফি নেই।",
  path: "/bn/pricing",
  lang: "bn",
});

export default function BanglaPricingPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "প্রাইসিং", path: "/bn/pricing" },
        ])}
      />
      <StructuredData data={productSchema()} />
      <StructuredData data={pricingSchema()} />
      <PricingPage locale="bn" />
    </>
  );
}

