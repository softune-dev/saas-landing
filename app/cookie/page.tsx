import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import CookiePage from "./cookie-content";

export const metadata = pageSeo({
  title: "Cookie Policy",
  description: "How Softune uses cookies across the marketing site and dashboard.",
  path: "/cookie",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookie" },
        ])}
      />
      <CookiePage />
    </>
  );
}
