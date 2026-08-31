import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import ChangelogPage from "./changelog-content";

export const metadata = pageSeo({
  title: "Changelog | What's New",
  description:
    "What shipped in Softune — Theme Editor, payments, couriers, Store Sale, AI, and dashboard updates as they go live.",
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
