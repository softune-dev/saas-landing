/**
 * Single source of truth for all FAQ questions and answers across the site.
 * Used by landing page (/ and /bn), support FAQ page (/support/faq and /bn/support/faq),
 * and JSON-LD schema generators.
 */
import { BRANDING_CLAIM, BRANDING_CLAIM_BN } from "./site";

export type FaqItem = {
  category: "General" | "Billing" | "Themes" | "Integrations" | "Security";
  q: string;
  a: string;
};

export const faqData: FaqItem[] = [
  {
    category: "General",
    q: "What is Softunebd?",
    a: "Softunebd is an all-in-one ecommerce SaaS platform for small businesses and startups in Bangladesh. Create a professional online store, manage products and orders, accept COD, bKash, Nagad, and SSLCommerz, connect couriers, run Store Sale (POS), and grow from one dashboard.",
  },
  {
    category: "Billing",
    q: "Is there a free trial?",
    a: "Yes. Softunebd includes a 3-day free trial with full dashboard access. No credit card is required to start. After the trial you choose Starter, Growth, or Business on the pricing page.",
  },
  {
    category: "Billing",
    q: "Do I need a credit card to start Softunebd?",
    a: "No. Sign up with an email and password. Softunebd does not ask for a card to start the 3-day free trial.",
  },
  {
    category: "General",
    q: "Do I need coding skills to use Softunebd?",
    a: "No. Softunebd is built for non-technical users. Launch a store, add products, manage orders, and customize your storefront in the Theme Editor — no coding required.",
  },
  {
    category: "General",
    q: "Can I manage multiple stores from one dashboard?",
    a: "Yes. Softunebd lets you switch between stores from one dashboard. The Business plan includes up to 3 storefronts on a single account. Softunebd does not offer unlimited stores on every plan.",
  },
  {
    category: "Integrations",
    q: "What payment methods does Softunebd support?",
    a: "Softunebd Payments covers Cash on Delivery, manual bKash and Nagad (shopper pays your wallet number and submits a transaction ID), plus official bKash, Nagad, and SSLCommerz merchant connects from the same screen. Stripe and PayPal are not available.",
  },
  {
    category: "General",
    q: "How long does it take to launch my store?",
    a: "Minutes. Pick a pre-built theme, add products, enable a payment method, and publish — your store can be live and accepting orders the same day.",
  },
  {
    category: "Security",
    q: "Is my customer data secure?",
    a: "Yes. Softunebd isolates each merchant’s data by tenant, stores sensitive credentials encrypted, and includes rule-based Fraud Protection (phone blocklist plus checkout rules) to reduce COD abuse. Softunebd does not claim machine-learning fraud scoring.",
  },
  {
    category: "Themes",
    q: "Can I customize my store's design?",
    a: `Yes. ${BRANDING_CLAIM} Choose a professional theme and use Softunebd’s Theme Editor to change logo, colors, fonts, and sections with live desktop and mobile preview — no code. AI Suggest can propose changes you still review before publishing.`,
  },
  {
    category: "Themes",
    q: "Will my Softunebd store look like every other shop?",
    a: `No. ${BRANDING_CLAIM} Logo, colors, fonts, and homepage sections stay yours, so the storefront reads as your brand instead of a default theme.`,
  },
  {
    category: "Integrations",
    q: "What courier services are integrated with Softunebd?",
    a: "Softunebd Couriers lets you connect Steadfast, Pathao, RedX, and eCourier with your own merchant accounts today. The same screen also lists Paperfly, Sundarban, Carrybee, SA Paribahan, and PandaGo. Softunebd does not claim real-time public tracking or auto-booking for every partner.",
  },
  {
    category: "Billing",
    q: "Can I upgrade or downgrade my plan anytime?",
    a: "Yes. You can move between Starter, Growth, and Business. See the live pricing page for current limits and what’s included on each plan.",
  },
  {
    category: "General",
    q: "How does Softunebd's AI help my business?",
    a: "Softunebd’s Gemini-powered AI chatbot answers questions about your products, orders, and sales from your own store data. AI Suggest helps with theme direction, and one-click AI writing drafts product descriptions. Merchants always confirm before AI changes go live — Softunebd does not auto-rewrite your store SEO without review.",
  },
];

