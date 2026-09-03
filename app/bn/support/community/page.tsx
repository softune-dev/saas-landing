import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import CommunityPage from "@/app/support/community/community-content";

export const metadata = pageSeo({
  title: "মার্চেন্ট কমিউনিটি",
  description:
    "বাংলাদেশে Softunebd মার্চেন্ট ও এজেন্সিদের সাথে যুক্ত হোন — সেটআপ সম্পর্কিত প্রশ্ন ও সেরা অভিজ্ঞতা শেয়ার করুন।",
  path: "/bn/support/community",
  lang: "bn",
});

export default function BanglaCommunityPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "কমিউনিটি", path: "/bn/support/community" },
        ])}
      />
      <CommunityPage locale="bn" />
    </>
  );
}

