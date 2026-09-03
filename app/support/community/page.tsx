import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import CommunityPage from "./community-content";

export const metadata = pageSeo({
  title: "Merchant Community",
  description:
    "Connect with other Softunebd merchants and agencies in Bangladesh — ask setup questions and share what is working.",
  path: "/support/community",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Community", path: "/support/community" },
        ])}
      />
      <CommunityPage />
    </>
  );
}
