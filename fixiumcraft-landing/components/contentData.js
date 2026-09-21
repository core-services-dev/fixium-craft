// contentData.js
//
// Single source of truth for all copy, metadata, service info, and contact
// details used on the landing page. Keeping this separate from the UI means:
//   - Non-devs (or a future CMS) can update copy without touching JSX.
//   - The same object shape can be reused by a mobile app or API route.
//   - A/B testing headlines or swapping service areas is a one-file change.
//
// To wire this up to a real CMS/API later, replace the static export below
// with a fetch() call that resolves to the same shape (e.g. in a Next.js
// server component or getStaticProps-style loader).

export const business = {
  name: "Fixium Craft",
  legalName: "Fixium Craft LLC",
  tagline: "Furniture Assembly & Home Repairs, Done Right",
  phoneDisplay: "(929)780-3017",
  phoneHref: "tel:+19297803017",
  // E.164-style, hyphenated form for structured data (schema.org
  // LocalBusiness.telephone) — keep in sync with phoneHref/phoneDisplay
  // above if the number ever changes.
  phoneE164: "+1-929-780-3017",
  smsHref: "sms:+19297803017",
  whatsappHref:
    "https://wa.me/19297803017?text=Hi%20Fixium%20Craft%2C%20I'd%20like%20a%20quote%20for%20a%20job.",
  email: "fixiumcraft@gmail.com",
  serviceArea: "Pittsburgh, PA & Surrounding Areas",
  hours: "Mon–Sun, 8am–8pm",
  address: {
    city: "Pittsburgh",
    state: "PA",
  },
};

export const seo = {
  title: "IKEA Furniture Assembly & Handyman Services in Pittsburgh | Fixium Craft",
  description:
    "Expert IKEA furniture assembly, TV wall mounting, and minor home repairs in Pittsburgh & surrounding areas. Flat-rate pricing & same-day slots. Get a free quote today!",
  keywords: [
    "furniture assembly Pittsburgh",
    "IKEA assembly service",
    "TV wall mounting Pittsburgh",
    "handyman near me",
    "flat pack furniture assembly",
    "small home repairs Pittsburgh",
  ],
  // This is the live, currently-deployed URL (verified reachable) — swap
  // to the custom domain here (and nowhere else) once fixiumcraft.com is
  // actually pointed at this deployment.
  canonicalUrl: "https://fixium-craft.vercel.app/",
  ogImage: "/og-image.jpg",
};

// JSON-LD structured data (schema.org), rendered as a <script
// type="application/ld+json"> in app/page.tsx. Using HomeAndConstructionBusiness
// (a LocalBusiness subtype) rather than the generic LocalBusiness — it's the
// more specific, still-valid type for a repair/assembly/handyman service, and
// Google's structured-data guidelines accept any type in the LocalBusiness
// hierarchy. No streetAddress is included on purpose: this is a service-area
// business with no public storefront, so only city/state + areaServed are
// given — a common, accepted pattern for this kind of listing.
//
// openingHoursSpecification below is a *structured* re-statement of
// business.hours ("Mon–Sat, 8am–7pm") — schema.org needs actual day/time
// values, not the free-text string, so if business.hours ever changes,
// update dayOfWeek/opens/closes here too or the two will drift apart.
export const localBusinessSchema = {
  "@context": "https://schema.org",
  // HandymanService is a subtype of HomeAndConstructionBusiness (itself a
  // LocalBusiness subtype) — the most specific still-valid schema.org type
  // for this business, so it inherits every HomeAndConstructionBusiness/
  // LocalBusiness property below while describing the business precisely.
  "@type": "HandymanService",
  name: business.name,
  legalName: business.legalName,
  description: seo.description,
  url: seo.canonicalUrl,
  telephone: business.phoneE164,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    addressCountry: "US",
  },
  areaServed: {
    "@type": "Place",
    name: business.serviceArea,
  },
  // Structured re-statement of business.hours ("Mon–Sun, 8am–8pm") — keep
  // the two in sync if hours ever change (see the comment on business.hours).
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "20:00",
  },
  priceRange: "$$",
};

export const trustBadges = [
  { id: "insured", label: "Fully Insured" },
  { id: "pricing", label: "Upfront Pricing" },
  { id: "sameday", label: "Same-Day Service" },
];

export const hero = {
  eyebrow: `Serving ${business.serviceArea}`,
  headline: "Get Your Weekend Back — We'll Build It For You.",
  subheadline:
    "IKEA assembly, TV mounting, and home repairs with flat-rate pricing and same-day slots — done right the first time.",
  primaryCta: { label: "Get My Instant Quote", action: "form" },
  secondaryCtas: [
    { label: "Call Now", href: business.phoneHref, type: "call" },
    { label: "WhatsApp Us", href: business.whatsappHref, type: "whatsapp" },
    { label: "Text a Photo", href: business.smsHref, type: "sms" },
  ],
  trustBadges,
};

