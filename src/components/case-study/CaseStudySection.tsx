import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { CASE_STUDY_CONTAINER } from "./caseStudyStyles";

type CaseStudySectionProps = {
  children: ReactNode;
  id?: string;
  fullBleed?: boolean;
  tone?: "default" | "neutral";
  contentGap?: "section" | "related";
  className?: string;
};

/** A narrative-block followed by img-blocks, with the 80px in-section gap. */
export function CaseStudySection({
  children,
  id,
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
        contentGap === "related" ? "gap-12" : "gap-case-section",
      )}
      data-case-section-content
    >
      {children}
    </div>
  );

  if (fullBleed) {
    return (
      <section
        id={id}
        className={cn(
          "w-full scroll-mt-6 py-case-between-section",
          tone === "neutral" && "bg-fill-neutral",
          className,
        )}
        data-case-section="full"
      >
        {content}
      </section>
    );
  }

  return (
    <section
      id={id}
      className={cn("scroll-mt-6", className)}
      data-case-section="standard"
    >
      {content}
    </section>
  );
}
