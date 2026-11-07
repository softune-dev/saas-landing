"use client";

import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, type Dispatch, type FormEvent, type RefObject, type SetStateAction } from "react";
import { DASHBOARD_URL } from "@/lib/site";
import type { RecaptchaV2FallbackHandle } from "../recaptcha-v2-fallback";
import { SHOP_CATEGORIES } from "../trial-steps";
import type { TemplateKey } from "../trial-theme-step";
import { BUILD_LABELS, BUILD_LABELS_BN } from "../use-trial-build";
import {
  IDEA_EXAMPLES,
  STEPS,
  categoryLabel,
  hasNonEnglish,
  inferCategory,
  inferName,
  recommendTemplate,
  slugify,
  t,
  templateFor,
  type Locale,
  type StepId,
} from "./agent-copy";
import { AccountCard, Composer, ComposerChip, IdeaChips, LookPicker, VerifyCard } from "./agent-steps";
import { AgentOrb, AgentTurn, BrandButton, Chip, ErrorLine, ToolRow, UserBubble, WorkLog, type Tool } from "./agent-ui";

export type Draft = {
  idea: string;
  name: string;
  category: string;
  templateKey: TemplateKey;
  color: string;
  displayFont: string;
  bodyFont: string;
  phone: string;
  done: StepId[];
};

type Props = {
  locale: Locale;
  draft: Draft;
  setDraft: Dispatch<SetStateAction<Draft>>;
  current: StepId;
  isDone: (s: StepId) => boolean;
  editing: StepId | null;
  canEdit: boolean;
  onEdit: (s: StepId) => void;
  onCancelEdit: () => void;
  error: string | null;
  clearError: () => void;
  answerIdea: (text: string) => void;
  answerName: (name: string) => void;
  answerCategory: (value: string) => void;
  answerLook: () => void;
  answerPhone: (phone: string) => void;
  account: Omit<Parameters<typeof AccountCard>[0], "locale"> & { v2Ref: RefObject<RecaptchaV2FallbackHandle | null> };
  verify: Omit<Parameters<typeof VerifyCard>[0], "locale"> & { onSubmit: (e: FormEvent) => void };
  build: { started: boolean; done: boolean[]; error: string | null; onStart: () => void };
};

const EDITABLE: StepId[] = ["idea", "name", "category", "look", "phone"];

/** Derived from the answers, not kept as a log: changing an earlier answer
 * re-renders everything after it, and a resumed visit shows the same chat. */
