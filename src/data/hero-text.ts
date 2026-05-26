/** Static lead-in before the rotating typewriter tagline in the hero. */
export const HERO_HEADLINE_PREFIX = "Jennie Wei is a product designer ";

/** Rotating taglines shown after {@link HERO_HEADLINE_PREFIX} in the hero. */
export const HERO_TAGLINES = [
  "creating with intention, curiosity, and a drive to understand people",
  "building meaningful tools that teach and empower humans",
  "who experiments, builds, and breaks things occasionally",
] as const;

export type HeroTagline = (typeof HERO_TAGLINES)[number];

/** Longest tagline — used to reserve headline layout and avoid line-wrap jumps. */
export const HERO_TAGLINE_LONGEST = HERO_TAGLINES.reduce((longest, line) =>
  line.length >= longest.length ? line : longest,
);
