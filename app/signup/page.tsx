import { TrialOnboarding } from "@/components/auth/trial-onboarding";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Start Free Trial | No Credit Card",
  description:
    "Start a free 3-day Softune trial with no credit card. Create your account, pick a theme, and open a live Bangladesh ecommerce store with COD, bKash, and Nagad.",
  path: "/signup",
});

export default function SignupPage() {
  return <TrialOnboarding />;
}
