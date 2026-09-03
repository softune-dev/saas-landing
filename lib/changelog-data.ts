/**
 * Merchant-facing changelog — dashboard and live storefront only.
 * Landing-site, SEO, and internal/dev work is not recorded here.
 * Dates follow git history of user-visible product work (Aug/Sep 2026).
 */

export type ChangeType = "Feature" | "Improvement" | "Bug Fix";

export type ChangelogChange = {
  type: ChangeType;
  content: string;
};

export type ChangelogRelease = {
  serial: string;
  version: string;
  date: string;
  title: string;
  description: string;
  changes: ChangelogChange[];
};

export const changelogData: ChangelogRelease[] = [
  {
    serial: "1.5",
    version: "v1.5.0",
    date: "Sep 3, 2026",
    title: "Theme skeleton cleanup, Bazaar header redesign, and carousel sliders",
    description:
      "Aurora and Bazaar storefronts now feature clean empty-state skeletons for all sections, responsive header layouts, and touch-enabled carousel sliders for category products.",
    changes: [
      {
        type: "Feature",
        content:
          "Aurora and Bazaar theme skeletons: new stores display clean empty-state skeletons with aspect ratio indicators (16:9 desktop, 1:1 mobile) and '+' badges instead of fake stock images or placeholder copy.",
      },
      {
        type: "Improvement",
        content:
          "Bazaar header redesign: custom SVG user icon, wishlist heart button, desktop 'All Categories' dropdown with inline navigation links, and a dedicated mobile search bar row.",
      },
      {
        type: "Improvement",
        content:
          "Hero category rail: Bazaar's category list stacks top-to-bottom with fixed item heights (max 9 items), dynamically filling empty slots with skeletons when fewer than 5 categories exist.",
      },
      {
        type: "Feature",
        content:
          "Touch-enabled carousels: 'Shop by Category' and 'Popular categories' product showcase blocks now feature smooth Embla Carousel drag/swipe sliders on mobile and desktop.",
      },
      {
        type: "Improvement",
        content:
          "Shop page category banner: displays a subtle top-left '+' indicator when no category banner image is uploaded, which automatically hides as soon as a banner image is added.",
      },
      {
        type: "Bug Fix",
        content:
          "Theme resolution fix: resolved an issue where default theme settings fell back to hardcoded sample copy and Unsplash images on newly published storefronts.",
      },
      {
        type: "Bug Fix",
        content:
          "Font optimization fix: resolved Next.js Google Font fallback configuration for Big Shoulders in Bazaar layout builds.",
      },
    ],
  },
  {
    serial: "1.4",
    version: "v1.4.0",
    date: "Sep 2, 2026",
    title: "Redesigned setup wizard",
    description:
      "Getting your store ready walks better on a phone, shows real upload progress, and stops asking once you're done.",
    changes: [
      {
        type: "Improvement",
        content:
          "Setup wizard redesigned end to end: an animated panel per step, a step tracker you can jump around in, and simpler wording throughout — no more guessing what a field wants.",
      },
      {
        type: "Improvement",
        content:
          "Setup is now fully usable on a phone, with the same steps and layout adapted to a smaller screen instead of a cramped desktop view.",
      },
      {
        type: "Feature",
        content:
          "Uploading images now shows a real progress bar per file, with clear file name and size — including when you're uploading several at once.",
      },
      {
        type: "Improvement",
        content:
          "The \"Getting Started\" step disappears from your sidebar for good once you finish it — it no longer reappears just because your trial store was already published.",
      },
      {
        type: "Bug Fix",
        content:
          "Colors and fonts you picked earlier in signup now actually show up pre-filled when you reach that step in the dashboard, instead of resetting.",
      },
      {
        type: "Bug Fix",
        content:
          "The \"Go live\" step now shows your real store address instead of a placeholder like my-shop.softunebd.com.",
      },
      {
        type: "Bug Fix",
        content:
          "Fixed a crash when a logo or product image failed to upload during setup — you now get a clear error instead of a broken page.",
      },
    ],
  },
  {
    serial: "1.3",
    version: "v1.3.0",
    date: "Aug 31, 2026",
    title: "Free 3-day trial",
    description:
      "You can open a real Softune store in minutes — no credit card, no waiting on us to provision an account.",
    changes: [
      {
        type: "Feature",
        content:
          "Self-serve 3-day trial: create an account, verify email, name your shop, pick Aurora or Bazaar, and land in the dashboard with a live store.",
      },
      {
        type: "Feature",
        content:
          "Trial countdown in the dashboard header so you can see how many days are left.",
      },
      {
        type: "Feature",
        content:
          "Trial sites are usable immediately. Setup guidance is optional — you are not locked out of products, orders, or the theme editor until you finish onboarding.",
      },
      {
        type: "Feature",
        content:
          "Live demo still available from the marketing site: enter an email, open a read-only dashboard, then start your own trial when you are ready.",
      },
    ],
  },
  {
    serial: "1.2",
    version: "v1.2.0",
    date: "Aug 31, 2026",
    title: "Payments, tickets, and login codes",
    description:
      "Checkout can use official payment accounts, and you can reach us from inside the dashboard.",
    changes: [
      {
        type: "Feature",
        content:
          "Connect official bKash, Nagad, and SSLCommerz merchant accounts from Payments — alongside COD and manual bKash/Nagad.",
      },
      {
        type: "Feature",
        content:
          "Help Desk in Account: open a ticket from the dashboard and get a real email reply on the same thread.",
      },
      {
        type: "Feature",
        content:
          "Email login codes (OTP) when you sign in, so you can get back into the dashboard without only relying on a password.",
      },
    ],
  },
  {
    serial: "1.1",
    version: "v1.1.0",
    date: "Aug 30, 2026",
    title: "Couriers, POS, and profit",
    description:
      "More Bangladesh couriers, faster counter sales, and analytics that show margin — not just visits.",
    changes: [
      {
        type: "Feature",
        content:
          "Pathao, RedX, and eCourier join Steadfast. Connect your own merchant accounts from Courier.",
      },
      {
        type: "Feature",
        content:
          "Store Sale (POS) records walk-in orders on their own channel, separate from online checkout.",
      },
      {
        type: "Feature",
        content:
          "SKU search at the counter so you can scan or type a barcode and pull the product without hunting the catalog.",
      },
      {
        type: "Feature",
        content:
          "Profit and loss from real order data, including cost price when you have set it on products.",
      },
      {
        type: "Feature",
        content:
          "Storefront visitor analytics, plus Meta Conversions API (CAPI) so ads can see purchases even when the browser pixel is blocked.",
      },
    ],
  },
  {
    serial: "1.0.4",
    version: "v1.0.4",
    date: "Aug 27, 2026",
    title: "Variants, AI copy, and plan limits",
    description:
      "Products can look different per size or color, and AI can draft descriptions you still edit before save.",
    changes: [
      {
        type: "Feature",
        content:
          "Each product variant can have its own color and image — not one photo for every size.",
      },
      {
        type: "Feature",
        content:
          "AI product descriptions: give a name and facts, get draft copy, then edit and save. Nothing publishes without you.",
      },
      {
        type: "Improvement",
        content:
          "Product caps per plan are enforced (Starter 50, Growth 500, Business unlimited), so the catalog matches what you pay for.",
      },
      {
        type: "Improvement",
        content:
          "The shared demo account cannot change live data. Click around safely; your trial store is the one you write to.",
      },
    ],
  },
  {
    serial: "1.0.3",
    version: "v1.0.3",
    date: "Aug 24, 2026",
    title: "Customers, AI credits, and publish",
    description:
      "Shoppers from checkout become real customer records. Starter includes a daily AI allowance.",
    changes: [
      {
        type: "Feature",
        content:
          "Customers list: each order phone creates or matches a customer record so you can see who bought, not only the order row.",
      },
      {
        type: "Bug Fix",
        content:
          "Customers list no longer shows everyone as “Unnamed” when a name was on the order.",
      },
      {
        type: "Improvement",
        content:
          "Starter includes 15 AI credits per day (was none). Growth and Business keep their higher daily caps.",
      },
      {
        type: "Improvement",
        content:
          "Publishing waits a short cooldown so you cannot spam publish. Storefront screenshots use your subdomain and wait until the new version is actually up.",
      },
    ],
  },
  {
    serial: "1.0.2",
    version: "v1.0.2",
    date: "Aug 21, 2026",
    title: "About pages, domains, and media",
    description:
      "Storefront About is its own page. Custom domains report a real connection status. Media storage follows the plan.",
    changes: [
      {
        type: "Feature",
        content:
          "Dedicated About Us content on the storefront, separate from the homepage tagline and hero images.",
      },
      {
        type: "Feature",
        content:
          "Custom domain: Softune attaches the domain on save and shows whether it is actually connected — not only stored in settings.",
      },
      {
        type: "Improvement",
        content:
          "Removing or changing a custom domain disconnects the old one, so it does not stay pointing at a dead site.",
      },
      {
        type: "Improvement",
        content:
          "Media library respects plan storage (Starter 500MB, Growth 2GB, Business 5GB).",
      },
      {
        type: "Improvement",
        content:
          "Account profile now has phone, timezone, and avatar — used across the dashboard, not only at signup.",
      },
    ],
  },
  {
    serial: "1.0.1",
    version: "v1.0.1",
    date: "Aug 19, 2026",
    title: "Analytics depth and AI credits",
    description:
      "The dashboard chart can see six months of orders. AI usage is a real daily credit balance per plan.",
    changes: [
      {
        type: "Improvement",
        content:
          "Orders list can load enough history for the six-month analytics chart instead of cutting off early.",
      },
      {
        type: "Feature",
        content:
          "AI credits reset daily and match the plan: Starter 15/day, Growth 80/day, Business 240/day. The header shows what you have left.",
      },
    ],
  },
  {
    serial: "1.0",
    version: "v1.0.0",
    date: "Aug 18, 2026",
    title: "Softune is live",
    description:
      "The dashboard and storefront that Bangladesh merchants use every day — themes, catalog, orders, COD, and the first courier.",
    changes: [
      {
        type: "Feature",
        content:
          "Multi-tenant dashboard: products, categories, orders, customers, and one storefront per workspace (Business includes up to three).",
      },
      {
        type: "Feature",
        content:
          "Theme Editor with live desktop, tablet, and mobile preview. Draft, then publish. Aurora (Fashion) and Bazaar (Emporium) ship as the first two skins.",
      },
      {
        type: "Feature",
        content:
          "Store Sale POS for counter orders, with receipts and recent sales.",
      },
      {
        type: "Feature",
        content:
          "Checkout: Cash on Delivery plus manual bKash and Nagad (wallet number + transaction ID).",
      },
      {
        type: "Feature",
        content:
          "Steadfast courier connection from your own merchant account.",
      },
      {
        type: "Feature",
        content:
          "Fraud Protection: phone blocklist and checkout rules (hold first high-value, flag bursts). Rule-based, not machine-learning scoring.",
      },
      {
        type: "Feature",
        content:
          "Gemini AI chatbot in the dashboard — answers from your products, orders, and sales. Catalog writes still need your confirm.",
      },
      {
        type: "Feature",
        content:
          "Analytics from real orders: revenue, average order value, and best-sellers.",
      },
      {
        type: "Feature",
        content:
          "Marketing pixels: Meta Pixel, TikTok Pixel, GTM, and GA4 from Site Settings.",
      },
    ],
  },
];
