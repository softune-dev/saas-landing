export interface AlternatingItem {
  pillText: string;
  pillIcon: string;
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  bullets: string[];
  /** Theme-aware screenshot for this section — only set for features that
   * kept the alternating media layout (Theme Editor, AI Assistant). */
  image?: { light: string; dark: string };
}

export interface ExtraCard {
  title: string;
  desc: string;
  icon: string;
}

export interface FeatureData {
  slug: string;
  pillText: string;
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  /** Set only for a feature simple enough to need one screenshot instead of
   * a separate image per alternating section (e.g. Payments) — shown once
   * in the hero, right under the description. Its presence switches the
   * alternating section below from "text + own media per item" to a plain
   * 3-column text grid, since one shared image repeated 3x would be
   * redundant. Leave unset for features like Theme Editor that have a
   * genuinely different visual per section. */
  heroImage?: { light: string; dark: string };
  introTitle: string;
  introDesc: string;
  alternating: AlternatingItem[];
  extraTitle: string;
  extraDesc: string;
  extraCards: ExtraCard[];
}

export const FEATURE_PAGES: Record<string, FeatureData> = {
  "multiple-themes": {
    slug: "multiple-themes",
    pillText: "Theme Editor",
    titleStart: "Design Your Store",
    titleHighlight: "Live",
    titleEnd: "",
    description:
      "Softune’s Theme Editor lets you change colors, fonts, homepage sections, and pages with a live preview. Save a draft, then publish when it looks right.",
    introTitle: "Edit with a real preview, not a blank form",
    introDesc:
      "The Theme Editor shows your storefront as you work. Desktop, tablet, and mobile previews sit beside your edits, so customers only see what you publish.",
    alternating: [
      {
        pillText: "Live Preview",
        pillIcon: "/icons/themes.svg",
        titleStart: "See It on",
        titleHighlight: "Every Screen",
        titleEnd: "",
        description:
          "Work next to a live storefront preview. Switch Desktop, Tablet, and Mobile widths and watch your edits land before anyone else does.",
        bullets: [
          "Live preview of your real theme template",
          "Desktop, tablet, and mobile device sizes",
          "Navigate pages inside the preview while you edit",
        ],
        image: { light: "/feature/theme/t1-l.webp", dark: "/feature/theme/t1-d.webp" },
      },
      {
        pillText: "Brand & Sections",
        pillIcon: "/icons/color.svg",
        titleStart: "Build Your Look,",
        titleHighlight: "Your Way",
        titleEnd: "",
        description:
          "Set logo, colors, fonts, and buttons. Add, remove, and reorder homepage sections, and edit the content shoppers actually see.",
        bullets: [
          "Logo, site name, tagline, colors, and font pairs",
          "Drag-and-drop homepage sections without code",
          "Header links, banners, and page content in one place",
        ],
        image: { light: "/feature/theme/t2-l.webp", dark: "/feature/theme/t2-d.webp" },
      },
      {
        pillText: "AI Suggest",
        pillIcon: "/icons/ai-pencil.svg",
        titleStart: "Ask AI,",
        titleHighlight: "Then Apply",
        titleEnd: "",
        description:
          "Describe a vibe and Softune’s AI Suggest proposes brand colors, fonts, and copy. You review the patch, apply what you like, then publish when ready.",
        bullets: [
          "Plain-language prompts for colors, fonts, and text",
          "Review every suggestion before it changes your draft",
          "Nothing goes live until you publish",
        ],
        image: { light: "/feature/theme/t3-l.webp", dark: "/feature/theme/t3-d.webp" },
      },
    ],
    extraTitle: "Start from a theme that fits",
    extraDesc:
      "Aurora, Bazaar, and Mishthan share the same editor, so you customize one clear design system instead of fighting a rigid template.",
    extraCards: [
      { title: "Aurora", desc: "Clean editorial layout for fashion and general retail.", icon: "/icons/themes.svg" },
      { title: "Bazaar", desc: "Catalog-first layout for bigger product lists.", icon: "/icons/color.svg" },
      { title: "Mishthan", desc: "Warm product-photo layout for food and gift shops.", icon: "/icons/zap.svg" },
    ],
  },
  "ai-assistant": {
    slug: "ai-assistant",
    pillText: "AI Assistant",
    titleStart: "AI Help,",
    titleHighlight: "You Decide",
    titleEnd: "",
    description:
      "Softune’s AI is powered by Google Gemini. It writes product copy, suggests theme changes, and chats about your store data. You review every change before it saves.",
    introTitle: "Gemini drafts. You approve.",
    introDesc:
      "Product descriptions, Theme Editor suggestions, and dashboard AI chat all share the same rule: Softune never writes to your live store until you confirm.",
    alternating: [
      {
        pillText: "Product Copy",
        pillIcon: "/icons/ai-pencil.svg",
        titleStart: "Write Copy,",
        titleHighlight: "One Click",
        titleEnd: "",
        description:
          "Generate a product description from the product form, regenerate anytime, then edit the text before you save.",
        bullets: [
          "One-click generate from the product editor",
          "Regenerate until the wording feels right",
          "Fully editable before you save",
        ],
        image: { light: "/feature/ai/a1-l.webp", dark: "/feature/ai/a1-d.webp" },
      },
      {
        pillText: "AI Suggest",
        pillIcon: "/icons/themes.svg",
        titleStart: "Ask for a Look,",
        titleHighlight: "Apply It",
        titleEnd: "",
        description:
          "In Theme Editor, describe a vibe and Gemini suggests colors, fonts, and brand text. Review the patch, apply what you like, then publish when ready.",
        bullets: [
          "Plain-language prompts for brand and style",
          "See every field before you apply",
          "Still needs Publish to go live",
        ],
        image: { light: "/feature/ai/a2-l.webp", dark: "/feature/ai/a2-d.webp" },
      },
      {
        pillText: "AI Chat",
        pillIcon: "/icons/chat.svg",
        titleStart: "Ask Softune,",
        titleHighlight: "Get Answers",
        titleEnd: "",
        description:
          "Chat in the dashboard about products, orders, and sales. Softune reads your real store data and can propose product or category changes you still confirm.",
        bullets: [
          "Powered by Google Gemini",
          "Answers from your own products and orders",
          "Confirm cards before any write is saved",
        ],
        // Only 2 dedicated AI screenshots exist — reusing the Theme Editor's
        // AI Suggest shot (t3) for this third section, per instruction.
        image: { light: "/feature/theme/t3-l.webp", dark: "/feature/theme/t3-d.webp" },
      },
    ],
    extraTitle: "Safe by design",
    extraDesc:
      "AI only proposes through the same paths a manual edit uses. Daily AI usage follows your plan limits.",
    extraCards: [
      { title: "Review First", desc: "Suggestions are patches you apply, never silent auto-writes.", icon: "/icons/lock.svg" },
      { title: "Scoped Actions", desc: "Chat can propose specific product or category changes, nothing broader.", icon: "/icons/ai-pencil.svg" },
      { title: "Daily Limits", desc: "Usage is capped per day by your plan and shown on the dashboard.", icon: "/icons/wallet.svg" },
    ],
  },
  "fraud-protection": {
    slug: "fraud-protection",
    pillText: "Fraud Protection",
    titleStart: "Stop Fake",
    titleHighlight: "COD Orders",
    titleEnd: "",
    description:
      "Protect Cash on Delivery sales with a phone blocklist enforced at checkout, plus fraud rules you control from one Softune screen.",
    heroImage: { light: "/feature/fraud-l.webp", dark: "/feature/fraud-d.webp" },
    introTitle: "Built for COD abuse, not card scoring",
    introDesc:
      "Fraud Protection sits next to Orders. Block bad phones, keep notes for your team, and tune rules that match how your store gets burned.",
    alternating: [
      {
        pillText: "Phone Blocklist",
        pillIcon: "/icons/lock.svg",
        titleStart: "Block Bad",
        titleHighlight: "Numbers",
        titleEnd: "",
        description:
          "Add a phone to your store blocklist and Softune rejects it at checkout automatically, not just as a later warning.",
        bullets: [
          "Enforced live at checkout today",
          "Optional notes for your team",
          "Scoped to your store only",
          "Add or remove numbers anytime",
          "Works alongside your other fraud rules",
        ],
      },
      {
        pillText: "Fraud Rules",
        pillIcon: "/icons/orders.svg",
        titleStart: "Set Your",
        titleHighlight: "Rules",
        titleEnd: "",
        description:
          "Configure high-value first-order holds and burst-order flags, and toggle each rule independently from Fraud Protection.",
        bullets: [
          "High-value first-order threshold",
          "Burst-order detection window",
          "Each rule can be turned on or off",
          "You set the threshold amount",
          "Applies automatically at checkout",
        ],
      },
      {
        pillText: "Per Store",
        pillIcon: "/icons/domain.svg",
        titleStart: "Saved With Your",
        titleHighlight: "Store",
        titleEnd: "",
        description:
          "Fraud settings belong to each storefront, so different shops can run different blocklists and rules.",
        bullets: [
          "Per-site blocklist and rules",
          "No separate fraud SaaS to buy",
          "Same tenant isolation as Softune orders",
          "Configured from your Fraud Protection screen",
          "Different shops can run different rules",
        ],
      },
    ],
    extraTitle: "Built for COD safety",
    extraDesc:
      "Softune blocklists stop bad phones at checkout, and fraud rules stay under your control on one screen.",
    extraCards: [
      { title: "Your Numbers", desc: "You choose what to block. Nothing is forced on by default.", icon: "/icons/zap.svg" },
      { title: "Team Notes", desc: "Blocklist entries can carry context for staff.", icon: "/icons/book.svg" },
      { title: "One Dashboard", desc: "Configured beside Orders and Site Settings.", icon: "/icons/delivery.svg" },
    ],
  },
  "courier": {
    slug: "courier",
    pillText: "Couriers",
    titleStart: "Connect Your",
    titleHighlight: "Courier",
    titleEnd: "",
    description:
      "Connect your own Steadfast account with API credentials Softune verifies and stores securely. More courier partners are on the same connections screen as they go live.",
    heroImage: { light: "/feature/courier-l.webp", dark: "/feature/courier-d.webp" },
    introTitle: "Your courier account, linked to Softune",
    introDesc:
      "Softune does not use a shared Softune courier login. You connect your own credentials so courier billing and ownership stay with you.",
    alternating: [
      {
        pillText: "Steadfast",
        pillIcon: "/icons/delivery.svg",
        titleStart: "Connect",
        titleHighlight: "Steadfast",
        titleEnd: "",
        description:
          "Enter your Steadfast API key and secret. Softune checks them against Steadfast before saving the connection.",
        bullets: [
          "Uses your own Steadfast account",
          "Credentials verified on connect",
          "Credentials stored encrypted",
          "Manage bookings from your dashboard",
          "Reconnect anytime if keys change",
        ],
      },
      {
        pillText: "More Couriers",
        pillIcon: "/icons/zap.svg",
        titleStart: "More Partners,",
        titleHighlight: "One Screen",
        titleEnd: "",
        description:
          "Pathao, RedX, and other partners share the same Courier connections screen Softune uses for Steadfast.",
        bullets: [
          "One connections screen for courier partners",
          "Same verify-then-save approach",
          "Request the partner Softune should enable for your store",
          "New partners appear on the same screen",
          "No code changes needed per courier",
        ],
      },
      {
        pillText: "Secure Storage",
        pillIcon: "/icons/lock.svg",
        titleStart: "Safe",
        titleHighlight: "Credentials",
        titleEnd: "",
        description:
          "Courier keys are encrypted at rest, the same way Softune protects payment credentials.",
        bullets: [
          "Encrypted credential storage",
          "Per-store courier settings",
          "No shared Softune courier account",
          "Keys are never shown back in plain text",
          "Same encryption Softune uses for payments",
        ],
      },
    ],
    extraTitle: "Connected and secure",
    extraDesc:
      "Softune verifies your courier credentials on connect and keeps them encrypted with your store.",
    extraCards: [
      { title: "Your Account", desc: "Softune never books under a shared Softune courier login.", icon: "/icons/lock.svg" },
      { title: "Verified Connect", desc: "Credentials are checked with the courier API before save.", icon: "/icons/zap.svg" },
      { title: "Encrypted", desc: "Keys are encrypted at rest like payment credentials.", icon: "/icons/domain.svg" },
    ],
  },
  "store-analytics": {
    slug: "store-analytics",
    pillText: "Store Analytics",
    titleStart: "See What",
    titleHighlight: "Sold",
    titleEnd: "",
    description:
      "Track revenue, orders, average order value, and refunds from your real Softune orders. Export CSV, JSON, or PDF when you need a report.",
    heroImage: { light: "/feature/analytics-l.webp", dark: "/feature/analytics-d.webp" },
    introTitle: "Numbers from real orders",
    introDesc:
      "Pick a 1 to 26 week window and Softune shows how revenue, orders, and refunds moved period over period, plus best sellers and category share.",
    alternating: [
      {
        pillText: "Key Metrics",
        pillIcon: "/icons/analytics.svg",
        titleStart: "Revenue,",
        titleHighlight: "Orders, AOV",
        titleEnd: "",
        description:
          "See revenue, order count, average order value, and refund rate for your window, each with a period-over-period change.",
        bullets: [
          "1 to 26 week reporting window",
          "Period-over-period change on each metric",
          "Weekly revenue trend chart",
          "Compare the current period to the prior one",
          "Spot dips or spikes at a glance",
        ],
      },
      {
        pillText: "Best Sellers",
        pillIcon: "/icons/shop-bag.svg",
        titleStart: "See What",
        titleHighlight: "Sells",
        titleEnd: "",
        description:
          "Break down revenue by top categories and see your top products by quantity sold in the same window.",
        bullets: [
          "Top categories by revenue share",
          "Top products by quantity sold",
          "Same window as your headline metrics",
          "Know which categories drive revenue",
          "Spot low performers early",
        ],
      },
      {
        pillText: "Export",
        pillIcon: "/icons/doc.svg",
        titleStart: "Export",
        titleHighlight: "Reports",
        titleEnd: "",
        description:
          "Download analytics as CSV, JSON, or PDF so you can share numbers outside Softune when needed.",
        bullets: [
          "CSV, JSON, and PDF export",
          "Week-by-week sales report table",
          "No separate analytics tool to connect",
          "Share reports outside the dashboard",
          "Keep records for accounting or investors",
        ],
      },
    ],
    extraTitle: "Built on real sales",
    extraDesc:
      "Softune analytics follow your orders, best sellers, and revenue so you can act on what actually sold.",
    extraCards: [
      { title: "Order-Based", desc: "Numbers come from real orders, not guesswork.", icon: "/icons/analytics.svg" },
      { title: "One Screen", desc: "No third-party analytics product to wire up.", icon: "/icons/zap.svg" },
      { title: "Your Store Only", desc: "Every metric is scoped to your tenant.", icon: "/icons/lock.svg" },
    ],
  },
  "orders": {
    slug: "orders",
    pillText: "Orders",
    titleStart: "Orders That",
    titleHighlight: "Stay True",
    titleEnd: "",
    description:
      "Search, filter, update status, and print slips from one screen. Every order keeps a snapshot of what was sold, so catalog edits never rewrite history.",
    heroImage: { light: "/feature/order-l.webp", dark: "/feature/order-d.webp" },
    introTitle: "Past sales stay accurate",
    introDesc:
      "Each line item stores name, SKU, and price at checkout. Edit or delete the product later and the order still shows what the customer bought.",
    alternating: [
      {
        pillText: "Find Fast",
        pillIcon: "/icons/orders.svg",
        titleStart: "Find Any",
        titleHighlight: "Order",
        titleEnd: "",
        description:
          "Search by order number or customer details, then filter by status to get to the right order quickly.",
        bullets: [
          "Search by order number or customer",
          "Filter by order status",
          "Clear list for day-to-day ops",
          "No digging through spreadsheets",
          "Built for daily fulfillment work",
        ],
      },
      {
        pillText: "Snapshots",
        pillIcon: "/icons/lock.svg",
        titleStart: "History That",
        titleHighlight: "Doesn’t Drift",
        titleEnd: "",
        description:
          "Softune locks product name, SKU, and unit price into the order at sale time, so later catalog changes cannot rewrite old totals.",
        bullets: [
          "Name, SKU, and price locked at sale",
          "Deleting a product does not break past orders",
          "Totals priced from your catalog on the server",
          "Refunds and disputes stay accurate",
          "Trustworthy history for support and accounting",
        ],
      },
      {
        pillText: "Print & Status",
        pillIcon: "/icons/doc.svg",
        titleStart: "Print Slips,",
        titleHighlight: "Update Status",
        titleEnd: "",
        description:
          "Print a delivery slip or invoice in one click, and move orders through pending, paid, fulfilled, cancelled, or refunded.",
        bullets: [
          "One-click invoice or delivery slip",
          "Status updates as you fulfill",
          "Notes when your team needs context",
          "Keep customers updated at each stage",
          "One place for the whole order lifecycle",
        ],
      },
    ],
    extraTitle: "Built for daily ops",
    extraDesc:
      "Orders are tenant-scoped and server-priced. Bulk tools and packing barcodes are still expanding.",
    extraCards: [
      { title: "Status Flow", desc: "Move orders through fulfillment statuses as work happens.", icon: "/icons/zap.svg" },
      { title: "Server Totals", desc: "Totals come from your catalog, not client-submitted prices.", icon: "/icons/wallet.svg" },
      { title: "Per Store", desc: "Orders stay inside one storefront account.", icon: "/icons/lock.svg" },
    ],
  },
  "payments": {
    slug: "payments",
    pillText: "Payments",
    titleStart: "Payments,",
    titleHighlight: "Made Simple",
    titleEnd: "",
    description:
      "Take bKash and Nagad payments from one Softune Payments screen, then add Cash on Delivery when you need it. Everything stays centralized and easy to manage.",
    // Note: source filenames are "paymet-*" (typo in the asset itself), not "payment-*".
    heroImage: { light: "/feature/paymet-l.webp", dark: "/feature/paymet-d.webp" },
    introTitle: "bKash, Nagad, and COD in one place",
    introDesc:
      "Softune is set up for bKash and Nagad. When you request them, Softune can enable the payment setup for your store. COD sits beside them on the same screen.",
    alternating: [
      {
        pillText: "bKash & Nagad",
        pillIcon: "/icons/billing.svg",
        titleStart: "bKash &",
        titleHighlight: "Nagad",
        titleEnd: "",
        description:
          "Customers pay your bKash or Nagad number, submit a transaction ID at checkout, and you verify it before you ship. Softune can set this up when you request it.",
        bullets: [
          "bKash and Nagad supported for Softune stores",
          "Transaction ID saved with each order",
          "Enable on request from Softune, then manage in Payments",
          "No separate merchant account needed to start",
          "Works alongside Cash on Delivery",
        ],
      },
      {
        pillText: "Cash on Delivery",
        pillIcon: "/icons/wallet.svg",
        titleStart: "Add",
        titleHighlight: "COD",
        titleEnd: "",
        description:
          "Turn on Cash on Delivery with an optional fee when your store needs pay-on-delivery checkout beside wallet payments.",
        bullets: [
          "Easy to enable next to wallet methods",
          "Optional COD fee",
          "Same Payments screen as bKash and Nagad",
          "No card gateway needed to launch",
          "The default most Bangladeshi shoppers expect",
        ],
      },
      {
        pillText: "All in One",
        pillIcon: "/icons/lock.svg",
        titleStart: "One Screen,",
        titleHighlight: "Easy Setup",
        titleEnd: "",
        description:
          "Payment methods stay centralized in Softune. Connect what you need, keep credentials secure, and avoid juggling separate payment plugins.",
        bullets: [
          "Centralized payment tools in one dashboard",
          "SSLCommerz and other gateways when you need them",
          "Encrypted credential storage",
          "Switch providers without rebuilding checkout",
          "One place to audit every payment method",
        ],
      },
    ],
    extraTitle: "Built for real checkouts",
    extraDesc:
      "Softune focuses on the payment methods your shoppers already use, kept simple and centralized for everyday selling.",
    extraCards: [
      { title: "bKash", desc: "Let shoppers pay with bKash and confirm each payment from your dashboard.", icon: "/icons/billing.svg" },
      { title: "Nagad", desc: "Accept Nagad the same way, with transaction IDs tied to each order.", icon: "/icons/wallet.svg" },
      { title: "COD", desc: "Offer Cash on Delivery when your customers prefer to pay on receipt.", icon: "/icons/zap.svg" },
    ],
  },
  "customer-management": {
    slug: "customer-management",
    pillText: "Customers",
    titleStart: "Know Who",
    titleHighlight: "Buys Again",
    titleEnd: "",
    description:
      "Softune builds customer records from real orders using phone numbers, so you can see order history, spend, and last purchase in one place.",
    heroImage: { light: "/feature/customer-l.webp", dark: "/feature/customer-d.webp" },
    introTitle: "Customers from checkout, not spreadsheets",
    introDesc:
      "The first time a phone checks out, Softune creates a customer. Later orders from that number link to the same record, even when the number is typed in different formats.",
    alternating: [
      {
        pillText: "Auto Match",
        pillIcon: "/icons/user.svg",
        titleStart: "Created From",
        titleHighlight: "Orders",
        titleEnd: "",
        description:
          "No separate signup form is required. Softune matches phones automatically and keeps one customer record per shopper.",
        bullets: [
          "Created from real checkout orders",
          "Phone matching across formats",
          "Works for storefront and manual orders",
          "No customer signup flow to build",
          "One record even across repeat guest checkouts",
        ],
      },
      {
        pillText: "History",
        pillIcon: "/icons/orders.svg",
        titleStart: "See Spend,",
        titleHighlight: "See Orders",
        titleEnd: "",
        description:
          "Open a customer to see order count, total spend, last order date, and every linked order.",
        bullets: [
          "Order count and total spend",
          "Full linked order history",
          "Search and filter your list",
          "Spot your highest-spending customers",
          "Useful context for support conversations",
        ],
      },
      {
        pillText: "Export",
        pillIcon: "/icons/doc.svg",
        titleStart: "Export",
        titleHighlight: "CSV",
        titleEnd: "",
        description:
          "Export customers to CSV anytime, and edit name or email on the profile when you need cleaner contact details.",
        bullets: [
          "One-click CSV export",
          "Edit name and email per customer",
          "Copy phone or email from the profile",
          "Import into your own CRM or spreadsheet",
          "Customer data stays portable, not locked in",
        ],
      },
    ],
    extraTitle: "Built from real checkouts",
    extraDesc:
      "Softune tracks who bought and what they ordered. Loyalty and campaign tools live in Add-Ons when you need them.",
    extraCards: [
      { title: "Phone First", desc: "Phone is the reliable ID for COD-heavy stores.", icon: "/icons/wallet.svg" },
      { title: "Clear History", desc: "See spend and orders for each matched shopper.", icon: "/icons/orders.svg" },
      { title: "Per Store", desc: "Customer lists stay scoped to each storefront.", icon: "/icons/domain.svg" },
    ],
  },
};

export const FEATURES_LIST = [
  { slug: "multiple-themes", title: "Theme Editor", icon: "/icons/color.svg", desc: "Live preview, sections, and AI Suggest" },
  { slug: "ai-assistant", title: "AI Assistant", icon: "/icons/ai-pencil.svg", desc: "Gemini copy, Suggest, and chat" },
  { slug: "payments", title: "Payments", icon: "/icons/wallet.svg", desc: "bKash, Nagad, and COD in one place" },
  { slug: "courier", title: "Couriers", icon: "/icons/delivery.svg", desc: "Connect your Steadfast account" },
  { slug: "fraud-protection", title: "Fraud Protection", icon: "/icons/lock.svg", desc: "Phone blocklist and COD rules" },
  { slug: "orders", title: "Orders", icon: "/icons/orders.svg", desc: "Search, snapshots, and print slips" },
  { slug: "customer-management", title: "Customers", icon: "/icons/user.svg", desc: "Phone-matched buyers from orders" },
  { slug: "store-analytics", title: "Store Analytics", icon: "/icons/analytics.svg", desc: "Revenue, best sellers, export" },
];
