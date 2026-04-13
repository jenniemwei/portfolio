"use client";

import styles from "./PreviewHeader.module.css";

export type PreviewHeaderProps = {
  onFullScreen: () => void;
  onClose: () => void;
};

export function PreviewHeader({ onFullScreen, onClose }: PreviewHeaderProps) {
  return (
    <header
      className={styles.root}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={styles.fullscreen}
        aria-label="Open full project page"
        onClick={onFullScreen}
      />
      <button
        type="button"
        className={styles.close}
        aria-label="Close preview"
        onClick={onClose}
      >
        <svg className={styles.closeIcon} viewBox="0 0 16 16" aria-hidden>
          <path
            d="M4 4l8 8M12 4l-8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  );
}
