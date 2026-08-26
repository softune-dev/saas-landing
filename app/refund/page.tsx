import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import RefundPage from "./refund-content";

export const metadata = pageSeo({
  title: "Refund Policy",
  description: "Softune's refund and cancellation policy for subscription plans.",
  path: "/refund",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Refund Policy", path: "/refund" },
        ])}
      />
      <RefundPage />
    </>
  );
}
