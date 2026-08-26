/**
 * Plain data, deliberately NOT in components/pricing.tsx (a "use client"
 * file) — a server component (app/pricing/page.tsx) needs to read this
 * array directly to build real Product/Offer JSON-LD, and Next's RSC
 * boundary only exposes a client module's DEFAULT export as an opaque
 * reference to server code, not its named data exports. Living here means
 * both the client UI and the server schema builder import the same source
 * instead of duplicating the numbers.
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
      "80 AI credits/day",
      "All Payments & Couriers",
      "AI Assistant Included",
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
      "250 AI credits/day",
      "All Add-Ons & tools included",
      "Account Manager",
    ],
  },
];
