import { NextRequest, NextResponse } from "next/server";
import { business } from "@/components/contentData";

// POST /api/quote
//
// Receives the quote-request form (multipart/form-data, so it can include
// an optional photo) and fans it out to two channels:
//   1. Telegram — an instant alert via the Telegram Bot API
//      (env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID). This is the main,
//      zero-risk channel: missing credentials fail the whole request
//      immediately with `{ success: false, error: "Missing Telegram
//      credentials" }` (see the comment on POST below for why, and the
//      trade-off that goes with it).
//   2. Resend (https://resend.com) — emails the lead to the business
//      inbox (env: RESEND_API_KEY, optionally RESEND_FROM_EMAIL). This is
//      best-effort: a Resend failure is logged but never fails the
//      request, since Telegram alone is enough to get the lead through,
//      and email deliverability (sender reputation, spam filters, domain
//      verification) is inherently the more fragile of the two.
//
// Resend specifics worth knowing (see .env.local.example for setup):
//   - `from` is ALWAYS a fixed, server-controlled address — RESEND_FROM_EMAIL
//     if set, otherwise Resend's shared sandbox sender
//     "onboarding@resend.dev". It is NEVER the customer's own email, on
//     purpose: putting arbitrary user input in the `from` header is
//     exactly the kind of thing that gets a sending domain flagged as
//     spam or gets messages silently dropped by the recipient's filters.
//   - The customer's own email (if they gave one — it's an optional form
//     field) goes in `reply_to` instead, so clicking Reply in the
//     business inbox goes straight to the customer, without the `from`
//     header ever claiming to be them.
//   - Without a verified custom domain, Resend's sandbox sender can only
//     deliver to the email address the Resend account itself was signed
//     up with — verify a domain in the Resend dashboard once this needs
//     to reliably reach fixiumcraft@gmail.com (or whichever inbox
//     business.email points at) from arbitrary traffic.
//
// Also does basic anti-abuse: a honeypot field, a small in-memory rate
// limit per IP, and payload/length/mime-type validation. See the comments
// inline below for the specifics and limitations of each.
//
// This is also *why* next.config.ts no longer sets `output: "export"` —
// a static export can only serve GET routes, and this route needs to read
// a POST body server-side, so the two are incompatible. See the comment
// there for details.

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RESEND_SANDBOX_FROM = `${business.name} Notifications <onboarding@resend.dev>`;

const MAX_FIELD_LENGTHS = {
  name: 100,
  phone: 30,
  email: 200,
  zip: 20,
  serviceLabel: 250, // joined multi-select labels (e.g. all 5 services) can run long
  notes: 1000,
};
const MAX_PHOTO_BYTES = 4 * 1024 * 1024; // 4MB — keeps the Resend request body small and fast
const ALLOWED_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
]);

// --- Rate limiting -----------------------------------------------------
//
// Deliberately simple: an in-memory sliding window keyed by client IP,
// living in a module-level Map. This is NOT a distributed rate limiter —
// it only sees requests handled by this one warm serverless instance, so
// a determined attacker spread across Vercel's edge/regions (or just
// triggering enough cold starts) can get around it. It's "basic" exactly
// as requested: enough to blunt a script mashing the button or a simple
// bot, not a real defense at scale. If abuse becomes a real problem,
// swap this for Vercel KV or Upstash Redis (shared across instances).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const submissionsByIp = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  submissionsByIp.set(ip, recent);
  // Occasionally sweep old IPs so this Map doesn't grow forever on a
  // long-lived warm instance.
  if (submissionsByIp.size > 500) {
    for (const [key, timestamps] of submissionsByIp) {
      if (timestamps.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        submissionsByIp.delete(key);
      }
    }
  }
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}
// -------------------------------------------------------------------------

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

// Minimal HTML escaping for the three characters Telegram's HTML parse
// mode (and our Resend HTML email) treat specially. Without this, a
// customer's own notes containing e.g. "<3 months old, needs repair>"
// would break Telegram's entity parser and/or render as broken markup in
// the email.
function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function isValidEmail(value: string): boolean {
  // Deliberately simple — good enough to decide "is this worth putting in
  // reply_to", not a full RFC 5322 validator.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type ParsedFields = {
  name: string;
  phone: string;
  email: string;
  zip: string;
  serviceLabel: string;
  notes: string;
  hasPhoto: boolean;
};

