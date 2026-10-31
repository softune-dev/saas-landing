/** The four things the hero's prompt box "does", in the order it cycles
 * through them. Each one is a real SoftuneBD AI capability (store setup, the
 * agent, AI images, the ChatGPT connector), shown on the same demo store so the
 * story reads as one business growing, not four unrelated tricks. */

export type ScenarioId = "store" | "agent" | "image" | "chatgpt";

export type Scenario = {
  id: ScenarioId;
  tab: { en: string; bn: string };
  prompt: { en: string; bn: string };
  /** The agent's visible work, ticked off one by one after the prompt is "sent". */
  steps: { en: string; bn: string }[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: "store",
    tab: { en: "Build store", bn: "স্টোর বানান" },
    prompt: {
      en: "Build a women's fashion store called Veila, warm and elegant",
      bn: "Veila নামে একটি মেয়েদের ফ্যাশন স্টোর বানাও, উষ্ণ আর এলিগ্যান্ট",
    },
    steps: [
      { en: "Picked a warm, elegant theme", bn: "উষ্ণ, এলিগ্যান্ট থিম বাছাই হলো" },
      { en: "Wrote the homepage and about page", bn: "হোমপেজ ও অ্যাবাউট পেজ লেখা হলো" },
      { en: "Created 6 categories", bn: "৬টি ক্যাটাগরি তৈরি হলো" },
      { en: "Store is ready to publish", bn: "স্টোর পাবলিশের জন্য রেডি" },
    ],
  },
  {
    id: "agent",
    tab: { en: "AI agent", bn: "AI এজেন্ট" },
    prompt: {
      en: "Change the headline for Eid and make the colours warmer",
      bn: "ঈদের জন্য হেডলাইন বদলাও আর রং আরেকটু উষ্ণ করো",
    },
    steps: [
      { en: "Updated the homepage headline", bn: "হোমপেজের হেডলাইন আপডেট হলো" },
      { en: "Switched to a warmer palette", bn: "আরও উষ্ণ রঙে বদলানো হলো" },
      { en: "Live on your store, Undo anytime", bn: "স্টোরে লাইভ, যেকোনো সময় Undo" },
    ],
  },
  {
    id: "image",
    tab: { en: "AI images", bn: "AI ছবি" },
    prompt: {
      en: "Create a hero banner for my new everyday collection",
      bn: "আমার নতুন এভরিডে কালেকশনের জন্য একটি হিরো ব্যানার বানাও",
    },
    steps: [
      { en: "Planned the composition and lighting", bn: "কম্পোজিশন ও লাইটিং ঠিক করা হলো" },
      { en: "Generated the banner", bn: "ব্যানার তৈরি হলো" },
      { en: "Set it as your homepage hero", bn: "হোমপেজের হিরো হিসেবে বসানো হলো" },
    ],
  },
  {
    id: "chatgpt",
    tab: { en: "From ChatGPT", bn: "ChatGPT থেকে" },
    prompt: {
      en: "How did my store do this week?",
      bn: "এই সপ্তাহে আমার স্টোর কেমন চলল?",
    },
    steps: [
      { en: "ChatGPT read your store", bn: "ChatGPT আপনার স্টোর দেখল" },
      { en: "Summarised this week's sales", bn: "এই সপ্তাহের সেলস সামারি করল" },
    ],
  },
];
