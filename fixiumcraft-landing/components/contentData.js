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

// Header nav — kept in contentData (not hardcoded in JSX) like every
// other section's copy. Five items by design, matching the simplified
// nav structure requested: the rest of the page's sections (Gallery,
// Process, Reviews, FAQ) are still reachable by scrolling, just not
// linked directly from the header anymore.
export const navSection = {
  items: [
    { label: "Home", href: "#top" },
    { label: "Services", href: "#services" },
    { label: "Service Areas", href: "#service-areas" },
    { label: "About Us", href: "#about" },
    { label: "Contact Us", href: "#quote" },
  ],
};

// About Us section (see About() in LandingPage.jsx). Short and honest —
// no fabricated years-in-business or team-size claims; it just restates
// facts already established elsewhere in this file (business.owner, the
// real guarantees) in a brand-voice "who we are" framing.
export const aboutSection = {
  heading: "Built on Craftsman-Quality Work, Not Shortcuts",
  body: [
    `${business.name} was founded by ${business.owner} to bring real craftsman-quality assembly, repair, and security installation work to ${business.address.city} homeowners and renters — the kind of job where things are level, square, and anchored right the first time, not just "good enough."`,
    "Every technician is background-checked and fully insured, every quote is flat-rate and upfront before we pick up a tool, and every job gets the same attention whether it's a single shelf or a full day of work.",
  ],
};

// Specific neighborhoods/municipalities we serve around the core Pittsburgh
// service area — used in localBusinessSchema's areaServed (below), in the
// FAQ "what areas do you service" answer, and on each dedicated
// service+location page (see `servicePages`), so both search engines and AI
// assistants see the exact coverage area, not just "Pittsburgh."
export const neighborhoods = [
  "Shadyside",
  "Squirrel Hill",
  "Lawrenceville",
  "South Side",
  "Downtown Pittsburgh",
  "Mt. Lebanon",
  "Cranberry Township",
  "Bethel Park",
  "Upper St. Clair",
  "Dormont",
  "Carnegie",
  "Robinson Township",
];

// Homepage "Service Areas" banner (see ServiceAreas() in LandingPage.jsx) —
// a visible, above-the-fold-adjacent section so visitors immediately see
// their town is covered, separate from the schema/FAQ uses of `neighborhoods`.
export const serviceAreasSection = {
  heading: "Proudly Serving Pittsburgh & the Surrounding Areas",
  subheading:
    "Wherever you are around Pittsburgh, we come to you — same-day and next-day slots available.",
  areas: [`${business.address.city}, ${business.address.state}`, ...neighborhoods],
  cta: {
    label: "Not sure we cover your area? Text us your ZIP code.",
    href: business.smsHref,
  },
  // Long-tail local-search phrases, each linking to the dedicated
  // service+location page that actually targets it (see `servicePages`
  // below) — internal links with keyword-rich anchor text, not just more
  // copy, for both traditional SEO and AI-assistant discoverability.
  popularSearches: [
    { label: "IKEA PAX assembly in Pittsburgh", href: "/furniture-assembly-pittsburgh" },
    { label: "TV wall mounting service in Mt. Lebanon", href: "/tv-mounting-pittsburgh" },
    { label: "home services in Shadyside", href: "/handyman-pittsburgh" },
  ],
};

export const seo = {
  title: "Furniture Assembly Pittsburgh, PA | Fixium Craft",
  description:
    "Professional IKEA & flat-pack furniture assembly in Pittsburgh, PA, plus TV mounting, wall hanging, lock installs & repairs. Free quote today!",
  keywords: [
    "handyman Pittsburgh PA",
    "furniture assembly Pittsburgh",
    "IKEA assembly service",
    "TV mounting Pittsburgh",
    "wall mounting services",
    "handyman near me",
    "flat pack furniture assembly",
    "home repair services Pittsburgh",
    "small home repairs Pittsburgh",
    "smart lock installation Pittsburgh",
    "residential locksmith Pittsburgh",
  ],
  // This is the live, currently-deployed URL (verified reachable) — swap
  // to the custom domain here (and nowhere else) once fixiumcraft.com is
  // actually pointed at this deployment.
  canonicalUrl: "https://fixium-craft.vercel.app",
  ogImage: "/og-image.jpg",
};

