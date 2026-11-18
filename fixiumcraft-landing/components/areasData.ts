// areasData.ts — neighborhood page data. `ready: false` keeps a page noindex and out of the sitemap
// (and out of the "Areas we serve" links on service pages) until it is reviewed. To publish a page,
// set `ready: true`. Only publish a page that has real, specific local detail: never copy one
// area's text to another.
export type AreaSection = { heading: string; paragraphs?: string[]; bullets?: string[] };
export type Area = {
  slug: string; name: string; ready: boolean;
  service?: string;               // servicePillars slug this page is about, e.g. "furniture-assembly"
  metaTitle?: string; description?: string; h1?: string;
  intro?: string;                 // opening paragraph under the H1
  sections?: AreaSection[];       // body of the page, in order
  faqs?: { question: string; answer: string }[];
  guide?: { slug: string; label: string }; // one related guide linked from the closing CTA
  localFacts: string[];          // fallback bullets for pages without `sections`
  jobs: { title: string; photo?: string; alt?: string }[]; // real completed jobs in this neighborhood
};

export const AREAS: Area[] = [
  {
    slug: "squirrel-hill-furniture-assembly",
    name: "Squirrel Hill",
    ready: true,
    service: "furniture-assembly",
    metaTitle: "Furniture Assembly in Squirrel Hill, Pittsburgh | Fixium Craft",
    description:
      "IKEA and flat-pack furniture assembly in Squirrel Hill, Pittsburgh. Wardrobes, beds, desks and bookcases from $59. Price confirmed before we start.",
    h1: "Furniture Assembly in Squirrel Hill, Pittsburgh",
    intro:
      "Boxes stacked in the hallway, a new bed frame, a wardrobe you keep meaning to build? Fixium Craft assembles IKEA and other flat-pack furniture in Squirrel Hill homes and apartments, from $59, with the price agreed before we start.",
    sections: [
      {
        heading: "Furniture jobs in a neighborhood of houses and rentals",
        paragraphs: [
          "Squirrel Hill is a large residential neighborhood in Pittsburgh's East End, and much of it was built out by the 1930s, including rows of brick houses on the cross streets off Murray Avenue and houses built along the old trolley lines. Alongside owners, the area around Forbes and Murray has a sizeable renter population, so we see two kinds of work: families furnishing a whole house room by room, and renters setting up a new apartment after a lease change.",
          "What that means for the job:",
        ],
        bullets: [
          "Older houses: measure first. If you are buying a tall wardrobe or a large bed frame for an older home, measure the doorways, stairs and the ceiling height of the room before the boxes arrive. A PAX frame is built lying down and then stood up, so you need the room height to clear it.",
          "Apartments and shared buildings: tell us about access. If your building has a buzzer, an entry code, or a limited loading area, mention it when you book. We will plan the visit around it.",
          "Moving season: many renters in the neighborhood move at the same times of year. If you have a hard date, book ahead.",
        ],
      },
      {
        heading: "Where we work",
        paragraphs: [
          "We assemble furniture throughout Squirrel Hill, including the streets around the Forbes and Murray Avenue shopping district, and in nearby East End neighborhoods. Tell us your address when you request a quote and we will confirm we can reach you.",
        ],
      },
      {
        heading: "What we assemble",
        bullets: [
          "IKEA PAX wardrobes, including doors, drawers and rails",
          "Beds, bed frames and storage beds",
          "Dressers, nightstands and chests of drawers",
          "Desks, office chairs and home-office setups",
          "Bookcases, shelving units and TV stands",
          "Dining tables, chairs and kitchen carts",
        ],
        paragraphs: ["We bring our own tools and build in the room where the furniture will live."],
      },
      {
        heading: "What is included",
        bullets: [
          "Unpacking, checking parts against the manual, and building each piece square and level",
          "Moving the finished piece into place in the room you choose",
          "Anchoring tall furniture to the wall if you want it. We check the wall type first and tell you what we recommend",
          "A final check that doors and drawers open and close smoothly",
          "A tidy workspace when we finish",
        ],
        paragraphs: [
          "Furniture assembly starts from $59. Larger jobs and several pieces at once are quoted up front. Send a photo or the product name through the quote form and we will give you a price before we begin.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you build furniture that did not come from IKEA?",
        answer:
          "Yes. We build flat-pack furniture from most retailers and online stores. Send the product name or manual with your quote request.",
      },
      {
        question: "Can you come the same day?",
        answer:
          "Same-day and next-day appointments are offered subject to availability. Our hours are 7 AM to 11 PM, by appointment.",
      },
      {
        question: "I live in an apartment with limited parking. Is that a problem?",
        answer:
          "Not usually. Tell us about parking and building access when you book and we will plan around it.",
      },
      {
        question: "Will you secure my dresser or bookcase to the wall?",
        answer:
          "We can. Tall furniture should be fastened to a stud or with the right anchors for your wall. Our guide to anchoring a dresser or bookcase explains how it works.",
      },
    ],
    guide: { slug: "how-to-anchor-a-dresser-or-bookcase-to-a-wall", label: "How to anchor a dresser or bookcase to a wall" },
    localFacts: [],
    jobs: [],
  },
  {
    slug: "shadyside-furniture-assembly",
    name: "Shadyside",
    ready: true,
    service: "furniture-assembly",
    metaTitle: "Furniture Assembly in Shadyside, Pittsburgh | Fixium Craft",
    description:
      "IKEA and flat-pack furniture assembly in Shadyside, Pittsburgh. Beds, PAX wardrobes, desks and bookcases from $59. Flat-rate quote before we start.",
    h1: "Furniture Assembly in Shadyside, Pittsburgh",
    intro:
      "Moving into a Shadyside apartment, or finally unboxing the wardrobe that has been in the hallway for a week? Fixium Craft builds IKEA and other flat-pack furniture for Shadyside homes and offices, from $59, with the price agreed before we start.",
    sections: [
      {
        heading: "Built for how Shadyside homes are laid out",
        paragraphs: [
          "Shadyside is a mix of Victorian mansions and modern apartments and condominiums. That mix means the furniture jobs here vary a lot: a single bed in a one-bedroom unit, a full PAX wardrobe, a home-office desk in a spare room, or several rooms at once after a move.",
          "Two practical points come up in this neighborhood. Shadyside's compact layout means most houses do not have garages, so deliveries and parking are worth planning. When you book, tell us where we can park, whether there is a building entrance code or buzzer, and whether you have an elevator or stairs to carry boxes up. If your street uses residential permit parking, mention that too so we can plan the visit.",
        ],
      },
      {
        heading: "What we assemble",
        bullets: [
          "IKEA PAX wardrobes, including doors, interior drawers and rails",
          "Beds, bed frames and storage beds",
          "Dressers, nightstands and chests of drawers",
          "Desks, office chairs and home-office setups",
          "Bookcases, shelving units and TV stands",
          "Dining tables, chairs and kitchen carts",
          "Furniture for small offices and studios",
        ],
        paragraphs: ["We bring our own tools and build the piece in the room where it will live."],
      },
      {
        heading: "What is included",
        bullets: [
          "Unpacking, checking the parts against the manual, and building the piece square and level",
          "Moving the finished piece into place in the room you choose",
          "Anchoring tall furniture, such as dressers and bookcases, to the wall when you want it. We check what the wall is made of first and tell you what we recommend",
          "A final check that doors and drawers open and close smoothly",
          "A tidy workspace when we finish",
        ],
        paragraphs: [
          "Furniture assembly starts from $59, and larger or multi-piece jobs are quoted up front. Send us a photo or the product name through the quote form and we will give you a flat-rate price before we begin.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you assemble furniture I bought somewhere other than IKEA?",
        answer:
          "Yes. We build flat-pack furniture from most retailers and online stores. If you have the manual or the product name, send it with your quote request.",
      },
      {
        question: "Can you come the same day?",
        answer:
          "Same-day and next-day appointments are offered subject to availability. Our hours are 7 AM to 11 PM. Book ahead if you have a deadline, such as a move-in date.",
      },
      {
        question: "What should I have ready before you arrive?",
        answer:
          "The boxes opened or accessible, the manuals if you still have them, and a clear spot in the room. If the building has a code, a buzzer, or limited parking, tell us when you book.",
      },
      {
        question: "Will you anchor my dresser or bookcase to the wall?",
        answer:
          "We can. Tall furniture should be secured to a wall stud or with the right anchors for your wall type. Tell us what you have and we will quote it with the assembly. Our guide to anchoring a dresser or bookcase explains how it works.",
      },
    ],
    guide: { slug: "how-to-anchor-a-dresser-or-bookcase-to-a-wall", label: "How to anchor a dresser or bookcase to a wall" },
    localFacts: [],
    jobs: [],
  },
  { slug: "south-side", name: "South Side", ready: false, localFacts: [], jobs: [] },
];

/** Published area pages for one service, for "Areas we serve" links. Empty until an area is ready. */
export const readyAreasFor = (service: string) => AREAS.filter((a) => a.ready && a.service === service);
