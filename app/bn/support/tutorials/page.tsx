import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import TutorialsPage from "@/app/support/tutorials/tutorials-content";

export const metadata = pageSeo({
  title: "টিউটোরিয়াল | Softunebd স্টোর শুরু করুন",
  description:
    "নতুন মার্চেন্টদের জন্য Softunebd ভিডিও গাইড: ড্যাশবোর্ড সেটআপ, ক্যাটাগরি, Theme Editor, পেমেন্ট ও অনলাইন স্টোর পাবলিশিং।",
  path: "/bn/support/tutorials",
  lang: "bn",
});

export default function BanglaTutorialsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "টিউটোরিয়াল", path: "/bn/support/tutorials" },
        ])}
      />
      <TutorialsPage locale="bn" />
    </>
  );
}

