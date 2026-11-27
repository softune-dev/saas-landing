import { SignupFlow } from "@/components/auth/signup/signup-flow";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Start Free | No Credit Card",
  description:
    "Open a free SoftuneBD store with no credit card. Create your account, pick a theme, and go live in Bangladesh with COD and manual bKash and Nagad.",
  path: "/signup",
});

export default function SignupPage() {
  return <SignupFlow locale="en" />;
}
