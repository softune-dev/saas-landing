import type { KeywordLandingData } from "@/components/seo/keyword-landing";

/**
 * Real Softune capabilities applied to a vertical, not invented
 * industry-specific claims — every feature named here (variants, COD,
 * courier, AI copy) is a real dashboard feature, same ones covered in
 * /features/* and the existing blog (e.g. the fashion selling guide).
 */
export const INDUSTRY_PAGES: Record<
  string,
  { title: string; description: string } & KeywordLandingData
> = {
  fashion: {
    title: "Fashion Ecommerce Website in Bangladesh",
    description:
      "Build a fashion ecommerce website in Bangladesh with Softune — size/color variants, AI product descriptions, COD, bKash, Nagad, and courier delivery, all in one dashboard.",
    pill: "For Fashion Sellers",
    h1Start: "Fashion Ecommerce Website for",
    h1Highlight: "Bangladesh",
    intro:
      "Launch a real online clothing store with size and color variants, AI-written product descriptions, and local payment and delivery methods built in from day one.",
    features: [
      {
        icon: "/icons/color.svg",
        title: "Size & Color Variants",
        desc: "List a t-shirt in five sizes and three colors as one product with real per-variant stock, not five separate listings.",
      },
      {
        icon: "/icons/ai-pencil.svg",
        title: "AI Product Descriptions",
        desc: "Describe a piece in a few words and get sellable copy back — built into the product editor, no separate tool needed.",
      },
      {
        icon: "/icons/wallet.svg",
        title: "COD, bKash & Nagad",
        desc: "Bangladeshi fashion buyers expect Cash on Delivery — Softune supports it alongside bKash and Nagad out of the box.",
      },
    ],
    faqs: [
      {
        q: "Can I sell clothes with multiple sizes and colors?",
        a: "Yes — Softune's product editor supports variants (size, color, or both) with separate stock and pricing per combination.",
      },
    ],
    ctaText: "Start Your Fashion Store",
    ctaHref: "/signup",
  },
  cosmetics: {
    title: "Cosmetics & Beauty Ecommerce Website in Bangladesh",
    description:
      "Build a cosmetics and beauty ecommerce website in Bangladesh with Softune — product variants, AI copy, COD, bKash, Nagad, and courier delivery.",
    pill: "For Beauty Sellers",
    h1Start: "Beauty Ecommerce Website for",
    h1Highlight: "Bangladesh",
    intro:
      "Launch a beauty or cosmetics store with product variants, AI-assisted descriptions, and the local payment and delivery methods your customers already trust.",
    features: [
      {
        icon: "/icons/color.svg",
        title: "Shade & Size Variants",
        desc: "List a foundation in every shade as one product, each with its own stock count and price.",
      },
      {
        icon: "/icons/ai-pencil.svg",
        title: "AI Product Descriptions",
        desc: "Turn a rough product idea into sellable copy in seconds, right inside the product editor.",
      },
      {
        icon: "/icons/wallet.svg",
        title: "COD, bKash & Nagad",
        desc: "Offer Cash on Delivery alongside bKash and Nagad — the payment methods Bangladeshi beauty shoppers actually use.",
      },
    ],
    faqs: [
      {
        q: "Can customers pay Cash on Delivery for beauty products?",
        a: "Yes — COD is supported natively, alongside bKash, Nagad, and SSLCommerz, so you're not limited to one payment method.",
      },
    ],
    ctaText: "Start Your Beauty Store",
    ctaHref: "/signup",
  },
  grocery: {
    title: "Grocery Ecommerce Website in Bangladesh",
    description:
      "Build a grocery ecommerce website in Bangladesh with Softune — categories, COD, bKash, Nagad, and real courier delivery for daily essentials.",
    pill: "For Grocery Sellers",
    h1Start: "Grocery Ecommerce Website for",
    h1Highlight: "Bangladesh",
    intro:
      "Launch an online grocery store with organized categories, local payment methods, and real courier delivery — built for how Bangladeshi shoppers actually order essentials.",
    features: [
      {
        icon: "/icons/domain.svg",
        title: "Categories & Products",
        desc: "Organize items into categories and subcategories so customers can browse a grocery catalog the way they expect to.",
      },
      {
        icon: "/icons/wallet.svg",
        title: "COD, bKash & Nagad",
        desc: "Cash on Delivery alongside bKash and Nagad — the payment mix grocery shoppers in Bangladesh already use.",
      },
      {
        icon: "/icons/analytics.svg",
        title: "Real Courier Delivery",
        desc: "Steadfast, Pathao, RedX, and eCourier connections send orders out for delivery straight from your dashboard.",
      },
    ],
    faqs: [
      {
        q: "Can I organize products by category for a grocery store?",
        a: "Yes — Softune supports categories and subcategories, so a grocery catalog can be browsed the way customers expect.",
      },
    ],
    ctaText: "Start Your Grocery Store",
    ctaHref: "/signup",
  },
};