export const painPoints = {
  heading: "The Headaches We Take Off Your Plate",
  subheading: "We handle the part of home projects nobody actually enjoys.",
  items: [
    {
      id: "manuals",
      problem: "Confusing manuals & missing parts",
      solution:
        "Our techs assemble hundreds of IKEA and flat-pack pieces a year — they know the shortcuts and spot missing hardware before it becomes your problem.",
    },
    {
      id: "time",
      problem: "Hours stuck sorting hardware and reading instructions",
      solution:
        "Most assemblies and mounts are done in under 2 hours. Book a window, we show up, you go live your life.",
    },
    {
      id: "quality",
      problem: "Wobbly furniture or a TV that isn't level",
      solution:
        "Every job is checked for stability, level, and finish before we leave — plus we anchor to studs, not just drywall.",
    },
    {
      id: "trust",
      problem: "Letting a stranger into your home",
      solution:
        "Background-checked, fully insured technicians with upfront pricing — no surprise fees, no guesswork.",
    },
  ],
};

// Each service now carries an `image` path in addition to its icon — see
// public/services/README (or the comment above `projectsGallery`) for the
// same "drop a photo in, reference it here" pattern. Photos live in
// `public/services/`.
export const services = [
  {
    id: "assembly",
    title: "Furniture Assembly",
    icon: "assembly",
    image: "/services/furniture-assembly.jpg",
    alt: "IKEA and flat-pack furniture assembly service in Pittsburgh, PA",
    description:
      "Beds, wardrobes, desks, shelving, office furniture — if it comes in a box, we build it fast, sturdy, and level. No leftover screws, no wobble.",
    features: [
      "IKEA, Wayfair, Amazon & all major brands",
      "Bedroom, office & living room sets",
      "Old furniture disassembly & haul-away available",
    ],
    startingPrice: "Starting at $59",
  },
  {
    id: "mounting",
    title: "TV & Wall Mounting",
    icon: "mounting",
    image: "/services/tv-wall-mounting.jpg",
    alt: "TV wall mounting and shelf installation service in Pittsburgh, PA",
    description:
      "Stud-anchored TV, shelf, and artwork mounting with clean cord concealment — hung right the first time, no drywall guesswork.",
    features: [
      "Fixed, tilting & full-motion TV mounts",
      "Cable & wire concealment",
      "Shelves, mirrors & artwork mounting too",
    ],
    startingPrice: "Starting at $89",
  },
  {
    id: "repairs",
    title: "Minor Home Repairs",
    icon: "repairs",
    image: "/services/minor-home-repairs.jpg",
    alt: "Minor home repair and cabinet hinge fix service in Pittsburgh, PA",
    description:
      "Sticking cabinet hinges, doors that won't latch, loose drawers — the small fixes on your list that keep getting pushed back, done in one visit.",
    features: [
      "Cabinet & drawer hinge adjustments",
      "Door alignment & hardware fixes",
      "General furniture repair & childproofing",
    ],
    startingPrice: "Starting at $49",
  },
  {
    id: "installation",
    title: "Window AC & Appliance Installation",
    icon: "ac",
    image: "/services/installation-services.jpg",
    alt: "Window AC unit and appliance installation service in Pittsburgh, PA",
    description:
      "Seasonal window AC units, heavy wall fixtures, and curtain rods installed secure and level — no drafts, no pulled-out anchors.",
    features: [
      "Window AC units, mounted & sealed",
      "Heavy fixtures anchored to studs",
      "Curtain rods & blinds, hung straight",
    ],
    startingPrice: "Starting at $69",
  },
];

// Heading/subheading for the Services section (kept in contentData, not
// hardcoded in JSX, so all page copy lives in one place — see the file
// header comment).
export const servicesSection = {
  heading: "What We Do",
  subheading: "Four services, one call away — all backed by the same guarantee.",
};

export const process = {
  heading: "Three Steps to Done",
  subheading: "No back-and-forth, no waiting around for a call back.",
  steps: [
    {
      step: 1,
      title: "Send Details & Photos",
      description:
        "Text, WhatsApp, or fill out our quick form with what you need done and a photo or two.",
    },
    {
      step: 2,
      title: "Get an Instant Quote",
      description:
        "We text back a firm price based on what you send — no in-home estimate required for most jobs.",
    },
    {
      step: 3,
      title: "Job Completed",
      description:
        "Pick a time that works, we show up on time and finish the job — clean, sturdy, done right.",
    },
  ],
};

