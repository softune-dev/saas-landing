/** The four things the hero's prompt box "does", in the order it cycles
 * through them. Each one is a real SoftuneBD AI capability (store setup, the
 * agent, AI images, the ChatGPT connector), shown on the same demo store so the
 * story reads as one business growing, not four unrelated tricks. */

export type ScenarioId = "store" | "agent" | "image" | "chatgpt";

type Text = { en: string; bn: string };

export type Step = {
  label: Text;
  /** Sub-tasks drawn as a branch off the main line while the step runs. */
  branch?: Text[];
  /** Shown as the step's duration once done, like a CI log. */
  ms: number;
};

export type Scenario = {
  id: ScenarioId;
  /** Public icon for the pill (landing's own icon set). */
  icon: string;
  tab: Text;
  prompt: Text;
  steps: Step[];
  /** The last node, where the branch merges back: the visible result. */
  result: Text;
};

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
      {
        label: { en: "Brand and theme", bn: "ব্র্যান্ড ও থিম" },
        branch: [
          { en: "Palette", bn: "রং" },
          { en: "Fonts", bn: "ফন্ট" },
          { en: "Logo", bn: "লোগো" },
        ],
        ms: 840,
      },
      { label: { en: "Homepage copy", bn: "হোমপেজের লেখা" }, ms: 1210 },
      {
        label: { en: "Catalog", bn: "ক্যাটালগ" },
        branch: [
          { en: "6 categories", bn: "৬টি ক্যাটাগরি" },
          { en: "Sample products", bn: "নমুনা প্রোডাক্ট" },
        ],
        ms: 960,
      },
    ],
    result: { en: "Store ready to publish", bn: "স্টোর পাবলিশের জন্য রেডি" },
  },
  {
    id: "agent",
    icon: "/icons/ai.svg",
    tab: { en: "AI agent", bn: "AI এজেন্ট" },
    prompt: {
      en: "Change the headline for Eid and make the colours warmer",
      bn: "ঈদের জন্য হেডলাইন বদলাও আর রং আরেকটু উষ্ণ করো",
    },
    steps: [
      { label: { en: "Rewrite hero headline", bn: "হিরো হেডলাইন নতুন করে লেখা" }, ms: 620 },
      {
        label: { en: "Warmer palette", bn: "আরও উষ্ণ রং" },
        branch: [
          { en: "Primary", bn: "প্রাইমারি" },
          { en: "Accent", bn: "অ্যাকসেন্ট" },
        ],
        ms: 480,
      },
    ],
    result: { en: "Live on your store, Undo anytime", bn: "স্টোরে লাইভ, যেকোনো সময় Undo" },
  },
  {
    id: "image",
    icon: "/icons/color.svg",
    tab: { en: "AI images", bn: "AI ছবি" },
    prompt: {
      en: "Create a hero banner for my new everyday collection",
      bn: "আমার নতুন এভরিডে কালেকশনের জন্য একটি হিরো ব্যানার বানাও",
    },
    steps: [
      { label: { en: "Art direction", bn: "আর্ট ডিরেকশন" }, ms: 700 },
      {
        label: { en: "Generate banner", bn: "ব্যানার তৈরি" },
        branch: [
          { en: "Composition", bn: "কম্পোজিশন" },
          { en: "Lighting", bn: "লাইটিং" },
        ],
        ms: 3400,
      },
    ],
    result: { en: "Set as your homepage hero", bn: "হোমপেজের হিরো হিসেবে বসানো হলো" },
  },
  {
    id: "chatgpt",
    icon: "/icons/chatgpt.webp",
    tab: { en: "From ChatGPT", bn: "ChatGPT থেকে" },
    prompt: {
      en: "How did my store do this week?",
      bn: "এই সপ্তাহে আমার স্টোর কেমন চলল?",
    },
    steps: [
      { label: { en: "ChatGPT reads your store", bn: "ChatGPT আপনার স্টোর দেখছে" }, ms: 540 },
      { label: { en: "Sales this week", bn: "এই সপ্তাহের সেলস" }, ms: 390 },
    ],
    result: { en: "Answered in ChatGPT", bn: "ChatGPT-তে উত্তর দিল" },
  },
];
