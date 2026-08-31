import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import RefundPage from "./refund-content";

export const metadata = pageSeo({
  title: "Refund Policy",
  description:
    "Softune refund and cancellation rules for Starter, Growth, and Business subscription plans billed in BDT.",
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
