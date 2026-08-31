import { SignupForm } from "@/components/auth/signup-form";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Get Started | Create Your Store",
  description:
    "Create a Softune account, verify your email, and open a live demo of the Bangladesh ecommerce dashboard — COD, bKash, Nagad, SSLCommerz, and more.",
  path: "/signup",
});

export default function SignupPage() {
  return <SignupForm />;
}
