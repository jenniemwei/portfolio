import Image from "next/image";

import { ProjectCard } from "@/components/home/ProjectCard";
import { SectionHeader } from "@/components/home/SectionHeader";

const bp = "max-[var(--breakpoint-gallery-stack)]:col-span-1";

function VisualThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 900px) 100vw, 50vw"
    />
  );
}

export function VisualGallery() {
  return (
    <>
      <SectionHeader title="Visual" />
      <div className="flex w-full flex-wrap items-start py-[var(--space-m)]">
        <div className="grid min-h-0 min-w-0 flex-1 grid-cols-6 gap-x-[var(--gallery-column-gap)] gap-y-[var(--gallery-row-gap)] max-[var(--breakpoint-gallery-stack)]:grid-cols-1">
          <ProjectCard
            className={`col-span-6 ${bp} md:col-span-3 md:row-start-1`}
            projTitle="Dhero"
            projSub="Visual"
            visual={<VisualThumb src="/thumbnails/visual/dhero-home-img.webp" alt="Dhero" />}
          />
          <ProjectCard
            className={`col-span-6 ${bp} md:col-span-3 md:row-start-1`}
            projTitle="Project Headline"
            projSub="Subhead"
          />
          <ProjectCard
            className={`col-span-6 ${bp} md:col-span-2 md:row-start-2`}
            projTitle="Project Headline"
            projSub="Subhead"
          />
          <ProjectCard
            className={`col-span-6 ${bp} md:col-span-2 md:col-start-3 md:row-start-2`}
            projTitle="Project Headline"
            projSub="Subhead"
          />
          <ProjectCard
            className={`col-span-6 ${bp} md:col-span-2 md:col-start-5 md:row-start-2`}
            projTitle="Project Headline"
            projSub="Subhead"
          />
        </div>
      </div>
    </>
  );
}
