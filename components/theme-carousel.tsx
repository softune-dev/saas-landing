"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { THEMES, type ThemeData } from "@/lib/themes-data";

// Shortest-path circular distance from `selected` to `i` — lets the
// carousel wrap both ways (last card sits just left of the first) instead
// of only ever spinning one direction.
function circularOffset(i: number, selected: number, total: number) {
  let d = i - selected;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

// Only this many steps either side are ever visible — everything further
// out is invisible (opacity 0, unclickable) but stays MOUNTED. Unmounting
// them (e.g. via AnimatePresence) is what caused the old "reset" glitch:
// a card crossing this threshold would pop straight to its new spot
// instead of sliding, since it had no prior position to animate from.
// Keeping every card mounted means framer-motion always has a real
// previous x/scale to tween from, so the only thing that can ever "jump"
// is a card that's invisible both before and after.
const VISIBLE_RANGE = 2;
const CARD_W = 300;
const STEP = 220;

function CarouselCard({
  theme,
  offset,
  dragX,
  dragging,
  onSelect,
}: {
  theme: ThemeData;
  offset: number;
  dragX: number;
  dragging: boolean;
  onSelect: () => void;
}) {
  const abs = Math.abs(offset);
  const hidden = abs > VISIBLE_RANGE;
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      tabIndex={hidden ? -1 : 0}
      // No autoplay — the only motion beyond click/arrow nav is this same
      // cheap transform tween following the mouse/touch 1:1 while dragging
      // (see the stage's onPan below), snapping back to the discrete
      // offset*STEP slot the instant the drag ends. Still just a transform
      // tween, not a real physics/3D engine.
      animate={{
        x: offset * STEP + dragX,
        scale: offset === 0 ? 1.12 : 0.78,
        rotateY: offset === 0 ? 0 : offset > 0 ? -24 : 24,
        opacity: offset === 0 ? 1 : abs === 1 ? 0.65 : hidden ? 0 : 0.3,
        zIndex: 10 - abs,
      }}
      transition={dragging ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }}
      style={{ width: CARD_W, pointerEvents: hidden ? "none" : "auto" }}
      className="group absolute top-0 left-1/2 -ml-[150px] cursor-grab active:cursor-grabbing [transform-style:preserve-3d]"
      aria-hidden={hidden}
      aria-label={`Show ${theme.name}`}
    >
      <div className="flex h-[260px] w-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.25)] sm:h-[300px] md:h-[340px]">
        <div className="flex shrink-0 items-center gap-1.5 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2">
          <span className="size-2 shrink-0 rounded-full bg-[#ff5f57]" />
          <span className="size-2 shrink-0 rounded-full bg-[#febc2e]" />
          <span className="size-2 shrink-0 rounded-full bg-[#28c840]" />
        </div>
        <div
          className="theme-shot-frame relative min-h-0 w-full flex-1 overflow-hidden"
          style={{ backgroundColor: theme.surface }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={theme.image}
            alt={`Softunebd ecommerce theme — ${theme.vibe}`}
            loading="lazy"
            decoding="async"
            className="theme-shot-img absolute inset-x-0 top-0 w-full max-w-none"
          />
        </div>
      </div>
      {offset === 0 ? (
        <div className="mt-3 text-center">
          <span className="text-[15px] font-semibold text-[var(--color-ink)]">
            {theme.vibe}
          </span>
        </div>
      ) : null}
    </motion.button>
  );
}

/** Real touch-drag slider (embla-carousel) — the 3D coverflow's
 * perspective/rotateY reads as cramped on a narrow phone screen, so mobile
 * gets a proper native-feeling swipe slider instead of the desktop effect.
 * No vertical hover-auto-scroll on the screenshot here either — that's a
 * mouse-hover affordance with nothing equivalent on touch, so each card
 * just shows a plain static crop of the image instead. */
function MobileSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="w-full sm:hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-3 flex">
          {THEMES.map((theme) => (
            <div
              key={theme.slug}
              className="min-w-0 shrink-0 grow-0 basis-[68%] pl-3"
            >
              <div className="flex h-[420px] w-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.2)]">
                <div className="flex shrink-0 items-center gap-1.5 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2">
                  <span className="size-2 shrink-0 rounded-full bg-[#ff5f57]" />
                  <span className="size-2 shrink-0 rounded-full bg-[#febc2e]" />
                  <span className="size-2 shrink-0 rounded-full bg-[#28c840]" />
                </div>
                <div
                  className="relative min-h-0 w-full flex-1 overflow-hidden"
                  style={{ backgroundColor: theme.surface }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={theme.image}
                    alt={`Softunebd ecommerce theme — ${theme.vibe}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover object-top"
                  />
                </div>
              </div>
              <span className="mt-2 block text-center text-sm font-semibold text-[var(--color-ink)]">
                {theme.vibe}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {THEMES.map((theme, i) => (
          <button
            key={theme.slug}
            type="button"
            aria-label={`Show ${theme.name}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === selected
                ? "w-4 bg-[var(--color-brand)]"
                : "w-1.5 bg-[var(--color-line)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// How far (in px) a drag has to travel before it counts as a swipe to the
// next/previous card, rather than snapping back to the current one.
const DRAG_THRESHOLD = 70;

export function ThemeCarousel() {
  const [selected, setSelected] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const total = THEMES.length;

  function go(delta: number) {
    setSelected((i) => (i + delta + total) % total);
  }

  return (
    <div className="flex flex-col items-center">
      <MobileSlider />

      <motion.div
        className="relative hidden h-[320px] w-full max-w-full touch-none select-none sm:block sm:h-[360px] md:h-[400px]"
        style={{ perspective: 1200 }}
        onPanStart={() => setDragging(true)}
        onPan={(_, info) => setDragX(info.offset.x)}
        onPanEnd={(_, info) => {
          setDragging(false);
          setDragX(0);
          if (info.offset.x <= -DRAG_THRESHOLD) go(1);
          else if (info.offset.x >= DRAG_THRESHOLD) go(-1);
        }}
      >
        {THEMES.map((theme, i) => {
          const offset = circularOffset(i, selected, total);
          return (
            <CarouselCard
              key={theme.slug}
              theme={theme}
              offset={offset}
              dragX={dragging ? dragX : 0}
              dragging={dragging}
              onSelect={() => setSelected(i)}
            />
          );
        })}
      </motion.div>

      <div className="mt-4 hidden items-center gap-3 sm:flex">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous theme"
          className="flex size-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
        >
          <ChevronLeft className="size-4" strokeWidth={2.25} />
        </button>
        <span className="text-[13px] font-medium tabular-nums text-[var(--color-muted)]">
          {selected + 1} / {total}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next theme"
          className="flex size-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
        >
          <ChevronRight className="size-4" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
