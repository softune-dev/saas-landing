import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import ContactSupportPage from "./contact-content";

export const metadata = pageSeo({
  title: "Contact Support",
  description: "Get in touch with the Softune support team — we usually reply within one business day.",
  path: "/support/contact",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact Support", path: "/support/contact" },
        ])}
      />
      <ContactSupportPage />
    </>
  );
}
