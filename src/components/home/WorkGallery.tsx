import Image from "next/image";

import { ProjectCard } from "@/components/home/ProjectCard";
import { SectionHeader } from "@/components/home/SectionHeader";

const bp = "max-[var(--breakpoint-gallery-stack)]:col-span-1";

function WorkThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 900px) 100vw, 66vw"
    />
  );
}

export function WorkGallery() {
  return (
    <>
      <SectionHeader title="Work" />
      <div className="flex w-full flex-wrap items-start py-[var(--space-m)]">
        <div className="grid min-h-0 min-w-0 flex-1 grid-cols-6 gap-x-[var(--gallery-column-gap)] gap-y-[var(--gallery-row-gap)] max-[var(--breakpoint-gallery-stack)]:grid-cols-1">
          <ProjectCard
            id="g2-search"
            className={`col-span-6 ${bp} md:col-span-4`}
            projTitle="G2 Search"
            projSub="Search experience"
            visual={<WorkThumb src="/thumbnails/work/G2-search-home-img.png" alt="G2 Search" />}
          />
          <ProjectCard
            id="g2-ai"
            className={`col-span-6 ${bp} md:col-span-2`}
            projTitle="G2 AI"
            projSub="AI product"
            visual={<WorkThumb src="/thumbnails/work/g2ai-home-img.png" alt="G2 AI" />}
          />
          <ProjectCard
            id="intouch"
            className={`col-span-6 ${bp} md:col-span-3`}
            projTitle="InTouch"
            projSub="Product"
            visual={<WorkThumb src="/thumbnails/work/intouch-home-img.webp" alt="InTouch" />}
          />
          <ProjectCard
            id="mclubs"
            className={`col-span-6 ${bp} md:col-span-3`}
            projTitle="Mclubs"
            projSub="Product"
            visual={<WorkThumb src="/thumbnails/work/Mclubs-home-img.png" alt="Mclubs" />}
          />
        </div>
      </div>
    </>
  );
}
