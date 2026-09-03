import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import ChangelogPage from "@/app/changelog/changelog-content";

export const metadata = pageSeo({
  title: "চেঞ্জলগ | নতুন কী এলো",
  description:
    "Softunebd ড্যাশবোর্ড ও স্টোরফ্রন্টে নতুন যে ফিচার, ফিক্স ও ইমপ্রুভমেন্টগুলো যুক্ত হয়েছে — ৩ দিনের ফ্রি ট্রায়াল, পেমেন্ট, কুরিয়ার, POS ও AI আপডেট।",
  path: "/bn/changelog",
  lang: "bn",
});

export default function BanglaChangelogPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "চেঞ্জলগ", path: "/bn/changelog" },
        ])}
      />
      <ChangelogPage locale="bn" />
    </>
  );
}

