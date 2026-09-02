import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { CASE_BODY, CASE_PRINCIPLE_HEADING } from "./caseStudyStyles";

type PrincipleBlockProps = {
  number: number;
  heading: ReactNode;
  body?: ReactNode;
  children: ReactNode;
  contentGap?: "default" | "related";
  divider?: boolean;
};

/** A numbered case-study principle followed by supporting media or img-blocks. */
export function PrincipleBlock({
  number,
  heading,
  body,
  children,
  contentGap = "default",
  divider = false,
}: PrincipleBlockProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6",
        divider && "border-b border-line pb-12",
      )}
      data-case-block="principle-block"
    >
      <header className="flex max-w-[600px] flex-col gap-6">
        <h2 className={`${CASE_PRINCIPLE_HEADING} m-0`}>
          {number}. {heading}
        </h2>
        {body ? <p className={`${CASE_BODY} m-0`}>{body}</p> : null}
      </header>
      <div
        className={cn(
          "flex w-full flex-col",
          contentGap === "related" ? "gap-12" : "gap-6",
        )}
      >
        {children}
      </div>
    </div>
  );
}
