import type {
  CaseStudySection,
  CaseStudySectionRow,
} from "@/data/case-studies/types";

import { SplitRow } from "@/components/content-row/SplitRow";
import { CalloutHeader } from "@/components/proj-page/CalloutHeader";
import { SectionHeader } from "@/components/proj-page/SectionHeader";

type ProjSectionRowProps = {
  row: CaseStudySectionRow;
};

/** One row inside `ProjSection` (prose block or split image row). */
function ProjSectionRow({ row }: ProjSectionRowProps) {
  if (row.rowKind === "prose") {
    return (
      <p className="type-body max-w-[var(--secondary-intro-max-width)] whitespace-pre-line text-pretty text-default">
        {row.body}
      </p>
    );
  }

  if (row.rowKind === "callout") {
    return (
      <div className="flex w-full justify-center py-[var(--space-64)]">
        <CalloutHeader as="h3">{row.heading}</CalloutHeader>
      </div>
    );
  }

  return (
    <SplitRow
      tracks={row.tracks}
      cells={row.cells}
      measure={row.measure ?? "content"}
    />
  );
}

type ProjSectionProps = {
  section: CaseStudySection;
};

/**
 * Case-study body section: optional intro `body`, then optional vertical `rows`
 * (prose, callout headings, and/or split image rows).
 */
export function ProjSection({ section }: ProjSectionProps) {
  const { sectionId, sectionHeader, body, rows } = section;

  return (
    <section
      id={sectionId}
      className="flex w-full flex-col gap-[var(--space-lg)] py-[var(--space-48)]"
      aria-labelledby={`${sectionId}-heading`}
    >
      <SectionHeader
        id={`${sectionId}-heading`}
        sectionHeader={sectionHeader}
      />
      {body ? (
        <p className="type-body max-w-[var(--secondary-intro-max-width)] whitespace-pre-line text-pretty text-default">
          {body}
        </p>
      ) : null}
      {rows != null && rows.length > 0 ? (
        <div className="flex w-full flex-col gap-[var(--space-lg)]">
          {rows.map((row, i) => (
            <ProjSectionRow key={`${sectionId}-row-${i}`} row={row} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
