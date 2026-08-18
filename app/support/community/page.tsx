"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { MessageSquare, Users, Eye, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const discussions = [
  {
    title: "How to setup custom Courier API for delivery tracking?",
    author: "Mahmudul H.",
    role: "Merchant",
    replies: 14,
    views: 184,
    tag: "Integrations",
    time: "2 hours ago"
  },
  {
    title: "Feature Request: Multi-language checkout translations",
    author: "Sarah Connor",
    role: "Developer",
    replies: 28,
    views: 412,
    tag: "Feature Requests",
    time: "4 hours ago"
  },
  {
    title: "Custom CSS tweaks to style the sidebar cart drawer",
    author: "Alex Rivera",
    role: "Designer",
    replies: 9,
    views: 95,
    tag: "Design & Layout",
    time: "1 day ago"
  },
  {
    title: "Softune POS sync speed issues on local tablets - solved!",
    author: "Tariqul I.",
    role: "Store Manager",
    replies: 22,
    views: 310,
    tag: "POS System",
    time: "3 days ago"
  },
  {
    title: "Tips to optimize product catalog images for faster loading",
    author: "Jessica M.",
    role: "Merchant",
    replies: 5,
    views: 74,
    tag: "General Help",
    time: "5 days ago"
  }
];

export default function CommunityPage() {
  const [forumCategory, setForumCategory] = useState("All");

  const categories = [
    { label: "All", tag: "All", icon: "/icons/domain.svg" },
    { label: "General Help", tag: "General Help", icon: "/icons/help-desk.svg" },
    { label: "Design & Layout", tag: "Design & Layout", icon: "/icons/color.svg" },
    { label: "Integrations", tag: "Integrations", icon: "/icons/arrow-link.svg" },
    { label: "POS System", tag: "POS System", icon: "/icons/billing.svg" },
    { label: "Feature Requests", tag: "Feature Requests", icon: "/icons/ai-pencil.svg" }
  ];

  const filteredDiscussions = discussions.filter(disc => 
    forumCategory === "All" || disc.tag === forumCategory
  );

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
              <img src="/icons/user.svg" alt="User" className="size-3.5 object-contain" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Connect with Sellers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Community Forums &
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Feedback</em>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of ecommerce merchants, developers, and designers. Share tips, request platform features, and discuss retail strategies.
          </motion.p>
        </div>

        {/* Content Section */}
        <section className="py-24 max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Discussions Feed */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Category selector */}
              <div className="flex flex-wrap gap-2 mb-8 justify-start">
                {categories.map((cat) => {
                  const isActive = forumCategory === cat.tag;
                  return (
                    <button
                      key={cat.tag}
                      onClick={() => setForumCategory(cat.tag)}
                      className={`px-4 py-2.5 rounded-full text-[13.5px] font-bold tracking-tight transition-all duration-300 flex items-center gap-2 border border-transparent ${
                        isActive
                          ? "bg-[var(--color-brand)] text-white"
                          : "bg-[#E8E8E8]/60 text-[var(--color-muted)] hover:bg-[#E8E8E8]/90 hover:text-[var(--color-ink)]"
                      }`}
                    >
                      <img 
                        src={cat.icon} 
                        alt="" 
                        className={`size-4 object-contain ${isActive ? "brightness-0 invert" : ""}`} 
                      />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Discussion List */}
              <div className="space-y-4">
                {filteredDiscussions.map((disc, idx) => (
                  <motion.article
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="relative overflow-hidden rounded-[24px] border border-[#D4D4D4] hover:border-[var(--color-brand)] bg-white p-6 transition-all duration-300 group text-left cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    {/* Background Dots Gradient on Right Side */}
                    <div className="pointer-events-none absolute top-0 right-0 w-1/3 h-full bg-dot-grid-dense [mask-image:radial-gradient(circle_at_right,black_0%,transparent_80%)] opacity-30 transition-opacity duration-300 group-hover:opacity-60" />
                    <div className="flex items-start gap-4">
                      {/* Avatar Placeholder */}
                      <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] font-black text-sm shrink-0">
                        {disc.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-[#FAF9F6] border border-[var(--color-line)] text-[11px] font-extrabold text-[var(--color-muted)] uppercase px-2 py-0.5 rounded">
                            {disc.tag}
                          </span>
                          <span className="text-[12px] text-[var(--color-muted)] font-bold">
                            By {disc.author} ({disc.role})
                          </span>
                        </div>
                        <h3 className="mt-2 text-[16px] md:text-[18px] font-extrabold tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors leading-snug">
                          {disc.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-[var(--color-line)] shrink-0 self-end md:self-auto text-[var(--color-muted)]">
                      <span className="flex items-center gap-1.5 text-[13px] font-bold">
                        <img src="/icons/chat.svg" alt="" className="size-4 object-contain opacity-70" />
                        {disc.replies}
                      </span>
                      <span className="flex items-center gap-1.5 text-[13px] font-bold">
                        <Eye className="size-4" />
                        {disc.views}
                      </span>
                      <span className="text-[12px] font-bold text-[#A3A3A3]">
                        {disc.time}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>

            </div>

            {/* Right Column: Forum Statistics & Meta */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Join Card */}
              <div className="bg-white border border-[#D4D4D4] rounded-[24px] p-8 text-left relative overflow-hidden">
                <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-40" />
                <h3 className="text-xl font-black text-[var(--color-ink)] mb-4">
                  Join the Community
                </h3>
                <p className="text-[14px] leading-relaxed text-[var(--color-muted)] mb-6">
                  Join discussions, post configuration code snippets, request custom features, and collaborate on e-commerce hacks.
                </p>

                <Button variant="primary" as="a" href="#waitlist" className="w-full justify-center py-3.5 font-bold gap-2">
                  <img src="/icons/chat.svg" alt="" className="size-4 object-contain brightness-0 invert" />
                  Start a Discussion
                </Button>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[var(--color-line)]">
                  <div>
                    <p className="text-3xl font-black text-[var(--color-ink)]">12,450</p>
                    <p className="text-[12px] font-bold text-[var(--color-muted)] uppercase tracking-wider mt-1">Total Members</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[#137333]">84</p>
                    <p className="text-[12px] font-bold text-[var(--color-muted)] uppercase tracking-wider mt-1">Active Now</p>
                  </div>
                </div>
              </div>

              {/* Forum Guidelines */}
              <div className="bg-white border border-[#D4D4D4] rounded-[24px] p-8 text-left relative overflow-hidden">
                <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-80" />
                
                <h3 className="text-[16px] font-extrabold text-[var(--color-ink)] mb-4 flex items-center gap-2 relative z-10">
                  <img src="/icons/lock.svg" alt="" className="size-4.5 object-contain" />
                  Forum Guidelines
                </h3>
                <ul className="space-y-3 text-[13.5px] text-[var(--color-muted)] font-medium">
                  <li className="flex gap-2">
                    <span className="text-[var(--color-brand)] font-bold">1.</span>
                    Be respectful and supportive of fellow merchants.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-brand)] font-bold">2.</span>
                    Post custom HTML/CSS code inside code blocks.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-brand)] font-bold">3.</span>
                    Do not share API keys or sensitive merchant data.
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
