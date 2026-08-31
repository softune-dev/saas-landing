/**
 * Plain data, deliberately NOT in about-content.tsx (a "use client" file).
 * The server page.tsx needs to read this directly to build real Person
 * schema.org JSON-LD, and Next's RSC boundary only exposes a client
 * module's DEFAULT export as an opaque reference to server code, not its
 * named data exports.
 *
 * Only real people go here. A placeholder team member with a stock
 * pravatar.cc avatar is worse than an honest solo-founder page; fabricated
 * Person schema is a false entity claim, not a helpful one. Bio, location,
 * and social links pulled directly from kamrulhasan.site: real history,
 * not placeholders.
 */
export const team = [
  {
    name: "Kamrul Hasan",
    role: "Founder & Lead Developer",
    location: "Dhaka, Bangladesh",
    bio: "Been building software professionally since 2020: freelance web development on Freelancer.com and Upwork, then leading projects at Webbyte Agency, then AI-powered platforms at Wonder AI. The idea for Softune came in 2024, built in spare time around a full-time job and finishing university. Went full-time on it in 2026 and built the entire platform solo, the multi-tenant dashboard, storefront themes, AI tooling, and the payment and courier integrations underneath it.",
    avatar: "/developer.webp",
    portfolio: "https://kamrulhasan.site",
    email: "support@softunebd.com",
    github: "https://github.com/Kallolx",
    twitter: "https://x.com/khxKallol",
    facebook: "https://www.facebook.com/developer.kamrulhasan/",
  },
];
