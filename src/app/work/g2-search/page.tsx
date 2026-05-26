import type { Metadata } from "next";
import Image from "next/image";

import { Callout, ProjHero, Row, HeaderSection } from "@/components/case-study";

/** Responsive case-study figures: intrinsic dims for `srcset`; layout scales with container. */
const CASE_STUDY_IMG_SIZES =
  "(max-width: 48rem) 100vw, (max-width: 80rem) 90vw, min(72rem, 100vw)";

export const metadata: Metadata = {
  title: "G2 Search — Jennie Wei",
  description: "Case study: G2 Search — smarter search for software buyers.",
};

export default function G2SearchPage() {
  return (
    <main className="w-full flex-col gap-lg py-16">
      <div className="pg-w-80 flex-col gap-lg px-gutter">
      <ProjHero
        images={[
          {
            src: "/thumbnails/g2-search-thumb.png",
            alt: "Previous G2 search results page",
          },
        ]}
        title="Smarter search @ G2"
        specs={[
          { label: "TIMELINE", value: "Summer 2025\n10 weeks" },
          {
            label: "WITH",
            value: "Mentored by:\nAllison Horrell,\nAryn Silverberg",
          },
        ]}
        description="As a Product Design Intern, I owned the redesign of G2's core search experience, handing off MVP changes that drove an 8.5% lift in user conversion on search pages, and defining new AI design patterns now used across the product."
      />

      {/* ─── The Story ────────────────────────────── */}
      <HeaderSection id="context" header="The Story">
        <Row cols="3fr 1fr">
          <div className="flex-col items-start gap-md">
            <Image
              src="/g2-search-pg/search-stats1.png"
              alt="Search stats"
              width={1429}
              height={626}
              sizes={CASE_STUDY_IMG_SIZES}
              className="h-auto w-full"
             
            />
          </div>
          <div className="flex-col items-center justify-center gap-md">
            <h3 className="type-h3-subhead">
              Buyers search a lot but don&apos;t engage with results
            </h3>
          </div>
        </Row>

        <section>
          <h3 className="type-h3-subhead">
            An outdated search page optimized for SEO, not buyers
          </h3>
          <Row cols="1fr">
            <Image
              src="/g2-search-pg/old-pg.png"
              alt="Old search page"
              width={1974}
              height={1022}
              sizes={CASE_STUDY_IMG_SIZES}
              className="h-auto w-full object-contain"
             
            />
          </Row>


        </section>
      </HeaderSection>


      {/* ─── Brainstorm ───────────────────────────── */}
      <HeaderSection id="brainstorm" header="Brainstorm">
      <h3 className="type-h3-subhead content-mw-800">
        AI is never a magical black box, so early on I ran a brainstorm with Buyer Team engineers to better understand the limitations and possibilities directly from those who build and maintain it.
      </h3>
      <Row cols="1fr 1fr 1fr" className="gap-xs">
        <Image src="/g2-search-pg/Search_Brainstorm1.png" alt="Brainstorm" width={1000} height={1000} sizes={CASE_STUDY_IMG_SIZES} className="h-auto w-full" />
        <Image src="/g2-search-pg/Search_Brainstorm2.png" alt="Brainstorm" width={1000} height={1000} sizes={CASE_STUDY_IMG_SIZES} className="h-auto w-full" />
        <Image src="/g2-search-pg/Search_Brainstorm3.png" alt="Brainstorm" width={1000} height={1000} sizes={CASE_STUDY_IMG_SIZES} className="h-auto w-full" />
      </Row>
      </HeaderSection>


      {/* Design ------------------------------------ */}
      <HeaderSection id="initial-design" header="Design">
      <Row cols="1fr 2fr">
          <div className="flex-col justify-start gap-md">
            <p className="type-body-sm">01.</p>
            <p className="type-body">
              Prompt to filter using G2&apos;s robust software data
            </p>
          </div>
          <Image
              src="/g2-search-pg/search-assistant.png"
              alt="Search assistant"
              width={924}
              height={1114}
              sizes={CASE_STUDY_IMG_SIZES}
              className="h-auto w-full"
             
            />
       </Row>
        <Row cols="1fr 1fr" className="justify-items-start">
          <div className="flex-col gap-md">
            <p className="type-body-sm">02.</p>
            <p className="type-body">
              Context-based dynamic product card content
            </p>
            <Image
              src="/g2-search-pg/cards.png"
              alt="Product cards"
              width={1794}
              height={1146}
              sizes={CASE_STUDY_IMG_SIZES}
              className="h-auto w-full"
             
            />
          </div>
        </Row>

        <Row cols="3fr 2fr">
          <div className="flex-col items-start gap-md">
            <Image
              src="/g2-search-pg/inline.png"
              alt="Inline assistance"
              width={1886}
              height={892}
              sizes={CASE_STUDY_IMG_SIZES}
              className="h-auto w-full"
             
            />
          </div>
          <div className="flex-col items-start gap-md">
            <p className="type-body-sm">03.</p>
            <p className="type-body">
              Inline assistance so buyers can refine results without breaking
              flow
            </p>
          </div>
        </Row>

        <div className="content-w-80">
        <Callout>
          How far can we personalize a search result experience?
        </Callout>
        </div>
      </HeaderSection>
     
      </div>
    </main>
  );
}
