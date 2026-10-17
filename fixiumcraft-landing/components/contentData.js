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
  // Human-readable form used for schema.org `telephone` (matches the visible
  // number format Google compares against the Business Profile).
  phoneSchema: "(929) 780-3017",
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
  servicesLabel: "Services",
  // Cross-page hash links ("/#...") so they also work from /services/<slug>.
  links: [
    { label: "Areas We Serve", href: "/#service-areas" },
    { label: "Guides", href: "/guides" },
    { label: "About", href: "/#about" },
  ],
  callLabel: "Call",
  quoteCta: { label: "Get a Free Quote", shortLabel: "Free Quote", href: "/#quote" },
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
// pillar page (see `servicePillars`), so both search engines and AI
// assistants see the exact coverage area, not just "Pittsburgh."
export const neighborhoods = [
  "Shadyside",
  "Squirrel Hill",
  "Lawrenceville",
  "South Side",
  "Oakland",
  "Downtown Pittsburgh",
  "Mt. Lebanon",
  "Cranberry Township",
  "Bethel Park",
  "Upper St. Clair",
  "Dormont",
  "Carnegie",
  "Robinson Township",
  "Wexford",
  "Moon Township",
];

// schema.org `areaServed` — plain place names ("Shadyside", not "Shadyside,
// PA"), each tied back to Pittsburgh via containedInPlace. Shared by the
// homepage LocalBusiness schema and every pillar page's Service schema so
// the coverage area is stated identically everywhere.
export function areaServedSchema() {
  const city = business.address.city;
  return [
    {
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "State", name: "Pennsylvania" },
    },
    ...neighborhoods.map((name) => ({
      "@type": "Place",
      name,
      containedInPlace: { "@type": "City", name: city },
    })),
  ];
}

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
  // Long-tail local-search phrases, each linking to the dedicated pillar
  // page that actually targets it (see `servicePillars` below) — internal
  // links with keyword-rich anchor text, not just more copy, for both
  // traditional SEO and AI-assistant discoverability.
  popularSearches: [
    { label: "IKEA PAX assembly in Pittsburgh", href: "/services/furniture-assembly" },
    { label: "TV wall mounting service in Mt. Lebanon", href: "/services/tv-mounting" },
    { label: "smart lock installation in Squirrel Hill", href: "/services/locksmith" },
    { label: "handyman services in Shadyside", href: "/services/handyman-repairs" },
  ],
};

