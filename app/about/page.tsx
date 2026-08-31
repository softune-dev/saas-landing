import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import AboutPage from "./about-content";

export const metadata = pageSeo({
  title: "About | Built by Kamrul Hasan",
  description:
    "Softune is a Bangladesh ecommerce SaaS built end to end by Kamrul Hasan — dashboard, themes, COD, bKash, Nagad, SSLCommerz, couriers, POS, and AI.",
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
