import { VerifyOtpForm } from "@/components/auth/verify-otp-form";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Verify email",
  description: "Enter the 6-digit code we emailed you to continue setting up Softune.",
  path: "/verify-otp",
  noindex: true,
});

export default function VerifyOtpPage() {
  return <VerifyOtpForm />;
}
