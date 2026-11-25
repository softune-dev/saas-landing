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
    q: "What is SoftuneBD?",
    a: "SoftuneBD is an all-in-one ecommerce SaaS platform for small businesses and startups in Bangladesh. Create a professional online store, manage products and orders, accept COD, bKash, Nagad, and SSLCommerz, connect couriers, run Store Sale (POS), and grow from one dashboard.",
  },
  {
    category: "Billing",
    q: "Is there a free plan?",
    a: "Yes. SoftuneBD has a Free plan: 10 products, 50 orders a month and 100MB of media storage, with no credit card. It is free as long as you're active: a Free store that is not used for 30 days is deleted, after warning emails. We keep your account and store setup details, so you can start again. Paid plans add more products, unlimited orders and more features.",
  },
  {
    category: "Billing",
    q: "Do I need a credit card to start SoftuneBD?",
    a: "No. Sign up with your email. SoftuneBD does not ask for a card to start on the Free plan.",
  },
  {
    category: "General",
    q: "Do I need coding skills to use SoftuneBD?",
    a: "No. SoftuneBD is built for non-technical users. Launch a store, add products, manage orders, and customize your storefront in the Theme Editor, no coding required.",
  },
  {
    category: "General",
    q: "Can I manage multiple stores from one dashboard?",
    a: "The Business plan includes 2 storefronts on one account, and you switch between them from the dashboard. Free, Starter and Growth include 1 store.",
  },
  {
    category: "Integrations",
    q: "What payment methods does SoftuneBD support?",
    a: "Every plan, including Free, has Cash on Delivery, manual bKash, Nagad and Rocket (the shopper pays your wallet number and submits a transaction ID), and the free Softune Pay Android app, which confirms those manual payments from your wallet SMS. The official bKash, Nagad and SSLCommerz connections, with your own merchant accounts, need a paid plan: Starter, Growth or Business all include them. Stripe and PayPal are not available.",
  },
  {
    category: "General",
    q: "How long does it take to launch my store?",
    a: "Minutes. Pick a pre-built theme, add products, enable a payment method, and publish, your store can be live and accepting orders the same day.",
  },
  {
    category: "Security",
    q: "Is my customer data secure?",
    a: "Yes. SoftuneBD isolates each merchant’s data by tenant, stores sensitive credentials encrypted, and includes Fraud Protection, phone blocklist, site-wide IP blocking, device checkout rules, and a Suspicious Orders review queue, to reduce COD abuse and fake orders.",
  },
  {
    category: "Themes",
    q: "Can I customize my store's design?",
    a: `Yes. ${BRANDING_CLAIM} Choose a professional theme and use SoftuneBD’s Theme Editor to change logo, colors, fonts, and sections with live desktop and mobile preview, no code. AI Suggest can propose changes you still review before publishing.`,
  },
  {
    category: "Themes",
    q: "Will my SoftuneBD store look like every other shop?",
    a: `No. ${BRANDING_CLAIM} Logo, colors, fonts, and homepage sections stay yours, so the storefront reads as your brand instead of a default theme.`,
  },
  {
    category: "Integrations",
    q: "What courier services are integrated with SoftuneBD?",
    a: "You connect your own merchant accounts. Free includes Steadfast, Starter adds eCourier, and Growth and Business add Pathao and RedX. Parcels can be booked from your dashboard with Steadfast. The Couriers screen also lists Paperfly, Sundarban, Carrybee, SA Paribahan and PandaGo.",
  },
  {
    category: "Billing",
    q: "Can I upgrade or downgrade my plan anytime?",
    a: "Yes. You can move between Starter, Growth and Business and pay for 1, 3, 6 or 12 months. When you move between paid plans, your unused time is carried over by its value. If a paid plan is not renewed, the store moves to Free: extra data is kept but locked.",
  },
  {
    category: "General",
    q: "How does SoftuneBD's AI help my business?",
    a: "On paid plans, the AI agent answers questions about your products, orders and sales from your own store data and carries out store tasks you confirm. AI Suggest helps with theme direction and Write with AI drafts product descriptions. Every new store, including a Free one, gets an AI setup and 5 images at sign-up.",
  },
  {
    category: "Integrations",
    q: "Can I manage my SoftuneBD store from ChatGPT?",
    a: "Yes, in beta. Add SoftuneBD as a custom connector in ChatGPT (server address https://api.softunebd.com/mcp, sign-in method OAuth), approve it on the SoftuneBD page, and ChatGPT can read your sales, orders and products and make changes you ask for: store colors and fonts, homepage text, products, categories, sale events, and hero or category images. You can undo every change.",
  },
  {
    category: "Security",
    q: "Is it safe to connect ChatGPT to my store?",
    a: "The connection is limited on purpose. You approve it yourself and can disconnect it any time from the dashboard. It is tied to your store only, asks you to confirm before replacing anything, and cannot delete data, issue refunds, change order status, or see billing, customer phone numbers or fraud data. Every change is recorded and can be undone.",
  },
  {
    category: "Integrations",
    q: "Does the ChatGPT connector use my SoftuneBD AI credits?",
    a: "No. ChatGPT does the thinking and any image generation on your own ChatGPT plan. SoftuneBD only runs the actions on your store, such as saving an image to your media library, which counts toward your plan's storage like any upload. The connector is included in Starter and above.",
  },
  {
    category: "Billing",
    q: "How much do I save if I pay for several months?",
    a: "Paying for 3 months saves about 5%, 6 months about 10% and 12 months about 20%. For example, Starter is ৳499 for 1 month, ৳1,425 for 3 months, ৳2,694 for 6 months and ৳4,788 for 12 months. The pricing page compares every plan.",
  },
  {
    category: "Billing",
    q: "What happens when my Free store reaches 50 orders in a month?",
    a: "Checkout switches to ordering by WhatsApp, with the cart written into the message, so you can keep selling. The count starts again each calendar month. Paid plans have unlimited orders.",
  },
  {
    category: "General",
    q: "Is there a chat assistant for my shoppers?",
    a: "Yes, on every plan including Free. It answers shoppers in English, Bangla or Banglish from your own products, delivery charges, payment methods and FAQs. It is on by default, and you can edit it or turn it off in Settings, Chat Assistant.",
  },
];

