import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import DocumentationPage from "@/app/support/documentation/documentation-content";

export const metadata = pageSeo({
  title: "ডকুমেন্টেশন | স্টোর সেটআপ গাইড",
  description:
    "Softunebd প্রোডাক্ট, ক্যাটাগরি, অর্ডার, Theme Editor, পেমেন্ট (COD, bKash, Nagad, SSLCommerz), কুরিয়ার এবং ফ্রড প্রোটেকশন ডকুমেন্টেশন।",
  path: "/bn/support/documentation",
  lang: "bn",
});

export default function BanglaDocumentationPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "ডকুমেন্টেশন", path: "/bn/support/documentation" },
        ])}
      />
      <DocumentationPage locale="bn" />
    </>
  );
}

