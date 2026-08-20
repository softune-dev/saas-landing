export interface AlternatingItem {
  pillText: string;
  pillIcon: string;
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  bullets: string[];
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
    pillText: "Storefront Design",
    titleStart: "Stunning Storefront",
    titleHighlight: "Themes",
    titleEnd: "That Sell",
    description: "Give your e-commerce brand the representation it deserves. Select from our collection of highly optimized, conversion-driven storefront layouts that load in milliseconds.",
    introTitle: "Create a storefront that stands out and converts customers",
    introDesc: "Our layouts are designed by retail experts to reduce checkout friction, load pages instantly, and show your products in the best light. No matter your industry, we have a layout that fits your brand identity.",
    alternating: [
      {
        pillText: "Visual Theme Editor",
        pillIcon: "/icons/themes.svg",
        titleStart: "Customize Layouts Without",
        titleHighlight: "Coding",
        titleEnd: "",
        description: "Choose from professional themes and customize elements visually. Adjust colors, layout structure, fonts, and banners in real-time.",
        bullets: [
          "Drag-and-drop structural blocks",
          "Real-time visual customization",
          "Adjust typography and color styles instantly"
        ]
      },
      {
        pillText: "Mobile Optimization",
        pillIcon: "/icons/delivery.svg",
        titleStart: "Built for the",
        titleHighlight: "Mobile",
        titleEnd: "Shopper First",
        description: "Over 70% of web checkouts happen on mobile screens. Our layouts adapt perfectly to mobile viewports to minimize cart abandonment.",
        bullets: [
          "Fluid responsive design components",
          "Swipeable galleries and cart drawers",
          "Fast mobile checkout layouts"
        ]
      },
      {
        pillText: "Industry Tailored",
        pillIcon: "/icons/color.svg",
        titleStart: "Designed For Your Specific",
        titleHighlight: "Niche",
        titleEnd: "",
        description: "Whether you run an apparel boutique, a tech outlet, or a gourmet bakery, we provide specialized theme systems tailored to your industry.",
        bullets: [
          "Bespoke layouts for multiple niches",
          "Optimized feature lists and display elements",
          "Conversion-optimized call-to-actions"
        ]
      },
      {
        pillText: "Lightning Performance",
        pillIcon: "/icons/zap.svg",
        titleStart: "Load Pages in the Blink of an",
        titleHighlight: "Eye",
        titleEnd: "",
        description: "Ensure your store ranks higher on Google and holds visitor attention with clean, optimized layouts that achieve perfect PageSpeed scores.",
        bullets: [
          "Perfect Google Core Web Vitals out of the box",
          "Built-in WebP image optimization",
          "Fast Next.js static rendering"
        ]
      }
    ],
    extraTitle: "Design details that drive performance",
    extraDesc: "We go beyond aesthetic style, building technical optimizations directly into our layouts so your store gets more sales.",
    extraCards: [
      { title: "SEO Ready", desc: "Clean schema markup ensures Google understands your catalog structures.", icon: "/icons/analytics.svg" },
      { title: "Lightweight Code", desc: "No bloated Javascript. Only fast, optimized scripts run on the browser.", icon: "/icons/zap.svg" },
      { title: "System Dark Mode", desc: "Provide a comfortable reading environment that adapts to client preferences.", icon: "/icons/themes.svg" }
    ]
  },
  "ai-assistant": {
    slug: "ai-assistant",
    pillText: "AI Superpowers",
    titleStart: "Automate Store Management with",
    titleHighlight: "AI",
    titleEnd: "Assistant",
    description: "Write product descriptions, optimize SEO metadata, segment customers, and draft support responses in seconds using Softune's integrated AI tool.",
    introTitle: "Work smarter and save hours of administrative tasks every day",
    introDesc: "Stop spending hours writing copy and editing tags. Our built-in AI understands your retail inventory and drafts engaging, targeted sales material with a single click.",
    alternating: [
      {
        pillText: "Product Copy",
        pillIcon: "/icons/ai-pencil.svg",
        titleStart: "Write Beautiful Product",
        titleHighlight: "Descriptions",
        titleEnd: "Instantly",
        description: "Input a few bullet points, select a brand voice, and watch our AI model write professional, engaging product descriptions in seconds.",
        bullets: [
          "Custom tone selection (playful, professional, bold)",
          "Highlights feature lists and key specifications",
          "Multi-language generation support"
        ]
      },
      {
        pillText: "Smart SEO Tags",
        pillIcon: "/icons/analytics.svg",
        titleStart: "Optimize Your Search Engine",
        titleHighlight: "Visibility",
        titleEnd: "",
        description: "Let AI generate highly relevant title tags and meta descriptions that capture organic search traffic and follow Google standards.",
        bullets: [
          "Keyword-optimized page titles",
          "Compelling meta descriptions that drive clicks",
          "Automated image alt tag suggestions"
        ]
      },
      {
        pillText: "Customer Insights",
        pillIcon: "/icons/user.svg",
        titleStart: "Segment Customers and Predict",
        titleHighlight: "Sales",
        titleEnd: "",
        description: "AI tracks customer purchase intervals to highlight recurring buyers, suggest product recommendations, and target cohorts.",
        bullets: [
          "Predict high-value customer cohorts",
          "Personalized recommendations based on cart data",
          "Automated follow-up text suggestions"
        ]
      },
      {
        pillText: "Support Drafts",
        pillIcon: "/icons/chat.svg",
        titleStart: "Draft Friendly Support Replies in",
        titleHighlight: "Seconds",
        titleEnd: "",
        description: "Resolve support queries faster. AI drafts responses to common customer questions using context from your inventory and orders database.",
        bullets: [
          "Pre-populated invoice and courier details",
          "Polite and professional text tone",
          "Easily editable draft fields"
        ]
      }
    ],
    extraTitle: "Powerful intelligence built right in",
    extraDesc: "No third-party API configurations or subscription tokens needed. We provide access to advanced AI directly from your store settings.",
    extraCards: [
      { title: "Context Aware", desc: "Our AI understands your unique store inventory, categories, and brand style.", icon: "/icons/ai-pencil.svg" },
      { title: "Ultra Fast", desc: "Generates product copy, tags, or support responses in under 2 seconds.", icon: "/icons/zap.svg" },
      { title: "Included Token Credits", desc: "Token credits are pre-loaded monthly inside all store accounts.", icon: "/icons/wallet.svg" }
    ]
  },
  "fraud-protection": {
    slug: "fraud-protection",
    pillText: "Order Safety",
    titleStart: "Stop Risky Orders Before They",
    titleHighlight: "Ship",
    titleEnd: "",
    description:
      "Protect COD-heavy stores with checkout rules and a phone blocklist. Softune flags suspicious first-time high-value orders, burst orders from one number, and known bad phones—before you fulfill.",
    introTitle: "Built for merchants who lose money on fake and abusive orders",
    introDesc:
      "Fraud Protection lives in your Softune dashboard alongside Orders and Customers. Turn on the rules that match your risk tolerance, maintain a blocklist, and review flagged checkouts without leaving the platform.",
    alternating: [
      {
        pillText: "High-Value Holds",
        pillIcon: "/icons/orders.svg",
        titleStart: "Hold First-Time",
        titleHighlight: "High-Value",
        titleEnd: "Orders",
        description:
          "When a new customer places an order over your threshold, Softune can hold it for review so you approve before booking a courier.",
        bullets: [
          "Configurable minimum order value",
          "Targets first-time buyers only",
          "Clear review queue in your dashboard",
        ],
      },
      {
        pillText: "Burst Detection",
        pillIcon: "/icons/analytics.svg",
        titleStart: "Flag Burst Orders From One",
        titleHighlight: "Phone",
        titleEnd: "",
        description:
          "If the same phone places multiple orders inside a short window, Softune flags them so you can catch coordinated abuse early.",
        bullets: [
          "Adjustable time window in minutes",
          "Phone-based matching at checkout",
          "Works alongside your normal order flow",
        ],
      },
      {
        pillText: "Blocklist",
        pillIcon: "/icons/lock.svg",
        titleStart: "Block Known Bad",
        titleHighlight: "Numbers",
        titleEnd: "",
        description:
          "Maintain a phone blocklist from the Fraud Protection screen. Blocklisted numbers are rejected at checkout with a note for your team.",
        bullets: [
          "Add or remove numbers anytime",
          "Optional notes for your staff",
          "Immediate effect on new checkouts",
        ],
      },
      {
        pillText: "Site Controls",
        pillIcon: "/icons/domain.svg",
        titleStart: "Rules Saved With Your",
        titleHighlight: "Store",
        titleEnd: "",
        description:
          "Fraud rules are stored per site in Softune Site Settings—so each storefront can run the protection profile that fits its risk.",
        bullets: [
          "Per-site enablement and thresholds",
          "No separate fraud SaaS to connect",
          "Same tenant isolation as the rest of Softune",
        ],
      },
    ],
    extraTitle: "Practical protection for COD markets",
    extraDesc:
      "Designed around how Softune merchants actually get burned: fake phones, repeat abusers, and oversized first orders—not generic card-fraud theater.",
    extraCards: [
      {
        title: "Review Before Ship",
        desc: "Hold risky orders so courier costs aren’t wasted on returns.",
        icon: "/icons/delivery.svg",
      },
      {
        title: "Team Notes",
        desc: "Blocklist entries keep context so your staff know why a number was banned.",
        icon: "/icons/book.svg",
      },
      {
        title: "Toggle Per Rule",
        desc: "Enable only the checks you need—nothing forced on by default.",
        icon: "/icons/zap.svg",
      },
    ],
  },
  "courier": {
    slug: "courier",
    pillText: "Automated Logistics",
    titleStart: "Connect Store to Top",
    titleHighlight: "Courier",
    titleEnd: "Networks",
    description: "Say goodbye to manual shipping bookings. Book couriers, print labels, calculate rates, and sync tracking codes in one click.",
    introTitle: "Streamline shipping operations and get packages out faster",
    introDesc: "Manage all courier bookings, labels, and tracking details from your central Softune dashboard. No more copy-pasting order details into separate shipping portals.",
    alternating: [
      {
        pillText: "One-click Bookings",
        pillIcon: "/icons/delivery.svg",
        titleStart: "Book Couriers in a Single",
        titleHighlight: "Click",
        titleEnd: "",
        description: "Choose an order, select a shipping provider, and submit. Customer shipping coordinates are synced directly to courier portals.",
        bullets: [
          "Automatic pickup booking",
          "Addresses validated automatically",
          "Courier API rates calculated in real-time"
        ]
      },
      {
        pillText: "Batch Labels",
        pillIcon: "/icons/themes.svg",
        titleStart: "Print Custom Branded Shipping",
        titleHighlight: "Labels",
        titleEnd: "in Batches",
        description: "Select multiple orders and export clean, printable shipping labels instantly. Includes order items inside packing lists for warehouse teams.",
        bullets: [
          "Batch barcode label printing",
          "Custom branded layouts with logos",
          "Integrated pick-lists save time"
        ]
      },
      {
        pillText: "Tracking Sync",
        pillIcon: "/icons/analytics.svg",
        titleStart: "Notify Customers With Live",
        titleHighlight: "Tracking",
        titleEnd: "URLs",
        description: "When shipping labels are created, courier tracking IDs sync to order details, and tracking updates send automatically to customers.",
        bullets: [
          "Automatic tracking ID attachment",
          "Email and SMS shipping alerts",
          "Branded self-service order tracking portals"
        ]
      },
      {
        pillText: "Dynamic Rates",
        pillIcon: "/icons/wallet.svg",
        titleStart: "Show Live Shipping Rates at",
        titleHighlight: "Checkout",
        titleEnd: "",
        description: "Provide accurate shipping options based on customer location, package dimensions, and weight directly on checkout screens.",
        bullets: [
          "Calculates rates from multiple carriers",
          "Custom shipping rule presets",
          "Free shipping threshold logic"
        ]
      }
    ],
    extraTitle: "Ship with confidence, scale your business",
    extraDesc: "We support integrations with local shipping networks and international shipping services to cover all business stages.",
    extraCards: [
      { title: "Bulk Fulfillment", desc: "Select up to 100 orders and ship them all simultaneously with one click.", icon: "/icons/delivery.svg" },
      { title: "Return Shipping", desc: "Allow buyers to self-request and print discount return shipping labels.", icon: "/icons/domain.svg" },
      { title: "Carrier Coverage", desc: "Integrated with local couriers, regional networks, and global shippers.", icon: "/icons/splash.svg" }
    ]
  },
  "store-analytics": {
    slug: "store-analytics",
    pillText: "Data-Driven Growth",
    titleStart: "Understand Store Performance with",
    titleHighlight: "Analytics",
    titleEnd: "",
    description: "Make informed decisions with detailed data. Monitor your conversions, trace customer journeys, and measure campaigns directly from the dashboard.",
    introTitle: "Stop guessing what drives your ecommerce sales",
    introDesc: "Know exactly which marketing channel, keyword, or product category generates revenue. Our built-in analytics dashboard converts raw data into simple, actionable trends.",
    alternating: [
      {
        pillText: "Funnel Analytics",
        pillIcon: "/icons/analytics.svg",
        titleStart: "Monitor Customer Purchase",
        titleHighlight: "Funnels",
        titleEnd: "",
        description: "See where prospective buyers drop off. Track visitors from landing pages, to product selections, cart updates, and checkouts.",
        bullets: [
          "Identify and fix high cart abandonment steps",
          "Checkout funnel drop-off analytics",
          "Mobile vs desktop conversion statistics"
        ]
      },
      {
        pillText: "Cohort Tracking",
        pillIcon: "/icons/user.svg",
        titleStart: "Measure Customer Loyalty and",
        titleHighlight: "LTV",
        titleEnd: "",
        description: "Group customers based on first-purchase date to track cohort activity, average order values (AOV), and customer lifetime value (LTV).",
        bullets: [
          "Cohort retention charts",
          "Lifetime value (LTV) metrics",
          "Repeat purchase frequency trends"
        ]
      },
      {
        pillText: "Campaign Payouts",
        pillIcon: "/icons/color.svg",
        titleStart: "Trace Revenue Back to Specific",
        titleHighlight: "Campaigns",
        titleEnd: "",
        description: "Identify top-performing channels. Track revenue from social media platforms, search engine queries, or specific influencer discount codes.",
        bullets: [
          "UTM parameter tracking for campaigns",
          "Revenue attribution by discount code",
          "Referrer source sales segmentation"
        ]
      },
      {
        pillText: "Live Feed",
        pillIcon: "/icons/zap.svg",
        titleStart: "Watch Store Activity in",
        titleHighlight: "Real-Time",
        titleEnd: "",
        description: "See live store visitor numbers, checkout starts, and sales as they happen. Perfect for launch days and flash sales.",
        bullets: [
          "Real-time customer activity stream",
          "Live shopping cart status checks",
          "Geographic visitor charts"
        ]
      }
    ],
    extraTitle: "Deep reporting tools without the complexity",
    extraDesc: "We structure data cleanly, saving you the hassle of navigating overly technical external analytics portals.",
    extraCards: [
      { title: "Exportable Reports", desc: "Download sales, tax, product, and customer logs in CSV/PDF.", icon: "/icons/analytics.svg" },
      { title: "One-click Pixels", desc: "Add Meta, Google, and TikTok tracking pixels with simple toggles.", icon: "/icons/zap.svg" },
      { title: "KPI Overviews", desc: "Pin your most relevant sales metrics directly to the home screen.", icon: "/icons/themes.svg" }
    ]
  },
  "customer-management": {
    slug: "customer-management",
    pillText: "CRM & Relationships",
    titleStart: "Build Long-Term Customer",
    titleHighlight: "Loyalty",
    titleEnd: "",
    description: "Build detailed buyer profiles, trace interaction history, and issue loyalty rewards to turn first-time shoppers into repeat brand advocates.",
    introTitle: "Place customer relationships at the center of your store operations",
    introDesc: "Understand customer shopping habits. Track purchase history, store communication logs, customer tags, and lifetime values all inside your user profile database.",
    alternating: [
      {
        pillText: "Buyer Profiles",
        pillIcon: "/icons/user.svg",
        titleStart: "Comprehensive Customer Profile",
        titleHighlight: "Insights",
        titleEnd: "",
        description: "View individual purchase timelines, product preferences, average order values, and specific delivery addresses.",
        bullets: [
          "Ordered items and transaction history",
          "Lifetime value metrics and statistics",
          "Internal notes and team labels"
        ]
      },
      {
        pillText: "Smart Segmentation",
        pillIcon: "/icons/analytics.svg",
        titleStart: "Segment Customers for Targeted",
        titleHighlight: "Marketing",
        titleEnd: "",
        description: "Filter customer cohorts by total spend, purchase frequency, order recency, and specific product interests.",
        bullets: [
          "Filter by high-spend or high-volume VIP cohorts",
          "Locate inactive customers for win-back campaigns",
          "Export custom email segments"
        ]
      },
      {
        pillText: "Loyalty Rewards",
        pillIcon: "/icons/color.svg",
        titleStart: "Encourage Repeat Purchases With",
        titleHighlight: "Rewards",
        titleEnd: "",
        description: "Create customer loyalty programs. Reward buyers with points for checkouts, brand referrals, and social follows.",
        bullets: [
          "Point systems for order checkouts",
          "Custom birthday and referral incentives",
          "Redeem points directly on checkout screens"
        ]
      },
      {
        pillText: "Direct Outreach",
        pillIcon: "/icons/chat.svg",
        titleStart: "Send SMS & Email Campaign",
        titleHighlight: "Notifications",
        titleEnd: "",
        description: "Draft and send updates directly to specific customer groups. Send special loyalty discounts or new product announcements.",
        bullets: [
          "Pre-built email campaign template setups",
          "Transactional and marketing SMS support",
          "Opt-in and opt-out preferences tracking"
        ]
      }
    ],
    extraTitle: "Grow sales through loyal customers",
    extraDesc: "We build tools that make it simple to nurture customer relationships and increase store retention rates.",
    extraCards: [
      { title: "Store Credits", desc: "Refund store credit directly to buyer balances to retain revenue.", icon: "/icons/wallet.svg" },
      { title: "Notes & Labels", desc: "Tag VIP customers and add context notes for support teams.", icon: "/icons/user.svg" },
      { title: "Privacy Compliance", desc: "Built-in GDPR and CCPA compliance settings protect customer profiles.", icon: "/icons/lock.svg" }
    ]
  },
  "orders": {
    slug: "orders",
    pillText: "Workflow Automation",
    titleStart: "Optimized Order Management",
    titleHighlight: "Engine",
    titleEnd: "",
    description: "Handle bulk orders, issue partial refunds, print packing slips, and process drop-ship shipments from a single consolidated screen.",
    introTitle: "Handle large volumes of retail orders without hitting bottlenecks",
    introDesc: "Manage order lifecycles from submission, payment capture, fulfillment, packing, and courier booking to final delivery tracking.",
    alternating: [
      {
        pillText: "Bulk Processing",
        pillIcon: "/icons/orders.svg",
        titleStart: "Process Hundreds of Orders",
        titleHighlight: "Simultaneously",
        titleEnd: "",
        description: "Select multiple orders from lists to book courier pickups, print packing slips, or update statuses in batches.",
        bullets: [
          "Batch shipping label exports",
          "Bulk order status updates",
          "Group order receipts and invoices"
        ]
      },
      {
        pillText: "Flexible Refunds",
        pillIcon: "/icons/wallet.svg",
        titleStart: "Execute Fast Partial Fulfillments &",
        titleHighlight: "Refunds",
        titleEnd: "",
        description: "Manage complex orders. Refund specific products, adjust shipping fees, and fulfill separate items from multiple warehouses.",
        bullets: [
          "Item-level partial fulfillment checks",
          "Calculate and process partial refunds",
          "Automatic stock count restorations"
        ]
      },
      {
        pillText: "Packing Slips",
        pillIcon: "/icons/themes.svg",
        titleStart: "Branded Packing Slips with",
        titleHighlight: "Barcodes",
        titleEnd: "",
        description: "Print clear packing slips for warehouse teams. Includes customer addresses, item coordinates, and barcode tracking tags.",
        bullets: [
          "Branded templates with store branding logos",
          "Order item lists and quantity details",
          "Barcode elements speed up box scanning"
        ]
      },
      {
        pillText: "Status Automation",
        pillIcon: "/icons/zap.svg",
        titleStart: "Auto-trigger Workflows on Status",
        titleHighlight: "Changes",
        titleEnd: "",
        description: "Create rules that trigger actions when orders transition. For example, automatically alert couriers when orders transition to 'Fulfillment'.",
        bullets: [
          "Custom order workflow rules",
          "Automated customer notification emails",
          "Syncs details to third-party shipping platforms"
        ]
      }
    ],
    extraTitle: "Scale order operations cleanly",
    extraDesc: "We focus on optimizing order processing details so your customer support volume remains low.",
    extraCards: [
      { title: "Smart Fulfillment Rules", desc: "Route orders to nearest retail nodes to save courier transit times.", icon: "/icons/delivery.svg" },
      { title: "Self-service Tracking", desc: "Buyers check order status and download invoice PDFs in self-service.", icon: "/icons/domain.svg" },
      { title: "Official Invoices", desc: "Auto-generate official, tax-compliant PDF invoices for tax records.", icon: "/icons/billing.svg" }
    ]
  },
  "payments": {
    slug: "payments",
    pillText: "High-Converting Checkout",
    titleStart: "Secure Global Payment",
    titleHighlight: "Gateways",
    titleEnd: "",
    description: "Support credit cards, local digital wallets, cash on delivery, and installment checkouts. Protect transactions with advanced AI fraud shields.",
    introTitle: "Provide customers with their preferred payment options",
    introDesc: "Eliminate checkout abandonment by offering flexible payment configurations. Integrate card processors, local wallets, and BNPL installment terms.",
    alternating: [
      {
        pillText: "Local & Global",
        pillIcon: "/icons/wallet.svg",
        titleStart: "Integrate Local Wallets and",
        titleHighlight: "Gateways",
        titleEnd: "",
        description: "Connect store with Stripe, PayPal, SSLCommerz, bKash, Nagad, and local digital wallets inside unified checkout screens.",
        bullets: [
          "Accept bKash, Nagad, and wallet payments",
          "Secure credit and debit card processors",
          "Integrated Cash-on-Delivery payment routing"
        ]
      },
      {
        pillText: "Installment BNPL",
        pillIcon: "/icons/billing.svg",
        titleStart: "Offer Installment Checkouts with",
        titleHighlight: "BNPL",
        titleEnd: "",
        description: "Boost conversions on high-ticket products by allowing buyers to split checkouts into interest-free monthly payments.",
        bullets: [
          "Direct integration with BNPL providers",
          "Show monthly installments on product pages",
          "High cart value checkout completions"
        ]
      },
      {
        pillText: "Fraud Prevention",
        pillIcon: "/icons/lock.svg",
        titleStart: "Protect Your Revenue with AI",
        titleHighlight: "Fraud Shield",
        titleEnd: "",
        description: "Monitor purchase indicators and card details in real-time. Flag high-risk transactions before processing checkout capturing.",
        bullets: [
          "Verify checkout patterns and card matches",
          "Automated chargeback risk warning metrics",
          "Filter out known spam email and IP blocks"
        ]
      },
      {
        pillText: "One-page Checkout",
        pillIcon: "/icons/zap.svg",
        titleStart: "Optimize Conversions with One-page",
        titleHighlight: "Checkout",
        titleEnd: "",
        description: "Speed up purchasing. One-page checkouts pre-populate buyer details and combine cart checks and payments into a single step.",
        bullets: [
          "Form details auto-filled for returning buyers",
          "Optimized layout fields reduce purchase friction",
          "Guest checkouts enabled without force-signup"
        ]
      }
    ],
    extraTitle: "Settle transactions cleanly, count your revenue",
    extraDesc: "We provide secure checkout structures that automate bookkeeping and keep accounting teams happy.",
    extraCards: [
      { title: "Direct Reconciliation", desc: "Sync transaction logs with banks to verify payouts on the dashboard.", icon: "/icons/wallet.svg" },
      { title: "Multi-Currency", desc: "Display prices in local currency while settling in your home currency.", icon: "/icons/domain.svg" },
      { title: "Saved Payment Details", desc: "PCI-compliant card saving makes checkout fast for repeat buyers.", icon: "/icons/lock.svg" }
    ]
  }
};

export const FEATURES_LIST = [
  { slug: "multiple-themes", title: "Multiple Themes", icon: "/icons/themes.svg", desc: "Conversion-optimized templates" },
  { slug: "ai-assistant", title: "AI Assistant", icon: "/icons/ai-pencil.svg", desc: "Automate descriptions & SEO" },
  { slug: "fraud-protection", title: "Fraud Protection", icon: "/icons/lock.svg", desc: "Checkout rules & phone blocklist" },
  { slug: "courier", title: "Courier Integration", icon: "/icons/delivery.svg", desc: "Automated logistics & labels" },
  { slug: "store-analytics", title: "Store Analytics", icon: "/icons/analytics.svg", desc: "Funnel conversions & LTV" },
  { slug: "customer-management", title: "Customer Management", icon: "/icons/user.svg", desc: "Buyer profiles & loyalty" },
  { slug: "orders", title: "Orders Management", icon: "/icons/orders.svg", desc: "Consolidated bulk processing" },
  { slug: "payments", title: "Payment Integration", icon: "/icons/wallet.svg", desc: "Secure local & global gateways" },
];
