"use client";

export type StoreDemo = {
  id: string;
  name: string;
  host: string;
  theme: 1 | 2 | 3;
  niche: string;
  nicheBn: string;
};

/** Order is the display order: theme 2 and 3 stores first, the theme 1
 * stores (Noor, Swarna, Oudh) last.
 * Demo stores built on SoftuneBD's three themes, all on their own demo
 * accounts (scripts/demo_stores in the backend repo). Covers are real
 * desktop and phone screenshots of each store's home page. */
export const STORES: StoreDemo[] = [
  { id: "raaj", name: "Raaj", host: "raaj.softunebd.com", theme: 3, niche: "Men's panjabi", nicheBn: "ছেলেদের পাঞ্জাবি" },
  { id: "tinytots", name: "TinyTots", host: "tinytots.softunebd.com", theme: 2, niche: "Toys & baby care", nicheBn: "খেলনা ও বেবি কেয়ার" },
  { id: "voltix", name: "Voltix", host: "voltix.softunebd.com", theme: 2, niche: "Electronics & gadgets", nicheBn: "ইলেকট্রনিক্স ও গ্যাজেট" },
  { id: "pawpal", name: "PawPal", host: "pawpal.softunebd.com", theme: 3, niche: "Pet supplies", nicheBn: "পোষা প্রাণীর পণ্য" },
  { id: "ghorkona", name: "Ghorkona", host: "ghorkona.softunebd.com", theme: 2, niche: "Home decor & kitchen", nicheBn: "হোম ডেকর ও কিচেন" },
  { id: "freshkart", name: "FreshKart", host: "freshkart.softunebd.com", theme: 2, niche: "Groceries", nicheBn: "গ্রোসারি" },
  { id: "stride", name: "Stride", host: "stride.softunebd.com", theme: 3, niche: "Footwear", nicheBn: "জুতা" },
  { id: "noor", name: "Noor Modest", host: "noormodest.softunebd.com", theme: 1, niche: "Modest fashion", nicheBn: "মডেস্ট ফ্যাশন" },
  { id: "swarna", name: "Swarna Jewels", host: "swarnajewels.softunebd.com", theme: 1, niche: "Jewellery", nicheBn: "গহনা" },
  { id: "oudh", name: "Oudh House", host: "oudhhouse.softunebd.com", theme: 1, niche: "Perfume & attar", nicheBn: "পারফিউম ও আতর" },
];

/** Desktop and phone screenshots of one store, shown together: a browser
 * window with the phone overlapping its lower right corner, so a visitor
 * sees at a glance that the same store works on both. */
export function DeviceShots({ id, name, host }: { id: string; name: string; host: string }) {
  return (
    <div className="relative w-full pr-[14%] pb-[9%]">
      <div className="overflow-hidden rounded-xl bg-[var(--color-canvas)] shadow-[0_20px_45px_-22px_rgba(0,0,0,0.45)] ring-1 ring-[var(--color-line)]">
        <div className="flex items-center gap-1.5 border-b border-[var(--color-line)] px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-[var(--color-surface)] px-2 py-0.5 text-[10px] text-[var(--color-muted)]">
            {host}
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/demos/${id}-desktop.webp`} alt={`${name} store built with SoftuneBD, on a computer`} loading="lazy" decoding="async" width={1200} height={750} className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
      </div>
      <div className="absolute right-0 bottom-0 w-[27%] rounded-[1.1rem] bg-[#0b0b0d] p-[4px] shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-transform duration-500 group-hover:-translate-y-1">
        <div className="relative overflow-hidden rounded-[0.85rem] bg-[var(--color-canvas)]">
          <span className="absolute top-1 left-1/2 z-10 h-[7px] w-[32%] -translate-x-1/2 rounded-full bg-black" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/demos/${id}-mobile.webp`} alt={`${name} store built with SoftuneBD, on a phone`} loading="lazy" decoding="async" width={390} height={844} className="block aspect-[390/844] w-full object-cover object-top" />
        </div>
      </div>
    </div>
  );
}


/** Phone-size screenshot of one store, just the image. */
export function PhoneShot({ id, name }: { id: string; name: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-[var(--color-canvas)] ring-1 ring-[var(--color-line)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/demos/${id}-mobile.webp`} alt={`${name} store built with SoftuneBD, on a phone`} loading="lazy" decoding="async" width={390} height={844} className="block aspect-[390/844] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
    </div>
  );
}
