import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import ChangelogPage from "./changelog-content";

export const metadata = pageSeo({
  title: "Changelog | What's New",
  description:
    "What shipped in the SoftuneBD dashboard and storefront: 7-day free trial, payments, couriers, Store Sale POS, Theme Editor, and AI.",
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
