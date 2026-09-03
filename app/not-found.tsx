import { pageSeo } from "@/lib/seo";
import NotFoundContent from "./not-found-content";

export const metadata = pageSeo({
  title: "Page not found",
  description:
    "That Softunebd page doesn’t exist. Go home, compare pricing, browse features, or open the documentation.",
  path: "/404",
  noindex: true,
});

export default function NotFound() {
  return <NotFoundContent />;
}
