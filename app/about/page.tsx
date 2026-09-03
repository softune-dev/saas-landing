import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import AboutPage from "./about-content";

export const metadata = pageSeo({
  title: "About Softunebd",
  description:
    "Softunebd is an ecommerce website builder for Bangladesh that cares about your branding and identity, not a generic storefront. COD, bKash, Nagad, SSLCommerz, and local couriers — without hiring a developer.",
  path: "/about",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutPage />
    </>
  );
}
