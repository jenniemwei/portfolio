import type { ReactNode } from "react";

import { CASE_H3_SANS, CASE_NOTE } from "./caseStudyStyles";

type QuoteBlockProps = {
  quotes: readonly ReactNode[];
  attribution: string;
};

/** Case-study feedback block with one or more related pull quotes. */
export function QuoteBlock({ quotes, attribution }: QuoteBlockProps) {
  return (
    <section
      className="flex w-full flex-col gap-6"
      data-case-block="quote-block"
    >
      <blockquote className="m-0 grid w-full gap-12 border-l-2 border-line px-4 py-6 min-[640px]:grid-cols-2">
        {quotes.map((quote, index) => (
          <p className={`${CASE_H3_SANS} m-0`} key={index}>
            {quote}
          </p>
        ))}
      </blockquote>
      <p className={`${CASE_NOTE} m-0 text-right text-text-subtle`}>
        {attribution}
      </p>
    </section>
  );
}