// Quote-form submission delivery.
//
// The form posts to our own Next.js Route Handler (`app/api/quote/route.ts`)
// instead of calling a third-party API directly from the browser. That
// route fans the lead out to two channels:
//   1. Telegram — an instant alert via the Telegram Bot API
//      (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID). This is the main, reliable
//      channel — the route fails the whole request if these aren't set.
//   2. Resend (https://resend.com) — emails the lead to the business inbox
//      (RESEND_API_KEY, optionally RESEND_FROM_EMAIL). Best-effort: if it's
//      down or unconfigured, the request still succeeds off the back of
//      Telegram alone, since email deliverability is the more fragile of
//      the two by nature (sender reputation, spam filters, domain
//      verification).
// See `.env.local.example` for all env vars, including why the `from`
// address is never the customer's own email (that's exactly the kind of
// thing that gets a sending domain flagged as spam).
export const formService = {
  provider: "resend",
  apiEndpoint: "/api/quote",
  telegramEnvVars: { token: "TELEGRAM_BOT_TOKEN", chatId: "TELEGRAM_CHAT_ID" },
  resendEnvVars: { apiKey: "RESEND_API_KEY", fromEmail: "RESEND_FROM_EMAIL" },
  subject: (customerName) =>
    `New quote request from ${customerName || "website visitor"} — ${business.name}`,
};

export const quoteForm = {
  heading: "Get Your Instant Quote",
  subheading:
    "Tell us what you need — most customers hear back within the hour.",
  fields: {
    name: { label: "Full Name", placeholder: "Jane Smith", required: true },
    phone: {
      label: "Phone Number",
      placeholder: "(412) 555-0100",
      required: true,
    },
    email: {
      label: "Email (optional)",
      placeholder: "jane@example.com",
      required: false,
      helpText: "So we can reply directly if we need more details.",
    },
    zip: { label: "ZIP Code", placeholder: "15222", required: true },
    // Multi-select — a job is often more than one service at once (e.g. a
    // TV mount plus a couple of shelves), so this holds an array of
    // selected values rather than a single string. `errorMessage` shows
    // under the pill group when the form is submitted with none selected.
    services: {
      label: "Services Needed",
      helpText: "Select all that apply.",
      required: true,
      errorMessage: "Please select at least one service.",
      options: [
        { value: "assembly", label: "Furniture Assembly" },
        { value: "mounting", label: "TV & Wall Mounting" },
        { value: "repairs", label: "Minor Home Repairs" },
        { value: "installation", label: "Window AC & Appliance Installation" },
        { value: "other", label: "Something Else" },
      ],
    },
    photo: {
      label: "Upload a Photo (optional)",
      helpText: "A quick photo helps us quote accurately the first time.",
    },
    notes: {
      label: "Anything else we should know?",
      placeholder: "e.g. 2 IKEA PAX wardrobes, need mounted TV above fireplace...",
    },
  },
  submitLabel: "Request My Quote",
  successMessage:
    "Thanks! We've got your request and will text you a quote shortly.",
  errorMessage:
    "Something went wrong sending your request. Please call or WhatsApp us instead — we don't want to miss you.",
  disclaimer: "By submitting, you agree to be contacted about your quote via call, text, or WhatsApp.",
};

// Recent Projects / Services Gallery.
//
// PLACEHOLDER VISUALS — like `testimonials` below, this is a brand-new
// business without a photo library yet, so each card renders a styled
// icon graphic (built from the same inline-SVG icons as the rest of the
// page) rather than a real job photo. That keeps the gallery honest (no
// stock photo standing in for a "recent project" that didn't happen) and
// dependency-free (no external image host to go down or rate-limit).
// Swap in real completed-job photos as they come in: drop each file into
// `public/gallery/`, add an `image: "/gallery/<file>.jpg"` field here, and
// have the Gallery component render a `next/image` when present, falling
// back to the icon graphic otherwise.
export const projectsGallery = {
  heading: "Recent Projects",
  subheading: "A look at the kind of work we handle, week in and week out.",
  items: [
    {
      id: "bed-frame",
      title: "Modern Bed Frame Assembly",
      category: "Furniture Assembly",
      icon: "assembly",
      description:
        "Platform and storage bed frames built square, level, and silent — no wobble, no leftover hardware.",
    },
    {
      id: "wardrobe",
      title: "Wardrobe & Closet System Assembly",
      category: "Furniture Assembly",
      icon: "wardrobe",
      description:
        "IKEA-style wardrobes and closet systems assembled and anchored, with doors and drawers aligned and running smoothly.",
    },
    {
      id: "ac-install",
      title: "Window AC Unit Installation",
      category: "Home Repairs",
      icon: "ac",
      description:
        "Window air conditioners mounted secure and sealed, with proper support bracketing and no drafts around the frame.",
    },
    {
      id: "tv-mounting",
      title: "TV Wall Mounting & Shelving",
      category: "Mounting & Repairs",
      icon: "mounting",
      description:
        "TVs, shelves, and fixtures mounted level and stud-anchored, with cables concealed for a clean finish.",
    },
  ],
};

