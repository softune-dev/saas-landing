import { Check } from "lucide-react";
import type { ComponentType } from "react";
import { AiVisual } from "./visual-ai";
import { AssistantVisual } from "./visual-assistant";
import { CourierVisual } from "./visual-courier";
import { PaymentsVisual } from "./visual-payments";
import { PosVisual } from "./visual-pos";
import { SeoVisual } from "./visual-seo";

type Copy = { title: string; points: string[] };
type Tile = { id: string; Visual: ComponentType<{ bn: boolean }>; en: Copy; bn: Copy };

/* The last tile becomes the Free plan when it launches: until then a new store
   gets a 7-day trial, so this page must not promise Free. */
const TILES: Tile[] = [
  {
    id: "ai",
    Visual: AiVisual,
    en: { title: "Smart AI chatbot", points: ["Add products by chatting", "Ask about orders and sales", "You confirm every change"] },
    bn: { title: "স্মার্ট AI চ্যাটবট", points: ["চ্যাট করেই প্রোডাক্ট যোগ করুন", "অর্ডার ও বিক্রি নিয়ে প্রশ্ন করুন", "প্রতিটি পরিবর্তন আপনি নিশ্চিত করেন"] },
  },
  {
    id: "payments",
    Visual: PaymentsVisual,
    en: { title: "Every payment, connected", points: ["bKash, Nagad and cards", "Softune Pay matches wallet SMS", "Cash on Delivery built in"] },
    bn: { title: "সব পেমেন্ট এক জায়গায়", points: ["বিকাশ, নগদ ও কার্ড", "Softune Pay ওয়ালেট SMS মিলিয়ে দেয়", "ক্যাশ অন ডেলিভারি আছেই"] },
  },
  {
    id: "seo",
    Visual: SeoVisual,
    en: { title: "SEO and tracking", points: ["Google-ready titles and sitemap", "Meta Pixel with Conversions API", "TikTok, GA4 and Tag Manager"] },
    bn: { title: "SEO ও ট্র্যাকিং", points: ["গুগল-রেডি টাইটেল ও সাইটম্যাপ", "Meta Pixel ও Conversions API", "TikTok, GA4 ও Tag Manager"] },
  },
  {
    id: "courier",
    Visual: CourierVisual,
    en: { title: "Courier integrations", points: ["Book Steadfast parcels in one click", "Connect Pathao, RedX and eCourier", "Book many orders at once"] },
    bn: { title: "কুরিয়ার ইন্টিগ্রেশন", points: ["এক ক্লিকে Steadfast পার্সেল বুক", "Pathao, RedX ও eCourier যুক্ত করুন", "একসাথে অনেক অর্ডার বুক করুন"] },
  },
  {
    id: "assistant",
    Visual: AssistantVisual,
    en: { title: "Live chat assistant", points: ["Answers shoppers day and night", "Replies from your own store details", "Bangla and English"] },
    bn: { title: "লাইভ চ্যাট অ্যাসিস্ট্যান্ট", points: ["দিন-রাত ক্রেতাদের উত্তর দেয়", "আপনার স্টোরের তথ্য থেকেই উত্তর", "বাংলা ও ইংরেজি"] },
  },
  {
    id: "pos",
    Visual: PosVisual,
    en: { title: "Store Sale (POS)", points: ["Sell at the counter from one catalog", "Stock updates by itself", "Print a receipt"] },
    bn: { title: "স্টোর সেল (POS)", points: ["একই ক্যাটালগ থেকে দোকানে বিক্রি", "স্টক নিজে থেকেই আপডেট হয়", "রসিদ প্রিন্ট করুন"] },
  },
];

export function FeatureBento({ locale = "en" }: { locale?: "en" | "bn" }) {
  const bn = locale === "bn";
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-canvas)] py-14 md:py-24">
      <div className="mx-auto grid max-w-[1340px] grid-cols-1 gap-4 px-4 sm:px-5 md:grid-cols-2 md:px-8 xl:grid-cols-3 xl:gap-5">
        {TILES.map(({ id, Visual, en, bn: bangla }) => {
          const copy = bn ? bangla : en;
          return (
            <article key={id} className="flex flex-col rounded-[30px] bg-[var(--color-surface)] p-2">
              <Visual bn={bn} />
              <div className="px-4 pt-6 pb-5">
                <h3 className="text-[25px] leading-tight text-[var(--color-ink)]">{copy.title}</h3>
                <ul className="mt-3 space-y-2">
                  {copy.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-[15px] font-medium text-[var(--color-ink-soft)]">
                      <Check className="size-[18px] shrink-0 text-[var(--color-brand)]" strokeWidth={2.8} aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
