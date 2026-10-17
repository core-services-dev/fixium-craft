"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { business, formService } from "./contentData";
import { trackEvent } from "./analytics";

// ExpertHelpForm.tsx
//
// Small lead form for the bottom of a guide: name, phone, what's going on,
// optional photo. Posts the same multipart payload as the homepage quote
// form to /api/quote (Telegram alert + email), so no new endpoint, env var
// or server code is needed. The only client component on the guide page;
// everything around it stays server-rendered.

const MAX_PHOTO_BYTES = 4 * 1024 * 1024; // matches MAX_PHOTO_BYTES in app/api/quote/route.ts
const MAX_DESCRIPTION = 1000; // matches MAX_FIELD_LENGTHS.notes on the server

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  /** Guide title, sent with the lead so we know what the visitor was reading. */
  guideTitle: string;
  /** Service this guide maps to, if any, e.g. "TV Mounting & Wall Hanging". */
  serviceLabel?: string;
};

const FIELD =
  "mt-1.5 block w-full rounded-lg border border-slate-600 bg-slate-800 px-3.5 py-3 text-base text-white placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40";
const LABEL = "block text-sm font-medium text-slate-100";

export default function ExpertHelpForm({ guideTitle, serviceLabel }: Props) {
  const uid = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState("");

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPhotoError("");
    if (file && !file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file.");
      e.target.value = "";
      setPhoto(null);
      return;
    }
    if (file && file.size > MAX_PHOTO_BYTES) {
      setPhotoError("That photo is over 4 MB. Please choose a smaller one.");
      e.target.value = "";
      setPhoto(null);
      return;
    }
    setPhoto(file);
  }

  function clearPhoto() {
    setPhoto(null);
    setPhotoError("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();

    setStatus("submitting");
    try {
      const body = new FormData();
      body.append("subject", formService.subject(name));
      body.append("from_name", business.name);
      body.append("name", name);
      body.append("phone", String(data.get("phone") ?? "").trim());
      body.append(
        "service_needed",
        `${serviceLabel ?? "Expert help"} (from guide: ${guideTitle})`.slice(0, 250)
      );
      body.append("message", description);
      body.append("preferred_contact_method", "text");
      body.append("botcheck", String(data.get("botcheck") ?? "")); // honeypot, must stay empty
      if (photo) body.append("attachment", photo);

      const res = await fetch(formService.apiEndpoint, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      const result = await res.json().catch(() => null);
      if (res.ok && result?.success) {
        const params = {
          source: "guide",
          page: window.location.pathname,
          has_photo: Boolean(photo),
        };
        trackEvent("guide_lead_submit", params);
        trackEvent("generate_lead", params);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 text-center">
        <p className="text-lg font-semibold text-white">Thanks, we got it.</p>
        <p className="mt-2 text-sm text-slate-300">
          We&apos;ll text you a flat-rate quote shortly. Need it sooner? Call{" "}
          <a href={business.phoneHref} className="font-semibold text-amber-300 underline underline-offset-2">
            {business.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 sm:p-6"
      aria-describedby={`${uid}-hint`}
    >
      <p id={`${uid}-hint`} className="text-sm text-slate-300">
        Tell us what you&apos;re dealing with and add a photo if you can. We&apos;ll text back a flat-rate quote.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={LABEL}>
            Name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Jane Smith"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={LABEL}>
            Phone
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            required
            maxLength={30}
            autoComplete="tel"
            placeholder="(412) 555-0100"
            className={FIELD}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-desc`} className={LABEL}>
          What do you need help with?
        </label>
        <textarea
          id={`${uid}-desc`}
          name="description"
          required
          rows={4}
          maxLength={MAX_DESCRIPTION}
          placeholder="e.g. A 3 ft hole in the bedroom wall, needs patching and paint"
          className={FIELD}
        />
      </div>

      <div>
        <label htmlFor={`${uid}-photo`} className={LABEL}>
          Photo <span className="font-normal text-slate-300">(optional, but gets a faster quote)</span>
        </label>
        <input
          ref={fileRef}
          id={`${uid}-photo`}
          type="file"
          accept="image/*"
          onChange={onPhotoChange}
          aria-describedby={photoError ? `${uid}-photo-error` : undefined}
          className="mt-1.5 block w-full cursor-pointer rounded-lg border border-dashed border-slate-600 bg-slate-800 text-sm text-slate-200 file:mr-3 file:cursor-pointer file:border-0 file:bg-slate-700 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-600"
        />
        {photo && (
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-200">
            <span className="truncate">{photo.name}</span>
            <button
              type="button"
              onClick={clearPhoto}
              className="shrink-0 font-semibold text-amber-300 underline underline-offset-2 hover:text-amber-200"
            >
              Remove
            </button>
          </p>
        )}
        {photoError && (
          <p id={`${uid}-photo-error`} role="alert" className="mt-2 text-sm font-medium text-rose-300">
            {photoError}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and screen readers, bots tend to fill it. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-amber-500 px-6 py-3.5 text-base font-semibold text-slate-950 shadow-lg shadow-amber-900/30 transition hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Get My Free Quote"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-rose-300">
          Something went wrong sending that. Please call or text {business.phoneDisplay} instead.
        </p>
      )}

      <p className="text-xs text-slate-300">
        We only use your number to text you the quote. No sales calls.
      </p>
    </form>
  );
}