export const trustBadges = [
  { id: "pricing", label: "Upfront Flat Rates" },
  { id: "insured", label: "Fully Insured" },
  { id: "sameday", label: "Scheduled & Same-Day Slots" },
];

export const hero = {
  eyebrow: "⭐ Furniture Assembly Pros | Fully Insured",
  headline: "Professional Furniture Assembly in Pittsburgh, PA",
  subheadline: "Reliable. Precise. Clean. Prompt.",
  supportingCopy:
    "From IKEA wardrobes to office furniture — plus TV mounting, wall hanging, and small repairs while we're on site. One call, zero hassle.",
  primaryCta: { label: "Get a Quick Quote", action: "form" },
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
    emoji: "🛋️",
    image: "/services/furniture-assembly.jpg",
    alt: "IKEA and flat-pack furniture assembly service in Pittsburgh, PA",
    description:
      "Beds, wardrobes (including IKEA PAX systems), desks, shelving, office furniture — if it comes in a box, we build it fast, sturdy, and level. No leftover screws, no wobble.",
    features: [
      "IKEA PAX wardrobes & closet systems",
      "IKEA, Wayfair, Amazon & all major brands",
      "Bedroom, office & living room sets",
      "Old furniture disassembly & haul-away available",
    ],
    startingPrice: "Starting at $59",
    // Dedicated SEO page this service card links to (see servicePages
    // below and app/furniture-assembly-pittsburgh/page.tsx).
    learnMoreHref: "/furniture-assembly-pittsburgh",
    // Four H3-level sub-sections rendered by AssemblyBreakdown() in
    // LandingPage.jsx, in addition to (not replacing) the `features`
    // list above -- `features` is still read by ServicePage.tsx for the
    // dedicated /furniture-assembly-pittsburgh page, so it stays intact.
    subsections: [
      {
        title: "IKEA & Flat-Pack Assembly",
        description:
          "PAX wardrobes, beds, desks, dressers, and shelving units — any flat-pack brand, assembled fast, sturdy, and level.",
      },
      {
        title: "Move-In Disassembly & Reassembly",
        description:
          "Moving to a new place? We disassemble furniture at the old address and rebuild it at the new one, so nothing gets left behind or damaged in transit.",
      },
      {
        title: "Sliding & Hinged Wardrobe Setup",
        description:
          "Sliding-door and hinged wardrobe systems installed plumb and square, with smooth-running doors and properly aligned tracks.",
      },
      {
        title: "Office & Commercial Furniture",
        description:
          "Desks, workstations, conference tables, and shelving for home offices and small businesses — assembled on your schedule, including after-hours.",
      },
    ],
  },
  {
    id: "mounting",
    title: "TV Mounting & Cable Management",
    icon: "mounting",
    emoji: "📺",
    image: "/services/tv-wall-mounting.jpg",
    alt: "TV wall mounting service in Pittsburgh, PA",
    description:
      "Stud-anchored TV mounting in Pittsburgh with clean cable and cord concealment — hung level the first time, no drywall guesswork.",
    features: [
      "Fixed, tilting & full-motion TV mounts",
      "Cable & wire concealment behind the wall or in raceway",
      "Soundbar & media console mounting",
    ],
    startingPrice: "Starting at $89",
    learnMoreHref: "/tv-mounting-pittsburgh",
  },
  {
    id: "wallmounting",
    title: "Wall Mounting (shelves, mirrors, artwork)",
    icon: "wallmount",
    emoji: "🖼️",
    // No dedicated photo yet -- renders icon-only, same resilience
    // pattern as every other services[] entry without a real photo
    // (see ServiceCard's image-fallback comment).
    image: null,
    alt: "Wall mounting service for shelves, mirrors, and artwork in Pittsburgh, PA",
    description:
      "Wall mounting services for shelves, mirrors, artwork, and wall decor — stud-anchored and leveled, with drywall-rated hardware when a stud isn't available.",
    features: [
      "Floating & bracket shelves",
      "Mirrors, artwork & wall decor",
      "Curtain rods, coat racks & other fixtures",
    ],
    startingPrice: "Starting at $89",
    learnMoreHref: null,
  },
  {
    id: "repairs",
    title: "Home Maintenance & Repairs",
    icon: "repairs",
    emoji: "🔧",
    image: "/services/minor-home-repairs.jpg",
    alt: "Home repair service for cabinet hinges and door lock adjustments in Pittsburgh, PA",
    description:
      "Home repair services in Pittsburgh for the small fixes that keep getting pushed back — sticking cabinet hinges, doors that won't latch, loose drawers, and door lock or handle adjustments, done in one visit.",
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
    emoji: "❄️",
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
  {
    id: "locksmith",
    // Expanded from "Residential Locksmith & Door Hardware" -- this line
    // now covers commercial and automotive lockout work too, not just
    // residential installs, so the title/description/features below
    // reflect the full scope rather than just the smart-lock angle.
    title: "Lock Hardware & Door Services",
    quoteLabel: "Auto & Home Lockouts + Smart Locks",
    icon: "lock",
    emoji: "🔐",
    // Real installed-smart-lock photo (Yale touchscreen deadbolt),
    // same object-cover/aspect-[4/3] treatment as the other 4 service
    // cards -- the icon/gradient base layer + onError fallback in
    // ServiceCard still cover the rare case this file fails to load.
    image: "/images/projects/locksmith-door-hardware.jpg",
    alt: "Locksmith and door lock installation service in Pittsburgh, PA",
    description:
      "Auto & home lockouts, smart lock installs, and standard lock replacement — scheduled, same-day, and 100% upfront-priced. No surprise call-out or damage fees.",
    features: [
      "Vehicle & truck lockout service (cars, vans & commercial trucks)",
      "Home & business unlocking — non-emergency, scheduled, same-day",
      "Standard lock replacement, rekeying & deadbolts",
      "Smart lock installation & setup (Yale, Schlage, August, Google Nest, Eufy)",
      "Door realignment, strike plate tuning & handle upgrades",
    ],
    startingPrice: "Starting at $79",
    learnMoreHref: "/smart-lock-installation-pittsburgh",
  },
];

