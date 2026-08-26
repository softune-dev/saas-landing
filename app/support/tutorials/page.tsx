import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import TutorialsPage from "./tutorials-content";

export const metadata = pageSeo({
  title: "Tutorials",
  description: "Step-by-step video and written tutorials for getting the most out of Softune.",
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
