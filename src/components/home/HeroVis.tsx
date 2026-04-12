import { HeroRiveDog } from "@/components/home/HeroRiveDog";

/**
 * Hero band: 6-column grid with illustration top-right; Rive may overflow below the framed area.
 */
export function HeroVis() {
  return (
    <section
      className="grid w-full grid-cols-6 grid-rows-1 gap-x-[var(--hero-grid-gap-x)] overflow-visible"
      aria-label="Hero"
    >
      <div className="col-span-3 hidden md:col-span-3 md:block" />
      <div className="col-span-6 flex items-start justify-end overflow-visible border-line border-l border-solid p-[var(--space-m)] md:col-span-3">
        <div className="relative w-full max-w-[var(--hero-visual-max-width)] overflow-visible">
          <HeroRiveDog />
        </div>
      </div>
    </section>
  );
}
