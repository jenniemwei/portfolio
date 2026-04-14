"use client";

import { useEffect, useRef } from "react";
import lottie, { type AnimationItem } from "lottie-web";

type GalleryLottieThumbProps = {
  src: string;
  label: string;
  fill?: "white";
  fit?: "contain" | "cover";
};

/** Lightweight Lottie renderer for card thumbnails. */
export function GalleryLottieThumb({
  src,
  label,
  fill,
  fit = "contain",
}: GalleryLottieThumbProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let anim: AnimationItem | null = null;
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(src);
        if (!res.ok || cancelled) return;
        const animationData = await res.json();
        if (cancelled) return;

        anim = lottie.loadAnimation({
          container: host,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio:
              fit === "cover" ? "xMidYMid slice" : "xMidYMid meet",
          },
        });

        const svg = host.querySelector("svg");
        if (svg instanceof SVGSVGElement) {
          svg.style.width = "100%";
          svg.style.height = "100%";
          svg.style.display = "block";
        }
      } catch {
        // Keep thumbnail area stable if JSON fails to load.
      }
    };

    void load();

    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, [src, fit]);

  const bgClass = fill === "white" ? "bg-[var(--white)]" : "";

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${bgClass}`}
      aria-label={label}
      role="img"
    >
      <div ref={hostRef} className="h-full w-full" />
    </div>
  );
}
