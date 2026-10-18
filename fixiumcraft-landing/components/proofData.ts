// proofData.ts — owner-supplied facts that power the trust / conversion blocks.
// Every block that reads this file renders nothing until you fill it in, so an
// unconfirmed claim can never appear on the live site.

export const trustFacts = {
  /** PA Attorney General home-improvement registration, e.g. "PA123456". Leave "" unless registered. */
  hicNumber: "",
  /** true only if you can email a certificate of insurance on request. */
  insuranceCertOnRequest: false,
  /** Shown as "Next open slot: ..." in the hero. Update by hand; "" hides it. Never fake scarcity. */
  nextOpenSlot: "",
};

export type EstimatorItem = { id: string; label: string; price: number; max?: number };

/** OWNER: put your real flat-rate prices here. Empty list = estimator hidden for that service. */
export const estimatorItems: Record<string, EstimatorItem[]> = {
  "furniture-assembly": [
    // { id: "chair", label: "Office chair / small item", price: 59 },
    // { id: "dresser", label: "Dresser or bookcase (anchored)", price: 89 },
    // { id: "pax", label: "IKEA PAX wardrobe", price: 149 },
  ],
  "tv-mounting": [],
  "handyman-repairs": [],
  locksmith: [],
};

export const estimatorMinimum: Record<string, number> = {
  "furniture-assembly": 59,
  "tv-mounting": 89,
  "handyman-repairs": 49,
  locksmith: 79,
};

/** OWNER: honest DIY-vs-pro comparison per service (times, risks, what's included). */
export const diyVsHire: Record<string, { diy: string[]; pro: string[] } | undefined> = {
  "furniture-assembly": {
    diy: ["Your weekend, plus tools you may not own", "Over-tightening strips particleboard", "Tall pieces must be anchored to a stud"],
    pro: ["Flat rate from $59, quoted before we start", "Anchored, level, no leftover screws", "Packaging cleaned up and hauled out"],
  },
  "handyman-repairs": {
    diy: ["Patch, dry, sand, prime, paint: several trips to the store", "A visible patch if the paint doesn't match"],
    pro: ["Flat rate from $49, one visit", "Patch, prime and touch-up done together"],
  },
  "tv-mounting": undefined,
  locksmith: undefined,
};
