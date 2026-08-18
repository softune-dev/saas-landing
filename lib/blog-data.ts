// ─── Types ────────────────────────────────────────────────────────────────────

export type BodyBlock =
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "p"; content: string }
  | { type: "quote"; content: string }
  | { type: "callout"; content: string }
  | { type: "list"; content: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  image: string;
  desc: string;
  body: BodyBlock[];
}

// ─── Post Listing (used on /blog) ────────────────────────────────────────────

export const BLOG_POSTS: Omit<BlogPost, "body" | "authorRole" | "authorAvatar">[] = [
  {
    slug: "conversion-rate-optimization-2026",
    title: "10 Conversion Rate Optimization Checklist Items for 2026",
    category: "Conversion Rate",
    date: "Aug 15, 2026",
    readTime: "6 min read",
    author: "Mahmudul Hasan",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    desc: "Make checkouts simple and maximize order value. We list the ten must-have UI elements for mobile viewports to stop cart drop-offs.",
  },
  {
    slug: "pos-integration-local-brands",
    title: "Why Point-of-Sale (POS) Integration is Crucial for Local Brands",
    category: "POS & Retail",
    date: "Aug 10, 2026",
    readTime: "5 min read",
    author: "Tariqul Islam",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    desc: "Unify online catalog inventories and retail storefront counters. Avoid overselling items and automate tax reporting automatically.",
  },
  {
    slug: "conversion-rate-optimization-2026",
    title: "Understanding Schema JSON-LD Structured Data for Ecommerce",
    category: "SEO Strategy",
    date: "Aug 05, 2026",
    readTime: "8 min read",
    author: "Kamrul Hasan",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80",
    desc: "Rank higher on Google search engine databases. Learn how schemas display prices, review ratings, and availability directly on results.",
  },
  {
    slug: "conversion-rate-optimization-2026",
    title: "The Ultimate Guide to Zero-Downtime Store Migrations",
    category: "Store Setup",
    date: "Jul 28, 2026",
    readTime: "7 min read",
    author: "Alex Rivera",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    desc: "Platform migrations don't have to break your business. How to map sitemaps, establish 301 redirects, and keep customer logs intact.",
  },
  {
    slug: "conversion-rate-optimization-2026",
    title: "Courier Automations: SMS Alerts and Live Logistics Tracking",
    category: "Logistics",
    date: "Jul 20, 2026",
    readTime: "4 min read",
    author: "Jessica Mercer",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80",
    desc: "Lower support ticket logs. Automatically update customer packages with real-time route statuses and delivery confirmations.",
  },
  {
    slug: "conversion-rate-optimization-2026",
    title: "How to Build an Unforgettable Brand Identity for Online Retail",
    category: "Design System",
    date: "Jul 12, 2026",
    readTime: "6 min read",
    author: "Sarah Connor",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    desc: "Craft cohesive styling templates. Learn how layouts, custom font choices, and primary colors construct professional-grade sites.",
  },
];

// ─── Related Posts (used on article page sidebar) ────────────────────────────

export const RELATED_POSTS = [
  {
    title: "Why Point-of-Sale (POS) Integration is Crucial for Local Brands",
    category: "POS & Retail",
    date: "Aug 10, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    slug: "pos-integration-local-brands",
  },
  {
    title: "Understanding Schema JSON-LD Structured Data for Ecommerce",
    category: "SEO Strategy",
    date: "Aug 05, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=600&q=80",
    slug: "conversion-rate-optimization-2026",
  },
  {
    title: "How to Build an Unforgettable Brand Identity for Online Retail",
    category: "Design System",
    date: "Jul 12, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    slug: "conversion-rate-optimization-2026",
  },
];

// ─── Full Articles (used on /blog/[slug]) ────────────────────────────────────

