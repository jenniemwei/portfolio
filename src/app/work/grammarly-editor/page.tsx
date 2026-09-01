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
  title: "Grammarly Editor — Jennie Wei",
  description:
    "Case study: leading with value on Grammarly Editor's blank state.",
};

export default function GrammarlyEditorPage() {
  return (
    <main className="w-full bg-fill-default text-text-default">
      <CaseStudyNav />
      <div className={CASE_STUDY_CONTAINER}>
        <HeroSection
          eyebrow="Case study in progress"
          title="Leading with value on Grammarly's blank state"
          media={{
            src: "/editor/1-hero.png",
            alt: "Grammarly Editor blank state showing suggested ways to begin writing",
            width: 3200,
            height: 1680,
            priority: true,
          }}
          specs={[
            { label: "Timeline", value: "Summer 2026" },
            { label: "Mentored by", value: "Hiếu Trần, TJ Eby" },
          ]}
          overview="I redesigned Grammarly Editor's blank state to make the first action feel obvious, useful, and connected to the broader product, without interrupting the core Grammarly Proofreader workflow."
        />
      </div>

      <div className="mt-50 flex flex-col gap-50">
        <CaseStudySection className="py-6">
          <NarrativeBlock
            note="Context"
            heading="Grammarly Editor has a blank page problem."
            body="Many users come to Grammarly as a final stop, pasting in their text and using Proofreader or AI detector for a final review. But for users who come to Grammarly with no text in mind and just looking to explore, the retention isn’t very great. No one uses Grammarly editor as a writing surface."
          />
          <ImgBlock heading="Proofreader is useful with text on the page, the blank state shows no immediate value or clear place to start.">
            <CaseStudyMedia
              src="/editor/2-context.png"
              alt="Comparison of Grammarly Editor with writing present and on a blank page"
              width={3200}
              height={1600}
            />
          </ImgBlock>
        </CaseStudySection>

        <CaseStudySection>
          <NarrativeBlock
            note="The given brief"
            heading='“Design these four quick starts to help users get text on the page.”'
            hangingQuote
            body="I was given a direct brief on what quick starts to design and what they should say. I explored different variations in placement and design, but the chips themselves still felt unhelpful without context."
          />

          <ImgBlock heading="I started exploring designs placements for the quickstarts, limited to the main canvas area (no side panel)">
            <CaseStudyMedia
              src="/editor/3-design-1.png"
              alt="Early placement explorations for quick-start actions"
              width={800}
              height={410}
            />
          </ImgBlock>

          <ImgBlock
            heading={
              <>
                But I started questioning the actual chips themselves...
                <br />
                Would someone actually click on these? And do the results feel
                helpful?
              </>
            }
          >
            <div className="flex flex-col gap-6">
              <CaseStudyMedia
                src="/editor/4-design-2a.png"
                alt="Exploration of Grammarly blank-state quick-start chips"
                width={3200}
                height={860}
              />
              <CaseStudyMedia
                src="/editor/5-design-2b.png"
                alt="Additional quick-start chip concepts and annotations"
                width={3200}
                height={1200}
              />
            </div>
          </ImgBlock>
        </CaseStudySection>

        <CaseStudySection>
          <NarrativeBlock
            note="Reframing my own brief"
            heading="Quick starts should be unambiguous, low-effort, and lead with value for an unsure user."
          />

          <ImgBlock
            heading="1. AI Chat entry points that lead with example use cases"
            body="Instead of a vague “Help me write” that leads you to a blank chat, I created two starter prompt chips that redirect you to AI chat with a prompt in action, so people are immediately aware of AI Chat’s composition ability."
          >
            <CaseStudyMedia
              src="/editor/6-design-3.png"
              alt="Use-case-led AI entry point in Grammarly Editor"
              width={3200}
              height={1592}
            />
          </ImgBlock>

          <ImgBlock
            heading="2. Moving Demo text for clearer value"
            body="Demo text quickly lets new users see Proofreader in action, but “Demo text” as a CTA isn’t very motivating. After exploring variations in chip copy, I decided to place Demo text in context of the empty panel for clearer value."
          >
            <CaseStudyMedia
              src="/editor/7-design-4.png"
              alt="Demo text starter actions with clearer value propositions"
              width={3204}
              height={1320}
            />
          </ImgBlock>
        </CaseStudySection>

        <div className="flex flex-col">
          <CaseStudySection fullBleed tone="green" contentGap="related">
            <NarrativeBlock
              note="Shipped experiment"
              heading="Putting the experiment to the test on Grammarly Editor to 500k+ users"
              tone="inverse"
            />
            <ImgBlock
              heading="Control (no CTAs) vs. test (this design) in a 21-day experiment that didn’t conclude by the end of my internship."
              textStyle="body"
              tone="inverse"
            >
              <CaseStudyMedia
                src="/editor/8-exp.png"
                alt="Shipped Grammarly Editor experiment comparing control and test blank states"
                width={3200}
                height={1998}
              />
            </ImgBlock>
          </CaseStudySection>

          <CaseStudySection fullBleed>
            <NarrativeBlock
              note="Planning ahead"
              heading="Designing the future blank state pattern to scale beyond one agent and one product."
              body="The experiment design was created under constraints of other active experiments and engineering timelines. I wanted to own the future after the experiment, especially in the context of the future merge between Grammarly Editor and Superhuman Docs product surfaces."
            />

            <ImgBlock heading="I brought design patterns from Superhuman Docs to Grammarly’s blank state to support the future product merge.">
              <CaseStudyMedia
                src="/editor/9-future-1.png"
                alt="Shared blank-state design patterns across Grammarly and Superhuman Docs"
                width={3196}
                height={1600}
              />
            </ImgBlock>

            <ImgBlock heading="I scaled the blank state pattern across all Grammarly agents, and created copy that explains each agent’s purpose.">
              <CaseStudyMedia
                src="/editor/10-future-2.png"
                alt="Blank-state pattern applied across multiple Grammarly agents"
                width={3196}
                height={1600}
              />
            </ImgBlock>

            <ImgBlock heading="Expanding the starter suggestion design to proactive agent suggestions after the blank state.">
              <CaseStudyMedia
                src="/editor/11future-3.png"
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
