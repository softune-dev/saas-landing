import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import TermsPage from "./terms-content";

export const metadata = pageSeo({
  title: "Terms of Service",
  description: "The terms governing use of Softune's platform and services.",
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
