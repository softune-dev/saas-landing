"use client";

import { Check, Server } from "lucide-react";
import { SiGoogletagmanager, SiMeta, SiTiktok } from "react-icons/si";
import { CARD_SHADOW, Stage, useScenes } from "./stage";

const SURFACE = "bg-white text-[#171717] ring-1 ring-black/5 dark:bg-[#1d1a1c] dark:text-white dark:ring-white/15";
const MUTED = "text-[#6d6661] dark:text-white/60";

const COPY = {
  en: {
    order: "New order",
    item: "Temple Jhumka Earrings",
    price: "৳1,607",
    api: "Conversions API",
    side: "Sent from the server",
    meta: "Purchase received",
    pixel: "Meta Pixel",
  },
  bn: {
    order: "নতুন অর্ডার",
    item: "টেম্পল ঝুমকা",
    price: "৳1,607",
    api: "Conversions API",
    side: "সার্ভার থেকে পাঠানো",
    meta: "পারচেজ পৌঁছেছে",
    pixel: "Meta Pixel",
  },
};

const IDLE = [1000] as const;

/* One loop of 4.2s. The sale drops down the first wire, passes the server, drops
 * down the second, and Meta ticks. Everything stays on screen the whole time. */
const KEYFRAMES = [
  "@keyframes ads-drop-a { 0% { top: -14px; opacity: 0 } 5% { opacity: 1 } 25% { top: 100%; opacity: 1 } 28%, 100% { top: 100%; opacity: 0 } }",
  "@keyframes ads-drop-b { 0%, 34% { top: -14px; opacity: 0 } 39% { opacity: 1 } 59% { top: 100%; opacity: 1 } 62%, 100% { top: 100%; opacity: 0 } }",
  "@keyframes ads-server { 0%, 22%, 46%, 100% { transform: scale(1) } 32% { transform: scale(1.045) } }",
  "@keyframes ads-tick { 0%, 56%, 74%, 100% { transform: scale(1) } 63% { transform: scale(1.35) } 68% { transform: scale(0.94) } }",
].join(" ");

/** A sale travels from the store's server to Meta. */
export function AdsVisual({ bn }: { bn: boolean }) {
  const c = bn ? COPY.bn : COPY.en;
  const { ref, moving } = useScenes(IDLE);
  const run = (name: string) => ({
    animation: `${name} 4.2s cubic-bezier(0.45, 0, 0.25, 1) infinite`,
    animationPlayState: moving ? "running" : "paused",
  });
  const wire = (name: string) => (
    <div className="relative mx-auto h-[34px] w-[2px] overflow-hidden rounded-full bg-white/20">
      <span
        className="absolute left-0 h-[14px] w-full rounded-full bg-gradient-to-b from-transparent to-white opacity-0"
        style={run(name)}
      />
    </div>
  );

  return (
    <Stage light="top" innerRef={ref}>
      <style>{KEYFRAMES}</style>

      <div className="absolute inset-x-0 top-6 flex flex-col items-center">
        {/* The sale */}
        <div className={`flex h-[62px] w-[290px] items-center gap-3 rounded-[18px] p-[7px] pr-4 ${SURFACE} ${CARD_SHADOW}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bento/p/jhumka.webp" alt="" className="size-12 rounded-[12px] object-cover" />
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] leading-[18px] font-bold tracking-tight">{c.order}</span>
            <span className={`block truncate text-[12px] leading-[17px] ${MUTED}`}>{c.item}</span>
          </span>
          <span className="text-[15px] font-extrabold tracking-tight tabular-nums">{c.price}</span>
        </div>

        {wire("ads-drop-a")}

        {/* The server */}
        <div
          className="flex h-[50px] items-center gap-3 rounded-full bg-[var(--color-brand)] pr-5 pl-[7px] text-white shadow-[0_16px_34px_-10px_rgba(255,90,54,0.75)]"
          style={run("ads-server")}
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-white/20">
            <Server className="size-[18px]" strokeWidth={2.4} />
          </span>
          <span>
            <span className="block text-[14px] leading-[17px] font-bold tracking-tight">{c.api}</span>
            <span className="block text-[11.5px] leading-[15px] text-white/85">{c.side}</span>
          </span>
        </div>

        {wire("ads-drop-b")}

        {/* Meta */}
        <div className={`flex h-[62px] w-[290px] items-center gap-3 rounded-[18px] px-[7px] pr-4 ${SURFACE} ${CARD_SHADOW}`}>
          <span className="flex size-12 items-center justify-center rounded-[12px] bg-[#0866ff]/10 dark:bg-[#0866ff]/20">
            <SiMeta className="size-7 text-[#0866ff]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] leading-[18px] font-bold tracking-tight">Meta</span>
            <span className={`block truncate text-[12px] leading-[17px] ${MUTED}`}>{c.meta}</span>
          </span>
          <span className="flex size-7 items-center justify-center rounded-full bg-[#12804a] text-white" style={run("ads-tick")}>
            <Check className="size-4" strokeWidth={3.2} />
          </span>
        </div>
      </div>

      {/* In the shopper's browser */}
      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-1.5">
        {[
          { label: c.pixel, icon: <SiMeta className="size-[15px] text-[#0866ff]" /> },
          { label: "TikTok Pixel", icon: <SiTiktok className="size-[14px] text-black dark:text-white" /> },
          { label: "Tag Manager", icon: <SiGoogletagmanager className="size-[15px] text-[#246fdb]" /> },
        ].map((chip) => (
          <span key={chip.label} className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold whitespace-nowrap ${SURFACE}`}>
            {chip.icon}
            {chip.label}
          </span>
        ))}
      </div>
    </Stage>
  );
}
