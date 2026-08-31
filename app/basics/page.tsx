import { BasicsForm } from "@/components/auth/basics-form";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Shop basics",
  description: "Tell Softune a few details about your shop so we can set up your demo.",
  path: "/basics",
  noindex: true,
});

export default function BasicsPage() {
  return <BasicsForm />;
}
