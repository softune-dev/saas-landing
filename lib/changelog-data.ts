/**
 * Merchant-facing changelog: dashboard, AI and live storefront only.
 * Landing-site, SEO and internal work is not recorded here. Dates follow git
 * history. Keep entries short: one line a store owner would care about.
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
    serial: "3.5",
    version: "v3.5.0",
    date: "Nov 12, 2026",
    title: "Softune Pay: manual bKash, Nagad and Rocket payments confirm themselves",
    description: "A free Android app reads your wallet's payment SMS and marks the matching order paid.",
    changes: [
      { type: "Feature", content: "Softune Pay app: pair the phone with your wallet SIM by scanning a QR code in Payments." },
      { type: "Feature", content: "When a shopper pays your bKash, Nagad or Rocket number, the order turns Paid on its own, matched by transaction ID." },
      { type: "Feature", content: "See connected phones and every payment the app received in Payments, Softune Pay." },
      { type: "Improvement", content: "A payment with the wrong amount is flagged for you to check, never confirmed automatically." },
    ],
  },
  {
    serial: "3.4",
    version: "v3.4.0",
    date: "Nov 6, 2026",
    title: "The AI agent can now run your whole store",
    description: "Ask the AI to manage products, settings and delivery in plain words, and offer free delivery on bigger orders.",
    changes: [
      { type: "Feature", content: "AI agent manages SEO, contact details, delivery, About, FAQs, Privacy, Terms, domains, fraud rules and your account." },
      { type: "Feature", content: "AI agent can fill every product field, including variants and stock for each size and color." },
      { type: "Feature", content: "Free delivery over an amount: set it in Shipping or ask the AI. Shoppers see how much more to add." },
      { type: "Improvement", content: "When your free AI messages run out, you now get a clear screen to buy credits instead of an error." },
      { type: "Improvement", content: "Purchased credits now also work on the Write with AI buttons." },
      { type: "Bug Fix", content: "The delivery charge shown in the cart now matches what checkout charges for multiple items." },
    ],
  },
  {
    serial: "3.3",
    version: "v3.3.0",
    date: "Oct 31, 2026",
    title: "Editing from two devices is now safe",
    description: "Publishing from one device no longer overwrites work saved on another.",
    changes: [
      { type: "Bug Fix", content: "Publishing only applies what you edited on that device, on top of your latest store." },
      { type: "Bug Fix", content: "Saving your theme no longer deletes images from your media library." },
    ],
  },
  {
    serial: "3.2",
    version: "v3.2.0",
    date: "Oct 30, 2026",
    title: "Manage your store from ChatGPT (beta)",
    description: "Connect your store to ChatGPT to check sales, edit your store and add images.",
    changes: [
      { type: "Feature", content: "ChatGPT connector: approve it once, then ask ChatGPT to read and update your store." },
      { type: "Feature", content: "Images made in ChatGPT can go straight to your hero, categories or products." },
      { type: "Improvement", content: "AI Images now plans each design first, so vague requests return a real redesign." },
    ],
  },
  {
    serial: "3.1",
    version: "v3.1.0",
    date: "Oct 30, 2026",
    title: "Meet the AI agent",
    description: "The AI chat now does the work for you instead of explaining where to click.",
    changes: [
      { type: "Feature", content: "AI agent changes your colors, fonts and homepage text, and adds products, categories and sale events." },
      { type: "Feature", content: "Every AI change has an Undo button." },
      { type: "Feature", content: "Attach a photo in chat and the AI can see it and place it on your store." },
      { type: "Improvement", content: "Replies stream in live, showing each step the AI takes." },
    ],
  },
  {
    serial: "3.0",
    version: "v3.0.0",
    date: "Oct 30, 2026",
    title: "Lower prices on every plan",
    description: "Starter ৳499, Growth ৳1,499 and Business ৳3,999 a month, with 20% off yearly.",
    changes: [
      { type: "Improvement", content: "Paid stores move to the new price at their next renewal." },
    ],
  },
  {
    serial: "2.9",
    version: "v2.9.0",
    date: "Oct 17, 2026",
    title: "Set up your whole store with AI",
    description: "Answer a few questions and AI builds your homepage, images, categories and first product.",
    changes: [
      { type: "Feature", content: "AI store setup from a short form, offered right after your store goes live." },
      { type: "Feature", content: "Your 5 free AI images now work in the AI panel's Image tab." },
      { type: "Improvement", content: "A cleaner AI panel, bigger image presets, and suggested prompts in Bangla." },
      { type: "Bug Fix", content: "Fixed new stores getting a credits error while they still had free images." },
    ],
  },
  {
    serial: "2.8",
    version: "v2.8.0",
    date: "Oct 9, 2026",
    title: "How it works, and clearer custom domains",
    description: "A quick walkthrough inside the dashboard, and honest domain status.",
    changes: [
      { type: "Feature", content: "How it works popup with a video walkthrough, in English and Bangla." },
      { type: "Improvement", content: "A new custom domain now shows as waiting for DNS until it really connects." },
      { type: "Improvement", content: "Hero images on phones keep their shape when no mobile image is set." },
    ],
  },
  {
    serial: "2.7",
    version: "v2.7.0",
    date: "Oct 6, 2026",
    title: "See your store while you build it",
    description: "Setup now shows a live phone preview and helps you create your first images.",
    changes: [
      { type: "Feature", content: "Live preview during setup, updating as you add your logo, images and products." },
      { type: "Feature", content: "New Site images step, with free AI images to get started." },
    ],
  },
  {
    serial: "2.6",
    version: "v2.6.0",
    date: "Sep 22, 2026",
    title: "Trial extended to 7 days",
    description: "More time to set up your store before choosing a plan. No credit card needed.",
    changes: [
      { type: "Improvement", content: "Free trial is now 7 days instead of 3." },
    ],
  },
  {
    serial: "2.5",
    version: "v2.5.0",
    date: "Sep 19, 2026",
    title: "Price and stock for every variant",
    description: "Each size and color combination can have its own details, and payments verify themselves.",
    changes: [
      { type: "Feature", content: "Each variant combination can have its own price, stock and photo." },
      { type: "Feature", content: "bKash and bank payments, including AI credit packs, are verified automatically." },
      { type: "Improvement", content: "Free and purchased chat credits now show as one number." },
      { type: "Improvement", content: "AI Images gained a With text / Without text choice and more presets." },
      { type: "Bug Fix", content: "Product pages no longer show fake sizes or pre-select a variant." },
      { type: "Bug Fix", content: "A store's subdomain now stays updated after adding a custom domain." },
    ],
  },
  {
    serial: "2.4",
    version: "v2.4.0",
    date: "Sep 17, 2026",
    title: "AI images and extra credits",
    description: "Create product and marketing images with AI, and buy credits when you need more.",
    changes: [
      { type: "Feature", content: "AI Image Generation with ready presets and a saved gallery." },
      { type: "Feature", content: "Buy chat and image credits when your free allowance runs out." },
      { type: "Feature", content: "AI chat can update orders, events and products after you confirm." },
      { type: "Improvement", content: "Renewal reminders by email and in the dashboard." },
      { type: "Bug Fix", content: "Forgot Password now works without contacting support." },
    ],
  },
  {
    serial: "2.3",
    version: "v2.3.0",
    date: "Sep 13, 2026",
    title: "Switch themes, event popups and hero video",
    description: "Change your store's design in one click and catch visitors' attention.",
    changes: [
      { type: "Feature", content: "Switch your store's theme anytime, keeping all your products and content." },
      { type: "Feature", content: "New Women theme, and a catalog of themes in the dashboard." },
      { type: "Feature", content: "Event popups on your homepage, with an image-only option." },
      { type: "Feature", content: "Use a video in your homepage hero." },
      { type: "Improvement", content: "Media gallery gained select all, grid and list views, and pages." },
    ],
  },
  {
    serial: "2.2",
    version: "v2.2.0",
    date: "Sep 11, 2026",
    title: "Install the dashboard as an app",
    description: "Add SoftuneBD to your phone's home screen, with a better mobile dashboard.",
    changes: [
      { type: "Feature", content: "Install the dashboard as a mobile app." },
      { type: "Feature", content: "A much larger icon set for categories and features." },
      { type: "Improvement", content: "Redesigned mobile dashboard, and media uploads now queue one at a time." },
      { type: "Bug Fix", content: "Product price and image now update when a shopper picks a variant." },
    ],
  },
  {
    serial: "2.1",
    version: "v2.1.0",
    date: "Sep 6, 2026",
    title: "Abandoned checkouts",
    description: "See who started checkout but never finished, so you can follow up.",
    changes: [
      { type: "Feature", content: "Abandoned checkouts with phone number and cart, on the Customers page." },
      { type: "Improvement", content: "A cleaner manual bKash and Nagad payment step." },
    ],
  },
  {
    serial: "2.0",
    version: "v2.0.0",
    date: "Sep 5, 2026",
    title: "The dashboard speaks Bangla",
    description: "Switch your whole dashboard between Bangla and English.",
    changes: [
      { type: "Feature", content: "Bangla and English language toggle across the dashboard." },
    ],
  },
  {
    serial: "1.9",
    version: "v1.9.0",
    date: "Sep 4, 2026",
    title: "Stronger fraud protection and Steadfast booking",
    description: "Stop fake orders earlier and send parcels without leaving the dashboard.",
    changes: [
      { type: "Feature", content: "Block an IP from your whole store, and stop repeat orders from one device." },
      { type: "Feature", content: "Suspicious orders are flagged for your review." },
      { type: "Feature", content: "Customer risk score from 0 to 100, based on real order history." },
      { type: "Feature", content: "Book Steadfast parcels one by one, in bulk or automatically, with live delivery status." },
    ],
  },
  {
    serial: "1.8",
    version: "v1.8.0",
    date: "Sep 3, 2026",
    title: "Sale events and invoices",
    description: "Run named sales on your products and get real invoices.",
    changes: [
      { type: "Feature", content: "Events: create a sale like Eid Sale with a percent discount on chosen products." },
      { type: "Feature", content: "Invoices for your plan, ready to view and download." },
      { type: "Improvement", content: "New stores show clean placeholders until you add your own images." },
    ],
  },
  {
    serial: "1.7",
    version: "v1.7.0",
    date: "Sep 2, 2026",
    title: "Free trial and a new setup wizard",
    description: "Open a real store in minutes, with no credit card.",
    changes: [
      { type: "Feature", content: "Self-serve free trial with a countdown in your dashboard." },
      { type: "Improvement", content: "Redesigned setup wizard with real upload progress." },
    ],
  },
  {
    serial: "1.6",
    version: "v1.6.0",
    date: "Aug 31, 2026",
    title: "Payment gateways, Help Desk and login codes",
    description: "Take official online payments and reach us from your dashboard.",
    changes: [
      { type: "Feature", content: "Connect your bKash, Nagad and SSLCommerz merchant accounts." },
      { type: "Feature", content: "Help Desk: open a ticket and get a reply by email." },
      { type: "Feature", content: "Sign in with an email code." },
    ],
  },
  {
    serial: "1.5",
    version: "v1.5.0",
    date: "Aug 30, 2026",
    title: "More couriers, POS and profit",
    description: "More delivery options, faster counter sales and real margin numbers.",
    changes: [
      { type: "Feature", content: "Pathao, RedX and eCourier join Steadfast." },
      { type: "Feature", content: "Store Sale (POS) for walk-in orders, with receipts and SKU search." },
      { type: "Feature", content: "Profit and loss from real orders, plus real visitor numbers." },
      { type: "Feature", content: "Meta Conversions API, and purchase tracking for your ad pixels." },
    ],
  },
  {
    serial: "1.4",
    version: "v1.4.0",
    date: "Aug 27, 2026",
    title: "Better variants and AI descriptions",
    description: "Show real colors and photos per variant, and let AI draft your product text.",
    changes: [
      { type: "Feature", content: "Each variant can have its own color and image." },
      { type: "Feature", content: "AI drafts product descriptions for you to edit." },
      { type: "Feature", content: "Switch between multiple accounts in the dashboard." },
      { type: "Improvement", content: "Bot protection on checkout and contact forms." },
    ],
  },
  {
    serial: "1.3",
    version: "v1.3.0",
    date: "Aug 24, 2026",
    title: "Customers and testimonials",
    description: "See who bought from you, and show reviews your way.",
    changes: [
      { type: "Feature", content: "Customers list, built automatically from your orders." },
      { type: "Feature", content: "Testimonials as cards or screenshots." },
      { type: "Improvement", content: "Starter now includes daily AI messages." },
      { type: "Bug Fix", content: "SEO settings now apply to your live store." },
    ],
  },
  {
    serial: "1.2",
    version: "v1.2.0",
    date: "Aug 20, 2026",
    title: "Dark mode and a guided tour",
    description: "A dashboard that works on any screen, with help getting started.",
    changes: [
      { type: "Feature", content: "Dark mode and a guided tour of the dashboard." },
      { type: "Improvement", content: "The dashboard now works properly on phones." },
      { type: "Improvement", content: "Media storage limits per plan, and a fuller account profile." },
    ],
  },
  {
    serial: "1.1",
    version: "v1.1.0",
    date: "Aug 19, 2026",
    title: "About pages, custom domains and AI credits",
    description: "Tell your story, connect your own domain, and see your AI allowance.",
    changes: [
      { type: "Feature", content: "A dedicated About Us page for your store." },
      { type: "Feature", content: "Connect a custom domain and see its real status." },
      { type: "Feature", content: "Daily AI credits per plan, shown in the header." },
      { type: "Improvement", content: "The analytics chart now covers six months of orders." },
    ],
  },
  {
    serial: "1.0",
    version: "v1.0.0",
    date: "Aug 18, 2026",
    title: "SoftuneBD is live",
    description: "Everything a Bangladesh merchant needs to sell online, in one dashboard.",
    changes: [
      { type: "Feature", content: "Products, categories, orders and your own storefront." },
      { type: "Feature", content: "Theme Editor with live desktop, tablet and mobile preview." },
      { type: "Feature", content: "Cash on Delivery plus manual bKash and Nagad." },
      { type: "Feature", content: "Steadfast courier, fraud rules and a phone blocklist." },
      { type: "Feature", content: "AI assistant, sales analytics and marketing pixels." },
    ],
  },
];
