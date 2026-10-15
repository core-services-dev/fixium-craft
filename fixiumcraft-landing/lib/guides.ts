import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// lib/guides.ts
//
// Content layer for the /guides knowledge base. Every guide is one Markdown
// file in content/guides/<slug>.md — drop in a new file and it shows up on
// the index, gets its own page, lands in the sitemap and is linked from the
// matching service page. No code changes needed.
//
// File format:
//
//   ---
//   title: "Full H1 of the article"
//   metaTitle: "Shorter <title> tag text (the site name is appended)"
//   description: "Meta description (about 150 characters)"
//   summary: "One or two sentences for the guide cards"
//   category: locksmith            # a key of guideCategories below
//   date: 2026-10-15
//   updated: 2026-10-15            # optional, defaults to date
//   readTime: 8                    # optional, otherwise computed from word count
//   totalTime: PT15M               # optional, ISO 8601 duration for HowTo schema
//   service: locksmith             # optional, overrides the category's service page
//   ctaTitle: "..."                # optional, bottom call-to-action box
//   ctaText: "..."
//   ---
//
//   Intro paragraphs...
//
//   ## Safety First: ...           -> red safety callout (a "> - item" list)
//   ## Tools and Materials ...     -> tools card (### Tools / ### Materials lists)
//   ## Step-by-Step ...            -> numbered steps (### Step 1: Name)
//   ## Frequently Asked Questions  -> collapsible FAQ (### Question, answer text)
//   ## Anything else               -> regular article section
//
// HowTo + FAQPage JSON-LD is generated from those same sections, so the
// schema can never drift from the visible text.

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export const guideCategories: Record<string, { label: string; serviceSlug: string }> = {
  locksmith: { label: "Locksmith", serviceSlug: "locksmith" },
  "furniture-assembly": { label: "Furniture Assembly", serviceSlug: "furniture-assembly" },
  handyman: { label: "Handyman", serviceSlug: "handyman-repairs" },
  "tv-mounting": { label: "TV Mounting", serviceSlug: "tv-mounting" },
};

export function getCategory(slug: string) {
  const known = guideCategories[slug];
  if (known) return known;
  const label = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return { label, serviceSlug: "" };
}

export type GuideSection =
  | { kind: "safety"; id: string; title: string; items: string[] }
  | {
      kind: "tools";
      id: string;
      title: string;
      groups: { title: string; items: string[] }[];
      time?: string;
    }
  | {
      kind: "steps";
      id: string;
      title: string;
      steps: { n: number; id: string; title: string; html: string }[];
    }
  | {
      kind: "faq";
      id: string;
      title: string;
      items: { question: string; answerHtml: string }[];
    }
  | { kind: "prose"; id: string; title: string; html: string };

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  summary: string;
  category: string;
  categoryLabel: string;
  serviceSlug: string;
  date: string;
  updated: string;
  readTime: number;
  totalTime?: string;
  ctaTitle?: string;
  ctaText?: string;
  introHtml: string;
  sections: GuideSection[];
  // Plain-text versions used for JSON-LD.
  tools: string[];
  supplies: string[];
  howToSteps: { name: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export type GuideSummary = Pick<
  Guide,
  "slug" | "title" | "summary" | "category" | "categoryLabel" | "readTime" | "date" | "updated"
>;

/* -------------------------------------------------------------------------- */
/*  Parsing helpers                                                           */
/* -------------------------------------------------------------------------- */

function parseFrontmatter(raw: string, file: string) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`Guide "${file}" is missing a frontmatter block.`);
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"') && val.length >= 2) ||
      (val.startsWith("'") && val.endsWith("'") && val.length >= 2)
    ) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body: m[2] };
}

function html(md: string): string {
  return decorate(marked.parse(md, { gfm: true, async: false }) as string);
}

function inline(md: string): string {
  return marked.parseInline(md, { gfm: true, async: false }) as string;
}

// Blockquotes that start with a bold "Pro tip:" / "Safety:" label become
// styled callouts (see .guide-prose in app/globals.css).
function decorate(out: string): string {
  return out
    .replace(
      /<blockquote>(\s*<p><strong>\s*(?:Pro[\s-]?tips?|Tips?)\b)/gi,
      '<blockquote class="callout callout-tip">$1',
    )
    .replace(
      /<blockquote>(\s*<p><strong>\s*(?:Safety|Warning|Caution)\b)/gi,
      '<blockquote class="callout callout-safety">$1',
    );
}

