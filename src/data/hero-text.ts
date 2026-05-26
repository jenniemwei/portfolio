/** Rotating taglines shown after “Jennie Wei is a product designer” in the hero. */
export const HERO_TAGLINES = [
  "creating with intention and curiosity to understand people",
  "building meaningful tools that teach and empower humans",
  "who experiments, builds, and breaks things occasionally",
] as const;

export type HeroTagline = (typeof HERO_TAGLINES)[number];