export const seo = {
  title: "Fixium Craft | Handyman, Furniture Assembly & Locksmith Services in Pittsburgh, PA",
  description:
    "Professional handyman, IKEA furniture assembly, TV wall mounting, and mobile locksmith services in Pittsburgh, PA. Serving Squirrel Hill, Shadyside, Lawrenceville, and surrounding neighborhoods.",
  keywords: [
    // Lock/handyman local-search terms first, then the original
    // furniture-assembly and general home-repair terms.
    "IKEA furniture assembly Pittsburgh",
    "TV wall mounting service in Pittsburgh",
    "mobile locksmith near me",
    "small home repairs and maintenance",
    "Handyman Pittsburgh",
    "lock replacement Pittsburgh",
    "lock repair Pittsburgh",
    "door lockout service Pittsburgh",
    "TV mounting Pittsburgh",
    "furniture assembly Pittsburgh",
    "IKEA assembly service",
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
  eyebrow: "Fully Insured | Upfront Flat Rates",
  headline: "Top-Rated Handyman & Furniture Assembly in Pittsburgh",
  subheadline: "Fast home repairs, expert IKEA assembly, and local locksmith solutions with upfront pricing.",
  // Label above the 3 quick-pick service cards directly under the hero CTAs.
  pickerLabel: "What do you need help with?",
  supportingCopy:
    "Furniture assembly and mounting, locks and door hardware, and general home repairs — one local team for the whole to-do list.",
  primaryCta: { label: "Get an Instant Quote", action: "form" },
  // Trust bar directly under the hero CTAs. Prices mirror the "starting at"
  // prices on the service pages (handyman $49, assembly $59, locksmith $79).
  trustBar: [
    { id: "pricing", label: "Upfront Pricing ($49 Handyman, $59 Assembly, $79 Locksmith)" },
    { id: "sameday", label: "Same-Day Service" },
    { id: "insured", label: "Fully Insured" },
  ],
  secondaryCtas: [
    { label: "Text Us Photos for Estimate", href: business.smsHref, type: "sms" },
    { label: "Call Now", href: business.phoneHref, type: "call" },
    { label: "WhatsApp Us", href: business.whatsappHref, type: "whatsapp" },
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
    // Dedicated pillar page this service belongs to (see servicePillars
    // below and app/services/[slug]/page.tsx).
    learnMoreHref: "/services/furniture-assembly",
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
    learnMoreHref: "/services/furniture-assembly",
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
    learnMoreHref: "/services/furniture-assembly",
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
    learnMoreHref: "/services/handyman-repairs",
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
    learnMoreHref: "/services/handyman-repairs",
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
      "Fast response for home & vehicle lockouts, lock replacement, deadbolt repair, and smart lock setup across Pittsburgh, PA. Scheduled, same-day, and 100% upfront-priced — no surprise call-out or damage fees.",
    // Specific lock offers for the JSON-LD hasOfferCatalog (see
    // localBusinessSchema below), so search engines see the individual
    // lock services rather than one generic "Lock Hardware" entry. The
    // homepage card itself still renders as a single service.
    schemaOffers: [
      {
        name: "Door Lock Replacement & Rekeying",
        description:
          "Standard lock and deadbolt replacement, rekeying, and cylinder changes for homes in Pittsburgh, PA, with upfront flat-rate pricing.",
      },
      {
        name: "Same-Day & Scheduled Lockout Service",
        description:
          "Fast-response lockout service for homes, businesses, and vehicles in Pittsburgh, PA, with 100% upfront flat-rate pricing and no surprise fees.",
      },
      {
        name: "Smart Lock Installation & Lock Repair",
        description:
          "Smart lock installation and setup (Yale, Schlage, August, Google Nest, Eufy), plus deadbolt repair, door realignment, and strike plate tuning in Pittsburgh, PA.",
      },
    ],
    features: [
      "Vehicle & truck lockout service (cars, vans & commercial trucks)",
      "Home & business unlocking — non-emergency, scheduled, same-day",
      "Standard lock replacement, rekeying & deadbolts",
      "Smart lock installation & setup (Yale, Schlage, August, Google Nest, Eufy)",
      "Door realignment, strike plate tuning & handle upgrades",
    ],
    startingPrice: "Starting at $79",
    learnMoreHref: "/services/locksmith",
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

// Heading/subheading for the homepage "3 service pillars" section (see
// ServicePillars() in LandingPage.jsx). The pillar cards themselves come
// from `servicePillars`; `services` above still drives the quote-form
// options and the JSON-LD offer catalog.
export const servicesSection = {
  heading: "Our Home Services in Pittsburgh, PA",
  subheading:
    "Three specialties, one trusted local team. Pick a service to see what's included, common questions, and how to book.",
};

// JSON-LD structured data (schema.org), rendered as a <script
// type="application/ld+json"> in app/page.tsx, and referenced by @id from
// each dedicated service+location page's own Service schema (see
// components/ServicePage.tsx) so every page resolves to the same single
// business entity instead of duplicating this whole block. Defined here,
// after `services`, because hasOfferCatalog below needs that array to
// already exist.
//
// @type is ["HomeAndConstructionBusiness", "Locksmith"] — both real
// schema.org LocalBusiness subtypes. schema.org has no dedicated "Handyman"
// business type, so HomeAndConstructionBusiness is the closest match for
// assembly/repair work, and Locksmith covers the lock services. No streetAddress is included on purpose:
// this is a service-area business with no public storefront, so only
// city/state + areaServed are given — a common, accepted pattern.
//
// openingHoursSpecification below is a *structured* re-statement of
// business.hours ("Mon–Sun, 7am–11pm") — schema.org needs actual day/time
// values, not the free-text string, so if business.hours ever changes,
// update dayOfWeek/opens/closes here too or the two will drift apart.
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "Locksmith"],
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
  url: `${seo.canonicalUrl}/`,
  telephone: business.phoneSchema,
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
  areaServed: areaServedSchema(),
  // Topics/skills the business is expert in — helps search and AI
  // assistants associate the business with these services.
  knowsAbout: [
    "Furniture Assembly",
    "IKEA Assembly",
    "TV Wall Mounting",
    "Smart Lock Installation",
    "Lock Rekeying",
    "Drywall Patching",
    "Handyman Services",
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
  // A few real job photos (absolute URLs, as schema.org expects).
  image: [
    `${seo.canonicalUrl}/images/work/furniture-desk.jpg`,
    `${seo.canonicalUrl}/images/work/tv-wall-mount.jpg`,
    `${seo.canonicalUrl}/images/work/lock-schlage-handleset.jpg`,
  ],
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
    // A service with `schemaOffers` (currently the lock service) expands
    // into one Offer per entry; every other service stays one Offer.
    itemListElement: services.flatMap((service) =>
      (service.schemaOffers ?? [{ name: service.title, description: service.description }]).map(
        (offer) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: offer.name,
            description: offer.description,
          },
        })
      )
    ),
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
  subheading: "Four quick fields and you're done — most customers hear back within the hour.",
  // Everything below the 4 core fields + photo lives in a collapsed
  // "optional" panel to keep first-glance friction low.
  moreDetailsLabel: "Add more details (optional)",
  moreDetailsHint: "Job description, how to reach you, discounts",
  fields: {
    name: { label: "Full Name", placeholder: "Jane Smith", required: true },
    phone: {
      label: "Phone Number",
      placeholder: "(412) 555-0100",
      required: true,
      helpText: "🔒 We strictly send your exact quote via text — zero sales calls or spam.",
    },
    // 5-digit US ZIP only -- just enough to confirm the job is inside our
    // service area and route it to the closest tech, without asking for a
    // full street address on a "quick quote" form (that level of detail
    // can be collected later, when the job is actually scheduled).
    zip: {
      label: "ZIP Code",
      placeholder: "15222",
      required: true,
      helpText: "So we can confirm you're in our service area.",
    },
    // Optional — never blocks submission; only included in the lead alert
    // (Telegram + email) when filled in.
    streetAddress: {
      label: "Street Address (Optional)",
      placeholder: "e.g. 5800 Forbes Ave",
      required: false,
      helpText: "(Optional - helps us provide a precise quote for your neighborhood)",
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
      cta: "Attach a photo for a quick flat-rate quote",
      hint: "Tap to take a photo or choose one from your phone",
      helpText: "Optional, but photos get the fastest and most accurate quote.",
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
  heading: "Recent Work",
  subheading: "Real jobs, real results — tap any photo to take a closer look.",
  categories: [
    { id: "all", label: "All" },
    { id: "furniture", label: "Furniture Assembly" },
    { id: "tv", label: "TV Mounting" },
    { id: "locksmith", label: "Locksmith" },
    { id: "handyman", label: "Handyman" },
  ],
  // Real job photos (public/images/work/). Each item: category (matches a
  // `categories` id), title (the caption: job type), optional `area` (the
  // neighborhood, shown as "Title · Area" -- ONLY fill this in with the
  // real location of that job; it is deliberately left empty until then),
  // plus the image's real pixel size (for layout without jank) and alt.
  items: [
    { id: "tv-1", category: "tv", title: "TV wall mounting", area: "", image: "/images/work/tv-wall-mount.jpg", width: 900, height: 1600, alt: "Flat-screen TV mounted flat on the wall above a white media console" },
    { id: "desk-1", category: "furniture", title: "Desk with drawers & shelves assembly", area: "", image: "/images/work/furniture-desk.jpg", width: 1600, height: 900, alt: "Assembled industrial-style desk with six drawers and open shelves" },
    { id: "lock-handleset", category: "locksmith", title: "Front door handleset installation", area: "", image: "/images/work/lock-schlage-handleset.jpg", width: 900, height: 1600, alt: "Oil-rubbed bronze handleset installed on a painted entry door" },
    { id: "patio-1", category: "furniture", title: "Outdoor patio set assembly", area: "", image: "/images/work/furniture-patio-set.jpg", width: 1600, height: 1200, alt: "Assembled wicker outdoor sectional with ottomans and coffee tables on a patio" },
    {
      id: "cabinet-ba",
      category: "handyman",
      title: "Under-sink cabinet floor repair",
      area: "",
      before: { image: "/images/work/repair-cabinet-before.jpg", width: 1600, height: 900, alt: "Under-sink cabinet with a bare, damaged particleboard floor (before)" },
      after: { image: "/images/work/repair-cabinet-after.jpg", width: 1600, height: 900, alt: "Same under-sink cabinet with a clean, sealed white floor (after)" },
    },
    { id: "lock-cylinder", category: "locksmith", title: "Deadbolt cylinder rekey & replacement", area: "", image: "/images/work/lock-kwikset-cylinder.jpg", width: 900, height: 1600, alt: "Kwikset deadbolt cylinder removed from a door during a rekey" },
    { id: "dresser-1", category: "furniture", title: "6-drawer dresser assembly", area: "", image: "/images/work/furniture-dresser.jpg", width: 1200, height: 1600, alt: "Assembled white six-drawer dresser in a bedroom" },
    { id: "ac-1", category: "handyman", title: "Window AC installation", area: "", image: "/images/work/install-window-ac.jpg", width: 1600, height: 900, alt: "Window air conditioner installed with side panels sealed in the window frame" },
    { id: "grill-1", category: "furniture", title: "Gas grill assembly", area: "", image: "/images/work/furniture-grill.jpg", width: 1600, height: 1200, alt: "Fully assembled stainless-steel gas grill on a wooden deck" },
    { id: "lock-satin", category: "locksmith", title: "Deadbolt & knob lockset installation", area: "", image: "/images/work/lock-satin-lockset.jpg", width: 900, height: 1600, alt: "Satin nickel deadbolt and knob lockset installed on a white door" },
    { id: "trampoline-1", category: "furniture", title: "Trampoline assembly", area: "", image: "/images/work/furniture-trampoline.jpg", width: 1600, height: 1200, alt: "Assembled trampoline with safety net enclosure on a patio" },
    { id: "lock-lever", category: "locksmith", title: "Lever handle & deadbolt plug installation", area: "", image: "/images/work/lock-schlage-lever.jpg", width: 900, height: 1600, alt: "Bronze lever handle installed on a wood door with a deadbolt hole plug" },
    { id: "heater-1", category: "handyman", title: "Water heater relief valve & discharge pipe", area: "", image: "/images/work/repair-water-heater-valve.jpg", width: 900, height: 1600, alt: "Water heater temperature and pressure relief valve with discharge pipe attached" },
    { id: "lock-brass", category: "locksmith", title: "Lockset replacement & strike plate", area: "", image: "/images/work/lock-brass-lockset.jpg", width: 900, height: 1600, alt: "Brass deadbolt and knob lockset on a door with strike plates" },
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
  // "Review us on Google" button target. This opens a Google Maps search
  // that lands on the business listing; swap it for the direct
  // write-a-review link from the Google Business Profile dashboard
  // (Get more reviews -> share link, looks like https://g.page/r/.../review)
  // so customers go straight to the review box.
  reviewUrl:
    "https://www.google.com/maps/search/?api=1&query=Fixium+Craft+Pittsburgh+PA",
  // Review cards. ONLY paste real reviews here, word for word, with the
  // customer's real name as shown on Google (or first name + last
  // initial): { name: "Jane S.", stars: 5, date: "Aug 2026", text: "..." }.
  // The cards appear automatically; with none, only the rating badge and
  // the "Review us on Google" button show.
  reviews: [],
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
    id: "tv-cost",
    question: "How much does TV wall mounting cost in Pittsburgh?",
    answer:
      "TV mounting with Fixium Craft starts at $89 flat-rate, stud-anchored and level, with cable concealment available. You get your exact quote by text before we start.",
  },
  {
    id: "ikea-cost",
    question: "How much does IKEA furniture assembly cost in Pittsburgh?",
    answer:
      "IKEA and flat-pack assembly starts at $59 flat-rate. Send a photo of what you need and we'll quote the exact price.",
  },
  {
    id: "mobile-locksmith",
    question: "Do you offer a mobile locksmith service in Pittsburgh?",
    answer:
      "Yes. We come to your door for rekeying, deadbolt and lock replacement, smart lock installation and lockouts, with same-day or scheduled appointments. Locksmith jobs start at $79, flat-rate.",
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

// The 3 core service pillars. One source of truth for: the homepage pillar
// cards (ServicePillars() in LandingPage.jsx), the Services dropdown in the
// header (SiteNav.jsx), the dedicated /services/<slug> pages
// (components/ServicePillarPage.tsx + app/services/[slug]/page.tsx), the
// sitemap, and the footer links.
//
// These replaced the older per-topic root-level pages (e.g.
// /tv-mounting-pittsburgh); those URLs now 308-redirect to the closest
// pillar page -- see `redirects()` in next.config.ts.
//
// Card fields: slug, title, navLabel/navBlurb (dropdown), icon/image/alt,
// description, features, startingPrice. Page fields: h1, metaTitle,
// metaDescription, intro[], taskGroups[{heading, items[]}], faqs[].
// startingPrice values are the existing real "Starting at" prices from
// `services` above (lowest price among the services each pillar covers).
// Homepage "what we do" text section (see ServiceDetails() in
// LandingPage.jsx): one keyword-bearing H2 per pillar, each linking to its
// dedicated page. Copy is kept factual — same services/prices as the pillars.
export const serviceDetails = [
  {
    slug: "furniture-assembly",
    heading: "IKEA & Flat-Pack Furniture Assembly in Pittsburgh",
    body: "Need IKEA furniture assembly Pittsburgh can count on? We build PAX wardrobes, beds, desks, dressers, bookcases and anything else that comes in a box — sturdy, level and anchored right the first time, with a flat rate quoted before we start.",
    cta: "See furniture assembly pricing",
  },
  {
    slug: "tv-mounting",
    heading: "TV Wall Mounting & Shelf Installation Services",
    body: "Our TV wall mounting service in Pittsburgh covers fixed, tilting and full-motion mounts, stud-anchored and hung level, with cable concealment available. We also install floating shelves, bracket shelves, mirrors and artwork.",
    cta: "See TV & wall mounting",
  },
  {
    slug: "locksmith",
    heading: "Residential Locksmith, Smart Locks & Rekeying",
    body: "Searching for a mobile locksmith near me? We come to your door in Pittsburgh for rekeying, deadbolt and lock replacement, handle sets, smart lock setup (Schlage, Yale, Ring, Nest, Kwikset) and lockouts, with same-day or scheduled appointments.",
    cta: "See locksmith services",
  },
  {
    slug: "handyman-repairs",
    heading: "Local Handyman & Small Home Repairs in Pittsburgh, PA",
    body: "From drywall patching and cabinet repair to minor plumbing and electrical fixtures, we handle the small home repairs and maintenance that keep getting pushed to next weekend, all at upfront flat rates.",
    cta: "See handyman services",
  },
];

export const servicePillars = [
  {
    slug: "furniture-assembly",
    providerType: "HomeAndConstructionBusiness",
    includedHeading: "IKEA & Flat-Pack Furniture Assembly in Pittsburgh",
    title: "Furniture Assembly & Mounting",
    navLabel: "Furniture Assembly & Mounting",
    navBlurb: "IKEA, beds, TVs, shelves & more",
    icon: "assembly",
    image: "/images/work/furniture-desk.jpg",
    alt: "Assembled desk with drawers and shelves: furniture assembly in Pittsburgh, PA",
    description:
      "IKEA and flat-pack assembly plus TV and wall mounting — built sturdy, level, and anchored right the first time.",
    features: [
      "IKEA & flat-pack assembly (PAX, desks, dressers)",
      "Bed frames & bedroom sets",
      "TV mounting & cable concealment",
      "Wall mounting: shelves, mirrors & artwork",
      "Outdoor & patio furniture",
    ],
    startingPrice: "Starting at $59",
    galleryCategories: ["furniture", "tv"],
    galleryHeading: "Recent Furniture Assembly & TV Mounting Work",
    brandsHeading: "We assemble furniture from",
    brands: ["IKEA", "Wayfair", "Target", "Amazon", "Ashley", "Costco", "and any other flat-pack brand"],
    pricingHeading: "Clear starting prices",
    pricing: [
      { label: "IKEA & flat-pack furniture assembly", price: "$59", note: "Beds, dressers, desks, PAX wardrobes & more" },
      { label: "TV mounting", price: "$89", note: "Stud-anchored, with cable concealment available" },
      { label: "Wall mounting: shelves, mirrors & artwork", price: "$89", note: "Level, anchored to studs or rated anchors" },
    ],
    badges: [
      { icon: "⚡", label: "Same-day & next-day slots" },
      { icon: "🧹", label: "Packaging cleaned up" },
      { icon: "🛡️", label: "Fully insured" },
    ],
    h1: "Expert Furniture & IKEA Assembly in Pittsburgh",
    metaTitle: "IKEA Furniture Assembly Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "IKEA furniture assembly in Pittsburgh, PA: PAX wardrobes, beds, desks, dressers & any flat-pack build. Flat-rate pricing, same-day slots, fully insured. Get a free quote.",
    intro: [
      `Fixium Craft builds and mounts furniture across ${business.address.city}, ${business.address.state} — IKEA PAX wardrobes, beds, desks, dressers, and anything else that comes in a box — plus TV and wall mounting done level, stud-anchored, and clean.`,
      `We serve ${neighborhoods.join(", ")}, and nearby neighborhoods. Every quote is flat-rate and upfront, every technician is background-checked and fully insured, and we clean up all the packaging before we leave.`,
    ],
    taskGroups: [
      {
        heading: "IKEA & flat-pack furniture assembly",
        items: [
          "IKEA PAX wardrobes & closet systems, sliding and hinged doors",
          "Bed frames, platform beds, bunk beds & headboards",
          "Desks, bookcases, dressers, nightstands & TV stands",
          "Wayfair, Amazon, Target, Ashley & any other flat-pack brand",
          "Office & commercial furniture: desks, workstations & shelving",
          "Disassembly & reassembly for moves, with haul-away available",
        ],
      },
      {
        heading: "TV & wall mounting",
        items: [
          "Fixed, tilting & full-motion TV mounts, stud-anchored",
          "Cable & wire concealment behind the wall or in raceway",
          "Soundbar & media console mounting",
          "Floating shelves, bracket shelves, mirrors & artwork",
        ],
      },
      {
        heading: "Outdoor furniture",
        items: [
          "Patio sets, outdoor dining tables, chairs & loungers",
          "Outdoor storage benches, deck boxes & shelving",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does furniture assembly cost in Pittsburgh?",
        answer:
          "Furniture assembly starts at $59, with a flat-rate quote based on the pieces and photos you send us — no hourly surprises.",
      },
      {
        question: "Can you assemble IKEA PAX wardrobes?",
        answer:
          "Yes. PAX wardrobes and closet systems (sliding or hinged doors, interior organizers) are one of our most common jobs. We build them level and secure them to the wall.",
      },
      {
        question: "Can you mount a TV on any wall?",
        answer:
          "Standard drywall and stud walls are our everyday job. If you have brick, concrete, or plaster, mention it in your photo or text and we'll confirm the right hardware in your quote.",
      },
      {
        question: "Do you take away the boxes and packaging?",
        answer:
          "Yes — post-job clean-up is included, packaging and all. Haul-away of old furniture is available too; just let us know when you request your quote.",
      },
      {
        question: "Do you assemble furniture from stores other than IKEA?",
        answer:
          "Yes. We build IKEA, Wayfair, Amazon, Target, Ashley and pretty much any flat-pack or ready-to-assemble furniture. If it comes in a box, we can build it.",
      },
    ],
  },
  {
    slug: "tv-mounting",
    // Own URL for the "TV wall mounting Pittsburgh" search; listed in the
    // nav/sitemap but kept out of the homepage's 3-card grid.
    hideFromGrid: true,
    providerType: "HomeAndConstructionBusiness",
    includedHeading: "TV Wall Mounting & Shelf Installation Services",
    title: "TV Wall Mounting & Shelves",
    navLabel: "TV Wall Mounting",
    navBlurb: "Stud-anchored mounts, hidden cables & shelves",
    icon: "mounting",
    image: "/images/work/tv-wall-mount.jpg",
    alt: "Flat-screen TV mounted flat on the wall above a media console: TV wall mounting in Pittsburgh, PA",
    description:
      "Fixed, tilting and full-motion TV mounts, stud-anchored and level, with clean cable concealment and shelf installation.",
    features: [
      "Fixed, tilting & full-motion TV mounts",
      "Stud-anchored and hung level",
      "Cable & wire concealment",
      "Soundbar & media console mounting",
      "Floating shelves, mirrors & artwork",
    ],
    startingPrice: "Starting at $89",
    galleryCategories: ["tv"],
    galleryHeading: "Recent TV Mounting Work",
    pricingHeading: "Clear starting prices",
    pricing: [
      { label: "TV mounting", price: "$89", note: "Stud-anchored, with cable concealment available" },
      { label: "Wall mounting: shelves, mirrors & artwork", price: "$89", note: "Level, anchored to studs or rated anchors" },
    ],
    badges: [
      { icon: "⚡", label: "Same-day & next-day slots" },
      { icon: "🧹", label: "Packaging cleaned up" },
      { icon: "🛡️", label: "Fully insured" },
    ],
    h1: "TV Wall Mounting in Pittsburgh, PA",
    metaTitle: "TV Wall Mounting Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "TV wall mounting in Pittsburgh, PA: stud-anchored, level, with hidden cables and shelf installation. Flat-rate pricing from $89, fully insured. Get a free quote.",
    intro: [
      `Looking for TV wall mounting in ${business.address.city}, ${business.address.state}? Fixium Craft mounts TVs on fixed, tilting and full-motion brackets, anchored into studs and hung level the first time, with cables concealed for a clean finish.`,
      `We serve ${neighborhoods.join(", ")}, and nearby neighborhoods. Every quote is flat-rate and upfront, and every technician is background-checked and fully insured.`,
    ],
    taskGroups: [
      {
        heading: "TV wall mounting",
        items: [
          "Fixed, tilting & full-motion TV mounts, stud-anchored",
          "Cable & wire concealment behind the wall or in raceway",
          "Soundbar & media console mounting",
        ],
      },
      {
        heading: "Shelves & wall mounting",
        items: [
          "Floating shelves & bracket shelves",
          "Mirrors, artwork & wall decor",
          "Level, anchored to studs or rated anchors",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does TV wall mounting cost in Pittsburgh?",
        answer:
          "TV mounting starts at $89, flat-rate, stud-anchored and level, with cable concealment available. You get your exact quote by text before we start.",
      },
      {
        question: "Can you mount a TV on any wall?",
        answer:
          "Standard drywall and stud walls are our everyday job. If you have brick, concrete, or plaster, mention it in your photo or text and we'll confirm the right hardware in your quote.",
      },
      {
        question: "Can you hide the TV cables?",
        answer:
          "Yes. We can conceal cables and wires behind the wall or in a raceway so the install looks clean. Tell us which option you prefer when you request your quote.",
      },
      {
        question: "Do I need to buy the TV mount myself?",
        answer:
          "If you already have a mount, we'll install it. If not, send your TV size and wall type with your quote request and we'll tell you which kind of mount to get.",
      },
      {
        question: "Do you also install shelves and soundbars?",
        answer:
          "Yes. We mount floating and bracket shelves, mirrors, artwork, soundbars and media consoles, with starting prices from $89.",
      },
    ],
  },
  {
    slug: "locksmith",
    // "dispatch": call-now CTAs and sticky bar. Default (unset) is "quote":
    // instant quote + text-a-photo CTAs.
    ctaMode: "dispatch",
    providerType: "Locksmith",
    includedHeading: "Residential Locksmith, Smart Locks & Rekeying",
    title: "Locksmith & Door Hardware",
    navLabel: "Locksmith & Door Hardware",
    navBlurb: "Rekeying, smart locks, deadbolts & lockouts",
    icon: "lock",
    image: "/images/work/lock-schlage-handleset.jpg",
    alt: "Handleset installed on an entry door: locksmith and door hardware in Pittsburgh, PA",
    description:
      "Rekeying, smart lock installs, deadbolts, handles, and same-day or scheduled lockouts — flat-rate and upfront.",
    features: [
      "Rekeying & lock replacement",
      "Smart locks: Schlage, Nest, Ring, Yale & more",
      "Deadbolts & door handle sets",
      "Home, business & vehicle lockouts",
      "Door alignment & strike plate repair",
    ],
    startingPrice: "Starting at $79",
    galleryCategories: ["locksmith"],
    galleryHeading: "Recent Lock & Door Hardware Work",
    brandsHeading: "Locks we install & service",
    brands: ["Schlage", "Yale", "Ring", "Google Nest", "Kwikset", "August", "Eufy"],
    pricingHeading: "Clear starting price",
    pricing: [
      { label: "Rekey, lock & deadbolt replacement", price: "$79", note: "Labor and install; bring your own hardware or ask us what to buy" },
      { label: "Smart lock installation & setup", price: "$79", note: "Installed, paired and tested with your app" },
      { label: "Handle sets, levers & strike plate fixes", price: "$79", note: "Door alignment and latch repair included in the visit" },
    ],
    badges: [
      { icon: "⚡", label: "Same-day slots available" },
      { icon: "📅", label: "Scheduled appointments" },
      { icon: "🛡️", label: "Fully insured" },
    ],
    callout: {
      title: "Locked out? Call now for same-day service",
      body: "Call or text us and we'll book the first open slot, for homes, businesses and vehicles. Same-day or scheduled service with flat-rate pricing. We're not a 24/7 emergency dispatch line.",
    },
    showcaseHeading: "What we do at the door",
    showcase: [
      { title: "Rekeying", description: "New keys for the locks you already have: ideal after a move or a lost key.", image: "/images/work/lock-kwikset-cylinder.jpg", alt: "Deadbolt cylinder removed for rekeying" },
      { title: "Deadbolt installs", description: "Deadbolt and knob sets fitted square, smooth and secure.", image: "/images/work/lock-satin-lockset.jpg", alt: "Satin nickel deadbolt and knob installed" },
      { title: "Handle sets & levers", description: "Handle sets and levers installed, aligned and tested.", image: "/images/work/lock-schlage-handleset.jpg", alt: "Handleset installed on an entry door" },
      { title: "Smart lock setup", description: "Schlage, Yale, Ring, Nest and more: installed, paired and tested.", icon: "lock" },
    ],
    h1: "Fast Same-Day Local Locksmith Services in Pittsburgh",
    metaTitle: "Mobile Locksmith Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "Mobile locksmith in Pittsburgh, PA: rekeying, smart lock installation (Schlage, Nest, Ring), deadbolts, lock repair & same-day lockouts. Flat-rate pricing, fully insured.",
    intro: [
      `Fixium Craft handles home and business locks across ${business.address.city}, ${business.address.state} — rekeying, lock and deadbolt replacement, door handles, smart lock installation, and same-day or scheduled lockouts for homes, businesses, and vehicles.`,
      `Bring your own Schlage, Google Nest, Ring, Yale, August, or Eufy smart lock (or a standard deadbolt or handle set) and we'll install and configure it. We serve ${neighborhoods.join(", ")}, and nearby neighborhoods, with flat-rate pricing quoted upfront — no surprise call-out or damage fees.`,
    ],
    taskGroups: [
      {
        heading: "Mobile rekeying & lock replacement",
        items: [
          "Rekey existing locks to a new key — common for new homeowners",
          "Replace worn, damaged, or outdated knobs and deadbolts",
          "Cylinder replacement and key duplication matching",
        ],
      },
      {
        heading: "Smart locks",
        items: [
          "Install and set up Schlage, Google Nest, Ring, Yale, August & Eufy smart locks",
          "App pairing, Wi-Fi setup & access-code programming",
          "Swap an old deadbolt for a smart deadbolt",
        ],
      },
      {
        heading: "Door hardware",
        items: [
          "Deadbolt installation & upgrades",
          "Door handle, lever & handle-set replacement",
          "Door alignment, latch & strike plate adjustments for sticking doors",
        ],
      },
      {
        heading: "Mobile locksmith lockout help",
        items: [
          "Home & business unlocking, same-day or scheduled",
          "Vehicle lockouts: cars, vans & commercial trucks",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you offer emergency lockout service?",
        answer:
          "We offer same-day and scheduled lockout service with upfront flat-rate pricing, but not instant 24/7 emergency dispatch. If you need someone within the next few minutes, please call a 24/7 emergency locksmith instead.",
      },
      {
        question: "Do I need to buy the smart lock myself?",
        answer:
          "Yes — you supply the lock (Schlage, Google Nest, Ring, Yale, August, Eufy, or a standard deadbolt) and we install, configure, and test it. Not sure which to buy? Text us and we'll point you to a good fit for your door.",
      },
      {
        question: "Can you rekey my locks instead of replacing them?",
        answer:
          "In most cases yes. Rekeying makes your existing locks work with a new key, which is usually cheaper than replacing them. We'll tell you if a lock is too worn to rekey.",
      },
      {
        question: "Will I get surprise fees if I'm locked out?",
        answer:
          "No. Every lockout, lock, or hardware job is quoted flat-rate and upfront before we start — no last-minute service call or damage fees added on site.",
      },
      {
        question: "Which Pittsburgh neighborhoods do you cover for locksmith service?",
        answer: `We come to your door across Pittsburgh and nearby, including ${neighborhoods.slice(0, 8).join(", ")} and more. Text us your ZIP code if you're not sure.`,
      },
    ],
  },
  {
    slug: "handyman-repairs",
    providerType: "HomeAndConstructionBusiness",
    includedHeading: "Local Handyman & Small Home Repairs in Pittsburgh, PA",
    title: "General Handyman & Repairs",
    navLabel: "General Handyman & Repairs",
    navBlurb: "Drywall, cabinets, fixtures & home upkeep",
    icon: "repairs",
    image: "/images/work/install-window-ac.jpg",
    alt: "Window AC unit installed and sealed: handyman and home repair in Pittsburgh, PA",
    description:
      "Drywall patching, minor plumbing and electrical fixtures, cabinet repair, and the small fixes that keep getting pushed back.",
    features: [
      "Drywall patching & touch-ups",
      "Minor plumbing fixtures",
      "Minor electrical fixtures",
      "Cabinet & door repair",
      "General home upkeep",
    ],
    startingPrice: "Starting at $49",
    galleryCategories: ["handyman"],
    galleryHeading: "Recent Handyman & Repair Work",
    pricingHeading: "Clear starting prices",
    pricing: [
      { label: "Minor home repairs", price: "$49", note: "Drywall, cabinets, doors and small fixes" },
      { label: "Fixture & appliance installs", price: "$69", note: "Window AC units, fixtures and more" },
    ],
    badges: [
      { icon: "⚡", label: "Same-day & next-day slots" },
      { icon: "💬", label: "Photo quotes by text" },
      { icon: "🛡️", label: "Fully insured" },
    ],
    h1: "Reliable Handyman & Home Repair Services in Pittsburgh",
    metaTitle: "Handyman & Home Repairs Pittsburgh, PA | Fixium Craft",
    metaDescription:
      "Pittsburgh handyman for drywall patching, cabinet repair, minor plumbing & electrical fixtures, and home upkeep. Flat-rate quotes, fully insured.",
    intro: [
      `Fixium Craft is a local home-repair team for the small jobs that keep getting pushed back across ${business.address.city}, ${business.address.state} — drywall patching, cabinet repair, minor plumbing and electrical fixtures, and general home upkeep.`,
      `Send photos of everything on your list and we'll quote it as one flat-rate visit. We serve ${neighborhoods.join(", ")}, and nearby neighborhoods, and every technician is background-checked and fully insured.`,
    ],
    taskGroups: [
      {
        heading: "Drywall patching & wall repair",
        items: [
          "Drywall patching & small hole repair",
          "Caulking & sealing around tubs, sinks & trim",
          "Touch-ups after repairs and installs",
        ],
      },
      {
        heading: "Cabinets & doors",
        items: [
          "Cabinet hinge, door & drawer repair and adjustment",
          "Sticking or misaligned doors",
          "Loose handles, pulls & hardware",
        ],
      },
      {
        heading: "Minor plumbing & electrical fixtures",
        items: [
          "Faucet and showerhead replacement",
          "Running-toilet fixes (flapper, fill valve)",
          "Light fixture swaps and switch & outlet cover plates",
        ],
      },
      {
        heading: "General home upkeep",
        items: [
          "Window AC unit installation",
          "Curtain rods & blinds, hung straight",
          "Furniture repair & childproofing",
          "A punch-list of small fixes handled in one visit",
        ],
      },
    ],
    faqs: [
      {
        question: "What counts as a small handyman job?",
        answer:
          "Anything on that to-do list that doesn't need a specialist: patching a wall, fixing a cabinet door, swapping a faucet or light fixture, hanging blinds. If you're not sure, send us a photo and we'll tell you.",
      },
      {
        question: "Do you do electrical and plumbing work?",
        answer:
          "Minor fixture-level work only, like replacing a faucet, fixing a running toilet, or swapping a light fixture. Anything involving new wiring, panel work, or rerouting pipes needs a licensed electrician or plumber.",
      },
      {
        question: "Can you bundle several small jobs into one visit?",
        answer:
          "Yes, that's the best way to use us. Send photos of everything on your list and we'll quote it as a single flat-rate visit.",
      },
      {
        question: "How much do handyman repairs cost in Pittsburgh?",
        answer:
          "Repairs start at $49, with a flat-rate quote based on the details and photos you send us — never an hourly guess.",
      },
      {
        question: "Do I need to buy parts or materials myself?",
        answer:
          "Our technicians bring their own tools. For small jobs we can often supply common parts; for specific fixtures you want installed, send us the details in your photo or text and we'll confirm what's needed in your quote.",
      },
    ],
  },
];

export const footer = {
  about: `${business.name} provides furniture assembly and mounting, locksmith and door hardware, and general handyman repairs across the Pittsburgh area.`,
  links: [
    { label: "Services", href: "#services" },
    { label: "Recent Projects", href: "#recent-work" },
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
  // Internal links to the 3 pillar pages (see `servicePillars` above and
  // app/services/[slug]/page.tsx) — rendered in LandingPage.jsx's Footer()
  // so they're discoverable from every page, not just the sitemap.
  servicePageLinks: servicePillars.map((p) => ({
    label: `${p.navLabel} in Pittsburgh`,
    href: `/services/${p.slug}`,
  })),
  // Knowledge base (content/guides/*.md, routes in app/guides).
  resourceLinks: [{ label: "Helpful Guides & Knowledge Base", href: "/guides" }],
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
  servicePillars,
  footer,
};

export default contentData;