export const ARTICLES: Record<string, BlogPost> = {
  "conversion-rate-optimization-2026": {
    slug: "conversion-rate-optimization-2026",
    title: "10 Conversion Rate Optimization Checklist Items for 2026",
    category: "Conversion Rate",
    date: "Aug 15, 2026",
    readTime: "6 min read",
    author: "Mahmudul Hasan",
    authorRole: "Growth Strategist",
    authorAvatar: "https://i.pravatar.cc/150?img=52",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    desc: "Make checkouts simple and maximize order value. We list the ten must-have UI elements for mobile viewports to stop cart drop-offs.",
    body: [
      { type: "p", content: "Every percentage point of conversion matters. In 2026, the bar for a high-performing storefront has risen dramatically — customers expect faster load times, frictionless checkout flows, and personalized experiences from the first tap." },
      { type: "h2", content: "Why CRO Still Matters More Than Traffic" },
      { type: "p", content: "Driving traffic is expensive. Converting existing visitors is a far more profitable lever. A 1% improvement in conversion rate on a store generating ৳50,000/month in revenue translates to ৳500 in additional monthly revenue — without spending a single taka on ads." },
      { type: "quote", content: "Traffic brings visitors. Conversion rate brings customers. Focus on the latter before scaling the former." },
      { type: "h2", content: "The 10-Item CRO Checklist" },
      { type: "list", content: [
        "Reduce checkout steps to 3 or fewer pages",
        "Add trust badges (SSL, payment icons) above the fold",
        "Display real-time stock levels to create urgency",
        "Use a persistent sticky cart on mobile viewports",
        "Offer guest checkout — never force account creation",
        "A/B test your primary CTA button copy and color",
        "Add product video loops on key item listings",
        "Implement exit-intent popups with a time-limited offer",
        "Ensure your site loads under 2 seconds on 4G networks",
        "Show delivery estimates directly on product pages",
      ]},
      { type: "h2", content: "Mobile Viewport Priorities" },
      { type: "p", content: "Over 72% of Softune merchant traffic originates from mobile browsers. If your checkout funnel is not optimized for a 390px viewport width, you are leaving a significant portion of revenue on the table. Focus on tap target sizes (minimum 44px), thumb-reachable CTAs, and reducing form field count." },
      { type: "callout", content: "Quick Win: Move your checkout button to the bottom of the screen on mobile. Thumb-reachable CTAs consistently outperform top-positioned buttons by 18-34% in mobile conversion studies." },
      { type: "h3", content: "Trust Elements That Convert" },
      { type: "p", content: "Trust is the silent conversion killer. Customers who trust your brand buy faster and return more often. Place security badges near your Add to Cart button, show authentic product review counts, and always display a clear return policy before the checkout confirmation step." },
      { type: "h2", content: "Measuring and Iterating" },
      { type: "p", content: "CRO is not a one-time audit — it's a continuous practice. Set up funnel tracking in your analytics dashboard, identify the highest drop-off pages, hypothesize a fix, deploy it, and measure the result over a statistically significant sample. Repeat this loop every two weeks for compound gains throughout the year." },
    ],
  },

  "pos-integration-local-brands": {
    slug: "pos-integration-local-brands",
    title: "Why Point-of-Sale (POS) Integration is Crucial for Local Brands",
    category: "POS & Retail",
    date: "Aug 10, 2026",
    readTime: "5 min read",
    author: "Tariqul Islam",
    authorRole: "Retail Systems Analyst",
    authorAvatar: "https://i.pravatar.cc/150?img=48",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    desc: "Unify online catalog inventories and retail storefront counters. Avoid overselling items and automate tax reporting automatically.",
    body: [
      { type: "p", content: "For local and independent brands operating both physical counters and online stores, inventory management is the perpetual challenge. A POS system that communicates directly with your digital catalog is no longer a luxury — it's a baseline requirement for avoiding costly oversells and operational chaos." },
      { type: "h2", content: "The Inventory Sync Problem" },
      { type: "p", content: "Without integration, teams are forced to manually reconcile stock levels across physical counters and online carts. A customer purchases your last unit at the retail counter at 2pm. By 2:05pm, the same item sells online. You now have a broken promise and a frustrated customer." },
      { type: "quote", content: "A disconnected POS isn't just an inconvenience — it's a liability that directly erodes customer trust and repeat purchase rates." },
      { type: "h2", content: "Key Benefits of Unified POS-Online Integration" },
      { type: "list", content: [
        "Real-time inventory sync across all sales channels",
        "Automated low-stock alerts before oversells occur",
        "Unified customer purchase history across both channels",
        "Single dashboard for tax calculation and reporting",
        "Consolidated revenue analytics and daily reconciliation",
      ]},
      { type: "h2", content: "How Softune Handles This" },
      { type: "p", content: "Softune's POS integration layer maintains a single source-of-truth inventory database. When a sale is processed on the physical counter terminal, the online catalog stock is decremented in under 200 milliseconds. This means your digital storefront is always displaying accurate, real-time availability to customers." },
      { type: "callout", content: "Softune merchants using unified POS integration report a 91% reduction in customer support tickets related to oversells and inventory discrepancies." },
    ],
  },
};

export const DEFAULT_ARTICLE_SLUG = "conversion-rate-optimization-2026";
