import { TrialOnboarding } from "@/components/auth/trial-onboarding";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "ফ্রি ট্রায়াল শুরু করুন | কোনো কার্ড লাগবে না",
  description:
    "Softunebd-এ শুরু করুন ৩ দিনের ফ্রি ট্রায়াল — কোনো ক্রেডিট কার্ড লাগবে না। একাউন্ট তৈরি করুন, থিম বেছে নিন এবং COD, bKash ও Nagad সহ অনলাইন স্টোর লাইভ করুন।",
  path: "/bn/signup",
  lang: "bn",
});

export default function BanglaSignupPage() {
  return <TrialOnboarding />;
}

