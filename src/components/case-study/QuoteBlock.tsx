import type { ReactNode } from "react";

import { CASE_H3_SANS, CASE_NOTE } from "./caseStudyStyles";

type QuoteBlockProps = {
  note: string;
  quotes: readonly ReactNode[];
};

/** Case-study feedback block with one or more related pull quotes. */
export function QuoteBlock({ note, quotes }: QuoteBlockProps) {
  return (
    <section
      className="flex w-full flex-col gap-6"
      data-case-block="quote-block"
    >
      <p className={`${CASE_NOTE} m-0 text-text-subtle`}>{note}</p>
      <blockquote className="m-0 flex w-full max-w-[634px] border-l-2 border-line px-4">
        <div className="flex w-full max-w-[600px] flex-col gap-6">
          {quotes.map((quote, index) => (
            <p className={`${CASE_H3_SANS} m-0`} key={index}>
              {quote}
            </p>
          ))}
        </div>
      </blockquote>
    </section>
  );
}