// "Upfront & Fixed Pricing" trust section — rendered directly under the
// Services grid (see PricingTrust() in LandingPage.jsx) so the flat-rate
// framing, the no-hidden-fees guarantee, and what's always included in a
// quote sit in the same breath as the real starting prices above, not
// buried further down the page. The "always included" list restates facts
// already established elsewhere in this file (qualityGuaranteeSection's
// laser-level/clean-up items, the wall-anchoring FAQ's stud-anchored +
// drywall-rated hardware answer) — nothing new is being promised here that
// isn't already true and shown elsewhere on the site.
export const pricingTrustSection = {
  heading: "Upfront & Fixed Pricing",
  subheading:
    "Every price above is a flat rate, not an hourly guess — you know the number before we ever pick up a tool.",
  badge: {
    icon: "\ud83d\udee1\ufe0f",
    label: "100% Upfront Quote Guarantee",
    sublabel: "No Hidden Fees, No Surprise On-Site Costs.",
  },
  includedHeading: "Always Included in Every Quote",
  included: [
    "Professional-grade tools & equipment",
    "Laser-level precision on every mount and install",
    "Stud-anchored mounting & drywall-rated hardware",
    "Full post-job clean-up \u2014 sawdust, packaging, and all",
  ],
  cta: {
    text:
      "Send us a quick photo or a link to what you need done, and we'll text back a guaranteed, exact price \u2014 usually within the hour.",
    label: "Get My Exact Price",
  },
};

// Military / senior / first responder discount \u2014 shown as a badge in the
// Pricing & Guarantee section and again near the Quote form, and offered
// as an opt-in checkbox inside the form itself (quoteForm.fields.discount
// below). Kept as its own export since the same badge text is reused in
// two different spots on the page.
export const discountOffer = {
  icon: "🏷️",
  label: "10% Off for First-Time Customers, Military, Seniors & First Responders",
  sublabel:
    "Our way of saying thank you to new customers, Pittsburgh seniors, and the service members who've looked out for this community.",
};

