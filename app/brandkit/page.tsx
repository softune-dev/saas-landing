import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import BrandKitPage from "./brandkit-content";

export const metadata = pageSeo({
  title: "Brand Kit",
  description: "Softune's logo, colors, and usage guidelines for press and partners.",
  path: "/brandkit",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Brand Kit", path: "/brandkit" },
        ])}
      />
      <BrandKitPage />
    </>
  );
}
