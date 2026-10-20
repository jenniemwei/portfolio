"use client";

import { useEffect, useRef, useState } from "react";

import { AboutContent, AboutPhotos } from "./AboutContent";
import styles from "./AboutModal.module.css";

export function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const requestClose = () => setClosing(true);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      id="about-modal"
      className={styles.dialog}
      data-closing={closing ? "true" : undefined}
      aria-labelledby="about-modal-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && closing) {
          setClosing(false);
          onClose();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div
        className={styles.stage}
        onClick={(event) => {
          if (event.target === event.currentTarget) requestClose();
        }}
      >
        <div className={styles.card}>
          <div className={styles.panel}>
            <div className={styles.toolbar}>
              <button
                type="button"
                className={styles.close}
                onClick={requestClose}
                aria-label="Close About"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className={styles.content}>
              {open && <AboutContent titleId="about-modal-title" modal />}
            </div>
          </div>
          {open && <AboutPhotos scrapbook />}
        </div>
      </div>
    </dialog>
  );
}