// The 3 individual opt-in discount checkboxes inside the Quote form (see
// quoteForm.fields.discounts below). Self-reported, same as every other
// field in the form — no ID or proof required, we just take the
// customer's word for it. Only one 10% discount applies per job even if
// more than one box is checked (see discountMicrocopy).
export const discounts = [
  { id: "firstTime", label: "First-Time Customer (10% Off)" },
  { id: "militaryFirstResponder", label: "Military & First Responders (10% Off)" },
  { id: "senior", label: "Senior Citizen Discount (10% Off)" },
];

export const discountMicrocopy =
  "🏷️ Eligible discounts will be automatically applied to your final flat-rate quote. Only one 10% discount applies per job.";

// Heading/subheading for the Services section (kept in contentData, not
// hardcoded in JSX, so all page copy lives in one place — see the file
// header comment).
export const servicesSection = {
  heading: "Furniture Assembly Services in Pittsburgh, PA",
  subheading:
    "From a single IKEA wardrobe to a full office move-in — every piece built sturdy, level, and ready to use.",
};

// Heading/subheading for the secondary "add-on" services section, rendered
// by ComplementaryServices() in LandingPage.jsx, right after the featured
// Furniture Assembly breakdown. Covers the other 5 services[] entries
// (TV mounting, wall mounting, home repairs, AC/appliance installs, and
// lock hardware) positioned as convenient bundle-on extras rather than
// equal, standalone offerings.
export const complementaryServicesSection = {
  heading: "One-Stop Home Setup & Repairs On the Way",
  subheading:
    "Already booking an assembly? Add any of these and we’ll take care of it in the same visit.",
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
  // Real, verified rating — confirmed by the business owner from
  // actual Google reviews, not a placeholder. Update if the Google
  // average or review count ever changes — never bump reviewCount
  // without a real new review.
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "2",
    bestRating: "5",
    worstRating: "1",
  },
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
      helpText: "🔒 We strictly send your exact quote via text — zero sales calls or spam.",
    },
    // Multi-select — a job is often more than one service at once (e.g. a
    // TV mount plus a couple of shelves), so this holds an array of
    // selected values rather than a single string. `errorMessage` shows
    // under the pill group when the form is submitted with none selected.
    services: {
      label: "Service Type",
      helpText: "Select all that apply.",
      required: true,
      errorMessage: "Please select at least one service.",
      // Built from `services` (defined above) rather than a second,
      // separately-maintained list, so the price/emoji shown here can
      // never drift from the real services[] data -- and so a new
      // service automatically becomes selectable here too.
      options: [
        ...services.map((s) => ({
          value: s.id,
          label: s.quoteLabel || s.title,
          price: s.startingPrice.replace(/^Starting at /, "From "),
          emoji: s.emoji,
        })),
        { value: "other", label: "Something Else", price: null, emoji: "💬" },
      ],
    },
    // Renamed from the old "Anything else we should know?" framing --
    // this is now the form's explicit "Job Description" field.
    notes: {
      label: "Job Description",
      placeholder: "e.g. 2 IKEA PAX wardrobes, need mounted TV above fireplace...",
      helpText: "Tell us what you need done — the more detail, the more accurate your quote.",
    },
    // Deliberately called out as the single highest-leverage field for lead
    // quality — a photo turns a rough estimate into an accurate flat-rate
    // quote, so both the label and the surrounding UI (see QuoteForm() in
    // LandingPage.jsx) treat this as "recommended," not just "optional."
    photo: {
      label: "Upload a Photo",
      helpText:
        "Attaching a photo gets you a faster and more accurate flat-rate quote within 1 hour.",
    },
    preferredContactMethod: {
      label: "Preferred Contact Method",
      helpText: "How should we send your quote?",
      options: [
        { value: "call", label: "Call", emoji: "📞" },
        { value: "text", label: "Text", emoji: "💬" },
        { value: "whatsapp", label: "WhatsApp", emoji: "🟢" },
      ],
      defaultValue: "text",
    },
    // 3 individual opt-in checkboxes (see `discounts` above) instead of
    // one combined checkbox -- self-reported, no ID or proof required.
    // Only one 10% discount applies per job even if more than one is
    // checked (see discountMicrocopy).
    discounts: {
      label: "Discounts",
      options: discounts,
      microcopy: discountMicrocopy,
    },
  },
  submitLabel: "Get My Guaranteed Quote →",
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
      id: "furniture-assembly",
      title: "Dresser & Furniture Assembly",
      category: "Furniture Assembly",
      icon: "assembly",
      description:
        "A 6-drawer dresser built square and level — drawers glide smoothly, every knob lines up, and there's no leftover hardware.",
      // Single static photo per card (see public/images/projects/README.md
      // for the exact filename each slot expects). If the file isn't in
      // place yet, GalleryCard falls back to the icon/gradient below with
      // no broken-image icon and no build or load error.
      image: "/images/projects/furniture-assembly.jpg",
    },
    {
      id: "tv-mounting",
      title: "TV Wall Mounting & Shelving",
      category: "Mounting & Repairs",
      icon: "mounting",
      description:
        "A flat-screen TV mounted level above the media console, stud-anchored with cables concealed for a clean finish.",
      image: "/images/projects/tv-mounting.jpg",
    },
    {
      id: "home-repairs",
      title: "Home Repairs & Maintenance",
      category: "Home Repairs",
      icon: "repairs",
      description:
        "From water heater shutoff valves to the small fixes that keep getting pushed back — repaired, sealed, and inspected, done right.",
      image: "/images/projects/home-repairs.jpg",
    },
    {
      id: "ac-install",
      title: "Window AC Unit Installation",
      category: "Home Repairs",
      icon: "ac",
      description:
        "A window air conditioner mounted secure and sealed, with proper support bracketing and no drafts around the frame.",
      image: "/images/projects/ac-installation.jpg",
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
    id: "local",
    title: "Local Pittsburgh Presence",
    description: "Based right here in Pittsburgh, PA — we know the neighborhoods and show up when we say we will.",
  },
  {
    id: "pricing",
    title: "Transparent Pricing",
    description: "What we quote is exactly what you pay — no change orders, no last-minute add-ons.",
  },
  {
    id: "guarantee",
    title: "Satisfaction Guaranteed",
    description: "Not happy with the job? We'll make it right at no extra cost.",
  },
  {
    id: "insured",
    title: "Licensed & Insured",
    description: "Every technician is background-checked and fully insured.",
  },
  {
    id: "communication",
    title: "Easy to Reach",
    description: "Call, text, or WhatsApp — real answers from a real person, no call centers or endless hold music.",
  },
];

