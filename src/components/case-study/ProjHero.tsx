import Image from "next/image";

import { Row } from "./Row";
import { Spacer } from "./Spacer";
import { SpacerSection } from "../sections/SpacerSection";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroSpec {
  label: string;
  value: string;
}

interface ProjHeroProps {
  images: HeroImage[];
  title: string;
  specs: HeroSpec[];
  description: string;
}

export function ProjHero({ images, title, specs, description }: ProjHeroProps) {
  return (
    <>
      <header className="w-full flex-col gap-md">
        {/* hero visuals: fixed band height; images cover each cell */}
        <section
          aria-label="Hero visuals"
          className="h-[50vh] min-h-0 w-full"
        >
          <Row
            cols={images.length === 2 ? "1fr 1fr" : "1fr"}
            className="h-full min-h-0 grid-rows-[minmax(0,1fr)]"
          >
            {images.map((img) => (
              <div
                key={img.src}
                className="h-full min-h-0 w-full flex-col items-start gap-md"
              >
                <div className="relative min-h-0 w-full flex-1 overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1023px) 100vw, 60vw"
                    priority
                  />
                </div>
              </div>
            ))}
          </Row>
        </section>

        {/* title + rule */}
        <h1 className="type-proj-title">{title}</h1>
        <hr className="bottom-hr" />

        {/* specs row */}
        <Row cols="1fr 1fr 2fr">
          <div className="flex-col items-start gap-lg">
            {specs.map((s) => (
              <div key={s.label} className="flex-col">
                <p className="type-body-sm-bold">{s.label}</p>
                <p className="type-body-sm whitespace-pre-line">{s.value}</p>
              </div>
            ))}
          </div>
          <Spacer />
          <div className="flex-col items-start gap-md">
            <p className="type-hero-description w-full min-w-0 text-pretty">
              {description}
            </p>
          </div>
        </Row>
      </header>
      <SpacerSection />
    </>
  );
}
