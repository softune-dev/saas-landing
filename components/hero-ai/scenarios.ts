/** The four things the hero's prompt box "does", in the order it cycles
 * through them. Each one is a real SoftuneBD AI capability (store setup, the
 * agent, AI images, the ChatGPT connector), shown on the same demo store so the
 * story reads as one business growing, not four unrelated tricks. */

export type ScenarioId = "store" | "agent" | "image" | "chatgpt";

/** Where on the canvas a step happens; the AI cursor flies there. */
export type Target = "nav" | "hero" | "heroArt" | "categories" | "products" | "orders" | "total";

type Text = { en: string; bn: string };

/** One action in the agent's reply, written the way coding agents log work:
 * a verb ("Designing" then "Designed") and the thing it acted on. */
export type Step = {
  target: Target;
  label: Text;
  doing: Text;
  done: Text;
};

export type Scenario = {
  id: ScenarioId;
  /** Public icon for the pill (landing's own icon set). */
  icon: string;
  tab: Text;
  prompt: Text;
  steps: Step[];
  /** The AI's closing message. */
  result: Text;
  /** The exchange before this one, so the sidebar reads as an ongoing chat. */
  history: { user: Text; ai: Text };
};

/** Older turns shown above every scenario's own, so the chat sidebar is full
 * from the first frame (they fade out at the top, like a scrolled chat). */
export const EARLIER_CHAT: { user: Text; ai: Text }[] = [
  {
    user: { en: "Set up bKash and Nagad payments.", bn: "bKash ও Nagad পেমেন্ট চালু করো।" },
    ai: { en: "Done. bKash, Nagad and cash on delivery are on.", bn: "হয়ে গেছে। bKash, Nagad ও ক্যাশ অন ডেলিভারি চালু।" },
  },
  {
    user: { en: "Add Pathao and Steadfast couriers.", bn: "Pathao ও Steadfast কুরিয়ার যোগ করো।" },
    ai: { en: "Both couriers are connected to your orders.", bn: "দুটি কুরিয়ারই আপনার অর্ডারের সাথে যুক্ত।" },
  },
];