export function plainText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/[*_`]/g, "")
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function listItems(md: string): string[] {
  return md
    .split("\n")
    .map((l) => l.match(/^\s*[-*]\s+(.*)$/))
    .filter((m): m is RegExpMatchArray => !!m)
    .map((m) => m[1].trim());
}

function splitH3(md: string): { title: string; body: string }[] {
  const parts: { title: string; lines: string[] }[] = [];
  let cur: { title: string; lines: string[] } = { title: "", lines: [] };
  for (const line of md.split("\n")) {
    const m = line.match(/^###\s+(.*)$/);
    if (m) {
      parts.push(cur);
      cur = { title: m[1].trim(), lines: [] };
    } else {
      cur.lines.push(line);
    }
  }
  parts.push(cur);
  return parts
    .map((p) => ({ title: p.title, body: p.lines.join("\n").trim() }))
    .filter((p) => p.title || p.body);
}

function splitSections(body: string) {
  const intro: string[] = [];
  const sections: { title: string; lines: string[] }[] = [];
  let cur: { title: string; lines: string[] } | null = null;
  for (const line of body.split("\n")) {
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      cur = { title: h2[1].trim(), lines: [] };
      sections.push(cur);
    } else if (/^#\s+/.test(line) && !cur) {
      continue; // the title lives in frontmatter
    } else if (cur) {
      cur.lines.push(line);
    } else {
      intro.push(line);
    }
  }
  return {
    intro: intro.join("\n").trim(),
    sections: sections.map((s) => ({ title: s.title, body: s.lines.join("\n").trim() })),
  };
}

function formatKind(title: string) {
  if (/^safety/i.test(title)) return "safety" as const;
  if (/tools\s*(and|&)\s*materials/i.test(title)) return "tools" as const;
  if (/step-by-step|instructions|^steps/i.test(title)) return "steps" as const;
  if (/frequently asked|^faq/i.test(title)) return "faq" as const;
  return "prose" as const;
}

function parseGuide(slug: string, raw: string): Guide {
  const { data, body } = parseFrontmatter(raw, slug);
  for (const key of ["title", "description", "category", "date"]) {
    if (!data[key]) throw new Error(`Guide "${slug}" is missing "${key}" in its frontmatter.`);
  }

  const { intro, sections: rawSections } = splitSections(body);
  const sections: GuideSection[] = [];
  let tools: string[] = [];
  let supplies: string[] = [];
  const howToSteps: { name: string; text: string }[] = [];
  const faqs: { question: string; answer: string }[] = [];

  for (const s of rawSections) {
    const kind = formatKind(s.title);

    if (kind === "safety") {
      const stripped = s.body.replace(/^\s*>\s?/gm, "");
      const items = listItems(stripped).map(inline);
      sections.push({
        kind,
        id: "safety",
        title: s.title,
        items: items.length ? items : [inline(stripped)],
      });
    } else if (kind === "tools") {
      const time = s.body.match(/\*\*Estimated time:\*\*\s*(.+)/i)?.[1]?.trim();
      const groups = splitH3(s.body)
        .filter((g) => g.title)
        .map((g) => ({ title: g.title, items: listItems(g.body) }));
      for (const g of groups) {
        if (/tool/i.test(g.title)) tools = tools.concat(g.items.map(plainText));
        else if (/material|suppl/i.test(g.title)) supplies = supplies.concat(g.items.map(plainText));
      }
      sections.push({
        kind,
        id: "tools-materials",
        title: s.title,
        groups: groups.map((g) => ({ title: g.title, items: g.items.map(inline) })),
        time,
      });
    } else if (kind === "steps") {
      const steps = splitH3(s.body)
        .filter((p) => p.title)
        .map((p, i) => {
          const name = p.title.replace(/^Step\s+\d+\s*[:.\-–]\s*/i, "").trim();
          howToSteps.push({ name, text: plainText(p.body) });
          return { n: i + 1, id: `step-${i + 1}`, title: name, html: html(p.body) };
        });
      sections.push({ kind, id: "steps", title: s.title, steps });
    } else if (kind === "faq") {
      const items = splitH3(s.body)
        .filter((p) => p.title)
        .map((p) => {
          faqs.push({ question: p.title, answer: plainText(p.body) });
          return { question: p.title, answerHtml: html(p.body) };
        });
      sections.push({ kind, id: "faq", title: s.title, items });
    } else {
      sections.push({ kind, id: slugify(s.title), title: s.title, html: html(s.body) });
    }
  }

  const words = body.split(/\s+/).filter(Boolean).length;
  const readTime = Number(data.readTime) || Math.max(1, Math.round(words / 200));
  const cat = getCategory(data.category);

  return {
    slug,
    title: data.title,
    metaTitle: data.metaTitle || data.title,
    description: data.description,
    summary: data.summary || data.description,
    category: data.category,
    categoryLabel: cat.label,
    serviceSlug: data.service || cat.serviceSlug,
    date: data.date,
    updated: data.updated || data.date,
    readTime,
    totalTime: data.totalTime || undefined,
    ctaTitle: data.ctaTitle || undefined,
    ctaText: data.ctaText || undefined,
    introHtml: intro ? html(intro) : "",
    sections,
    tools,
    supplies,
    howToSteps,
    faqs,
  };
}

/* -------------------------------------------------------------------------- */
/*  Public API                                                                */
/* -------------------------------------------------------------------------- */

let cache: Guide[] | null = null;

export function getAllGuides(): Guide[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(GUIDES_DIR)
      .filter((f) => f.endsWith(".md") && !f.startsWith("_") && !/^readme/i.test(f));
  } catch {
    files = [];
  }
  const guides = files
    .map((f) =>
      parseGuide(f.replace(/\.md$/, ""), fs.readFileSync(path.join(GUIDES_DIR, f), "utf8")),
    )
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  cache = guides;
  return guides;
}

export function getGuide(slug: string): Guide | undefined {
  return getAllGuides().find((g) => g.slug === slug);
}

export function getGuidesForService(serviceSlug: string): Guide[] {
  return getAllGuides().filter((g) => g.serviceSlug === serviceSlug);
}

export function toSummary(g: Guide): GuideSummary {
  const { slug, title, summary, category, categoryLabel, readTime, date, updated } = g;
  return { slug, title, summary, category, categoryLabel, readTime, date, updated };
}

// Categories that currently have at least one guide, in guideCategories order
// (unknown categories go last).
export function getActiveCategories(guides: Guide[]) {
  const used = new Set(guides.map((g) => g.category));
  const known = Object.keys(guideCategories).filter((k) => used.has(k));
  const extra = [...used].filter((k) => !(k in guideCategories));
  return [...known, ...extra].map((slug) => ({ slug, label: getCategory(slug).label }));
}

export function formatGuideDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
