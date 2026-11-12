"use client";

import { motion } from "framer-motion";
import { BatteryFull, Check, Download, Signal, Wifi } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { SOFTUNE_PAY_APK_URL } from "@/lib/apps-data";

/**
 * "Our apps" on the homepage: SoftuneBD's own phone apps, starting with
 * Softune Pay. Layout follows how product sites show a companion app
 * (Shopify /mobile, Linear /mobile, Notion /mobile): copy and a download
 * action on one side, real screens in phone frames on the other, with a
 * floating "payment confirmed" card so the one thing the app does is
 * readable without reading the screenshots.
 *
 * The panel is dark in both site themes: the app itself is dark, and the
 * screenshots would look pasted-on over a light background.
 */

const COPY = {
  en: {
    pill: "Our apps",
    title: "Manual bKash payments that",
    highlight: "confirm themselves",
    desc: "Softune Pay runs on the phone that holds your wallet SIM. When a shopper pays your bKash, Nagad or Rocket number, it reads the payment SMS, matches the transaction ID to the order and marks it paid. No gateway, no fee.",
    steps: [
      { t: "Pair in seconds", d: "Scan the QR code in Payments, Softune Pay." },
      { t: "Shopper pays your number", d: "Personal or agent, as they already do." },
      { t: "Order turns Paid", d: "Matched by transaction ID. A wrong amount is flagged, never confirmed." },
    ],
    platform: "Android · Free",
    download: "Download for Android",
    downloadSub: "APK, free for every SoftuneBD store",
    scan: "Scan to download",
    scanSub: "Open your phone camera",
    notifTitle: "Payment confirmed",
    notifSub: "ORD-1248 marked paid",
    chip: "SMS matched",
    now: "now",
  },
  bn: {
    pill: "আমাদের অ্যাপ",
    title: "ম্যানুয়াল bKash পেমেন্ট এখন",
    highlight: "নিজেই কনফার্ম হয়",
    desc: "যে ফোনে আপনার ওয়ালেট সিম আছে, সেখানে Softune Pay চলে। কাস্টমার আপনার bKash, Nagad বা Rocket নম্বরে টাকা পাঠালে অ্যাপ পেমেন্টের SMS পড়ে, Transaction ID দিয়ে অর্ডার মিলিয়ে Paid করে দেয়। কোনো গেটওয়ে নেই, কোনো চার্জ নেই।",
    steps: [
      { t: "কয়েক সেকেন্ডে কানেক্ট", d: "Payments, Softune Pay থেকে QR কোড স্ক্যান করুন।" },
      { t: "কাস্টমার আপনার নম্বরে পেমেন্ট করে", d: "পার্সোনাল বা এজেন্ট, যেভাবে আগে করত।" },
      { t: "অর্ডার Paid হয়ে যায়", d: "Transaction ID দিয়ে মেলে। টাকার পরিমাণ না মিললে জানায়, কনফার্ম করে না।" },
    ],
    platform: "Android · ফ্রি",
    download: "Android-এর জন্য ডাউনলোড",
    downloadSub: "APK, সব SoftuneBD স্টোরের জন্য ফ্রি",
    scan: "স্ক্যান করে ডাউনলোড",
    scanSub: "ফোনের ক্যামেরা খুলুন",
    notifTitle: "পেমেন্ট কনফার্মড",
    notifSub: "ORD-1248 Paid হয়েছে",
    chip: "SMS মিলেছে",
    now: "এখন",
  },
} as const;

const WALLETS = [
  { name: "bKash", src: "/apps/bkash.webp" },
  { name: "Nagad", src: "/apps/nagad.webp" },
  { name: "Rocket", src: "/apps/rocket.webp" },
];

/** A phone frame around a real screenshot. The status bar is drawn here
 * (screenshots are cropped below theirs) so every phone shows the same clean
 * time and icons instead of whatever was on the test device. */
