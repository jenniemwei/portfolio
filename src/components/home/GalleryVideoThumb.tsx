"use client";

import { useCallback, useEffect, useRef } from "react";

function sourceTypeForVideoUrl(src: string): string {
  const lower = src.split("?")[0]?.toLowerCase() ?? "";
  if (lower.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}

type GalleryVideoThumbProps = {
  src: string;
  label: string;
  fill?: "white";
  /** `cover` = fill card (both axes), classic crop. Otherwise width-first smart fit. */
  fit?: "contain" | "cover";
};

/**
 * Width-first layout when `fit !== "cover"`:
 * - Video wider than the card slot (relative aspect): 100% width, height from aspect ratio, vertical letterboxing.
 * - Video taller than the slot: still 100% width, scale height with aspect, clip top/bottom (centered).
 */
function WidthFirstVideoThumb({
  src,
  label,
  bgClass,
}: {
  src: string;
  label: string;
  bgClass: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const applyLayout = useCallback(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (!vw || !vh || !cw || !ch) return;

    const arV = vw / vh;
    const arC = cw / ch;

    if (arV > arC) {
      video.style.width = "100%";
      video.style.height = "auto";
      video.style.maxHeight = "100%";
      video.style.objectFit = "contain";
    } else {
      const scaledH = (cw * vh) / vw;
      video.style.width = "100%";
      video.style.height = `${scaledH}px`;
      video.style.maxHeight = "none";
      video.style.objectFit = "contain";
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.addEventListener("loadedmetadata", applyLayout);
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(applyLayout);
    });
    ro.observe(container);

    return () => {
      video.removeEventListener("loadedmetadata", applyLayout);
      ro.disconnect();
    };
  }, [applyLayout, src]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 flex min-h-0 items-center justify-center overflow-hidden ${bgClass}`}
    >
      <video
        ref={videoRef}
        className="block shrink-0"
        autoPlay
        muted
        playsInline
        loop
        aria-label={label}
      >
        <source src={src} type={sourceTypeForVideoUrl(src)} />
      </video>
    </div>
  );
}

/** Muted + `playsInline` for autoplay; no controls. */
export function GalleryVideoThumb({
  src,
  label,
  fill,
  fit = "contain",
}: GalleryVideoThumbProps) {
  const bgClass = fill === "white" ? "bg-[var(--white)]" : "";

  if (fit === "cover") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${bgClass}`}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          aria-label={label}
        >
          <source src={src} type={sourceTypeForVideoUrl(src)} />
        </video>
      </div>
    );
  }

  return (
    <WidthFirstVideoThumb src={src} label={label} bgClass={bgClass} />
  );
}
