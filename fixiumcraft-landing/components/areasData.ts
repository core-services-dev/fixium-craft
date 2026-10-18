// areasData.ts — neighborhood page data. `ready: false` keeps a page noindex and out of the sitemap
// until it has real photos, local facts and a review from that neighborhood.
export type Area = {
  slug: string; name: string; ready: boolean;
  localFacts: string[];          // what is genuinely different about work here (housing stock, parking, stairs...)
  jobs: { title: string; photo?: string; alt?: string }[]; // real completed jobs in this neighborhood
};
export const AREAS: Area[] = [
  { slug: "squirrel-hill", name: "Squirrel Hill", ready: false, localFacts: [], jobs: [] },
  { slug: "shadyside", name: "Shadyside", ready: false, localFacts: [], jobs: [] },
  { slug: "south-side", name: "South Side", ready: false, localFacts: [], jobs: [] },
];
