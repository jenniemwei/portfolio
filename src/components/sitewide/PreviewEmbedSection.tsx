"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

import { isPreviewOrEmbedFrame } from "@/lib/embedChrome";

/**
 * In project preview iframe (`?embed=1` / embedded): shows a lead-in strip and scrolls it
 * below the sticky nav so the iframe viewport starts at `#preview-section`.
 */
export function PreviewEmbedSection() {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      setVisible(isPreviewOrEmbedFrame());
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useLayoutEffect(() => {
    if (!visible) return;
    const id = requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
    });
    return () => cancelAnimationFrame(id);
  }, [visible, pathname]);

  return (
    <section
      ref={sectionRef}
      id="preview-section"
      className={`w-full scroll-mt-[var(--nav-scroll-margin)] ${visible ? "block" : "hidden"}`}
      aria-hidden={!visible}
    >
      <img
        src="/preview-placeholder.svg"
        alt=""
        width={960}
        height={360}
        className="h-auto w-full max-h-[min(40vh,360px)] object-cover object-center"
        decoding="async"
      />
    </section>
  );
}