function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`rounded-[2.6rem] bg-[#050506] p-[7px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/15 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[2.2rem] bg-[#120c0e]">
        <div className="flex h-7 items-center justify-between px-6 pt-1 text-[11px] font-semibold text-white">
          <span>9:41</span>
          <span className="absolute left-1/2 top-1.5 h-[18px] w-[70px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1">
            <Signal className="size-3" strokeWidth={2.5} />
            <Wifi className="size-3" strokeWidth={2.5} />
            <BatteryFull className="size-3.5" strokeWidth={2} />
          </span>
        </div>
        <img src={src} alt={alt} loading="lazy" decoding="async" width={540} height={1133} className="block w-full" />
      </div>
    </div>
  );
}

export function AppsShowcase({ locale = "en" }: { locale?: "en" | "bn" }) {
  const c = COPY[locale];

  return (
    <section id="apps" className="scroll-mt-24 bg-[var(--color-canvas)] py-14 md:scroll-mt-28 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0c0a0d] text-white ring-1 ring-white/10 md:rounded-[2.5rem]">
          {/* Warm glow behind the phones, in the app's own orange. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 size-[44rem] rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,90,40,0.55), rgba(140,30,60,0.25) 45%, transparent 70%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "linear-gradient(to bottom, black, transparent 70%)",
            }}
          />

          <div className="relative grid items-center gap-12 px-5 py-10 sm:px-8 md:px-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-20">
            {/* Copy and download */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-lg">
                  <img src="/apps/softune-pay-icon.webp" alt="" className="size-11 object-contain" />
                </div>
                <div>
                  <div className="text-[17px] font-bold tracking-tight">Softune Pay</div>
                  <div className="text-[13px] text-white/55">{c.platform}</div>
                </div>
                <span className="ml-auto rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-white/80 ring-1 ring-white/10 sm:ml-3">
                  {c.pill}
                </span>
              </div>

              <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight sm:text-4xl xl:text-5xl xl:leading-[1.1]">
                {c.title}{" "}
                <span className="relative mt-1 inline-block px-2.5 py-0.5 sm:whitespace-nowrap sm:px-4">
                  <span className="absolute inset-0 top-1.5 -rotate-1 rounded-xl bg-[var(--color-brand)] sm:top-2" />
                  <em className="relative not-italic text-white">{c.highlight}</em>
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed font-medium text-white/65 md:text-[17px]">{c.desc}</p>

              <ol className="mt-8 space-y-4">
                {c.steps.map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[13px] font-bold ring-1 ring-white/15">
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-[15px] font-semibold">{s.t}</div>
                      <div className="text-[14px] text-white/55">{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex items-center gap-2">
                {WALLETS.map((w) => (
                  <img key={w.name} src={w.src} alt={w.name} title={w.name} className="size-9 rounded-xl ring-1 ring-white/10" />
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-stretch">
                <a
                  href={SOFTUNE_PAY_APK_URL}
                  className="group flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 text-[#0c0a0d] shadow-lg transition hover:bg-white/90"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-brand)] text-white">
                    <Download className="size-5" strokeWidth={2.4} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-bold">{c.download}</span>
                    <span className="block text-[12px] text-black/55">{c.downloadSub}</span>
                  </span>
                </a>
                {/* Scan-to-download, as Linear and Shopify offer: the visitor is
                    usually on a laptop and the app goes on their phone. */}
                <div className="hidden items-center gap-3 rounded-2xl bg-white/[0.06] p-2.5 pr-5 ring-1 ring-white/10 sm:flex">
                  <div className="rounded-lg bg-white p-1.5">
                    <QRCodeSVG value={SOFTUNE_PAY_APK_URL} size={64} level="M" />
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold">{c.scan}</div>
                    <div className="text-[12px] text-white/50">{c.scanSub}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phones */}
            <div className="relative mx-auto h-[500px] w-full max-w-[520px] sm:h-[580px]">
              <motion.div
                initial={{ opacity: 0, x: 30, rotate: 0 }}
                whileInView={{ opacity: 1, x: 0, rotate: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.2, 0.9, 0.25, 1] }}
                className="absolute top-12 left-0 hidden w-[210px] opacity-80 sm:block"
              >
                <Phone src="/apps/softune-pay-payments.webp" alt="Softune Pay payments list" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30, rotate: 0 }}
                whileInView={{ opacity: 1, x: 0, rotate: 8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.2, 0.9, 0.25, 1] }}
                className="absolute top-12 right-0 hidden w-[210px] opacity-80 sm:block"
              >
                <Phone src="/apps/softune-pay-settings.webp" alt="Softune Pay settings" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.2, 0.9, 0.25, 1] }}
                className="absolute top-0 left-1/2 z-10 w-[236px] -translate-x-1/2 sm:w-[262px]"
              >
                <Phone src="/apps/softune-pay-home.webp" alt="Softune Pay home screen" />
              </motion.div>

              {/* The moment the app exists for: a payment confirmed on its own. */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-16 left-1/2 z-20 w-[min(300px,92%)] -translate-x-1/2 sm:bottom-20"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center gap-3 rounded-2xl bg-white/90 p-3 text-[#0c0a0d] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] ring-1 ring-black/5 backdrop-blur-xl"
                >
                  <img src="/apps/bkash.webp" alt="" className="size-10 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-bold">{c.notifTitle}</div>
                    <div className="truncate text-[12px] text-black/55">{c.notifSub}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-extrabold">+৳2,450</div>
                    <div className="text-[11px] text-black/45">{c.now}</div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="absolute top-24 right-2 z-20 hidden items-center gap-1.5 rounded-full bg-[#16a34a] px-3 py-1.5 text-[12px] font-semibold text-white shadow-lg md:flex"
              >
                <Check className="size-3.5" strokeWidth={3} />
                {c.chip}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
