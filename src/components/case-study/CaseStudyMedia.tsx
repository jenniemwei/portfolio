import Image from "next/image";

import { CASE_STUDY_MEDIA_SIZES } from "./caseStudyStyles";

export type CaseStudyMediaProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

export function CaseStudyMedia({
  src,
  alt,
  width,
  height,
  priority,
}: CaseStudyMediaProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={CASE_STUDY_MEDIA_SIZES}
      priority={priority}
      className="h-auto w-full rounded-[clamp(12px,1.7vw,24px)] object-contain"
    />
  );
}
