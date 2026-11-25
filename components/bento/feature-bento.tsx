import { Check } from "lucide-react";
import type { ComponentType } from "react";
import { AiVisual } from "./visual-ai";
import { AdsVisual } from "./visual-ads";
import { CourierVisual } from "./visual-courier";
import { PaymentsVisual } from "./visual-payments";
import { FreeVisual } from "./visual-free";
import { SeoVisual } from "./visual-seo";

type Copy = { title: string; points: string[] };
type Tile = { id: string; Visual: ComponentType<{ bn: boolean }>; en: Copy; bn: Copy };

/* The last tile sells the Free plan, so this section must not go live before the
   Free plan does: until then a new store gets a 7-day trial. The chat assistant
   tile (visual-assistant.tsx) is parked until we decide what to do with it. */
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
    en: { title: "Found on Google", points: ["Google-ready titles and sitemap", "Product details Google can read", "Link previews with your own photo"] },
    bn: { title: "গুগলে খুঁজে পাওয়া যায়", points: ["গুগল-রেডি টাইটেল ও সাইটম্যাপ", "গুগল পড়তে পারে এমন প্রোডাক্ট তথ্য", "নিজের ছবিসহ লিংক প্রিভিউ"] },
  },
  {
    id: "courier",
    Visual: CourierVisual,
    en: { title: "Courier integrations", points: ["Book Steadfast parcels in one click", "Connect Pathao, RedX and eCourier", "Book many orders at once"] },
    bn: { title: "কুরিয়ার ইন্টিগ্রেশন", points: ["এক ক্লিকে Steadfast পার্সেল বুক", "Pathao, RedX ও eCourier যুক্ত করুন", "একসাথে অনেক অর্ডার বুক করুন"] },
  },
  {
    id: "ads",
    Visual: AdsVisual,
    en: { title: "Ads that learn from real sales", points: ["Meta Pixel and Conversions API", "TikTok Pixel and Tag Manager built in", "Orders reach Meta from the server"] },
    bn: { title: "আসল বিক্রি থেকে শেখে অ্যাড", points: ["Meta Pixel ও Conversions API", "TikTok Pixel ও Tag Manager বিল্ট-ইন", "অর্ডার সার্ভার থেকেই Meta-তে যায়"] },
  },
  {
    id: "free",
    Visual: FreeVisual,
    en: { title: "Start your store for free", points: ["No monthly fee, no card needed", "Cash on Delivery and Softune Pay", "Upgrade only when you grow"] },
    bn: { title: "বিনামূল্যে স্টোর শুরু করুন", points: ["মাসিক ফি নেই, কার্ড লাগে না", "ক্যাশ অন ডেলিভারি ও Softune Pay", "ব্যবসা বাড়লে তবেই আপগ্রেড"] },
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
