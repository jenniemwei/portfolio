import type { ReactNode } from "react";

import { CASE_BODY, CASE_H2_SANS, CASE_NOTE } from "./caseStudyStyles";

type NarrativeBlockProps = {
  note: string;
  heading?: ReactNode;
  body?: ReactNode;
  tone?: "default" | "neutral";
  hangingQuote?: boolean;
};

/** A case-study narrative block: header (note + h2-sans) followed by body. */
export function NarrativeBlock({
  note,
  heading,
  body,
  tone = "default",
  hangingQuote = false,
}: NarrativeBlockProps) {
  const neutral = tone === "neutral";

  return (
    <div
      className="flex w-full flex-col gap-4 border-b border-line py-6"
      data-case-block="narrative-block"
    >
      <header className="flex w-full max-w-[600px] flex-col gap-2">
        <p
          className={`${CASE_NOTE} m-0 text-text-subtle`}
        >
          {note}
        </p>
        {heading ? (
          <h2
            className={`${CASE_H2_SANS} m-0 ${hangingQuote ? "indent-[-0.45em]" : ""} ${neutral ? "text-text-case-heading" : "text-text-default"}`}
          >
            {heading}
          </h2>
        ) : null}
      </header>
      {body ? (
        <p
          className={`${CASE_BODY} m-0 max-w-[600px] ${neutral ? "text-text-case-body" : "text-[#2e2e2e]"}`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
