import { SignupFlow } from "@/components/auth/signup/signup-flow";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "ফ্রিতে শুরু করুন | কোনো কার্ড লাগবে না",
  description:
    "SoftuneBD-এ ফ্রি স্টোর খুলুন - কোনো ক্রেডিট কার্ড লাগবে না। একাউন্ট তৈরি করুন, থিম বেছে নিন এবং COD ও ম্যানুয়াল bKash, Nagad সহ অনলাইন স্টোর লাইভ করুন।",
  path: "/bn/signup",
  lang: "bn",
});

export default function BanglaSignupPage() {
  return <SignupFlow locale="bn" />;
}

