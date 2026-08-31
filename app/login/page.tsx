import { LoginForm } from "@/components/auth/login-form";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Sign In",
  description: "Sign back in to continue your Softune demo, pricing review, or purchase request.",
  path: "/login",
  noindex: true,
});

export default function LoginPage() {
  return <LoginForm />;
}
