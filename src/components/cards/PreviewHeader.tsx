"use client";

import { type CSSProperties } from "react";

import styles from "./PreviewHeader.module.css";

const EXPAND_ICON_MASK_STYLE = {
  "--hero-icon-url": "url('/icons/expand-icon.svg')",
} as CSSProperties;

export type PreviewHeaderProps = {
  onFullScreen: () => void;
  onClose: () => void;
  fullscreenDisabled?: boolean;
};

export function PreviewHeader({
  onFullScreen,
  onClose,
  fullscreenDisabled = false,
}: PreviewHeaderProps) {
  return (
    <header
      className={styles.root}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.pill}>
        <div className={styles.pillBackdrop} aria-hidden />
        <div className={styles.pillRow}>
          <button
            type="button"
            className={styles.hitbox}
            aria-label="Back — close preview"
            onClick={onClose}
          >
            <svg className={styles.hitboxIcon} viewBox="0 0 24 24" aria-hidden>
              <path
                d="M15 18l-6-6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={`${styles.hitboxLabel} type-nav-link text-default`}>
              Back
            </span>
          </button>

          <div className={styles.spacer} aria-hidden />

          <div className={styles.rightCluster}>
            <span className={`${styles.expandHelper} type-body-sm`}>
              Full Case Study
            </span>
            <button
              type="button"
              className={`${styles.hitbox} ${styles.hitboxExpand}`}
              aria-label="Open full project page"
              aria-disabled={fullscreenDisabled}
              disabled={fullscreenDisabled}
              onClick={onFullScreen}
            >
              <span
                aria-hidden
                className={styles.expandIconMask}
                style={EXPAND_ICON_MASK_STYLE}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