export const faqDataBn: FaqItem[] = [
  {
    category: "General",
    q: "SoftuneBD কী?",
    a: "SoftuneBD হলো বাংলাদেশের ছোট ও মাঝারি ই-কমার্স বিজনেসের জন্য অল-ইন-ওয়ান SaaS প্ল্যাটফর্ম। কোনো কোডিং ছাড়াই প্রফেশনাল স্টোর বানান, প্রোডাক্ট ও অর্ডার ম্যানেজ করুন, COD, bKash, Nagad ও SSLCommerz পেমেন্ট নিন, কুরিয়ার কানেক্ট করুন এবং একই ড্যাশবোর্ড থেকে বিজনেস পরিচালনা করুন।",
  },
  {
    category: "Billing",
    q: "এখানে কি কোনো ফ্রি প্ল্যান আছে?",
    a: "হ্যাঁ। SoftuneBD-এ ফ্রি প্ল্যান আছে: 10টি প্রোডাক্ট, মাসে 50টি অর্ডার আর 100MB মিডিয়া স্টোরেজ, কোনো ক্রেডিট কার্ড ছাড়া। সক্রিয় থাকলে ফ্রি: 30 দিন ব্যবহার না হলে সতর্কতা ইমেইলের পর ফ্রি স্টোর মুছে ফেলা হয়। আপনার অ্যাকাউন্ট ও স্টোর সেটআপের তথ্য রাখা হয়, তাই আবার শুরু করতে পারবেন। পেইড প্ল্যানে আরও প্রোডাক্ট, আনলিমিটেড অর্ডার ও বেশি ফিচার পাবেন।",
  },
  {
    category: "Billing",
    q: "ফ্রি প্ল্যান শুরু করতে কি ক্রেডিট কার্ড লাগবে?",
    a: "না। শুধু ইমেইল দিয়ে সাইন আপ করুন। ফ্রি প্ল্যানে SoftuneBD কোনো ক্রেডিট কার্ড চায় না।",
  },
  {
    category: "General",
    q: "SoftuneBD ব্যবহার করতে কি কোডিং জানার প্রয়োজন আছে?",
    a: "একদমই না। SoftuneBD নন-টেকনিক্যাল ইউজারদের কথা মাথায় রেখেই তৈরি। Theme Editor ব্যবহার করে সহজেই লোগো, কালার, ফন্ট ও সেকশন কাস্টমাইজ করুন, ১ লাইন কোডও লেখা লাগবে না।",
  },
  {
    category: "General",
    q: "এক ড্যাশবোর্ড থেকে কি একাধিক স্টোর ম্যানেজ করা যাবে?",
    a: "Business প্ল্যানে একটি অ্যাকাউন্টে 2টি স্টোরফ্রন্ট আছে, ড্যাশবোর্ড থেকেই বদলানো যায়। ফ্রি, Starter ও Growth-এ 1টি স্টোর।",
  },
  {
    category: "Integrations",
    q: "SoftuneBD-এ কী কী পেমেন্ট মেথড সাপোর্ট করে?",
    a: "ফ্রি সহ সব প্ল্যানে ক্যাশ অন ডেলিভারি, ম্যানুয়াল bKash, Nagad ও Rocket, আর ওয়ালেট SMS থেকে সেই পেমেন্ট কনফার্ম করা ফ্রি Softune Pay অ্যাপ আছে। নিজের মার্চেন্ট অ্যাকাউন্টে অফিশিয়াল bKash, Nagad ও SSLCommerz কানেকশনের জন্য পেইড প্ল্যান লাগে: Starter, Growth ও Business সবগুলোতেই আছে।",
  },
  {
    category: "General",
    q: "স্টোর লাইভ করতে কত সময় লাগে?",
    a: "মাত্র কয়েক মিনিট। রেডিমেড থিম সিলেক্ট করুন, প্রোডাক্ট অ্যাড করুন, পেমেন্ট অপশন অন করুন এবং পাবলিশ করুন, আজই আপনার স্টোর থেকে অর্ডার নেয়া শুরু করুন।",
  },
  {
    category: "Security",
    q: "আমার কাস্টমার ডেটা কতটুকু নিরাপদ?",
    a: "সম্পূর্ণ নিরাপদ। SoftuneBD প্রতিটি মার্চেন্টের ডেটা আলাদাভাবে আইসোলেট করে রাখে এবং ফেক অর্ডার প্রতিরোধে ফোন নম্বর ব্লক লিস্ট ও চেকআউট রুলস সহ Fraud Protection প্রদান করে।",
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
    q: "SoftuneBD-এ কোন কোন কুরিয়ার ইন্টিগ্রেটেড আছে?",
    a: "নিজের মার্চেন্ট অ্যাকাউন্ট কানেক্ট করবেন। ফ্রিতে Steadfast, Starter-এ সাথে eCourier, আর Growth ও Business-এ Pathao ও RedX। ড্যাশবোর্ড থেকে Steadfast-এ পার্সেল বুক করা যায়।",
  },
  {
    category: "Billing",
    q: "যেকোনো সময় প্ল্যান আপগ্রেড বা ডাউনগ্রেড করা যাবে?",
    a: "হ্যাঁ। Starter, Growth ও Business-এর মধ্যে বদলাতে পারবেন এবং 1, 3, 6 বা 12 মাসের জন্য পেমেন্ট করতে পারবেন। পেইড প্ল্যান বদলালে অব্যবহৃত সময় তার মূল্য অনুযায়ী যোগ হয়। রিনিউ না করলে স্টোর ফ্রি প্ল্যানে চলে যায়; বাড়তি ডেটা থাকে, তবে লক থাকে।",
  },
  {
    category: "General",
    q: "SoftuneBD-এর AI কীভাবে সাহায্য করে?",
    a: "পেইড প্ল্যানে AI এজেন্ট আপনার স্টোরের ডেটা থেকে প্রোডাক্ট, অর্ডার ও বিক্রি নিয়ে উত্তর দেয় এবং আপনি নিশ্চিত করলে কাজও করে। Write with AI প্রোডাক্টের বিবরণ লিখে দেয়। ফ্রি সহ প্রতিটি নতুন স্টোর সাইন-আপে AI সেটআপ ও 5টি ছবি পায়।",
  },
  {
    category: "Integrations",
    q: "ChatGPT থেকে কি আমার SoftuneBD স্টোর চালানো যায়?",
    a: "হ্যাঁ, বিটা হিসেবে। ChatGPT-তে SoftuneBD-কে কাস্টম কানেক্টর হিসেবে যোগ করুন (সার্ভার অ্যাড্রেস https://api.softunebd.com/mcp, সাইন-ইন পদ্ধতি OAuth), SoftuneBD-র পেজে অনুমোদন দিন, তারপর ChatGPT আপনার সেলস, অর্ডার ও প্রোডাক্ট দেখতে এবং আপনার বলা পরিবর্তন করতে পারবে: স্টোরের কালার ও ফন্ট, হোমপেজ লেখা, প্রোডাক্ট, ক্যাটাগরি, সেল ইভেন্ট এবং হিরো বা ক্যাটাগরি ইমেজ। প্রতিটি পরিবর্তন আগের অবস্থায় ফেরানো যায়।",
  },
  {
    category: "Security",
    q: "ChatGPT-কে আমার স্টোরের সাথে যুক্ত করা কি নিরাপদ?",
    a: "সংযোগটি ইচ্ছে করেই সীমিত রাখা হয়েছে। অনুমোদন আপনি নিজে দেন এবং ড্যাশবোর্ড থেকে যেকোনো সময় বিচ্ছিন্ন করতে পারেন। এটি শুধু আপনার স্টোরের সাথে বাঁধা, কিছু বদলানোর আগে আপনার কনফার্মেশন চায়, আর ডেটা মুছতে, রিফান্ড করতে, অর্ডারের অবস্থা বদলাতে বা বিলিং, কাস্টমারের ফোন নম্বর ও ফ্রড ডেটা দেখতে পারে না। প্রতিটি পরিবর্তন রেকর্ড থাকে এবং ফেরানো যায়।",
  },
  {
    category: "Integrations",
    q: "ChatGPT কানেক্টরে কি আমার SoftuneBD AI ক্রেডিট খরচ হয়?",
    a: "না। চিন্তা ও ছবি বানানোর কাজ হয় আপনার নিজের ChatGPT প্ল্যানে। SoftuneBD শুধু আপনার স্টোরে কাজগুলো চালায়, যেমন ছবি মিডিয়া লাইব্রেরিতে সেভ করা, যা অন্য যেকোনো আপলোডের মতো আপনার প্ল্যানের স্টোরেজে ধরা হয়।",
  },
  {
    category: "Billing",
    q: "একসাথে কয়েক মাসের টাকা দিলে কত সাশ্রয় হয়?",
    a: "3 মাসে প্রায় 5%, 6 মাসে প্রায় 10% আর 12 মাসে প্রায় 20% সাশ্রয় হয়। যেমন Starter: 1 মাস ৳499, 3 মাস ৳1,425, 6 মাস ৳2,694 আর 12 মাস ৳4,788। প্রাইসিং পেজে সব প্ল্যানের তুলনা আছে।",
  },
  {
    category: "Billing",
    q: "ফ্রি স্টোরে মাসে 50টি অর্ডার হয়ে গেলে কী হবে?",
    a: "চেকআউট WhatsApp অর্ডারে চলে যায়, কার্টের তথ্য মেসেজে লেখা থাকে, তাই বিক্রি চালু থাকে। প্রতি ক্যালেন্ডার মাসে গণনা নতুন করে শুরু হয়। পেইড প্ল্যানে অর্ডার আনলিমিটেড।",
  },
  {
    category: "General",
    q: "ক্রেতাদের জন্য কি চ্যাট অ্যাসিস্ট্যান্ট আছে?",
    a: "হ্যাঁ, ফ্রি সহ সব প্ল্যানে। এটি আপনার প্রোডাক্ট, ডেলিভারি চার্জ, পেমেন্ট ও FAQ থেকে বাংলা, ইংরেজি বা বাংলিশে উত্তর দেয়। শুরুতে চালু থাকে; Settings থেকে Chat Assistant-এ গিয়ে বদলাতে বা বন্ধ করতে পারেন।",
  },
];

export function getFaqData(locale: "en" | "bn" = "en"): FaqItem[] {
  return locale === "bn" ? faqDataBn : faqData;
}
