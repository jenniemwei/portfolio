"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

/** A lightweight still for Cloudinary clips without a supplied thumbnail. */
function cloudinaryPoster(src: string): string | undefined {
  try {
    const url = new URL(src);
    if (url.hostname !== "res.cloudinary.com" || !url.pathname.includes("/video/upload/")) {
      return undefined;
    }
    url.pathname = url.pathname
      .replace("/video/upload/", "/video/upload/so_0,w_1000,q_auto,f_jpg/")
      .replace(/\.(mp4|webm|mov)$/i, ".jpg");
    return url.toString();
  } catch {
    return undefined;
  }
}

type GalleryVideoThumbProps = {
  src: string;
  label: string;
  /** Only the expanded accordion item is eligible to play. */
  active?: boolean;
  /** Background behind letterboxing. */
  fill?: string;
  /** Preserve the existing width-first layout for contain thumbnails. */
  fit?: "contain" | "cover";
  fallbackSrc?: string | StaticImageData;
  sizes?: string;
};

/** Lazily load on first playback; keep the player mounted to resume in place. */
export function GalleryVideoThumb({
  src,
  label,
  active = true,
  fill,
  fit = "cover",
  fallbackSrc,
  sizes = "(max-width: 1023px) 100vw, 60vw",
}: GalleryVideoThumbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const poster = fallbackSrc ?? cloudinaryPoster(src);
  const showPoster = !active || !hasFrame || videoFailed;
  const fillStyle: CSSProperties | undefined = fill
    ? { backgroundColor: fill === "white" ? "var(--color-fill-default)" : fill }
    : undefined;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || videoFailed) return;

    let inView = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      const shouldPlay = active && inView && !document.hidden && !reducedMotion.matches;
      if (!shouldPlay) {
        video.pause();
        return;
      }

      // No video request before the first visible, active playback. Never clear
      // the source on collapse: buffered data and the playback position survive.
      if (!video.getAttribute("src")) video.src = src;
      if (video.paused) {
        void video.play().catch(() => {
          // Rapid switching can abort play(), and browsers may block autoplay.
          // Keep the still visible until playback actually starts.
        });
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      syncPlayback();
    }, { threshold: [0, 0.15] });
    observer.observe(container);
    document.addEventListener("visibilitychange", syncPlayback);
    reducedMotion.addEventListener("change", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reducedMotion.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, [active, src, videoFailed]);

  useEffect(() => {
    if (fit !== "contain") return;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;
    let frame = 0;

    const applyLayout = () => {
      const { videoWidth: vw, videoHeight: vh } = video;
      const { clientWidth: cw, clientHeight: ch } = container;
      if (!vw || !vh || !cw || !ch) return;
      const isWider = vw / vh > cw / ch;
      video.style.width = "100%";
      video.style.height = isWider ? "auto" : `${cw * vh / vw}px`;
      video.style.maxHeight = isWider ? "100%" : "none";
    };
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(applyLayout);
    });
    observer.observe(container);
    video.addEventListener("loadedmetadata", applyLayout);
    applyLayout();
    return () => {
      observer.disconnect();
      video.removeEventListener("loadedmetadata", applyLayout);
      cancelAnimationFrame(frame);
    };
  }, [fit]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex min-h-0 items-center justify-center overflow-hidden"
      style={fillStyle}
    >
      {poster ? (
        <Image
          src={poster}
          alt={label}
          fill
          className="object-cover"
          sizes={sizes}
          unoptimized={!fallbackSrc}
          style={{ visibility: showPoster ? "visible" : "hidden" }}
        />
      ) : null}
      <video
        ref={videoRef}
        className={fit === "cover"
          ? "absolute inset-0 h-full w-full object-cover"
          : "block shrink-0 object-contain"}
        style={{ visibility: showPoster && poster ? "hidden" : "visible" }}
        preload="none"
        muted
        playsInline
        loop
        onPlaying={() => setHasFrame(true)}
        onError={() => setVideoFailed(true)}
        aria-label={label}
        aria-hidden={showPoster && !!poster}
      />
    </div>
  );
}
