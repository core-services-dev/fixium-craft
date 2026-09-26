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
  // Used for schema.org `founder` in localBusinessSchema below, so
  // AI/search engines can attribute the business to an owner.
  owner: "Vadim",
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
  hours: "Mon–Sun, 7am–11pm",
  address: {
    city: "Pittsburgh",
    state: "PA",
  },
};

// Specific neighborhoods/municipalities we serve around the core Pittsburgh
// service area — used in localBusinessSchema's areaServed (below), in the
// FAQ "what areas do you service" answer, and on each dedicated
// service+location page (see `servicePages`), so both search engines and AI
// assistants see the exact coverage area, not just "Pittsburgh."
export const neighborhoods = [
  "Mt. Lebanon",
  "Bethel Park",
  "Upper St. Clair",
  "Dormont",
  "Carnegie",
  "Robinson Township",
];

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
  canonicalUrl: "https://fixium-craft.vercel.app",
  ogImage: "/og-image.jpg",
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
    // Dedicated SEO page this service card links to (see servicePages
    // below and app/furniture-assembly-pittsburgh/page.tsx).
    learnMoreHref: "/furniture-assembly-pittsburgh",
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
    learnMoreHref: "/tv-mounting-pittsburgh",
  },
  {
    id: "repairs",
    title: "Minor Home Repairs",
    icon: "repairs",
    image: "/services/minor-home-repairs.jpg",
    alt: "Minor home repair, cabinet hinge, and door lock adjustment service in Pittsburgh, PA",
    description:
      "Sticking cabinet hinges, doors that won't latch, loose drawers, and door lock or handle adjustments — the small fixes on your list that keep getting pushed back, done in one visit.",
    features: [
      "Cabinet & drawer hinge adjustments",
      "Door alignment, lock & handle adjustments or replacement",
      "General furniture repair & childproofing",
    ],
    startingPrice: "Starting at $49",
    // Links to the direct-match dedicated page; door-lock-repair-pittsburgh
    // is a second, differently-angled page for the same underlying
    // service, reachable from the footer instead (see footer.servicePageLinks).
    learnMoreHref: "/minor-home-repairs-pittsburgh",
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
    // No dedicated page for this one — only the 5 URLs in servicePages
    // were requested, and this service wasn't among them.
    learnMoreHref: null,
  },
];

// Heading/subheading for the Services section (kept in contentData, not
// hardcoded in JSX, so all page copy lives in one place — see the file
// header comment).
export const servicesSection = {
  heading: "What We Do",
  subheading: "Four services, one call away — all backed by the same guarantee.",
};

// JSON-LD structured data (schema.org), rendered as a <script
// type="application/ld+json"> in app/page.tsx, and referenced by @id from
// each dedicated service+location page's own Service schema (see
// components/ServicePage.tsx) so every page resolves to the same single
// business entity instead of duplicating this whole block. Defined here,
// after `services`, because hasOfferCatalog below needs that array to
// already exist.
//
// Using HandymanService (a HomeAndConstructionBusiness/LocalBusiness
// subtype) rather than the generic LocalBusiness — the most specific,
// still-valid type for a repair/assembly/handyman service, per Google's
// structured-data guidelines. No streetAddress is included on purpose:
// this is a service-area business with no public storefront, so only
// city/state + areaServed are given — a common, accepted pattern.
//
// openingHoursSpecification below is a *structured* re-statement of
// business.hours ("Mon–Sun, 7am–11pm") — schema.org needs actual day/time
// values, not the free-text string, so if business.hours ever changes,
// update dayOfWeek/opens/closes here too or the two will drift apart.
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HandymanService",
  // Stable identifier other pages' Service schema points back to via
  // `provider: { "@id": ... }` instead of repeating this whole block.
  "@id": `${seo.canonicalUrl}/#business`,
  name: business.name,
  legalName: business.legalName,
  founder: {
    "@type": "Person",
    name: business.owner,
  },
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
  // The core city plus every specific neighborhood/municipality we serve
  // (see `neighborhoods` above) — an array of Place entries is valid
  // schema.org, and naming each one (rather than just "Pittsburgh &
  // Surrounding Areas") is what lets AI assistants and Google confidently
  // match "handyman in Mt. Lebanon" to this business.
  areaServed: [
    {
      "@type": "City",
      name: `${business.address.city}, ${business.address.state}`,
    },
    ...neighborhoods.map((name) => ({
      "@type": "Place",
      name: `${name}, ${business.address.state}`,
    })),
  ],
  // Structured re-statement of business.hours ("Mon–Sun, 7am–11pm") — keep
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
    opens: "07:00",
    closes: "23:00",
  },
  priceRange: "$$",
  // Explicit, machine-readable list of what we offer — built from the same
  // `services` array the homepage renders, so this can never list a
  // service the site doesn't actually show.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Fixium Craft Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  },
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
    answer: `We serve ${business.serviceArea}, including ${neighborhoods.join(", ")}. Send us your ZIP code and we'll confirm availability right away.`,
  },
  {
    id: "insurance",
    question: "Are you insured?",
    answer:
      "Yes — we're fully licensed and insured, and every technician is background-checked before joining the team.",
  },
];

