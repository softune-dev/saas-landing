import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import ContactSupportPage from "@/app/support/contact/contact-content";

export const metadata = pageSeo({
  title: "কাস্টমার সাপোর্ট | ইমেইল ও হোয়াটসঅ্যাপ",
  description:
    "Softunebd সাপোর্টে যোগাযোগ করুন ইমেইলে support@softunebd.com অথবা হোয়াটসঅ্যাপে +880 1630-582639। বাংলাদেশ অফিসে দ্রুত রিপ্লাই দেয়া হয়।",
  path: "/bn/support/contact",
  lang: "bn",
});

export default function BanglaContactPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "হোম", path: "/bn" },
          { name: "কন্টাক্ট সাপোর্ট", path: "/bn/support/contact" },
        ])}
      />
      <ContactSupportPage locale="bn" />
    </>
  );
}

