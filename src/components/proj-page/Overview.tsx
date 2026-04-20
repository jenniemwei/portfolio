import { GalleryRow } from "@/components/gallery/GalleryRow";
import type { CaseStudyHeroBlock } from "@/data/case-studies/types";
import type { CSSProperties } from "react";

type ProjOverviewProps = {
  intro: CaseStudyHeroBlock["intro"];
};

const introOuterCellClassName =
  "flex min-h-0 min-w-0 flex-col gap-[var(--space-s)]";

const introSpecsCellClassName =
  "flex min-h-0 min-w-0 flex-col gap-[var(--space-s)]";

/** Specs column: max 80% of each 50–50 track, centered; inner 1fr 1fr grid with copy spanning both (inline styles below). */
const introSpecsInnerShellStyle: CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  maxWidth: "80%",
  marginInline: "auto",
  minHeight: 0,
  minWidth: 0,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: "var(--space-s)",
  rowGap: "var(--space-s)",
};

const introSpecsInnerSpanStyle: CSSProperties = {
  gridColumn: "1 / -1",
  minWidth: 0,
  minHeight: 0,
};

function SpecBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col gap-[var(--space-s)]">
      <p className="type-body-sm font-semibold uppercase tracking-wide text-subtle">
        {label}
      </p>
      <p className="type-body-sm whitespace-pre-line text-default">{body}</p>
    </div>
  );
}

function DescriptionBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col gap-[var(--space-s)]">
      {label ? (
        <p className="type-body-sm font-semibold uppercase tracking-wide text-subtle">
          {label}
        </p>
      ) : null}
      <p className="type-proj-subtitle whitespace-pre-line text-pretty text-default">
        {body}
      </p>
    </div>
  );
}

/** Hero intro: specs (50–50) with local 80% / 1fr–1fr shell per cell; description (`type-proj-subtitle`). Outer row `gap="large"`. */
export function ProjOverview({ intro }: ProjOverviewProps) {
  const { timeline, contributors, description } = intro;

  return (
    <section className="w-full" aria-label="Project intro">
      <GalleryRow
        tracks={[1, 1]}
        measure="content"
        gap="large"
        cellClassName={() => introOuterCellClassName}
      >
        <GalleryRow
          tracks={[1, 1]}
          measure="content"
          cellClassName={() => introSpecsCellClassName}
        >
          <div style={introSpecsInnerShellStyle}>
            <div style={introSpecsInnerSpanStyle}>
              <SpecBlock label={timeline.label} body={timeline.body} />
            </div>
          </div>
          <div style={introSpecsInnerShellStyle}>
            <div style={introSpecsInnerSpanStyle}>
              <SpecBlock label={contributors.label} body={contributors.body} />
            </div>
          </div>
        </GalleryRow>
        <DescriptionBlock label={description.label} body={description.body} />
      </GalleryRow>
    </section>
  );
}