export const faqDataBn: FaqItem[] = [
  {
    category: "General",
    q: "Softunebd কী?",
    a: "Softunebd হলো বাংলাদেশের ছোট ও মাঝারি ই-কমার্স বিজনেসের জন্য অল-ইন-ওয়ান SaaS প্ল্যাটফর্ম। কোনো কোডিং ছাড়াই প্রফেশনাল স্টোর বানান, প্রোডাক্ট ও অর্ডার ম্যানেজ করুন, COD, bKash, Nagad ও SSLCommerz পেমেন্ট নিন, কুরিয়ার কানেক্ট করুন এবং একই ড্যাশবোর্ড থেকে বিজনেস পরিচালনা করুন।",
  },
  {
    category: "Billing",
    q: "এখানে কী কোনো ফ্রি ট্রায়াল আছে?",
    a: "হ্যাঁ। Softunebd-এ রয়েছে ৩ দিনের ফ্রি ট্রায়াল উইথ ফুল ড্যাশবোর্ড অ্যাক্সেস। ট্রায়াল শুরু করতে কোনো ক্রেডিট কার্ড লাগে না। ট্রায়াল শেষে আপনি প্রয়োজনমতো Starter, Growth বা Business প্ল্যান বেছে নিতে পারবেন।",
  },
  {
    category: "Billing",
    q: "ট্রায়াল শুরু করতে কি ক্রেডিট কার্ড লাগবে?",
    a: "না। শুধু ইমেইল ও পাসওয়ার্ড দিয়ে সাইন আপ করুন। Softunebd ট্রায়ালের জন্য কোনো ক্রেডিট কার্ড চায় না।",
  },
  {
    category: "General",
    q: "Softunebd ব্যবহার করতে কি কোডিং জানার প্রয়োজন আছে?",
    a: "একদমই না। Softunebd নন-টেকনিক্যাল ইউজারদের কথা মাথায় রেখেই তৈরি। Theme Editor ব্যবহার করে সহজেই লোগো, কালার, ফন্ট ও সেকশন কাস্টমাইজ করুন — ১ লাইন কোডও লেখা লাগবে না।",
  },
  {
    category: "General",
    q: "এক ড্যাশবোর্ড থেকে কি একাধিক স্টোর ম্যানেজ করা যাবে?",
    a: "হ্যাঁ। Softunebd ড্যাশবোর্ড থেকে একাধিক স্টোরের মধ্যে সুইচ করতে পারবেন। Business প্ল্যানে ১টি অ্যাকাউন্টেই ৩টি পর্যন্ত Storefront কানেক্ট করার সুবিধা রয়েছে।",
  },
  {
    category: "Integrations",
    q: "Softunebd-এ কী কী পেমেন্ট মেথড সাপোর্ট করে?",
    a: "Cash on Delivery (COD), ম্যানুয়াল bKash ও Nagad এবং অফিশিয়াল bKash, Nagad ও SSLCommerz মার্চেন্ট অ্যাকাউন্ট এক স্ক্রিন থেকেই কানেক্ট করা যায়।",
  },
  {
    category: "General",
    q: "স্টোর লাইভ করতে কত সময় লাগে?",
    a: "মাত্র কয়েক মিনিট। রেডিমেড থিম সিলেক্ট করুন, প্রোডাক্ট অ্যাড করুন, পেমেন্ট অপশন অন করুন এবং পাবলিশ করুন — আজই আপনার স্টোর থেকে অর্ডার নেয়া শুরু করুন।",
  },
  {
    category: "Security",
    q: "আমার কাস্টমার ডেটা কতটুকু নিরাপদ?",
    a: "সম্পূর্ণ নিরাপদ। Softunebd প্রতিটি মার্চেন্টের ডেটা আলাদাভাবে আইসোলেট করে রাখে এবং ফেক অর্ডার প্রতিরোধে ফোন নম্বর ব্লক লিস্ট ও চেকআউট রুলস সহ Fraud Protection প্রদান করে।",
  },
  {
    category: "Themes",
    q: "স্টোরের ডিজাইন কি কাস্টমাইজ করা যাবে?",
    a: `হ্যাঁ। ${BRANDING_CLAIM_BN} প্রফেশনাল থিম বেছে নিন এবং Theme Editor দিয়ে লাইভ ডেস্কটপ ও মোবাইল প্রিভিউ দেখে ডিজাইন চেঞ্জ করুন।`,
  },
  {
    category: "Themes",
    q: "আমার স্টোর কি দেখতে অন্যদের মতো সাধারণ হবে?",
    a: `না। ${BRANDING_CLAIM_BN} আপনার লোগো, ব্র্যান্ড কালার ও লেআউট আপনার স্টোরকে অন্যদের থেকে ইউনিক ও প্রফেশনাল লুক দেবে।`,
  },
  {
    category: "Integrations",
    q: "Softunebd-এ কোন কোন কুরিয়ার ইন্টিগ্রেটেড আছে?",
    a: "Steadfast, Pathao, RedX এবং eCourier মার্চেন্ট অ্যাকাউন্ট সহজে কানেক্ট করে এক ক্লিকে পার্সেল এন্ট্রি দিতে পারবেন।",
  },
  {
    category: "Billing",
    q: "যেকোনো সময় প্ল্যান আপগ্রেড বা ডাউনগ্রেড করা যাবে?",
    a: "হ্যাঁ। যেকোনো সময় আপনি Starter, Growth এবং Business প্ল্যানের মধ্যে চেঞ্জ করতে পারবেন।",
  },
  {
    category: "General",
    q: "Softunebd-এর AI কীভাবে সাহায্য করে?",
    a: "Gemini AI বট আপনার স্টোরের প্রোডাক্ট, অর্ডার ও সেলস রিলেটেড প্রশ্নের দ্রুত উত্তর দেয় এবং AI Assistant এক ক্লিকে আকর্ষক প্রোডাক্ট ডেসক্রিপশন ড্রাফট করে দেয়।",
  },
];

export function getFaqData(locale: "en" | "bn" = "en"): FaqItem[] {
  return locale === "bn" ? faqDataBn : faqData;
}
