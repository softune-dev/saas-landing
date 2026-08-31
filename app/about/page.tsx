import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import AboutPage from "./about-content";

export const metadata = pageSeo({
  title: "About Softune, Built by Kamrul Hasan",
  description:
    "Kamrul Hasan built Softune solo for Bangladesh shop owners who need a real store — not a Facebook Page — without hiring a developer.",
  path: "/about",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <StructuredData data={personSchema()} />
      <AboutPage />
    </>
  );
}