export function Transcript(p: Props) {
  const { locale, draft, current } = p;
  const L = (en: string, bn: string) => t(locale, en, bn);
  const [ideaText, setIdeaText] = useState("");
  const [nameText, setNameText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [agentBusy, setAgentBusy] = useState(false);

  useEffect(() => {
    if (current === "idea") setIdeaText(draft.idea);
    if (current === "name") setNameText(draft.name);
    if (current === "phone") setPhoneText(draft.phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on entering a step
  }, [current]);

  const visible = STEPS.slice(0, STEPS.indexOf(current) + 1);
  const guessCategory = inferCategory(draft.idea);
  const guessName = inferName(draft.idea);
  const catLabel = categoryLabel(draft.category, locale);
  const rec = templateFor(recommendTemplate(draft.category));
  const tpl = templateFor(draft.templateKey);
  const slug = slugify(draft.name) || "yourshop";

  function editFor(s: StepId) {
    if (!p.canEdit || !EDITABLE.includes(s) || p.editing) return {};
    return { onEdit: () => p.onEdit(s), editLabel: L("Change", "বদলান") };
  }

  function turn(s: StepId): { tools?: Tool[]; text: string; widget?: React.ReactNode } {
    const live = s === current;
    switch (s) {
      case "idea":
        return { text: L("What are we building today?", "আজ কী বানাচ্ছি?") };
      case "name": {
        const tools: Tool[] = draft.idea
          ? [
              { label: L("Reading your idea", "আইডিয়া পড়ছি") },
              ...(guessCategory ? [{ label: L("Detecting the niche", "ধরন বুঝছি"), detail: categoryLabel(guessCategory, locale) }] : []),
              ...(guessName ? [{ label: L("Reserving your web address", "ওয়েব ঠিকানা রাখছি"), detail: `${slugify(guessName) || "shop"}.softunebd.com` }] : []),
              ...(guessCategory ? [{ label: L("Shortlisting designs", "ডিজাইন বাছাই করছি"), detail: templateFor(recommendTemplate(guessCategory)).name }] : []),
            ]
          : [];
        const text = guessName
          ? L(`Got it. I'll call it **${guessName}**. Keep the name, or type a better one.`, `বুঝেছি। নাম দিচ্ছি **${guessName}**। রাখুন, অথবা নতুন নাম লিখুন।`)
          : draft.idea
            ? L("Love it. What should we call your shop?", "দারুণ। শপের নাম কী রাখবেন?")
            : L("No problem, we'll go step by step. What's your shop called?", "সমস্যা নেই, ধাপে ধাপে করি। শপের নাম কী?");
        return { tools, text };
      }
      case "category":
        return {
          text: draft.category && live
            ? L(`Looks like **${draft.name}** sells ${catLabel}. Tap to confirm, or pick another.`, `মনে হচ্ছে **${draft.name}** ${catLabel} বিক্রি করবে। নিশ্চিত করুন বা অন্যটা বেছে নিন।`)
            : L(`Nice name. What will **${draft.name}** sell?`, `সুন্দর নাম। **${draft.name}** কী বিক্রি করবে?`),
          widget: live ? (
            <div className="flex flex-wrap gap-2">
              {[...SHOP_CATEGORIES]
                .sort((a, b) => Number(b.value === draft.category) - Number(a.value === draft.category))
                .map((c) => (
                  <Chip key={c.value} active={c.value === draft.category} onClick={() => p.answerCategory(c.value)}>
                    {locale === "bn" ? c.labelBn : c.label}
                  </Chip>
                ))}
            </div>
          ) : undefined,
        };
      case "look":
        return {
          tools: [
            { label: L(`Scanning designs for ${catLabel}`, `${catLabel}-এর ডিজাইন দেখছি`), detail: L("3 match", "৩টি মিলেছে") },
            { label: L("Ranking by fit", "মানানসই অনুযায়ী সাজাচ্ছি"), detail: rec.name },
          ],
          text: L(`I'd go with **${rec.name}** for ${draft.name}. Try the others and pick a brand color. Watch the preview change. Everything can be edited later.`,
            `${draft.name}-এর জন্য **${rec.name}** ভালো হবে। অন্যগুলোও দেখুন, ব্র্যান্ড কালার বাছুন, প্রিভিউ বদলাতে দেখুন। সবই পরে বদলানো যাবে।`),
          widget: live ? (
            <LookPicker
              locale={locale}
              templateKey={draft.templateKey}
              recommended={rec.key}
              color={draft.color}
              onTemplate={(k) => p.setDraft((d) => ({ ...d, templateKey: k }))}
              onColor={(c) => p.setDraft((d) => ({ ...d, color: c }))}
              displayFont={draft.displayFont}
              bodyFont={draft.bodyFont}
              onDisplayFont={(f) => p.setDraft((d) => ({ ...d, displayFont: f }))}
              onBodyFont={(f) => p.setDraft((d) => ({ ...d, bodyFont: f }))}
              onDone={p.answerLook}
            />
          ) : undefined,
        };
      case "phone":
        return { text: L("Which mobile number should get your new-order alerts?", "নতুন অর্ডারের নোটিফিকেশন কোন মোবাইল নম্বরে যাবে?") };
      case "account":
        return {
          tools: [{ label: L("Saving your answers", "উত্তরগুলো রাখছি"), detail: `${slug}.softunebd.com` }],
          text: L(`**${draft.name}** is ready to build. Create your account to keep it. Your 7-day trial needs no card.`,
            `**${draft.name}** বানানোর জন্য প্রস্তুত। রাখতে একাউন্ট তৈরি করুন। ৭ দিনের ট্রায়ালে কার্ড লাগবে না।`),
          widget: live ? (
            <>
              <AccountCard locale={locale} {...p.account} />
              <p className="text-sm text-white/45">
                {L("Already have an account?", "একাউন্ট আছে?")}{" "}
                <a href={DASHBOARD_URL} className="font-medium text-white underline-offset-4 hover:underline">{L("Sign in", "সাইন ইন")}</a>
              </p>
            </>
          ) : undefined,
        };
      case "verify":
        return {
          tools: [{ label: L("Sending a sign-in code", "সাইন-ইন কোড পাঠাচ্ছি"), detail: p.account.email }],
          text: L(`I sent a 6-digit code to **${p.account.email}**. Enter it to confirm it's you.`, `**${p.account.email}**-এ ৬-সংখ্যার কোড পাঠিয়েছি। নিশ্চিত করতে কোডটি দিন।`),
          widget: live ? <VerifyCard locale={locale} {...p.verify} /> : undefined,
        };
      case "build":
        return { text: "" };
    }
  }

  function answer(s: StepId) {
    switch (s) {
      case "idea":
        return draft.idea || <span className="text-white/50">{L("Skipped", "বাদ দিয়েছি")}</span>;
      case "name":
        return (
          <span className="flex flex-col">
            {draft.name}
            <span className="font-mono text-[11.5px] text-white/45">{slug}.softunebd.com</span>
          </span>
        );
      case "category":
        return catLabel;
      case "look":
        return (
          <span className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tpl.image} alt="" className="h-10 w-8 rounded-md object-cover object-top" />
            {tpl.name}
            <span className="size-4 rounded-full ring-2 ring-white/20" style={{ backgroundColor: draft.color }} />
          </span>
        );
      case "phone":
        return `+88 ${draft.phone}`;
      case "account":
        return p.account.email;
      case "verify":
        return L("Code confirmed", "কোড নিশ্চিত হয়েছে");
      default:
        return null;
    }
  }

  const working = {
    working: agentBusy,
    workingLabel: L("Thinking…", "ভাবছি…"),
    sendLabel: L("Send", "পাঠান"),
  };
  const composer =
    current === "idea" ? (
      <Composer
        multiline
        value={ideaText}
        onChange={setIdeaText}
        onSubmit={() => p.answerIdea(ideaText)}
        placeholder={L("Describe your shop, e.g. handmade jewelry called Noor…", "শপের বর্ণনা দিন, যেমন: Noor নামে হাতে বানানো গহনা…")}
        sendLabel={L("Generate", "শুরু করুন")}
        onSurprise={() => {
          const pick = IDEA_EXAMPLES[Math.floor(Math.random() * IDEA_EXAMPLES.length)]!;
          setIdeaText(pick.prompt[locale]);
        }}
        surpriseLabel={L("Write an example for me", "একটি উদাহরণ লিখে দিন")}
        meta={
          <button type="button" onClick={() => p.answerIdea("")} className="font-medium text-white/45 transition-colors hover:text-white">
            {L("Skip, ask me questions instead", "বাদ দিন, প্রশ্ন করুন")}
          </button>
        }
        below={<IdeaChips locale={locale} onPick={p.answerIdea} />}
      />
    ) : current === "name" ? (
      <Composer
        {...working}
        value={nameText}
        onChange={setNameText}
        onSubmit={() => p.answerName(nameText.trim())}
        placeholder={L("Your shop name", "আপনার শপের নাম")}
        autoComplete="organization"
        chips={
          <ComposerChip icon={<Globe className="size-3" strokeWidth={2.2} />}>
            <span className="font-mono">{slugify(nameText) || "yourshop"}.softunebd.com</span>
          </ComposerChip>
        }
        meta={
          hasNonEnglish(nameText) ? (
            <span className="text-rose-300">{L("Web address needs English letters", "ওয়েব ঠিকানায় ইংরেজি অক্ষর লাগবে")}</span>
          ) : (
            L("This becomes your web address", "এটিই হবে আপনার ওয়েব ঠিকানা")
          )
        }
      />
    ) : current === "phone" ? (
      <Composer
        {...working}
        value={phoneText}
        onChange={(v) => {
          setPhoneText(v.replace(/\D/g, "").slice(0, 11));
          p.clearError();
        }}
        onSubmit={() => p.answerPhone(phoneText)}
        prefix="+88"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="01XXXXXXXXX"
        meta={L("Bangladeshi mobile number", "বাংলাদেশি মোবাইল নম্বর")}
      />
    ) : null;

  return (
    <>
      {/* justify-end: like any chat, a short conversation sits right above
          the input instead of floating at the top with a gap below it. */}
      <div className="flex flex-1 flex-col justify-end gap-7 pt-8 pb-6">
        {current === "idea" ? (
          <Welcome locale={locale} error={p.error}>{composer}</Welcome>
        ) : (
          visible.map((s) => {
            const live = s === current;
            if (s === "build") return <BuildTurn key={s} locale={locale} name={draft.name} slug={slug} build={p.build} />;
            // The welcome screen already asked; the chat only keeps what
            // they wrote, and nothing at all if they skipped it.
            if (s === "idea") {
              return draft.idea ? <UserBubble key={s} {...editFor(s)}>{draft.idea}</UserBubble> : null;
            }
            const { tools, text, widget } = turn(s);
            return (
              <section key={s} className="flex flex-col gap-4">
                <AgentTurn
                  key={live ? `${s}-live` : s}
                  fresh={live}
                  tools={tools}
                  text={text}
                  onBusyChange={live ? setAgentBusy : undefined}
                  thinkingLabel={L("Thinking…", "ভাবছি…")}
                >
                  {widget}
                  {live && p.error && !composer ? <ErrorLine>{p.error}</ErrorLine> : null}
                  {live && p.editing ? (
                    <button type="button" onClick={p.onCancelEdit} className="self-start text-sm font-medium text-white/45 hover:text-white">
                      {L("Cancel", "বাতিল")}
                    </button>
                  ) : null}
                </AgentTurn>
                {!live ? <UserBubble {...editFor(s)}>{answer(s)}</UserBubble> : null}
              </section>
            );
          })
        )}
      </div>
      {composer && current !== "idea" ? (
        <div className="sticky bottom-0 z-10 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div key={current} className="flex flex-col gap-2">
            {p.error ? <ErrorLine>{p.error}</ErrorLine> : null}
            {composer}
          </div>
        </div>
      ) : null}
    </>
  );
}

/** The empty state, ChatGPT-style: agent, one question, the input in the
 * middle of the screen, starter chips right under it. */
function Welcome({ locale, error, children }: { locale: Locale; error: string | null; children: React.ReactNode }) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-7 pb-[12vh] text-center">
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
        <AgentOrb size={56} />
      </motion.div>
      <div className="flex flex-col gap-3">
        <h1
          // Same stack and weight rules as the landing hero title. Li Mayukh has
          // one (already strong) weight, so Bangla stays normal to avoid a fake bold.
          className={[
            "text-balance text-[2rem] text-white sm:text-[2.6rem]",
            locale === "bn" ? "font-normal leading-[1.15] tracking-normal" : "font-bold leading-[1.05] tracking-[-0.03em]",
          ].join(" ")}
          style={{ fontFamily: locale === "bn" ? "'Li Mayukh', var(--font-bn), var(--font-heading), sans-serif" : "var(--font-heading), sans-serif" }}
        >
          {L("What are we building today?", "আজ কী বানাচ্ছি?")}
        </h1>
        <p className="mx-auto max-w-md text-[15px] leading-relaxed text-white/50">
          {L("Describe your shop in a line. I'll name it, design it and put it online in about a minute.",
            "এক লাইনে আপনার শপের কথা লিখুন। নাম, ডিজাইন থেকে অনলাইনে তোলা, প্রায় এক মিনিটে আমি করে দেব।")}
        </p>
      </div>
      <div className="flex w-full flex-col gap-2 text-left">
        {error ? <ErrorLine>{error}</ErrorLine> : null}
        {children}
      </div>
    </div>
  );
}function BuildTurn({ locale, name, slug, build }: { locale: Locale; name: string; slug: string; build: Props["build"] }) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const labels = locale === "bn" ? BUILD_LABELS_BN : BUILD_LABELS;
  const running = build.done.findIndex((d) => !d);
  const finished = build.started && running === -1;

  if (!build.started) {
    return (
      <AgentTurn
        fresh
        text={build.error
          ? L(`That didn't go through: ${build.error} Change any answer above, or try again.`, `কাজটি হয়নি: ${build.error} উপরের উত্তর বদলান বা আবার চেষ্টা করুন।`)
          : L(`Everything's ready. Shall I build **${name}**?`, `সব প্রস্তুত। **${name}** বানিয়ে দেব?`)}
      >
        <BrandButton type="button" onClick={build.onStart} className="self-start">
          {build.error ? L("Try again", "আবার চেষ্টা করুন") : L("Build my store", "স্টোর বানান")}
        </BrandButton>
      </AgentTurn>
    );
  }
  return (
    <section className="flex gap-3">
      <div className="w-7 shrink-0 pt-px">
        <AgentOrb size={26} busy={!finished} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 pt-[3px]">
      <p className="text-[15.5px] leading-relaxed text-white/90">
        {finished
          ? L(`${name} is live.`, `${name} লাইভ।`)
          : L(`Building ${name} now.`, `${name} বানাচ্ছি।`)}
      </p>
      <WorkLog>
        {labels.map((label, i) =>
          i <= running || running === -1 ? (
            <ToolRow key={label} state={build.done[i] ? "done" : "running"} detail={i === labels.length - 1 ? `${slug}.softunebd.com` : undefined}>
              {label}
            </ToolRow>
          ) : null,
        )}
      </WorkLog>
      {finished ? (
        <p className="text-[15.5px] leading-relaxed text-white/90">
          {L("Your store is at ", "আপনার স্টোর: ")}
          <strong className="font-semibold text-white">{slug}.softunebd.com</strong>
          {L(". Opening your dashboard…", "। ড্যাশবোর্ড খোলা হচ্ছে…")}
        </p>
      ) : null}
      </div>
    </section>
  );
}
