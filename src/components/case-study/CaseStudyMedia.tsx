import Image from "next/image";

import { cn } from "@/lib/cn";

import { CASE_STUDY_MEDIA_SIZES } from "./caseStudyStyles";

export type CaseStudyMediaProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
};

export function CaseStudyMedia({
  src,
  alt,
  width,
  height,
  priority,
  className,
}: CaseStudyMediaProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={CASE_STUDY_MEDIA_SIZES}
      priority={priority}
      unoptimized={src.toLowerCase().endsWith(".gif")}
      className={cn(
        "h-auto w-full rounded-[clamp(12px,1.7vw,24px)] object-contain",
        className,
      )}
    />
  );
}