export const SCENARIOS: Scenario[] = [
  {
    id: "store",
    icon: "/icons/shop-bag.svg",
    tab: { en: "Build store", bn: "স্টোর বানান" },
    prompt: {
      en: "Build a women's fashion store called Veila, warm and elegant",
      bn: "Veila নামে একটি মেয়েদের ফ্যাশন স্টোর বানাও, উষ্ণ আর এলিগ্যান্ট",
    },
    steps: [
      { target: "nav", label: { en: "navbar and logo", bn: "নেভবার ও লোগো" }, doing: { en: "Designing", bn: "ডিজাইন হচ্ছে" }, done: { en: "Designed", bn: "ডিজাইন হলো" } },
      { target: "hero", label: { en: "hero section", bn: "হিরো সেকশন" }, doing: { en: "Writing", bn: "লেখা হচ্ছে" }, done: { en: "Wrote", bn: "লেখা হলো" } },
      { target: "categories", label: { en: "5 categories", bn: "৫টি ক্যাটাগরি" }, doing: { en: "Creating", bn: "তৈরি হচ্ছে" }, done: { en: "Created", bn: "তৈরি হলো" } },
      { target: "products", label: { en: "4 products", bn: "৪টি প্রোডাক্ট" }, doing: { en: "Adding", bn: "যোগ হচ্ছে" }, done: { en: "Added", bn: "যোগ হলো" } },
    ],
    result: { en: "Your store is ready. Take a look on the right.", bn: "আপনার স্টোর রেডি। ডান পাশে দেখুন।" },
    history: {
      user: { en: "Hi! I sell sarees and fashion in Dhaka.", bn: "হাই! আমি ঢাকায় শাড়ি ও ফ্যাশন বিক্রি করি।" },
      ai: { en: "Great. Tell me what you want and I will build it.", bn: "দারুণ। কী চান বলুন, আমি বানিয়ে দেব।" },
    },
  },
  {
    id: "agent",
    icon: "/icons/ai.svg",
    tab: { en: "AI agent", bn: "AI এজেন্ট" },
    prompt: {
      en: "Get my store ready for Eid with warmer colours",
      bn: "উষ্ণ রঙে আমার স্টোর ঈদের জন্য সাজাও",
    },
    steps: [
      { target: "hero", label: { en: "hero headline", bn: "হিরো হেডলাইন" }, doing: { en: "Rewriting", bn: "নতুন করে লেখা হচ্ছে" }, done: { en: "Rewrote", bn: "নতুন করে লেখা হলো" } },
      { target: "nav", label: { en: "store colours", bn: "স্টোরের রং" }, doing: { en: "Warming", bn: "উষ্ণ করা হচ্ছে" }, done: { en: "Warmed", bn: "উষ্ণ করা হলো" } },
      { target: "products", label: { en: "3 products", bn: "৩টি প্রোডাক্ট" }, doing: { en: "Tagging", bn: "ট্যাগ বসছে" }, done: { en: "Tagged", bn: "ট্যাগ বসানো হলো" } },
    ],
    result: { en: "Done. Your store is dressed for Eid and live.", bn: "হয়ে গেছে। আপনার স্টোর ঈদের সাজে লাইভ।" },
    history: {
      user: { en: "Show me my store.", bn: "আমার স্টোর দেখাও।" },
      ai: { en: "Veila is live. What would you like to change?", bn: "Veila লাইভ আছে। কী বদলাতে চান?" },
    },
  },
  {
    id: "image",
    icon: "/icons/color.svg",
    tab: { en: "Image Gen 2.0", bn: "ইমেজ জেন ২.০" },
    prompt: {
      en: "Create a hero banner and fresh product photos",
      bn: "একটি হিরো ব্যানার আর নতুন প্রোডাক্ট ছবি বানাও",
    },
    steps: [
      { target: "heroArt", label: { en: "hero banner", bn: "হিরো ব্যানার" }, doing: { en: "Generating", bn: "তৈরি হচ্ছে" }, done: { en: "Generated", bn: "তৈরি হলো" } },
      { target: "products", label: { en: "4 product photos", bn: "৪টি প্রোডাক্ট ছবি" }, doing: { en: "Shooting", bn: "তোলা হচ্ছে" }, done: { en: "Shot", bn: "তোলা হলো" } },
    ],
    result: { en: "Done. The new images are live on your store.", bn: "হয়ে গেছে। নতুন ছবি আপনার স্টোরে লাইভ।" },
    history: {
      user: { en: "What can you do with images?", bn: "ছবি নিয়ে তুমি কী কী করতে পারো?" },
      ai: { en: "Banners, product photos and social posts.", bn: "ব্যানার, প্রোডাক্ট ছবি ও সোশ্যাল পোস্ট।" },
    },
  },
  {
    id: "chatgpt",
    icon: "/icons/chatgpt-mark.png",
    tab: { en: "GPT Connect", bn: "GPT কানেক্ট" },
    prompt: {
      en: "How did my store do this week?",
      bn: "এই সপ্তাহে আমার স্টোর কেমন চলল?",
    },
    steps: [
      { target: "orders", label: { en: "37 orders", bn: "৩৭টি অর্ডার" }, doing: { en: "Reading", bn: "পড়া হচ্ছে" }, done: { en: "Read", bn: "পড়া হলো" } },
      { target: "total", label: { en: "this week's sales", bn: "এই সপ্তাহের সেলস" }, doing: { en: "Adding up", bn: "যোগ হচ্ছে" }, done: { en: "Added up", bn: "যোগ হলো" } },
    ],
    result: { en: "Done. The answer is in ChatGPT.", bn: "হয়ে গেছে। উত্তর ChatGPT-তে আছে।" },
    history: {
      user: { en: "Connect my store to ChatGPT.", bn: "আমার স্টোর ChatGPT-র সাথে যুক্ত করো।" },
      ai: { en: "Connected. ChatGPT can now read your store.", bn: "যুক্ত হয়েছে। ChatGPT এখন আপনার স্টোর দেখতে পারবে।" },
    },
  },
];