// Supplementary block within the trust/guarantees section — the equipment
// and standards behind the work itself, not just the outcome promises
// above. Rendered by QualityGuarantee() in LandingPage.jsx.
export const qualityGuaranteeSection = {
  heading: "Our Clean Home & Quality Guarantee",
  subheading: "The equipment and standards behind every job, not just the finished result.",
  items: [
    {
      id: "stud-finder",
      label: "Stud-Finder Precision",
      description: "Every mount and anchor point is verified with a stud finder before drilling.",
    },
    {
      id: "laser-level",
      label: "Laser-Level Accuracy",
      description: "TVs, shelves, and furniture leveled with a laser, not just a bubble level.",
    },
    {
      id: "floor-protection",
      label: "Floor Protection Mats",
      description: "Mats go down before any tools come out, protecting your floors through the whole job.",
    },
    {
      id: "clean-up",
      label: "Post-Job Vacuum Clean-Up",
      description: "We vacuum sawdust and packaging debris before we leave — you shouldn't have to clean up after us.",
    },
    {
      id: "background-check",
      label: "Background-Checked Technicians",
      description: "Every technician is background-checked before stepping into your home.",
    },
  ],
};

// Google Reviews trust section — replaces the earlier placeholder
// testimonial quotes (fabricated sample reviews, never real customers)
// with only the verified, real rating already confirmed elsewhere on
// this page (see localBusinessSchema.aggregateRating above). No invented
// names, quotes, or review counts.
export const testimonialsSection = {
  heading: "Rated 5.0 on Google Reviews",
  subheading: "Real feedback from real Pittsburgh customers — verified, not staged.",
};

