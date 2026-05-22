/** Rotating taglines shown after “Jennie Wei is a product designer” in the hero. */
export const HERO_TAGLINES = [
  "creating with intention, curiosity, and a drive to understand people",
  "building meaningful tools to empower and enable humans",
  "who experiments, builds, and breaks things (occasionally)",
] as const;

export type HeroTagline = (typeof HERO_TAGLINES)[number];