// Basic payload validation: reject absurdly long field values before they
// ever reach Telegram/Resend. This shouldn't trigger from the real form
// (its inputs aren't this long in practice), but guards against a
// scripted POST stuffing megabytes of text into one field.
function findFieldTooLong(fields: ParsedFields): string | null {
  if (fields.name.length > MAX_FIELD_LENGTHS.name) return "name";
  if (fields.phone.length > MAX_FIELD_LENGTHS.phone) return "phone";
  if (fields.email.length > MAX_FIELD_LENGTHS.email) return "email";
  if (fields.zip.length > MAX_FIELD_LENGTHS.zip) return "zip";
  if (fields.serviceLabel.length > MAX_FIELD_LENGTHS.serviceLabel) return "service";
  if (fields.notes.length > MAX_FIELD_LENGTHS.notes) return "notes";
  return null;
}

function buildTelegramMessage(fields: ParsedFields): string {
  const lines = [
    `🔔 <b>New quote request</b> — ${escapeHtml(business.name)}`,
    `<b>Name:</b> ${escapeHtml(fields.name) || "—"}`,
    `<b>Phone:</b> ${escapeHtml(fields.phone) || "—"}`,
    `<b>Service:</b> ${escapeHtml(fields.serviceLabel) || "—"}`,
    `<b>ZIP / Address:</b> ${escapeHtml(fields.zip) || "—"}`,
  ];
  if (fields.email) lines.push(`<b>Email:</b> ${escapeHtml(fields.email)}`);
  if (fields.notes) lines.push(`<b>Notes:</b> ${escapeHtml(fields.notes)}`);
  if (fields.hasPhoto) lines.push("📎 Photo attached — check email for the file.");
  return lines.join("\n");
}

function buildEmailHtml(fields: ParsedFields): string {
  const rows = [
    ["Name", fields.name],
    ["Phone", fields.phone],
    ["Email", fields.email || "—"],
    ["Service", fields.serviceLabel || "—"],
    ["ZIP / Address", fields.zip || "—"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#64748b;font-weight:600;">${escapeHtml(
          label
        )}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const notesBlock = fields.notes
    ? `<p style="margin-top:16px;"><strong>Notes:</strong><br>${escapeHtml(fields.notes).replace(/\n/g, "<br>")}</p>`
    : "";
  const photoBlock = fields.hasPhoto
    ? '<p style="margin-top:16px;">📎 Photo attached to this email.</p>'
    : "";

  return `
    <div style="font-family:sans-serif;font-size:14px;color:#0f172a;">
      <h2 style="margin-bottom:12px;">New quote request — ${escapeHtml(business.name)}</h2>
      <table>${rows}</table>
      ${notesBlock}
      ${photoBlock}
    </div>
  `;
}

// Sends the Telegram alert. Credentials are validated by the caller
// (POST, below) before this is ever invoked — see the top-of-file comment
// for why a missing credential fails the whole request instead of being
// handled per-channel here.
async function notifyTelegram(botToken: string, chatId: string, fields: ParsedFields): Promise<boolean> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildTelegramMessage(fields),
        parse_mode: "HTML",
      }),
    });

    // Parse once and log the exact body Telegram sent back — its
    // error_code/description (e.g. "Forbidden: bot was blocked by the
    // user", "chat not found") is what actually explains a silent
    // failure, far more than the bare HTTP status.
    const responseBody = await res.json().catch((err) => {
      console.error("[Telegram] response was not valid JSON:", err);
      return null;
    });
    console.log("Telegram API Response:", responseBody);

    if (!res.ok || !responseBody?.ok) {
      console.error("Telegram sendMessage failed:", responseBody);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Telegram sendMessage error:", err);
    return false;
  }
}

async function fileToBase64(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return buffer.toString("base64");
}

