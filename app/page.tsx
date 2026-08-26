import { pageSeo } from "@/lib/seo";
import HomePage from "./home-content";

export const metadata = pageSeo({
  title: null,
  description:
    "Multi-tenant ecommerce SaaS for agencies and merchants. Themes, products, orders, and AI — one platform to build, publish, and grow storefronts.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
