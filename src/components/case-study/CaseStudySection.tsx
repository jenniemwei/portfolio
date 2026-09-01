import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { CASE_STUDY_CONTAINER } from "./caseStudyStyles";

type CaseStudySectionProps = {
  children: ReactNode;
  fullBleed?: boolean;
  tone?: "default" | "green";
  contentGap?: "section" | "related";
  className?: string;
};

/** A narrative-block followed by img-blocks, with the 120px in-section gap. */
export function CaseStudySection({
  children,
  fullBleed = false,
  tone = "default",
  contentGap = "section",
  className,
}: CaseStudySectionProps) {
  const content = (
    <div
      className={cn(
        CASE_STUDY_CONTAINER,
        "flex flex-col",
        contentGap === "related" ? "gap-12" : "gap-30",
      )}
      data-case-section-content
    >
      {children}
    </div>
  );

  if (fullBleed) {
    return (
      <section
        className={cn(
          "w-full py-30",
          tone === "green" && "bg-fill-green text-white",
          className,
        )}
        data-case-section="full"
      >
        {content}
      </section>
    );
  }

  return (
    <section className={className} data-case-section="standard">
      {content}
    </section>
  );
}
