"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { BD_PHONE_RE } from "../trial-steps";
import { t, type Business, type Locale } from "./signup-copy";
import { PhoneInput, Switch } from "./signup-controls";
import { ErrorBox, Heading, PrimaryButton, bareInputClass, boxClass } from "./signup-ui";
import { SOCIAL_NETWORKS, type SocialKey } from "./social-logos";

type StepProps = {
  locale: Locale;
  value: Business;
  onChange: (patch: Partial<Business>) => void;
  onNext: () => void;
};

export function ContactStep({ locale, value, busy, error, onChange, onNext }: StepProps & { busy: boolean; error: string | null }) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const bad = (v: string) => v.length >= 11 && !BD_PHONE_RE.test(v);
  const ready = BD_PHONE_RE.test(value.phone) && (value.whatsappSame || BD_PHONE_RE.test(value.whatsapp));

  function submit(e: FormEvent) {
    e.preventDefault();
    if (ready) onNext();
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <div className="mb-3">
        <Heading title={L("Your mobile number", "আপনার মোবাইল নম্বর")} />
      </div>
      <PhoneInput id="signup-phone" label={L("Mobile number", "মোবাইল নম্বর")} required value={value.phone} onChange={(phone) => onChange({ phone })} />
      <Switch checked={value.whatsappSame} label={L("Same number on WhatsApp", "একই নম্বরে WhatsApp")} onChange={(whatsappSame) => onChange({ whatsappSame })} />
      {!value.whatsappSame ? (
        <PhoneInput id="signup-whatsapp" label={L("WhatsApp number", "WhatsApp নম্বর")} required value={value.whatsapp} onChange={(whatsapp) => onChange({ whatsapp })} />
      ) : null}
      <ErrorBox message={error ?? (bad(value.phone) || (!value.whatsappSame && bad(value.whatsapp)) ? L("Check the number, like 01XXXXXXXXX", "নম্বরটি দেখুন, যেমন 01XXXXXXXXX") : null)} />
      <PrimaryButton busy={busy} disabled={!ready}>
        {L("Continue", "চালিয়ে যান")}
      </PrimaryButton>
      <p className="text-center text-xs text-muted">{L("We may call or message you about your store.", "আপনার স্টোর নিয়ে আমরা কল বা মেসেজ করতে পারি।")}</p>
    </form>
  );
}

/** Facebook is where most sellers already are, so only it starts open. The
 * others are one tap away. */
export function SocialStep({ locale, value, onChange, onNext }: StepProps) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const [open, setOpen] = useState<SocialKey[]>(() =>
    SOCIAL_NETWORKS.filter((n) => n.key === "facebook" || value[n.key].trim()).map((n) => n.key),
  );
  const [added, setAdded] = useState<SocialKey | null>(null);
  const filled = SOCIAL_NETWORKS.some((n) => value[n.key].trim());
  const hidden = SOCIAL_NETWORKS.filter((n) => !open.includes(n.key));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="flex flex-col gap-3"
    >
      <div className="mb-3">
        <Heading title={L("Your pages", "আপনার পেজ")} />
      </div>

      <AnimatePresence initial={false}>
        {open.map((key) => {
          const { name, Logo } = SOCIAL_NETWORKS.find((n) => n.key === key)!;
          return (
            <motion.div key={key} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.16 }}>
              <div className={`${boxClass} !h-14`}>
                <span aria-hidden className="relative size-7 shrink-0">
                  <Logo />
                </span>
                <input
                  aria-label={name}
                  autoFocus={added === key}
                  maxLength={200}
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder={key === "facebook" ? L("Facebook page link or name", "ফেসবুক পেজ লিংক বা ইউজারনেম") : L(`${name} link or username`, `${name} লিংক বা ইউজারনেম`)}
                  value={value[key]}
                  onChange={(e) => onChange({ [key]: e.target.value })}
                  className={bareInputClass}
                />
                {key !== "facebook" ? (
                  <button
                    type="button"
                    aria-label={L(`Remove ${name}`, `${name} বাদ দিন`)}
                    onClick={() => {
                      onChange({ [key]: "" });
                      setOpen((o) => o.filter((k) => k !== key));
                    }}
                    className="-mr-2 shrink-0 rounded-full p-2 text-muted-soft transition-colors hover:text-ink"
                  >
                    <X className="size-4" />
                  </button>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {hidden.length ? (
        <div className="flex flex-wrap justify-center gap-2 py-1">
          {hidden.map(({ key, name, Logo }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setAdded(key);
                setOpen((o) => [...o, key]);
              }}
              className="flex h-11 items-center gap-2 rounded-full border border-line pr-4 pl-3 text-sm font-semibold text-ink transition-colors hover:border-ink/35 active:scale-[0.97]"
            >
              <span aria-hidden className="relative size-5">
                <Logo />
              </span>
              {name}
              <Plus aria-hidden className="size-4 text-muted" />
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-2">
        <PrimaryButton>{filled ? L("Continue", "চালিয়ে যান") : L("Skip for now", "এখন থাক")}</PrimaryButton>
      </div>
      <p className="text-center text-xs text-muted">{L("These links show on your store.", "এই লিংকগুলো আপনার স্টোরে দেখা যাবে।")}</p>
    </form>
  );
}
