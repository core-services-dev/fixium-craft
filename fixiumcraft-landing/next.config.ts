import type { NextConfig } from "next";

// NOTE: this used to set `output: "export"` for a fully static build, but
// that's incompatible with `app/api/quote/route.ts` (a POST Route Handler
// that reads a form submission and calls out to Telegram/Web3Forms
// server-side) — a static export can only serve prerendered GET routes.
// Deploying to Vercel (as this project does) runs the App Router's API
// routes as real serverless functions with no extra config needed, so
// removing `output: "export"` is all that's required here.
const nextConfig: NextConfig = {
  // Vercel sets VERCEL_GIT_COMMIT_SHA automatically at build time, but only
  // as a server-side system env var — Next.js only auto-inlines vars that
  // are themselves prefixed NEXT_PUBLIC_ when read from the shell. This
  // `env` block re-exposes it (and a manual NEXT_PUBLIC_COMMIT_SHA
  // fallback, for non-Vercel builds/CI) under NEXT_PUBLIC_ names so the
  // client bundle can read them directly — see the Footer's version line
  // in components/LandingPage.jsx. Both are empty strings locally (neither
  // env var is set outside a Vercel build), so local dev is unaffected.
  env: {
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA || "",
    NEXT_PUBLIC_COMMIT_SHA: process.env.NEXT_PUBLIC_COMMIT_SHA || "",
  },
};

export default nextConfig;
