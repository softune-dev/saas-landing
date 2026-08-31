import { WelcomePanel } from "@/components/auth/welcome-panel";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "You're in",
  description: "Explore a live Softune demo, review pricing, or request to purchase.",
  path: "/welcome",
  noindex: true,
});

export default function WelcomePage() {
  return <WelcomePanel />;
}
