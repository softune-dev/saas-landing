import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, pricingSchema, productSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import PricingPage from "@/app/pricing/pricing-content";

export const metadata = pageSeo({
  title: "SoftuneBD প্রাইসিং প্ল্যান - টাকায় পেমেন্ট",
  description:
    "SoftuneBD-এ ফ্রি প্ল্যান আছে, এরপর টাকাতেই 1, 3, 6 বা 12 মাসের জন্য বেছে নিন Starter, Growth বা Business - কোনো হিডেন চার্জ বা পার-অর্ডার ফি নেই।",
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

