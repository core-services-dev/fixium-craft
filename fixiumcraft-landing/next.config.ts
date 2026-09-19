import type { NextConfig } from "next";

// NOTE: this used to set `output: "export"` for a fully static build, but
// that's incompatible with `app/api/quote/route.ts` (a POST Route Handler
// that reads a form submission and calls out to Telegram/Web3Forms
// server-side) — a static export can only serve prerendered GET routes.
// Deploying to Vercel (as this project does) runs the App Router's API
// routes as real serverless functions with no extra config needed, so
// removing `output: "export"` is all that's required here.
const nextConfig: NextConfig = {};

export default nextConfig;
