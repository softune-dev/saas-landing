"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Calendar, Clock, Newspaper } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function BlogPage() {
  const featuredPost = BLOG_POSTS[0];
  const recentPosts = BLOG_POSTS.slice(1);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        
        {/* Hero Section (Changelog Inspired) */}
        <div className="relative pt-16 pb-20 px-5 text-center overflow-hidden bg-[var(--color-canvas)] rounded-b-[4rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          {/* Hero Pill */}
          <div className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <Newspaper className="size-3.5 text-[var(--color-brand)]" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Softunebd Journal
            </span>
          </div>

          <h1
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Blog &
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Insights</em>
            </span>
          </h1>
          
          <p className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed">
            Practical guides, ecommerce strategies, product updates, and growth tactics for online store owners.
          </p>
        </div>

        {/* Featured Post */}
        <section className="py-12 max-w-7xl mx-auto px-5 md:px-8">
          <a
            href={`/blog/${featuredPost.slug}`}
            className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] hover:border-[var(--color-brand)] bg-[var(--color-surface)] transition-all duration-300 group text-left flex flex-col lg:flex-row mb-16 cursor-pointer"
          >
            <div className="pointer-events-none absolute bottom-0 right-0 w-1/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_bottom_right,black_0%,transparent_80%)] opacity-30 transition-opacity duration-300 group-hover:opacity-60" />

            {/* Edge-to-edge Thumbnail — solid color when there's no real photo yet */}
            <div
              className="lg:w-1/2 aspect-video lg:aspect-auto lg:min-h-[400px] w-full overflow-hidden bg-slate-900 relative shrink-0 z-10"
              style={featuredPost.color ? { backgroundColor: featuredPost.color } : undefined}
            >
              {featuredPost.image ? (
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : null}
            </div>

            {/* Content */}
            <div className="lg:w-1/2 flex flex-col justify-between relative z-10 p-6 md:p-10">
              <div>
                <span className="bg-[var(--color-canvas)] border border-[var(--color-line)] text-[12px] font-extrabold text-[var(--color-brand)] uppercase px-3 py-1 rounded-full">
                  Featured: {featuredPost.category}
                </span>

                <h2 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-brand)] transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="mt-4 text-[16px] leading-relaxed text-[var(--color-muted)] font-medium">
                  {featuredPost.desc}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[var(--color-line)] pt-6 flex-wrap gap-4">
                <div className="flex items-center gap-6 text-[13px] font-bold text-[var(--color-muted)]">
                  <span className="flex items-center gap-1.5"><Calendar className="size-4" />{featuredPost.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="size-4" />{featuredPost.readTime}</span>
                </div>

                <span className="inline-flex items-center gap-2 text-[14px] font-bold text-[var(--color-brand)] hover:underline">
                  Read Article
                  <img src="/icons/arrow-right.svg" alt="" className="size-3.5 object-contain dark:invert" />
                </span>
              </div>
            </div>
          </a>

          {/* Grid of Recent Posts */}
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-[var(--color-ink)] mb-8 text-left">
              Recent Articles
            </h3>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post, i) => (
                <a
                  href={`/blog/${post.slug}`}
                  key={post.title}
                  className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] hover:border-[var(--color-brand)] bg-[var(--color-surface)] transition-all duration-300 group flex flex-col text-left cursor-pointer"
                >
                  <div className="pointer-events-none absolute bottom-0 right-0 w-2/3 h-1/2 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_bottom_right,black_0%,transparent_80%)] opacity-30 transition-opacity duration-300 group-hover:opacity-60" />
                  
                  {/* Edge-to-edge Thumbnail — solid color when there's no real photo yet */}
                  <div
                    className="relative aspect-video w-full overflow-hidden bg-slate-900 shrink-0 z-10"
                    style={post.color ? { backgroundColor: post.color } : undefined}
                  >
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={450}
                        className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : null}
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col flex-1 p-6">
                    <div className="mb-6">
                      <span className="text-[12px] font-bold text-[var(--color-brand)]">
                        {post.category}
                      </span>

                      <h4 className="mt-2 text-[19px] md:text-[20px] font-semibold tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)] leading-snug">
                        {post.title}
                      </h4>

                      <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-muted)]">
                        {post.desc}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-[var(--color-line)] flex items-center justify-between text-[var(--color-muted)] text-[12px] font-bold">
                      <span className="flex items-center gap-1"><Calendar className="size-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3.5" />{post.readTime}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </section>

      </main>
      <Footer />
    </>
  );
}
