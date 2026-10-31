/**
 * About-page content for ENUVOR, the parent company of SoftuneBD.
 *
 * Source: ENUVOR's own site (src/data/about.ts in the enuvor project, enuvor.vercel.app). Plain
 * data on purpose, same as team-data.ts, so server code can read it. The numbers and dates here
 * were confirmed by the owner for publishing; change them here, not in the page component.
 */

export const ENUVOR_URL = "https://enuvor.vercel.app";

type Locale = "en" | "bn";
type L<T> = Record<Locale, T>;

export const enuvorIntro: L<string> = {
  en: "ENUVOR is a product company that also builds for others. We run our own SaaS, and we bring the same care to every client platform, app, automation and launch.",
  bn: "ENUVOR একটি প্রোডাক্ট কোম্পানি, যারা অন্যদের জন্যও সফটওয়্যার বানায়। আমরা নিজেদের SaaS চালাই, আর প্রতিটি ক্লায়েন্টের প্ল্যাটফর্ম, অ্যাপ, অটোমেশন ও লঞ্চে একই যত্ন নিই।",
};

export const enuvorStory: L<string[]> = {
  en: [
    "We started as a small engineering team building software for local businesses. The work that lasted was always the work we kept looking after after launch, so we started building our own products to prove the approach.",
    "Today ENUVOR is home to SoftuneBD and a growing portfolio of SaaS, and a studio that designs, builds and grows products for teams around the world. One team covers engineering, AI, design, motion and marketing, so nothing gets lost between vendors.",
  ],
  bn: [
    "আমরা শুরু করেছিলাম স্থানীয় ব্যবসার জন্য সফটওয়্যার বানানো একটি ছোট ইঞ্জিনিয়ারিং টিম হিসেবে। যে কাজগুলো টিকে থেকেছে, সেগুলো সবই লঞ্চের পরেও আমরা যত্ন নিয়ে দেখভাল করেছি। তাই আমরা নিজেদের প্রোডাক্ট বানানো শুরু করি, নিজেদের পদ্ধতি প্রমাণ করার জন্য।",
    "আজ ENUVOR হলো SoftuneBD এবং বেড়ে ওঠা একটি SaaS পোর্টফোলিওর ঠিকানা, পাশাপাশি এমন একটি স্টুডিও, যারা সারা বিশ্বের টিমের জন্য প্রোডাক্ট ডিজাইন করে, বানায় এবং বড় করে। ইঞ্জিনিয়ারিং, AI, ডিজাইন, মোশন ও মার্কেটিং - সব একটি টিমে, তাই ভেন্ডরদের মাঝখানে কিছু হারিয়ে যায় না।",
  ],
};

export const enuvorStats: { to: number; suffix: string; label: L<string> }[] = [
  { to: 7, suffix: "+", label: { en: "Years building", bn: "বছর ধরে কাজ" } },
  { to: 40, suffix: "+", label: { en: "People on the team", bn: "টিমের সদস্য" } },
  { to: 120, suffix: "+", label: { en: "Projects shipped", bn: "প্রজেক্ট ডেলিভারি" } },
  { to: 9, suffix: "", label: { en: "Countries served", bn: "দেশে সার্ভিস" } },
];

export const enuvorMilestones: { year: string; icon: string; title: L<string>; desc: L<string> }[] = [
  {
    year: "2019",
    icon: "/icons/play.svg",
    title: { en: "First line of code", bn: "প্রথম কোড" },
    desc: {
      en: "A three-person team building custom software in Dhaka.",
      bn: "ঢাকায় তিনজনের একটি টিম কাস্টম সফটওয়্যার বানানো শুরু করে।",
    },
  },
  {
    year: "2021",
    icon: "/icons/shop-bag.svg",
    title: { en: "SoftuneBD launches", bn: "SoftuneBD-এর যাত্রা" },
    desc: {
      en: "Our first company and product suite goes live.",
      bn: "আমাদের প্রথম কোম্পানি ও প্রোডাক্ট স্যুট লাইভ হয়।",
    },
  },
  {
    year: "2023",
    icon: "/icons/splash.svg",
    title: { en: "Studio opens", bn: "স্টুডিও চালু" },
    desc: {
      en: "Design, motion and growth join engineering under one roof.",
      bn: "ডিজাইন, মোশন ও গ্রোথ এসে যোগ দেয় ইঞ্জিনিয়ারিংয়ের সাথে, একই ছাদের নিচে।",
    },
  },
  {
    year: "2025",
    icon: "/icons/ai.svg",
    title: { en: "AI practice", bn: "AI প্র্যাকটিস" },
    desc: {
      en: "Agents and automation become a core service line.",
      bn: "এজেন্ট ও অটোমেশন হয়ে ওঠে আমাদের মূল সার্ভিসগুলোর একটি।",
    },
  },
  {
    year: "2026",
    icon: "/icons/analytics.svg",
    title: { en: "ENUVOR", bn: "ENUVOR" },
    desc: {
      en: "One parent company for our products and our studio.",
      bn: "আমাদের প্রোডাক্ট ও স্টুডিওর জন্য একটি প্যারেন্ট কোম্পানি।",
    },
  },
];

export const enuvorValues: { title: L<string>; desc: L<string> }[] = [
  {
    title: { en: "Own the outcome", bn: "ফলাফলের দায় নিই" },
    desc: {
      en: "We measure success by what the product does after launch, not by hours billed.",
      bn: "আমরা সাফল্য মাপি লঞ্চের পরে প্রোডাক্ট কী করছে তা দিয়ে, বিল করা ঘণ্টা দিয়ে নয়।",
    },
  },
  {
    title: { en: "Ship every week", bn: "প্রতি সপ্তাহে রিলিজ" },
    desc: {
      en: "Small, visible releases beat long silences. You always see real progress.",
      bn: "লম্বা নীরবতার চেয়ে ছোট, চোখে পড়ার মতো রিলিজ ভালো। আপনি সবসময় আসল অগ্রগতি দেখতে পান।",
    },
  },
  {
    title: { en: "Craft is a feature", bn: "কাজের মান একটি ফিচার" },
    desc: {
      en: "Performance, accessibility and detail are part of the scope, never extras.",
      bn: "পারফরম্যান্স, অ্যাক্সেসিবিলিটি ও খুঁটিনাটি কাজের অংশ, কখনো বাড়তি কিছু নয়।",
    },
  },
  {
    title: { en: "Say it plainly", bn: "সোজা কথা" },
    desc: {
      en: "Clear scope, honest estimates and no surprises on the invoice.",
      bn: "পরিষ্কার স্কোপ, সৎ এস্টিমেট এবং ইনভয়েসে কোনো চমক নয়।",
    },
  },
];

export const enuvorStudio = {
  city: { en: "Dhaka, Bangladesh", bn: "ঢাকা, বাংলাদেশ" } as L<string>,
  note: {
    en: "Our studio is in Dhaka, and we work with clients across Asia, Europe and North America.",
    bn: "আমাদের স্টুডিও ঢাকায়, আর আমরা এশিয়া, ইউরোপ ও উত্তর আমেরিকার ক্লায়েন্টদের সাথে কাজ করি।",
  } as L<string>,
  hours: {
    en: "Sunday to Thursday, 10:00 to 19:00 (GMT+6)",
    bn: "রবিবার থেকে বৃহস্পতিবার, 10:00 থেকে 19:00 (GMT+6)",
  } as L<string>,
};
