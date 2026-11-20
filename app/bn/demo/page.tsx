import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import DemoContent from "@/app/demo/demo-content";

export const metadata = pageSeo({
  title: "লাইভ ডেমো | SoftuneBD দিয়ে বানানো স্টোর",
  description:
    "SoftuneBD দিয়ে বানানো আসল অনলাইন স্টোর দেখুন, প্রতিটি থিমে একটি, তারপর ড্যাশবোর্ড ডেমো চালিয়ে দেখুন।",
  path: "/bn/demo",
  lang: "bn",
});

export default function BanglaDemoPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "ডেমো", path: "/bn/demo" },
        ])}
      />
      <DemoContent locale="bn" />
    </>
  );
}
