/**
 * Plain data for pricing plans — English and Bangla variants.
 */
export const plans = [
  {
    name: "Starter",
    priceMonthly: 1190,
    priceAnnually: 950,
    description: "Perfect for new stores and small businesses getting started.",
    features: [
      "50 Products limit",
      "500MB Media storage",
      "AI Assistant Included",
      "450 AI credits/mo (15/day)",
      "Fraud protection",
      "Theme editor",
      "Basic analytics",
      "0% Transaction Fee",
    ],
  },
  {
    name: "Growth",
    priceMonthly: 2990,
    priceAnnually: 2390,
    popular: true,
    description: "Everything you need to scale your growing e-commerce brand.",
    features: [
      "500 Products limit",
      "2GB Media storage",
      "AI Assistant Included",
      "2,400 AI credits/mo (80/day)",
      "Payments & Couriers",
      "Fraud protection",
      "Advanced Analytics",
      "Priority email support",
      "0% Transaction Fee",
    ],
  },
  {
    name: "Business",
    priceMonthly: 6990,
    priceAnnually: 5590,
    description: "Built for teams managing multiple client storefronts.",
    features: [
      "Everything in Growth, plus:",
      "Unlimited Products",
      "3 Storefronts included",
      "5GB Media storage",
      "7,200 AI credits/mo (240/day)",
      "All Add-Ons & tools included",
      "Account Manager",
    ],
  },
];

export const plansBn = [
  {
    name: "Starter",
    priceMonthly: 1190,
    priceAnnually: 950,
    description: "নতুন স্টোর ও স্মল বিজনেসের সহজ শুরুর জন্য উপযুক্ত।",
    features: [
      "৫০টি Product Limit",
      "500MB Media স্টোরেজ",
      "AI Assistant ইনক্লুডেড",
      "মাসে 450টি AI ক্রেডিট (15/দিন)",
      "Fraud protection",
      "Theme editor",
      "বেসিক analytics",
      "0% Transaction Fee",
    ],
  },
  {
    name: "Growth",
    priceMonthly: 2990,
    priceAnnually: 2390,
    popular: true,
    description: "আপনার গ্রোয়িং ই-কমার্স ব্র্যান্ড স্কেল করার সব ফিচার।",
    features: [
      "৫০০টি Product Limit",
      "2GB Media স্টোরেজ",
      "AI Assistant ইনক্লুডেড",
      "মাসে 2,400টি AI ক্রেডিট (80/দিন)",
      "Payments ও Couriers কানেক্ট",
      "Fraud protection",
      "Advanced Analytics",
      "Priority ইমেইল সাপোর্ট",
      "0% Transaction Fee",
    ],
  },
  {
    name: "Business",
    priceMonthly: 6990,
    priceAnnually: 5590,
    description: "মাল্টিপল ক্লায়েন্ট স্টোর বা বড় বিজনেসের জন্য তৈরি।",
    features: [
      "Growth-এর সব ফিচার, সাথে:",
      "Unlimited Products",
      "৩টি Storefront ইনক্লুডেড",
      "5GB Media স্টোরেজ",
      "মাসে 7,200টি AI ক্রেডিট (240/দিন)",
      "সব Add-Ons ও টুলস ইনক্লুডেড",
      "Dedicated Account Manager",
    ],
  },
];

export function getPlans(locale: "en" | "bn" = "en") {
  return locale === "bn" ? plansBn : plans;
}