// Content for the dedicated service+location pages under
// app/<slug>/page.tsx (rendered by components/ServicePage.tsx). Two of
// these (door-lock-repair-pittsburgh, minor-home-repairs-pittsburgh) point
// at the SAME underlying `services` entry ("repairs") rather than a
// fabricated standalone service — Fixium Craft doesn't offer separate
// locksmith or plumbing service lines, so door/lock and general repair
// content both draw from the one real "Minor Home Repairs" service, just
// with a different keyword angle and FAQ per page.
export const servicePages = [
  {
    slug: "furniture-assembly-pittsburgh",
    serviceId: "assembly",
    h1: "Furniture Assembly in Pittsburgh, PA",
    metaTitle: "Furniture Assembly Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "Fixium Craft assembles IKEA, Wayfair, and flat-pack furniture in Pittsburgh, PA and nearby neighborhoods. Flat-rate pricing, same-day slots. Get a free quote.",
    intro: [
      `Fixium Craft provides professional furniture assembly in ${business.address.city}, ${business.address.state} and surrounding neighborhoods, including ${neighborhoods.join(", ")}.`,
      "We assemble beds, wardrobes, desks, shelving, and office furniture from IKEA, Wayfair, Amazon, and other flat-pack brands — built fast, sturdy, and level, with no leftover screws.",
    ],
    faqs: [
      {
        question: "Does Fixium Craft assemble IKEA furniture in Pittsburgh?",
        answer:
          "Yes. Fixium Craft assembles IKEA, Wayfair, Amazon, and other flat-pack furniture throughout Pittsburgh, PA and surrounding areas.",
      },
      {
        question: "How much does furniture assembly cost in Pittsburgh?",
        answer:
          "Furniture assembly starts at $59, with a flat-rate quote based on the piece and any details you send us — no hourly surprises.",
      },
    ],
  },
  {
    slug: "tv-mounting-pittsburgh",
    serviceId: "mounting",
    h1: "TV Mounting in Pittsburgh, PA",
    metaTitle: "TV Wall Mounting Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "Fixium Craft mounts TVs, shelves, and artwork in Pittsburgh, PA and nearby neighborhoods. Stud-anchored, cables concealed, flat-rate pricing. Get a free quote.",
    intro: [
      `Fixium Craft provides TV wall mounting in ${business.address.city}, ${business.address.state} and surrounding neighborhoods, including ${neighborhoods.join(", ")}.`,
      "We mount TVs, shelves, mirrors, and artwork with stud-anchored hardware and clean cord concealment — hung right the first time, with no drywall guesswork.",
    ],
    faqs: [
      {
        question: "Do you mount TVs on drywall in Pittsburgh?",
        answer:
          "Yes. Fixium Craft locates and anchors into wall studs behind drywall for a secure mount, and conceals cables for a clean finish.",
      },
      {
        question: "How much does TV mounting cost in Pittsburgh?",
        answer:
          "TV wall mounting starts at $89, with a flat-rate quote confirmed before we begin the job.",
      },
    ],
  },
  {
    slug: "handyman-pittsburgh",
    serviceId: null,
    h1: "Handyman Services in Pittsburgh, PA",
    metaTitle: "Handyman Services Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "Fixium Craft is a local handyman company serving Pittsburgh, PA and surrounding neighborhoods: furniture assembly, TV mounting, minor repairs, and appliance installs.",
    intro: [
      `Fixium Craft is a local handyman company based in ${business.address.city}, ${business.address.state}, serving ${business.address.city} and surrounding neighborhoods, including ${neighborhoods.join(", ")}.`,
      "We provide furniture assembly, TV and wall mounting, minor home repairs (including door and lock adjustments), and window AC and appliance installation — all with flat-rate pricing and same-day availability.",
    ],
    faqs: [
      {
        question: "What handyman services does Fixium Craft offer in Pittsburgh?",
        answer:
          "Fixium Craft offers furniture assembly, TV and wall mounting, minor home repairs, and window AC and appliance installation throughout Pittsburgh, PA and surrounding areas.",
      },
      {
        question: "How do I book a handyman in Pittsburgh with Fixium Craft?",
        answer:
          "Send us your details and a photo by text, WhatsApp, or our quote form, and we'll text back a flat-rate quote — usually within an hour.",
      },
      {
        question: "Is Fixium Craft insured?",
        answer:
          "Yes — Fixium Craft technicians are fully insured and background-checked before joining the team.",
      },
    ],
  },
  {
    slug: "door-lock-repair-pittsburgh",
    serviceId: "repairs",
    h1: "Door & Lock Repair in Pittsburgh, PA",
    metaTitle: "Door & Lock Repair Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "Fixium Craft handles door, handle, and lock adjustments as part of our Minor Home Repairs service in Pittsburgh, PA and nearby neighborhoods. Flat-rate quotes.",
    intro: [
      `Fixium Craft handles door and lock repair in ${business.address.city}, ${business.address.state} and surrounding neighborhoods, including ${neighborhoods.join(", ")}, as part of our Minor Home Repairs service.`,
      "This covers doors that won't latch or close properly, sticking or misaligned doors, and loose or worn door handles and locks — realigned, tightened, or replaced in one visit.",
    ],
    faqs: [
      {
        question: "Does Fixium Craft fix doors that won't close or latch?",
        answer:
          "Yes. Door alignment and latch adjustments are part of our Minor Home Repairs service, available throughout Pittsburgh, PA and surrounding areas.",
      },
      {
        question: "Can Fixium Craft adjust or replace a door lock or handle?",
        answer:
          "Yes — as part of our Minor Home Repairs service we adjust and replace door handles and standard locksets. For advanced locksmith or security work, we can point you to a specialist.",
      },
    ],
  },
  {
    slug: "minor-home-repairs-pittsburgh",
    serviceId: "repairs",
    h1: "Minor Home Repairs in Pittsburgh, PA",
    metaTitle: "Minor Home Repairs Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "Fixium Craft handles minor home repairs in Pittsburgh, PA and nearby neighborhoods: cabinet hinges, door and lock adjustments, and general fixes. Flat-rate quotes.",
    intro: [
      `Fixium Craft provides minor home repairs in ${business.address.city}, ${business.address.state} and surrounding neighborhoods, including ${neighborhoods.join(", ")}.`,
      "We fix sticking cabinet hinges, doors that won't latch, loose drawers, and door lock or handle adjustments — the small fixes on your list that keep getting pushed back, done in one visit.",
    ],
    faqs: [
      {
        question: "What counts as a minor home repair for Fixium Craft?",
        answer:
          "Cabinet and drawer hinge adjustments, door alignment and hardware fixes (including locks and handles), and general furniture repair or childproofing.",
      },
      {
        question: "How much do minor home repairs cost in Pittsburgh?",
        answer:
          "Minor home repairs start at $49, with a flat-rate quote based on the details and photos you send us.",
      },
    ],
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
  // Rendered directly in LandingPage.jsx's Footer() as a small legal-links
  // row (routes to the standalone pages in app/privacy and app/terms).
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  // Internal links to the dedicated service+location pages (see
  // `servicePages` above and app/<slug>/page.tsx) — rendered in
  // LandingPage.jsx's Footer() so they're discoverable from every page,
  // not just the sitemap.
  servicePageLinks: [
    { label: "Furniture Assembly in Pittsburgh", href: "/furniture-assembly-pittsburgh" },
    { label: "TV Mounting in Pittsburgh", href: "/tv-mounting-pittsburgh" },
    { label: "Handyman Services in Pittsburgh", href: "/handyman-pittsburgh" },
    { label: "Door & Lock Repair in Pittsburgh", href: "/door-lock-repair-pittsburgh" },
    { label: "Minor Home Repairs in Pittsburgh", href: "/minor-home-repairs-pittsburgh" },
  ],
  copyright: `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`,
};

// Grouped default export for convenience (e.g. `import content from './contentData'`)
const contentData = {
  business,
  neighborhoods,
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
  servicePages,
  footer,
};

export default contentData;
