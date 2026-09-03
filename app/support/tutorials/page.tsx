import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import TutorialsPage from "./tutorials-content";

export const metadata = pageSeo({
  title: "Tutorials | Launch a Softunebd Store",
  description:
    "Step-by-step Softunebd tutorials for new merchants — dashboard setup, catalog, Theme Editor, payments, and publishing.",
  path: "/support/tutorials",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tutorials", path: "/support/tutorials" },
        ])}
      />
      <TutorialsPage />
    </>
  );
}
