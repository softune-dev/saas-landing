import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import PrivacyPage from "./privacy-content";

export const metadata = pageSeo({
  title: "Privacy Policy",
  description:
    "How Softune collects, uses, and protects merchant and customer data on the Bangladesh ecommerce platform.",
  path: "/privacy",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <PrivacyPage />
    </>
  );
}
