import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import PrivacyPage from "./privacy-content";

export const metadata = pageSeo({
  title: "Privacy Policy",
  description: "How Softune collects, uses, and protects data across the platform.",
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
