import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import AboutPage from "@/app/about/about-content";

export const metadata = pageSeo({
  title: "Softunebd পরিচিতি",
  description:
    "Softunebd হলো বাংলাদেশের অনলাইন স্টোর বিল্ডার ও SaaS প্ল্যাটফর্ম যা আপনার ব্র্যান্ড ও ইউনিক আইডেন্টিটির যত্ন নেয়। COD, bKash, Nagad, SSLCommerz এবং লোকাল কুরিয়ার — কোনো ডেভলপার না রেখেই।",
  path: "/bn/about",
  lang: "bn",
});

export default function BanglaAboutPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "আমাদের কথা", path: "/bn/about" },
        ])}
      />
      <AboutPage locale="bn" />
    </>
  );
}

