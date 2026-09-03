import type { Metadata } from "next";

import {
  CaseStudyMedia,
  CaseStudyNav,
  CaseStudySection,
  HeroSection,
  ImgBlock,
  NarrativeBlock,
} from "@/components/case-study";
import {
  CASE_NOTE,
  CASE_STUDY_CONTAINER,
} from "@/components/case-study/caseStudyStyles";

export const metadata: Metadata = {
  title: "G2 Search | Jennie Wei",
  description: "Case study: smarter search results for software buyers on G2.",
};

const CASE_STUDY_NAV_ITEMS = [
  { id: "overview", label: "overview" },
  { id: "context", label: "context" },
  { id: "research", label: "research" },
  { id: "design", label: "design" },
] as const;

export default function G2SearchPage() {
  return (
    <main className="w-full bg-fill-default text-text-default">
      <CaseStudyNav items={CASE_STUDY_NAV_ITEMS} />

      <section id="overview" className={CASE_STUDY_CONTAINER}>
        <HeroSection
          title="Smarter search results on G2.com"
          media={{
            src: "/g2-search/1-hero.png",
            alt: "Personalized G2 search results alongside the G2 AI assistant",
            width: 3200,
            height: 1680,
            priority: true,
          }}
          specs={[
            { label: "Timeline", value: "Summer 2025" },
            {
              label: "Mentored by",
              value: "Allison Horrell,\nAryn Silverberg",
            },
          ]}
          overview={"I owned G2's core search experience, delivering a full search page redesign and shipping 3 MVP changes during my internship that drove an 8.5% lift in user conversion on search pages.\nMy work defined the new product card design pattern and AI interaction patterns now used across the product."}
        />
      </section>

      <div className="mt-case-between-section flex flex-col gap-case-between-section">
        <CaseStudySection id="context" className="py-6">
          <NarrativeBlock
            note="Context"
            heading="G2 is a software marketplace platform that connects sellers with buyer insights"
            body="Buyers discover and compare products, while sellers pay for market insights and buyer-intent data. However, the user engagement that drives buyer-intent data was declining: 48% of buyers searching on G2 left without clicking a single result."
          />
        </CaseStudySection>

        <CaseStudySection id="research" className="py-6">
          <NarrativeBlock
            note="The problem"
            heading="G2 has the answers, but search doesn’t surface them, so buyers leave."
            body="I started out by evaluating the existing experience, looking at competitors, and, most importantly, hearing from real software buyers through a preliminary user test I conducted to truly understand the buyer perspective."
          />

          <ImgBlock
            heading="The search page was still optimized for SEO, not buyer needs, and tacking on AI wouldn’t fix it"
            body="The buyer side of G2 had long been neglected: the legacy search page had hidden and limited filters, massive product cards filled with jargon, and an AI sparkle that provided no reason to click."
          >
            <CaseStudyMedia
              src="/g2-search/2-oldpg.png"
              alt="Annotated legacy G2 search page showing hidden filters, category jargon, and an unexplained AI control"
              width={3200}
              height={1600}
            />
          </ImgBlock>

          <ImgBlock
            heading="Software buyers search for specific needs, but filters on G2 don’t meet them there."
            body="In my usability testing with six buyer-persona participants, everyone described specific requirements and prioritized shortlisting results immediately, but user analytics show that the current filters fall short."
          >
            <CaseStudyMedia
              src="/g2-search/3-researchdata.png"
              alt="Buyer quote paired with analytics showing low engagement with G2 search filters"
              width={3200}
              height={1440}
            />
          </ImgBlock>

          <ImgBlock heading="I led an HMW brainstorm with my team to explore the possibilities and limitations of G2’s search data with the people who know it best.">
            <CaseStudyMedia
              src="/g2-search/4-brainstorm.png"
              alt="How-might-we workshop with engineers, a data analyst, and a product design mentor"
              width={3200}
              height={1460}
            />
          </ImgBlock>

          <ImgBlock heading="I explored design interventions for the opportunities we identified:">
            <CaseStudyMedia
              src="/g2-search/5-lowfi.png"
              alt="Low-fidelity explorations for tailored filtering, personalized results, and contextual AI prompts"
              width={3200}
              height={1200}
            />
          </ImgBlock>
        </CaseStudySection>

        <CaseStudySection id="design" className="pb-case-between-section">
          <NarrativeBlock
            note="Initial Design"
            heading="How far can we personalize a search results page to each buyer’s needs?"
            body="After exploring different intervention points from the search bar to the category pages, I decided to focus on the search results page. I designed a smarter, personalized search experience built on G2’s existing data infrastructure, pointing users to G2 AI only when helpful."
          />

          <ImgBlock heading="1. Buyers describe their needs; G2 surfaces the right filters">
            <CaseStudyMedia
              src="/g2-search/6-design1.png"
              alt="Search Assistant translating a buyer’s written needs into active and suggested filters"
              width={3200}
              height={1600}
            />
          </ImgBlock>

          <ImgBlock heading="2. Showing the right information, in the right amount, on product result cards">
            <CaseStudyMedia
              src="/g2-search/7-design2.png"
              alt="Personalized G2 product cards showing how each result matches the buyer’s needs"
              width={3200}
              height={1600}
            />
          </ImgBlock>

          <div className="flex flex-col gap-6">
            <ImgBlock heading="3. G2 AI entry points appear when buyers would actually want them—not all the time">
              <CaseStudyMedia
                src="/g2-search/8-design3.png"
                alt="Contextual G2 AI entry points shown within product cards and empty search results"
                width={3200}
                height={1600}
              />
            </ImgBlock>
            <p className={`${CASE_NOTE} m-0 normal-case text-text-subtle`}>
              case study incomplete... come back soon!
            </p>
          </div>
        </CaseStudySection>
      </div>
    </main>
  );
}
