import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import ContactSupportPage from "./contact-content";

export const metadata = pageSeo({
  title: "Contact Support | Email & WhatsApp",
  description:
    "Reach Softune support by email at support@softunebd.com or WhatsApp +880 1831-624571. No phone line — we reply from Bangladesh business hours.",
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
