import { GalleryRow } from "@/components/gallery/GalleryRow";
import type { CaseStudyHeroBlock } from "@/data/case-studies/types";

type ProjOverviewProps = {
  intro: CaseStudyHeroBlock["intro"];
};

const introCellClassName =
  "flex min-h-0 min-w-0 flex-col gap-[var(--space-s)]";

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
      <p className="type-proj-subtitle whitespace-pre-line text-pretty">
        {body}
      </p>
    </div>
  );
}

/** Hero intro: `3:2:5` row — specs | spacer (middle) | description. `gap="large"`. */
export function ProjOverview({ intro }: ProjOverviewProps) {
  const { timeline, contributors, description } = intro;

  return (
    <section className="w-full" aria-label="Project intro">
      <GalleryRow
        tracks={[2, 1, 1]}
        measure="content"
        gap="large"
        cellClassName={(i) =>
          i === 1 ? "min-h-0 min-w-0" : introCellClassName
        }
      >
        <DescriptionBlock label={description.label} body={description.body} />
        {/* spacer cell */}
        <div aria-hidden className="min-h-0 min-w-0" />
        <>
          <SpecBlock label={timeline.label} body={timeline.body} />
          <SpecBlock label={contributors.label} body={contributors.body} />
        </>
      </GalleryRow>
    </section>
  );
}
