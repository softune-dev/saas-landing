"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  RecaptchaChallengeRequiredError,
  submitPlatformContact,
} from "@/lib/api";
import { getRecaptchaToken, hasV2Fallback } from "@/lib/recaptcha";
import { RecaptchaDisclosure } from "./auth/recaptcha-disclosure";
import {
  RecaptchaV2Fallback,
  type RecaptchaV2FallbackHandle,
} from "./auth/recaptcha-v2-fallback";
import { Button } from "./ui/button";

const cards = [
  {
    title: "Custom Development",
    desc: "Need bespoke features? We build custom themes and apps.",
    icon: "/icons/color.svg",
  },
  {
    title: "Installation Service",
    desc: "Let our experts set up and configure your store for you.",
    icon: "/icons/zap.svg",
  },
  {
    title: "Request Support",
    desc: "Having issues? Our support team is here to help 24/7.",
    icon: "/icons/help-desk.svg",
  },
  {
    title: "Documentation",
    desc: "Explore guides, API docs, and platform architecture.",
    icon: "/icons/book.svg",
  },
];

export function Contact() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentName, setSentName] = useState<string | null>(null);
  const [needsChallenge, setNeedsChallenge] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);
  const v2Ref = useRef<RecaptchaV2FallbackHandle>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const first_name = String(fd.get("first_name") ?? "").trim();
    const last_name = String(fd.get("last_name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (!(first_name && last_name && email && message)) return;
    if (needsChallenge && !v2Token) return;

    setError(null);
    setBusy(true);
    try {
      const recaptchaToken = await getRecaptchaToken("platform_contact");
      await submitPlatformContact({
        first_name,
        last_name,
        email,
        phone: phone || undefined,
        message,
        recaptcha_token: recaptchaToken,
        recaptcha_v2_token: v2Token ?? "",
      });
      form.reset();
      setSentName(first_name);
      setNeedsChallenge(false);
      setV2Token(null);
    } catch (err) {
      if (err instanceof RecaptchaChallengeRequiredError) {
        setNeedsChallenge(true);
        setError(hasV2Fallback ? null : err.message);
      } else {
        setError(
          err instanceof Error ? err.message : "Couldn't send your message",
        );
        v2Ref.current?.reset();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl overflow-x-clip px-4 py-14 sm:px-5 md:px-8 md:py-32"
    >
      <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:mb-6 md:gap-3 md:p-1.5 md:pr-4"
          >
            <div className="relative flex size-5 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                style={{ animationDuration: "2s" }}
              />
              <img
                src="/icons/chat.svg"
                alt=""
                className="relative z-10 size-3 object-contain md:size-3.5 dark:invert"
              />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
              Contact Us
            </span>
          </motion.div>

          <h2 className="text-3xl leading-[1.2] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.15]">
            Let&apos;s build something <br />
            <span className="relative mt-2 inline-block px-2.5 py-0.5 sm:whitespace-nowrap sm:px-4">
              <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">extraordinary.</em>
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:mt-6 sm:text-[17px]">
            Whether you need custom development, migration assistance, or just have a few questions, our team is ready to help you succeed on Softune.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 md:gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative flex flex-col items-start overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-all hover:border-[var(--color-brand)]"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-dot-grid-dense [mask-image:radial-gradient(ellipse_at_top_right,black_0%,transparent_60%)] pointer-events-none opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative z-10">
                  <div className="mb-4 inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110">
                    <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
                      <img
                        src={card.icon}
                        alt=""
                        className="size-4 object-contain brightness-0 invert"
                      />
                    </div>
                  </div>
                  <h3 className="font-bold text-[16px] text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-brand)] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[14px] text-[var(--color-muted)] leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Form Container */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full min-w-0 max-w-full rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 shadow-xl shadow-[var(--color-brand)]/5 sm:rounded-[2.5rem] sm:p-8 sm:shadow-2xl md:p-12"
        >
          <h3 className="mb-6 text-xl font-extrabold tracking-tight text-[var(--color-ink)] sm:mb-8 sm:text-2xl">
            Send us a message
          </h3>

          {sentName ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-12 text-center"
            >
              <div className="mb-2 flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="size-10" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-ink)]">
                Message sent
              </h3>
              <p className="max-w-md text-[15px] text-[var(--color-muted)]">
                Thanks, <span className="font-bold">{sentName}</span> — we
                received your message and will reply by email.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setSentName(null)}
              >
                Send another message
              </Button>
            </motion.div>
          ) : (
            <form
              className="flex flex-col gap-5 sm:gap-6"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-[var(--color-ink)]">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="John"
                    required
                    maxLength={80}
                    autoComplete="given-name"
                    className="min-h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-[var(--color-ink)]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Doe"
                    required
                    maxLength={80}
                    autoComplete="family-name"
                    className="min-h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[var(--color-ink)]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  required
                  autoComplete="email"
                  className="min-h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[var(--color-ink)]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  maxLength={32}
                  autoComplete="tel"
                  className="min-h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[var(--color-ink)]">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  maxLength={2000}
                  placeholder="How can we help you?"
                  className="resize-none rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10"
                />
              </div>

              {error ? (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-400">
                  {error}
                </p>
              ) : null}

              {needsChallenge && hasV2Fallback ? (
                <RecaptchaV2Fallback ref={v2Ref} onVerify={setV2Token} />
              ) : null}

              <Button
                type="submit"
                disabled={busy || (needsChallenge && !v2Token)}
                className="animate-shine mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-brand)] py-5 text-[15px] font-extrabold text-white shadow-lg shadow-[var(--color-brand)]/20 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-4 sm:py-6"
              >
                {busy ? "Sending…" : "Send Message"}
                {!busy ? (
                  <img
                    src="/icons/send.svg"
                    alt=""
                    className="size-5 object-contain brightness-0 invert"
                  />
                ) : null}
              </Button>

              <RecaptchaDisclosure />
            </form>
          )}
        </motion.div>
        
      </div>
    </section>
  );
}