// Heading for the Guarantees / trust section (kept in contentData, not
// hardcoded in JSX — see the file header comment).
export const guaranteesSection = {
  heading: "Why Homeowners Trust Us",
};

export const guarantees = [
  {
    id: "guarantee",
    title: "Satisfaction Guaranteed",
    description: "Not happy with the job? We'll make it right at no extra cost.",
  },
  {
    id: "pricing",
    title: "Transparent Pricing",
    description: "What we quote is exactly what you pay — no change orders, no last-minute add-ons.",
  },
  {
    id: "insured",
    title: "Licensed & Insured",
    description: "Every technician is background-checked and fully insured.",
  },
];

// PLACEHOLDER CONTENT — these are illustrative sample reviews, not real
// customers. Swap these for genuine customer testimonials once you have
// them; the FTC's 2024 rule against fake/fabricated reviews means these
// shouldn't go live as-is once the business has real customer feedback.
// Heading for the Testimonials section (kept in contentData, not hardcoded
// in JSX — see the file header comment).
export const testimonialsSection = {
  heading: "What Customers Are Saying",
};

export const testimonials = [
  {
    id: 1,
    name: "Rachel M.",
    location: "Shadyside, PA",
    rating: 5,
    text: "Assembled two IKEA wardrobes and a bed frame in under two hours. Way better than my last attempt (which ended with extra screws and a wobbly shelf).",
  },
  {
    id: 2,
    name: "David K.",
    location: "Squirrel Hill, PA",
    rating: 5,
    text: "Mounted our 65\" TV perfectly level with all the cables hidden. Quoted me a flat price over text before they even showed up — no surprises.",
  },
  {
    id: 3,
    name: "Sarah B.",
    location: "Lawrenceville, PA",
    rating: 5,
    text: "Fixed a cabinet door, hung three shelves, and put together a desk — all in one visit. Fast, professional, and my house feels put together again.",
  },
];

// Heading for the FAQ section (kept in contentData, not hardcoded in JSX —
// see the file header comment).
export const faqSection = {
  heading: "Frequently Asked Questions",
};

export const faq = [
  {
    id: "pricing",
    question: "How does pricing work?",
    answer:
      "We give flat-rate, upfront quotes based on the details and photos you send us — no hidden fees or hourly surprises. Most quotes are sent within an hour.",
  },
  {
    id: "same-day",
    question: "Can you come same-day?",
    answer:
      "Same-day and next-day appointments are usually available. Text us your details and we'll confirm the soonest opening near you.",
  },
  {
    id: "tools",
    question: "Do I need to provide any tools or hardware?",
    answer:
      "No — our technicians bring all necessary tools. If your furniture is missing hardware, we carry common replacement parts too.",
  },
  {
    id: "brands",
    question: "What furniture brands do you assemble?",
    answer:
      "IKEA, Wayfair, Amazon, Target, Ashley, and pretty much any flat-pack or ready-to-assemble furniture. If it comes in a box, we can build it.",
  },
  {
    id: "area",
    question: "What areas do you service?",
    answer: `We currently serve ${business.serviceArea}. Send us your ZIP code and we'll confirm availability right away.`,
  },
  {
    id: "insurance",
    question: "Are you insured?",
    answer:
      "Yes — we're fully licensed and insured, and every technician is background-checked before joining the team.",
  },
];

export const footer = {
  about: `${business.name} provides fast, reliable furniture assembly, TV mounting, and minor home repair services across the Pittsburgh area.`,
  links: [
    { label: "Services", href: "#services" },
    { label: "Recent Projects", href: "#gallery" },
    { label: "How It Works", href: "#process" },
    { label: "Reviews", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Get a Quote", href: "#quote" },
  ],
  copyright: `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`,
};

// Grouped default export for convenience (e.g. `import content from './contentData'`)
const contentData = {
  business,
  seo,
  localBusinessSchema,
  trustBadges,
  hero,
  painPoints,
  services,
  servicesSection,
  projectsGallery,
  process,
  formService,
  quoteForm,
  guarantees,
  guaranteesSection,
  testimonials,
  testimonialsSection,
  faq,
  faqSection,
  footer,
};

export default contentData;
