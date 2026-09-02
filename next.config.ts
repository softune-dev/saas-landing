import type { NextConfig } from "next";

const DASHBOARD_URL = (
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://dashboard.softunebd.com"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/login",
        destination: DASHBOARD_URL,
        permanent: false,
      },
      { source: "/verify-otp", destination: "/signup", permanent: false },
      { source: "/basics", destination: "/signup", permanent: false },
      { source: "/welcome", destination: "/signup", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  // Tried experimental.inlineCss to fix the render-blocking-CSS Lighthouse
  // finding (inlines page CSS into <head> instead of a <link rel=
  // stylesheet>) — it DID eliminate that specific finding, but real
  // Lighthouse runs showed it made overall Performance worse: score 0.90 ->
  // 0.75, CLS 0.001 -> 0.191, TBT 190ms -> 400ms. Shipping ~100KB of CSS
  // inline instead of a cacheable, parallel-fetched stylesheet is a bad
  // trade for a real user. Reverted; see this commit's message / session
  // notes for the measured numbers instead of re-trying this blind later.
};

export default nextConfig;
