import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import CareersPage from "./careers-content";

export const metadata = pageSeo({
  title: "Careers",
  description:
    "Open roles at Softune, the Bangladesh ecommerce platform for merchants and agencies. Built by Kamrul Hasan.",
  path: "/careers",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <CareersPage />
    </>
  );
}
