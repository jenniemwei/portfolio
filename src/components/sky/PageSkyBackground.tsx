"use client";

import { SkyShader } from "@/components/sky/SkyShader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import styles from "./PageSkyBackground.module.css";

type PageSkyBackgroundProps = {
  /** `band` = home top strip; `page` = full viewport (info, etc.) */
  variant?: "band" | "page";
};

export function PageSkyBackground({ variant = "band" }: PageSkyBackgroundProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div
      className={variant === "page" ? styles.pageShell : styles.bandShell}
      aria-hidden
    >
      {/* Temporarily hidden; keep the shader implementation available for later. */}
      {false && (
        <SkyShader className="absolute inset-0 h-full w-full" paused={reduceMotion} />
      )}
      <div className={variant === "page" ? styles.pageFade : styles.bandFade} />
    </div>
  );
}
