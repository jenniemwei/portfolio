"use client";

import { useEffect, useRef, useState } from "react";
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
  fit = "contain",
}: GalleryLottieThumbProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [fileAspectRatio, setFileAspectRatio] = useState<number | null>(null);
  const [isStacked, setIsStacked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 48rem)");
    const apply = () => setIsStacked(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let anim: AnimationItem | null = null;
    let cancelled = false;
    let ro: ResizeObserver | null = null;

    const load = async () => {
      try {
        const res = await fetch(src);
        if (!res.ok || cancelled) return;
        const animationData = await res.json();
        if (cancelled) return;
        const w =
          typeof animationData?.w === "number" ? animationData.w : undefined;
        const h =
          typeof animationData?.h === "number" ? animationData.h : undefined;
        const ar = w && h ? w / h : null;
        setFileAspectRatio(ar);

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

        const applySvgSize = () => {
          const svg = host.querySelector("svg");
          if (!(svg instanceof SVGSVGElement) || !ar) return;
          const cw = host.clientWidth;
          const ch = host.clientHeight;
          if (!cw || !ch) return;
          const cardAR = cw / ch;
          const lottieWider = ar > cardAR;
          const useWidthAsDriver =
            fit === "contain" ? lottieWider : !lottieWider;

          svg.style.display = "block";
          svg.style.background = "transparent";
          if (isStacked) {
            // 1-cell rows: hug intrinsic height from file AR via width.
            svg.style.width = "100%";
            svg.style.height = "auto";
          } else if (useWidthAsDriver) {
            svg.style.width = "100%";
            svg.style.height = "auto";
          } else {
            // 2-cell rows: match row height; width derives from file AR.
            svg.style.width = "auto";
            svg.style.height = "100%";
          }
        };

        requestAnimationFrame(applySvgSize);
        ro = new ResizeObserver(() => {
          requestAnimationFrame(applySvgSize);
        });
        ro.observe(host);
      } catch {
        // Keep thumbnail area stable if JSON fails to load.
      }
    };

    void load();

    return () => {
      cancelled = true;
      ro?.disconnect();
      anim?.destroy();
    };
  }, [src, fit, isStacked]);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-transparent"
      aria-label={label}
      role="img"
    >
      <div
        ref={hostRef}
        className="h-full w-full"
        style={{
          ...(fileAspectRatio ? { aspectRatio: String(fileAspectRatio) } : {}),
          ...(isStacked
            ? { width: "100%", height: "auto" }
            : { width: "auto", height: "100%" }),
          // Hide 1px anti-aliased seams some SVG frames show against page background.
          clipPath: "inset(0.5px)",
        }}
      />
    </div>
  );
}
