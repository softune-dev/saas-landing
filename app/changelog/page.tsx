import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import ChangelogPage from "./changelog-content";

export const metadata = pageSeo({
  title: "Changelog",
  description: "What's new in Softune — new features, fixes, and platform updates as they ship.",
  path: "/changelog",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Changelog", path: "/changelog" },
        ])}
      />
      <ChangelogPage />
    </>
  );
}
