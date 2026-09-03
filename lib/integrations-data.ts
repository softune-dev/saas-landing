import type { KeywordLandingData } from "@/components/seo/keyword-landing";

/**
 * Real integrations only, one entry per already-shipped connector — see
 * app/bkash.py, app/nagad.py, app/sslcommerz.py, app/pathao.py, app/redx.py,
 * and the Steadfast connection in app/api/courier.py on the backend. No
 * entry here claims anything the dashboard's Payments/Courier settings
 * pages can't actually do today.
 */
export const INTEGRATIONS: Record<
  string,
  { title: string; description: string } & KeywordLandingData
> = {
  bkash: {
    title: "bKash Payment Gateway Integration for Ecommerce",
    description:
      "Accept bKash payments on your own online store. Connect your bKash merchant account in Softunebd's dashboard and take real bKash Tokenized Checkout payments — no plugin, no third-party app.",
    pill: "Payment Integration",
    h1Start: "bKash Integration for",
    h1Highlight: "Your Online Store",
    intro:
      "Connect a real bKash merchant account and accept bKash Tokenized Checkout payments directly at checkout — built into Softunebd, not bolted on with a plugin.",
    features: [
      {
        icon: "/icons/wallet.svg",
        title: "Real Tokenized Checkout",
        desc: "Customers pay on bKash's own secure payment page, then land back on your store with the order confirmed automatically.",
      },
      {
        icon: "/icons/lock.svg",
        title: "Credentials Verified on Connect",
        desc: "Your bKash app key and secret are checked against bKash's real sandbox/live API the moment you connect them, not just stored blind.",
      },
      {
        icon: "/icons/analytics.svg",
        title: "Combine With COD",
        desc: "Offer bKash alongside Cash on Delivery, Nagad, and SSLCommerz — customers pick whichever they trust at checkout.",
      },
    ],
    faqs: [
      {
        q: "Do I need a separate bKash plugin?",
        a: "No — bKash Tokenized Checkout is built into every Softunebd store's checkout, wired up from your dashboard's Payments settings.",
      },
      {
        q: "Is this the real bKash API or a workaround?",
        a: "It's bKash's own Tokenized Checkout API — the same flow used by other real Bangladeshi ecommerce sites, not a manual/screenshot-based workaround.",
      },
    ],
    ctaText: "Connect bKash — Start Free",
    ctaHref: "/signup",
  },
  nagad: {
    title: "Nagad Payment Gateway Integration for Ecommerce",
    description:
      "Accept Nagad payments on your own online store with Softunebd. Connect your Nagad merchant account and take real Nagad checkout payments — built into the dashboard.",
    pill: "Payment Integration",
    h1Start: "Nagad Integration for",
    h1Highlight: "Your Online Store",
    intro:
      "Connect a real Nagad merchant account and accept Nagad payments directly at checkout — one of four payment methods Softunebd supports natively.",
    features: [
      {
        icon: "/icons/wallet.svg",
        title: "Real Nagad Checkout",
        desc: "Customers complete payment on Nagad's own page, and the order status updates automatically once it's confirmed.",
      },
      {
        icon: "/icons/lock.svg",
        title: "Secure Credential Storage",
        desc: "Your Nagad merchant keys are encrypted at rest, never stored or shown in plain text after you connect them.",
      },
      {
        icon: "/icons/analytics.svg",
        title: "Combine With bKash & COD",
        desc: "Run Nagad alongside bKash, SSLCommerz, and Cash on Delivery — no reason to pick just one payment method.",
      },
    ],
    faqs: [
      {
        q: "Can I use Nagad without a developer?",
        a: "Yes — connecting Nagad is a dashboard settings flow: enter your merchant credentials, Softunebd verifies and stores them, checkout does the rest.",
      },
    ],
    ctaText: "Connect Nagad — Start Free",
    ctaHref: "/signup",
  },
  steadfast: {
    title: "Steadfast Courier Integration for Ecommerce",
    description:
      "Connect Steadfast Courier to your online store and send parcels straight from your Softunebd dashboard — real order-to-delivery automation, not manual entry.",
    pill: "Courier Integration",
    h1Start: "Steadfast Courier",
    h1Highlight: "Integration",
    intro:
      "Connect your own Steadfast merchant account and create real delivery bookings straight from your order list — no copy-pasting order details into a separate courier panel.",
    features: [
      {
        icon: "/icons/domain.svg",
        title: "Book Deliveries From Orders",
        desc: "Send a confirmed order to Steadfast directly from the Softunebd dashboard, with customer and product details filled in automatically.",
      },
      {
        icon: "/icons/analytics.svg",
        title: "Delivery Status Synced",
        desc: "Track where a parcel is without leaving your dashboard or switching to Steadfast's own panel.",
      },
      {
        icon: "/icons/lock.svg",
        title: "Your Own Merchant Account",
        desc: "This connects your real Steadfast merchant credentials — it's your account and your rates, not a shared reseller relationship.",
      },
    ],
    faqs: [
      {
        q: "Does this replace my Steadfast merchant account?",
        a: "No — it connects to your existing Steadfast merchant account so bookings happen from inside Softunebd instead of a separate tab.",
      },
    ],
    ctaText: "Connect Steadfast — Start Free",
    ctaHref: "/signup",
  },
  pathao: {
    title: "Pathao Courier Integration for Ecommerce",
    description:
      "Connect Pathao Courier to your online store and manage deliveries straight from your Softunebd dashboard.",
    pill: "Courier Integration",
    h1Start: "Pathao Courier",
    h1Highlight: "Integration",
    intro:
      "Connect your Pathao merchant account and send order deliveries directly from Softunebd — one dashboard for orders, payments, and courier handoff.",
    features: [
      {
        icon: "/icons/domain.svg",
        title: "Book Deliveries From Orders",
        desc: "Push a confirmed order straight to Pathao without re-entering customer or item details by hand.",
      },
      {
        icon: "/icons/analytics.svg",
        title: "One Dashboard, Not Two",
        desc: "Manage products, orders, payments, and Pathao deliveries from the same Softunebd dashboard.",
      },
      {
        icon: "/icons/lock.svg",
        title: "Your Own Merchant Account",
        desc: "Uses your real Pathao merchant credentials, verified when you connect them.",
      },
    ],
    faqs: [
      {
        q: "Do I need a Pathao merchant account first?",
        a: "Yes — Softunebd connects to your existing Pathao merchant account; it doesn't replace the need to have one.",
      },
    ],
    ctaText: "Connect Pathao — Start Free",
    ctaHref: "/signup",
  },
  redx: {
    title: "RedX Courier Integration for Ecommerce",
    description:
      "Connect RedX Courier to your online store and manage deliveries directly from your Softunebd dashboard.",
    pill: "Courier Integration",
    h1Start: "RedX Courier",
    h1Highlight: "Integration",
    intro:
      "Connect your RedX merchant account and send order deliveries straight from Softunebd's dashboard, right alongside your payments and product catalog.",
    features: [
      {
        icon: "/icons/domain.svg",
        title: "Book Deliveries From Orders",
        desc: "Send a confirmed order to RedX without leaving your Softunebd dashboard or re-typing order details.",
      },
      {
        icon: "/icons/analytics.svg",
        title: "Real Order Automation",
        desc: "Courier handoff becomes part of your normal order flow instead of a separate manual step.",
      },
      {
        icon: "/icons/lock.svg",
        title: "Your Own Merchant Account",
        desc: "Connects your real RedX merchant credentials, verified at connect time.",
      },
    ],
    faqs: [
      {
        q: "Can I use RedX alongside Steadfast or Pathao?",
        a: "Yes — Softunebd supports connecting multiple couriers, so you can choose per order or keep a backup courier connected.",
      },
    ],
    ctaText: "Connect RedX — Start Free",
    ctaHref: "/signup",
  },
};
