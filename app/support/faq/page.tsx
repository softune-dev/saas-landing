import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { faqData } from "@/lib/faq-data";
import FAQPage from "./faq-content";

export const metadata = pageSeo({
  title: "FAQ",
  description: "Answers to common questions about Softune's plans, features, and how the platform works.",
  path: "/support/faq",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/support/faq" },
        ])}
      />
      <StructuredData data={faqPageSchema(faqData)} />
      <FAQPage />
    </>
  );
}