// Sends the email via Resend. Best-effort — a failure here is logged and
// reported back to the caller as `resendOk: false`, but never throws and
// never fails the overall request (Telegram is the channel that has to
// work; this one doesn't).
async function sendEmailViaResend(
  fields: ParsedFields,
  subject: string,
  photo: File | null
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "Resend not configured: set RESEND_API_KEY in .env.local (see .env.local.example)."
    );
    return false;
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || RESEND_SANDBOX_FROM;

  const payload: Record<string, unknown> = {
    from: fromAddress, // Never the customer's input — see top-of-file comment.
    to: [business.email],
    subject,
    html: buildEmailHtml(fields),
  };

  if (fields.email && isValidEmail(fields.email)) {
    payload.reply_to = fields.email;
  }

  if (photo && photo.size > 0) {
    if (photo.size > MAX_PHOTO_BYTES) {
      console.error(
        `Resend: photo attachment (${photo.size} bytes) exceeds the ${MAX_PHOTO_BYTES}-byte cap — sending the email without it.`
      );
    } else if (photo.type && !ALLOWED_PHOTO_TYPES.has(photo.type)) {
      console.error(`Resend: photo attachment has disallowed type "${photo.type}" — sending the email without it.`);
    } else {
      payload.attachments = [
        {
          filename: photo.name || "photo.jpg",
          content: await fileToBase64(photo),
        },
      ];
    }
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => null);
    console.log("Resend API response:", { httpStatus: res.status, ok: res.ok, body });

    if (!res.ok) {
      console.error("Resend send failed:", body);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send error:", err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      console.error(`Rate limit hit for ${clientIp} on /api/quote.`);
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (err) {
      console.error("Failed to parse quote form submission:", err);
      return NextResponse.json(
        { success: false, message: "Invalid form submission." },
        { status: 400 }
      );
    }

    // Honeypot: a real visitor never fills this hidden field in. Treat a
    // non-empty value as spam and short-circuit before touching Telegram
    // or Resend at all, but still report success so a bot doesn't learn
    // anything from the response.
    if (readField(formData, "botcheck")) {
      return NextResponse.json({ success: true });
    }

    const name = readField(formData, "name");
    const phone = readField(formData, "phone");

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required." },
        { status: 400 }
      );
    }

    // A real phone number has at least a few digits in it; this catches
    // junk/spam submissions without being strict about format (customers
    // type phone numbers in all kinds of ways).
    if (phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    const photoEntry = formData.get("attachment");
    const photo = photoEntry instanceof File && photoEntry.size > 0 ? photoEntry : null;

    const fields: ParsedFields = {
      name,
      phone,
      email: readField(formData, "email"),
      zip: readField(formData, "zip_code"),
      serviceLabel: readField(formData, "service_needed"),
      notes: readField(formData, "message"),
      hasPhoto: photo !== null,
    };

    const tooLongField = findFieldTooLong(fields);
    if (tooLongField) {
      return NextResponse.json(
        { success: false, message: `The ${tooLongField} field is too long.` },
        { status: 400 }
      );
    }

    // --- Telegram credentials: fetched and validated explicitly here ---
    // Missing credentials fail the whole request (see top-of-file
    // comment for the trade-off this implies).
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    console.log("[Telegram] env check:", {
      TELEGRAM_BOT_TOKEN: botToken ? `present (${botToken.length} chars)` : "undefined",
      TELEGRAM_CHAT_ID: chatId ? chatId : "undefined",
    });
    if (!botToken || !chatId) {
      console.error(
        "Missing Telegram credentials: TELEGRAM_BOT_TOKEN and/or TELEGRAM_CHAT_ID is undefined in this " +
          "environment. If it's set in .env.local but this is a Vercel deployment, .env.local never reaches " +
          "Vercel — add both in Project Settings → Environment Variables (or `vercel env add`) and redeploy."
      );
      return NextResponse.json(
        { success: false, error: "Missing Telegram credentials" },
        { status: 500 }
      );
    }
    // ---------------------------------------------------------------------

    const subject = readField(formData, "subject") || `New quote request from ${name} — ${business.name}`;

    const [telegramOk, resendOk] = await Promise.all([
      notifyTelegram(botToken, chatId, fields),
      sendEmailViaResend(fields, subject, photo),
    ]);

    if (!telegramOk) {
      console.error(`Telegram alert failed for quote request from ${name} (${phone}) — see the API response logged above.`);
    }
    if (!resendOk) {
      console.error(`Resend email failed or is unconfigured for quote request from ${name} (${phone}).`);
    }

    return NextResponse.json({ success: true, telegramOk, resendOk });
  } catch (err) {
    console.error("Unexpected error handling quote request:", err);
    return NextResponse.json(
      { success: false, error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