export const googleReviews = {
  stars: 5,
  value: "5.0",
  reviewCount: "2",
  sourceLabel: "Google Reviews",
};

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
  {
    id: "wall-anchoring",
    question: "How do you anchor TVs and IKEA furniture to the wall?",
    answer:
      "We locate real wall studs with a stud finder before drilling and use the mount or furniture manufacturer's rated hardware — never drywall anchors alone for anything load-bearing. For tall IKEA pieces like PAX wardrobes and BILLY bookcases, we install the included anti-tip wall strap so the piece can't tip forward, which matters most in homes with kids or pets.",
  },
  {
    id: "lockout",
    question: "Do you offer lockout service?",
    answer:
      "Yes — non-emergency, same-day lockout service for homes, businesses, and vehicles (cars, vans & commercial trucks), always with 100% upfront flat-rate pricing and no surprise fees on site. This is scheduled work, not instant emergency dispatch; if you need someone in the next few minutes, please call a 24/7 emergency locksmith instead.",
  },
  {
    id: "smart-locks",
    question: "Do you install smart locks or rekey existing locks?",
    answer:
      "Yes. We install and set up smart locks from Yale, Schlage, August, Google Nest, and Eufy, plus standard deadbolts and handle sets. Bring your own lock and we'll handle the rest. We also rekey and replace cylinders — a common request for new homeowners.",
  },
  {
    id: "vehicle-lockout",
    question: "Can you help if I'm locked out of my car or work truck?",
    answer:
      "Yes — we offer non-emergency, same-day vehicle lockout service for cars, vans, and commercial trucks, with upfront flat-rate pricing. If you need help right now, please call a 24/7 emergency/roadside locksmith instead.",
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
    h1: "Home Services in Pittsburgh, PA",
    metaTitle: "Home Services Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "Fixium Craft is a local home services company serving Pittsburgh, PA and surrounding neighborhoods: furniture assembly, TV mounting, minor repairs, and appliance installs.",
    intro: [
      `Fixium Craft is a local home services company based in ${business.address.city}, ${business.address.state}, serving ${business.address.city} and surrounding neighborhoods, including ${neighborhoods.join(", ")}.`,
      "We provide furniture assembly, TV and wall mounting, minor home repairs (including door and lock adjustments), and window AC and appliance installation — all with flat-rate pricing and same-day availability.",
    ],
    faqs: [
      {
        question: "What home services does Fixium Craft offer in Pittsburgh?",
        answer:
          "Fixium Craft offers furniture assembly, TV and wall mounting, minor home repairs, and window AC and appliance installation throughout Pittsburgh, PA and surrounding areas.",
      },
      {
        question: "How do I book home services in Pittsburgh with Fixium Craft?",
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
    serviceId: "locksmith",
    h1: "Door & Lock Repair in Pittsburgh, PA",
    metaTitle: "Door & Lock Repair Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "Fixium Craft handles door, handle, and lock repair — deadbolt installs, rekeying, and alignment — as part of our Locksmith & Lockout Services in Pittsburgh, PA. Flat-rate quotes.",
    intro: [
      `Fixium Craft handles door and lock repair in ${business.address.city}, ${business.address.state} and surrounding neighborhoods, including ${neighborhoods.join(", ")}, as part of our Locksmith & Lockout Services.`,
      "This covers doors that won't latch or close properly, sticking or misaligned doors, loose or worn handles, and deadbolt or cylinder replacement — realigned, rekeyed, or replaced in one visit. Scheduled and non-emergency, so there's no rush-job pressure or after-hours surcharge.",
    ],
    faqs: [
      {
        question: "Does Fixium Craft fix doors that won't close or latch?",
        answer:
          "Yes. Door alignment and latch adjustments are part of our Locksmith & Lockout Services, available throughout Pittsburgh, PA and surrounding areas.",
      },
      {
        question: "Can Fixium Craft adjust, rekey, or replace a door lock or handle?",
        answer:
          "Yes — deadbolt installs, rekeying/cylinder replacement, and handle set upgrades are all part of this service. We also offer non-emergency, same-day lockout service if you're locked out but not in a rush; for help in the next few minutes, call a 24/7 emergency locksmith instead.",
      },
    ],
  },
  {
    slug: "minor-home-repairs-pittsburgh",
    serviceId: "repairs",
    h1: "Home Maintenance & Repairs in Pittsburgh, PA",
    metaTitle: "Home Maintenance & Repairs Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "Fixium Craft provides home maintenance & repairs in Pittsburgh, PA and nearby neighborhoods: cabinet hinges, door and lock adjustments, and general fixes. Flat-rate quotes.",
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
  {
    slug: "smart-lock-installation-pittsburgh",
    serviceId: "locksmith",
    // URL slug kept as-is (no routing change requested) even though the
    // page content below now covers the full locksmith/lockout scope,
    // not just smart lock installs.
    h1: "Lock Hardware, Smart Lock & Door Services in Pittsburgh, PA",
    metaTitle: "Lock Hardware & Door Services Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "Fixium Craft handles smart lock installs, standard lock & deadbolt work, and non-emergency home, business & vehicle lockouts in Pittsburgh, PA — 100% upfront flat-rate pricing, no hidden fees.",
    intro: [
      `Fixium Craft handles the full range of locksmith and lockout work in ${business.address.city}, ${business.address.state} and surrounding neighborhoods, including ${neighborhoods.join(", ")} — smart lock installation, standard lock and deadbolt work, door realignment and strike-plate tuning, and calm, scheduled lockout service for homes, businesses, and vehicles.`,
      "Bring your own Yale, Schlage, August, Google Nest, or Eufy smart lock (or a standard deadbolt or handle set) and we'll install and configure it. We also handle rekeying and cylinder replacement — a common request for new homeowners. Locked out of your house, business, car, van, or truck? We offer non-emergency, same-day unlocking with 100% upfront flat-rate pricing — no surprise \"service call + damage fee\" once we're on site. This is scheduled, calm-paced work, not instant 24/7 emergency dispatch; if you need someone in the next few minutes, please call a 24/7 emergency locksmith instead.",
    ],
    faqs: [
      {
        question: "What smart lock brands does Fixium Craft install?",
        answer:
          "We install Yale, Schlage, August, Google Nest, and Eufy smart locks, plus standard deadbolts and handle sets. Bring your own lock and we'll handle installation and setup.",
      },
      {
        question: "Do you help with lockouts?",
        answer:
          "Yes — residential, commercial, and vehicle lockouts (cars, vans, and commercial trucks), always with 100% upfront flat-rate pricing and no surprise fees on site. This is scheduled, same-day service, not instant emergency dispatch; if you need someone in the next few minutes, please call a 24/7 emergency locksmith instead.",
      },
      {
        question: "Can you rekey my locks after moving into a new home?",
        answer:
          "Yes, rekeying and cylinder replacement for new homeowners is one of our most common requests — a flat-rate quote based on the number of locks.",
      },
      {
        question: "Will I be charged extra fees once you arrive?",
        answer:
          "No. Every lockout, lock, or hardware job is quoted flat-rate and upfront before we start — no last-minute \"service call\" or \"damage\" fees added on site.",
      },
    ],
  },
];

export const footer = {
  about: `${business.name} provides fast, reliable furniture assembly, TV mounting, wall mounting, and home repair services across the Pittsburgh area.`,
  links: [
    { label: "Services", href: "#services" },
    { label: "Recent Projects", href: "#gallery" },
    { label: "How It Works", href: "#process" },
    { label: "Google Reviews", href: "#testimonials" },
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
    { label: "Home Services in Pittsburgh", href: "/handyman-pittsburgh" },
    { label: "Door & Lock Repair in Pittsburgh", href: "/door-lock-repair-pittsburgh" },
    { label: "Home Maintenance & Repairs in Pittsburgh", href: "/minor-home-repairs-pittsburgh" },
    { label: "Lock Hardware & Door Services in Pittsburgh", href: "/smart-lock-installation-pittsburgh" },
  ],
  copyright: `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`,
};

// Grouped default export for convenience (e.g. `import content from './contentData'`)
const contentData = {
  business,
  navSection,
  aboutSection,
  neighborhoods,
  serviceAreasSection,
  seo,
  localBusinessSchema,
  trustBadges,
  hero,
  painPoints,
  services,
  servicesSection,
  pricingTrustSection,
  discountOffer,
  discounts,
  discountMicrocopy,
  projectsGallery,
  process,
  formService,
  quoteForm,
  guarantees,
  guaranteesSection,
  qualityGuaranteeSection,
  googleReviews,
  testimonialsSection,
  faq,
  faqSection,
  servicePages,
  footer,
};

export default contentData;
