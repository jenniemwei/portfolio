import type { Metadata } from "next";

import {
  CaseStudyMedia,
  CaseStudyNav,
  CaseStudySection,
  HeroSection,
  ImgBlock,
  NarrativeBlock,
} from "@/components/case-study";
import { CASE_STUDY_CONTAINER } from "@/components/case-study/caseStudyStyles";

export const metadata: Metadata = {
  title: "Grammarly Editor | Jennie Wei",
  description:
    "Case study: leading with value on Grammarly Editor's blank state.",
};

const CASE_STUDY_NAV_ITEMS = [
  { id: "context", label: "context" },
  { id: "original-brief", label: "original brief" },
  { id: "reframe", label: "reframe" },
  { id: "shipped-mvp", label: "shipped mvp" },
  { id: "final-designs", label: "final designs" },
] as const;

export default function GrammarlyEditorPage() {
  return (
    <main className="w-full bg-fill-default text-text-default">
      <CaseStudyNav items={CASE_STUDY_NAV_ITEMS} />
      <div className={CASE_STUDY_CONTAINER}>
        <HeroSection
          eyebrow="Case study in progress"
          title="Leading with value on Grammarly's blank state"
          media={{
            src: "/editor/1-hero.webp",
            alt: "Grammarly Editor blank state showing suggested ways to begin writing",
            width: 3200,
            height: 1680,
            priority: true,
          }}
          specs={[
            { label: "Timeline", value: "Summer 2026" },
            { label: "Mentored by", value: "Hiếu Trần, TJ Eby" },
          ]}
          overview="I redesigned Grammarly Editor’s blank state to help people get started and see value right away. I added clearer entry points to AI Chat and Proofreader, then built a blank-state system for every Grammarly agent ahead of the Superhuman Docs and Grammarly Editor merge."
        />
      </div>

      <div className="mt-50 flex flex-col gap-50">
        <CaseStudySection id="context" className="py-6">
          <NarrativeBlock
            note="Context"
            heading="Grammarly Editor has a blank page problem."
            body="Many people come to Grammarly as a final stop: they paste in finished text, then use Proofreader or the AI Detector for a final review. But people who open the Editor without text get little guidance or immediate value, so there’s no clear reason to start or come back."
          />
          <ImgBlock heading="Proofreader is useful once there’s text on the page. On a blank page, there’s no clear value or place to start.">
            <CaseStudyMedia
              src="/editor/2-context.webp"
              alt="Comparison of Grammarly Editor with writing present and on a blank page"
              width={3200}
              height={1600}
            />
          </ImgBlock>
        </CaseStudySection>

        <CaseStudySection id="original-brief">
          <NarrativeBlock
            note="The given brief"
            heading='“Design these four quick starts to help users get text on the page.”'
            hangingQuote
            body="I was given four quick starts and their copy, and asked to figure out how they should appear on the blank canvas. I explored different placements and visual treatments, but the same problem remained: without context, why would someone choose one?"
          />

          <ImgBlock heading="I explored placements for the four quick starts within the main canvas, without using the side panel.">
            <CaseStudyMedia
              src="/editor/3-design-1.webp"
              alt="Early placement explorations for quick-start actions"
              width={800}
              height={410}
            />
          </ImgBlock>

          <ImgBlock
            heading={
              <>
                But I kept coming back to the chips themselves:
                <br />
                Would anyone actually click one, and would the result feel
                useful?
              </>
            }
          >
            <div className="flex flex-col gap-6">
              <CaseStudyMedia
                src="/editor/4-design-2a.webp"
                alt="Exploration of Grammarly blank-state quick-start chips"
                width={3200}
                height={860}
              />
              <CaseStudyMedia
                src="/editor/5-design-2b.webp"
                alt="Additional quick-start chip concepts and annotations"
                width={3200}
                height={1200}
              />
            </div>
          </ImgBlock>
        </CaseStudySection>

        <CaseStudySection id="reframe">
          <NarrativeBlock
            note="Reframing my own brief"
            heading="Quick starts should feel obvious, low-effort, and clearly helpful to someone who isn’t sure where to begin."
          />

          <ImgBlock
            heading="1. Showing what AI Chat can do"
            body="“Help me write” only led to another blank surface. I replaced it with two specific starter prompts that opened AI Chat with an example already in motion, so people could see its value right away."
          >
            <CaseStudyMedia
              src="/editor/6-design-3.webp"
              alt="Use-case-led AI entry point in Grammarly Editor"
              width={3200}
              height={1592}
            />
          </ImgBlock>

          <ImgBlock
            heading="2. Giving Demo text a clearer purpose"
            body="Demo text can show Proofreader in action, but “Demo text” alone isn’t a very motivating CTA. I moved it into the empty Proofreader panel and framed it as a quick way to see Grammarly’s suggestions on a ready-made example."
          >
            <CaseStudyMedia
              src="/editor/7-design-4.webp"
              alt="Demo text starter actions with clearer value propositions"
              width={3204}
              height={1320}
            />
          </ImgBlock>
        </CaseStudySection>

        <div className="flex flex-col">
          <CaseStudySection
            id="shipped-mvp"
            fullBleed
            tone="green"
            contentGap="related"
          >
            <NarrativeBlock
              note="Shipped experiment"
              heading="Testing the new blank state with 500K+ Grammarly Editor users"
              tone="inverse"
            />
            <ImgBlock
              heading="We compared the existing blank state with the new design in a 21-day experiment. The test was still running when my internship ended, so I don’t have final results to share."
              textStyle="body"
              tone="inverse"
            >
              <CaseStudyMedia
                src="/editor/8-exp.webp"
                alt="Shipped Grammarly Editor experiment comparing control and test blank states"
                width={3200}
                height={1998}
              />
            </ImgBlock>
          </CaseStudySection>

          <CaseStudySection id="final-designs" fullBleed>
            <NarrativeBlock
              note="Planning ahead"
              heading="Designing a blank-state pattern that could scale beyond one agent or product."
              body="The experiment had to work around other active tests and a tight engineering timeline. So I also looked beyond the immediate launch and designed a blank-state system that could support the Grammarly Editor and Superhuman Docs merge and scale across agents."
            />

            <ImgBlock heading="I brought patterns from Superhuman Docs into Grammarly’s blank state to support the future merge.">
              <CaseStudyMedia
                src="/editor/9-future-1.webp"
                alt="Shared blank-state design patterns across Grammarly and Superhuman Docs"
                width={3196}
                height={1600}
              />
            </ImgBlock>

            <ImgBlock heading="I expanded the pattern across every Grammarly agent and wrote copy to explain what each one does.">
              <CaseStudyMedia
                src="/editor/10-future-2.webp"
                alt="Blank-state pattern applied across multiple Grammarly agents"
                width={3196}
                height={1600}
              />
            </ImgBlock>

            <ImgBlock heading="I also explored how starter suggestions could become proactive agent suggestions after the blank state.">
              <CaseStudyMedia
                src="/editor/11future-3.webp"
                alt="Proactive Grammarly agent suggestions following the blank state"
                width={3196}
                height={1600}
              />
            </ImgBlock>
          </CaseStudySection>
        </div>
      </div>
    </main>
  );
}
