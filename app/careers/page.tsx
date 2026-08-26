import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import CareersPage from "./careers-content";

export const metadata = pageSeo({
  title: "Careers",
  description: "Open roles at Softune — help build the platform agencies and merchants use to launch and grow online stores.",
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
