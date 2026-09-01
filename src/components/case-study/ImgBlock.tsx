import type { ReactNode } from "react";

import { CASE_BODY, CASE_H3_SANS } from "./caseStudyStyles";

type ImgBlockProps = {
  heading?: ReactNode;
  body?: ReactNode;
  textStyle?: "heading" | "body";
  tone?: "default" | "inverse";
  children: ReactNode;
};

/** A case-study img-block: a 600px text header followed by media at 24px. */
export function ImgBlock({
  heading,
  body,
  textStyle = "heading",
  tone = "default",
  children,
}: ImgBlockProps) {
  const inverse = tone === "inverse";

  return (
    <figure
      className="m-0 flex w-full flex-col gap-6"
      data-case-block="img-block"
    >
      {heading || body ? (
        <figcaption className="m-0 flex max-w-[600px] flex-col gap-2">
          {heading ? (
            textStyle === "body" ? (
              <p
                className={`${CASE_BODY} m-0 ${inverse ? "text-white" : "text-[#2e2e2e]"}`}
              >
                {heading}
              </p>
            ) : (
              <h3
                className={`${CASE_H3_SANS} m-0 ${inverse ? "text-white" : "text-text-default"}`}
              >
                {heading}
              </h3>
            )
          ) : null}
          {body ? (
            <p
              className={`${CASE_BODY} m-0 ${inverse ? "text-white" : "text-[#2e2e2e]"}`}
            >
              {body}
            </p>
          ) : null}
        </figcaption>
      ) : null}
      {children}
    </figure>
  );
}
