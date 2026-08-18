"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Phone, Clock, Send, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSupportPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "general",
    message: ""
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const options = [
    { value: "general", label: "General Platform Inquiry" },
    { value: "setup", label: "Store Setup & Domain config" },
    { value: "design", label: "Theme Layout & Custom CSS" },
    { value: "billing", label: "Subscription & Billing invoice" },
    { value: "bug", label: "Report a Platform Bug" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
    }
  };

  const contactChannels = [
    {
      title: "Email Support",
      desc: "Our tech support team resolves tickets in 2 hours.",
      detail: "support@softune.com",
      icon: Mail,
      actionText: "Send Email",
      href: "mailto:support@softune.com"
    },
    {
      title: "Live Chat Widget",
      desc: "Talk instantly with developers directly in-app.",
      detail: "Average reply: 3 mins",
      icon: MessageSquare,
      actionText: "Open App Chat",
      href: "#"
    },
    {
      title: "Priority Call Desk",
      desc: "Emergency line for premium & enterprise accounts.",
      detail: "+1 (800) 555-0199",
      icon: Phone,
      actionText: "Dial support",
      href: "tel:+18005550199"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF9F6]">
        
        {/* Hero Section (Changelog Inspired) */}
        <div className="relative pt-12 pb-14 px-5 text-center overflow-hidden bg-[#f0f1f3] rounded-b-[4rem] border-b-[6px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          {/* Hero Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-4 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-white p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <img src="/icons/chat.svg" alt="Chat" className="size-3.5 object-contain" />
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

        {/* Form and Channels Grid */}
        <section className="py-24 max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Direct Support Channels */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-[24px] font-extrabold tracking-tight text-[var(--color-ink)] mb-6">
                Direct Channels
              </h2>
              {contactChannels.map((chan, idx) => {
                const Icon = chan.icon;
                return (
                  <motion.article
                    key={chan.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    className="relative overflow-hidden rounded-[24px] border border-[#D4D4D4] hover:border-[var(--color-brand)] bg-white p-6 md:p-8 transition-all duration-300 group flex items-start gap-5 text-left"
                  >
                    <div className="inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1 transition-transform duration-300 group-hover:scale-105">
                      <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm text-white">
                        <Icon className="size-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-extrabold tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors">
                        {chan.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)]">
                        {chan.desc}
                      </p>
                      <p className="mt-2 text-[15px] font-bold text-[var(--color-ink)]">
                        {chan.detail}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* Right Column: Premium Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[20px] border border-[#D4D4D4] p-8 md:p-12 relative overflow-hidden">
                <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-40" />
                
                <h2 className="text-[24px] font-extrabold tracking-tight text-[var(--color-ink)] mb-8 relative z-10">
                  Open a Support Ticket
                </h2>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 flex flex-col items-center gap-4 relative z-10"
                  >
                    <div className="size-16 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#137333] mb-2">
                      <CheckCircle2 className="size-10 animate-bounce" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-ink)]">Support Ticket Created!</h3>
                    <p className="text-[15px] text-[var(--color-muted)] max-w-md">
                      Thank you, <span className="font-bold">{formData.name}</span>. We've received your request regarding <span className="font-bold">{formData.topic}</span> support. A developer has been assigned and will reach back at <span className="font-bold">{formData.email}</span> shortly.
                    </p>
                    <Button variant="outline" className="mt-6" onClick={() => setFormSubmitted(false)}>
                      Submit Another Ticket
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-left">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-[14px] font-bold text-[var(--color-ink)] mb-2 uppercase tracking-wide">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full bg-[#FAF9F6] border border-[#D4D4D4] rounded-xl px-4 py-3 text-[15px] font-medium outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/15 transition-all text-[var(--color-ink)]"
                        />
                      </div>
                      <div>
                        <label className="block text-[14px] font-bold text-[var(--color-ink)] mb-2 uppercase tracking-wide">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@brand.com"
                          className="w-full bg-[#FAF9F6] border border-[#D4D4D4] rounded-xl px-4 py-3 text-[15px] font-medium outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/15 transition-all text-[var(--color-ink)]"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-[14px] font-bold text-[var(--color-ink)] mb-2 uppercase tracking-wide">
                        What can we help with?
                      </label>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex items-center justify-between bg-[#FAF9F6] border border-[#D4D4D4] rounded-xl px-4 py-3 text-[15px] font-medium outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/15 transition-all text-[var(--color-ink)] cursor-pointer text-left"
                      >
                        <span>{options.find(opt => opt.value === formData.topic)?.label}</span>
                        <ChevronDown className={`size-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute z-20 w-full mt-2 bg-white border border-[#D4D4D4] rounded-xl shadow-lg overflow-hidden"
                          >
                            {options.map((opt) => (
                              <div
                                key={opt.value}
                                onClick={() => {
                                  setFormData({ ...formData, topic: opt.value });
                                  setDropdownOpen(false);
                                }}
                                className="px-4 py-3 hover:bg-[var(--color-brand)]/10 hover:text-[var(--color-brand)] text-[15px] font-medium text-[var(--color-ink)] cursor-pointer transition-colors"
                              >
                                {opt.label}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-[14px] font-bold text-[var(--color-ink)] mb-2 uppercase tracking-wide">
                        Message Details
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your issue, including any relevant store links or diagnostic steps you've taken..."
                        className="w-full bg-[#FAF9F6] border border-[#D4D4D4] rounded-xl px-4 py-3 text-[15px] font-medium outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/15 transition-all text-[var(--color-ink)] resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-full flex items-center justify-center gap-2 rounded-2xl py-6 text-[15px] font-extrabold bg-[var(--color-brand)] text-white hover:opacity-90 shadow-lg shadow-[var(--color-brand)]/20"
                    >
                      Submit Support Request
                      <img src="/icons/send.svg" alt="" className="size-5 object-contain brightness-0 invert" />
                    </Button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
