import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import TermsPage from "./terms-content";

export const metadata = pageSeo({
  title: "Terms of Service",
  description:
    "Terms for using Softune’s ecommerce platform, storefronts, and subscription plans in Bangladesh.",
  path: "/terms",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <TermsPage />
    </>
  );
}
