"use client";

import React, { useRef, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecaptchaDisclosure } from "@/components/auth/recaptcha-disclosure";
import {
  RecaptchaV2Fallback,
  type RecaptchaV2FallbackHandle,
} from "@/components/auth/recaptcha-v2-fallback";
import {
  RecaptchaChallengeRequiredError,
  submitPlatformContact,
} from "@/lib/api";
import { getRecaptchaToken, hasV2Fallback } from "@/lib/recaptcha";

// Only real channels today. Add a new entry here the moment another one
// exists (a support phone line, live chat, etc.) — a fake placeholder is
// worse than having just these.
const cards = [
  {
    title: "Email Support",
    desc: "Our tech support team resolves tickets in 2 hours.",
    detail: "support@softunebd.com",
    href: "mailto:support@softunebd.com",
    icon: "/icons/chat.svg",
  },
  {
    title: "WhatsApp",
    desc: "Message us directly for quick questions.",
    detail: "+880 1831-624571",
    href: "https://wa.me/8801831624571",
    icon: "/icons/whatsapp.svg",
  },
];

export default function ContactSupportPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsChallenge, setNeedsChallenge] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);
  const v2Ref = useRef<RecaptchaV2FallbackHandle>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(formData.firstName && formData.lastName && formData.email && formData.message)) return;
    if (needsChallenge && !v2Token) return;

    setError(null);
    setBusy(true);
    try {
      const recaptchaToken = await getRecaptchaToken("platform_contact");
      await submitPlatformContact({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim(),
        recaptcha_token: recaptchaToken,
        recaptcha_v2_token: v2Token ?? "",
      });
      setFormSubmitted(true);
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
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        
        {/* Hero Section (Changelog Inspired) */}
        <div className="relative pt-12 pb-14 px-5 text-center overflow-hidden bg-[var(--color-canvas)] rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          {/* Hero Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-4 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <img src="/icons/chat.svg" alt="Chat" className="size-3.5 object-contain dark:invert" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              24/7 Assistance
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Contact Customer
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Support</em>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Need custom help with your store configuration? Reach out to our technical support team, billing support, or schedule an onboarding call.
          </motion.p>
        </div>

        {/* Form and Cards Grid */}
        <section className="py-24 max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Cards */}
            <div className="lg:col-span-6 space-y-6">
              {cards.map((card, i) => (
                <a
                  key={card.title}
                  href={card.href}
                  className="group relative block overflow-hidden p-6 rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] transition-all hover:bg-[var(--color-surface)] hover:border-[var(--color-brand)] shadow-sm hover:shadow-md text-left"
                >
                  <div className="absolute top-0 right-0 w-full h-full bg-dot-grid-dense [mask-image:radial-gradient(ellipse_at_top_right,black_0%,transparent_60%)] pointer-events-none opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="relative z-10 flex items-start gap-5">
                    <div className="inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110 shrink-0">
                      <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
                        <img
                          src={card.icon}
                          alt=""
                          className="size-4 object-contain brightness-0 invert dark:invert"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-[16px] text-[var(--color-ink)] mb-1 group-hover:text-[var(--color-brand)] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[14px] text-[var(--color-muted)] leading-relaxed font-medium mb-2">
                        {card.desc}
                      </p>
                      <p className="text-[15px] font-bold text-[var(--color-ink)]">
                        {card.detail}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full min-w-0 max-w-full rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 shadow-xl shadow-[var(--color-brand)]/5 sm:rounded-[2.5rem] sm:p-8 sm:shadow-2xl md:p-12"
              >
                <h3 className="mb-6 text-xl font-extrabold tracking-tight text-[var(--color-ink)] sm:mb-8 sm:text-2xl text-left">
                  Send us a message
                </h3>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 flex flex-col items-center gap-4 relative z-10"
                  >
                    <div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2">
                      <CheckCircle2 className="size-10" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-ink)]">Message sent</h3>
                    <p className="text-[15px] text-[var(--color-muted)] max-w-md">
                      Thanks, <span className="font-bold">{formData.firstName}</span> — we received your message and will reply at <span className="font-bold">{formData.email}</span>.
                    </p>
                    <Button variant="outline" className="mt-6" onClick={() => {
                      setFormSubmitted(false);
                      setError(null);
                      setNeedsChallenge(false);
                      setV2Token(null);
                      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
                    }}>
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form className="flex flex-col gap-5 sm:gap-6 text-left" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-[var(--color-ink)]">
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          required
                          value={formData.firstName}
                          maxLength={80}
                          autoComplete="given-name"
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="min-h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10 text-[var(--color-ink)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-[var(--color-ink)]">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Doe"
                          required
                          value={formData.lastName}
                          maxLength={80}
                          autoComplete="family-name"
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="min-h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10 text-[var(--color-ink)]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold text-[var(--color-ink)]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={formData.email}
                        autoComplete="email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="min-h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10 text-[var(--color-ink)]"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold text-[var(--color-ink)]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        maxLength={32}
                        autoComplete="tel"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="min-h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10 text-[var(--color-ink)]"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold text-[var(--color-ink)]">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="How can we help you?"
                        value={formData.message}
                        maxLength={2000}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="resize-none rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10 text-[var(--color-ink)]"
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

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
