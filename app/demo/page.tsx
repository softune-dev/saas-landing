import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import DemoContent from "./demo-content";

export const metadata = pageSeo({
  title: "Live Demo | Stores Built with SoftuneBD",
  description:
    "See real Bangladeshi online stores built with SoftuneBD, one on each theme, then try the dashboard demo. No signup needed to browse the stores.",
  path: "/demo",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Demo", path: "/demo" },
        ])}
      />
      <DemoContent />
    </>
  );
}
