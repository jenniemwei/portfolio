import type { Metadata } from "next";
import { Fragment } from "react";

import { ProjHero, ProjectPasswordGate, ProjSection } from "@/components/proj-page";
import { SpacerSection } from "@/components/sections/SpacerSection";
import { g2SearchCaseStudy } from "@/data/case-studies/g2-search";
import { getProjectPageByHref } from "@/data/project-pages";

export const metadata: Metadata = {
  title: "G2 Search — Jennie Wei",
  description: "Case study: G2 Search — smarter search for software buyers.",
};

export default function G2SearchProjectPage() {
  const sections = g2SearchCaseStudy.sections;
  const passwordProtected =
    getProjectPageByHref("/work/g2-search")?.passwordProtected ?? false;

  return (
    <ProjectPasswordGate enabled={passwordProtected}>
      <main className="mx-auto flex w-full max-w-[var(--content-max)] flex-col px-[var(--page-gutter)] py-[var(--space-64)]">
        <ProjHero hero={g2SearchCaseStudy.hero} />
        <SpacerSection />
        {sections.map((section, index) => (
          <Fragment key={section.sectionId}>
            <ProjSection section={section} />
            {index < sections.length - 1 ? <SpacerSection /> : null}
          </Fragment>
        ))}
      </main>
    </ProjectPasswordGate>
  );
}
