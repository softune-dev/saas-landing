import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import AboutPage from "./about-content";

export const metadata = pageSeo({
  title: "About",
  description:
    "Softune is built by Kamrul Hasan — the multi-tenant ecommerce platform's founder and sole developer.",
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
