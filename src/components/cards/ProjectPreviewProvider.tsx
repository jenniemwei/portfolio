"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  getProjectPageByHref,
  PROJECT_CARD_INTERACTIONS_DISABLED,
} from "@/data/project-pages";
import { PreviewHeader } from "./PreviewHeader";
import styles from "./ProjectPreviewModal.module.css";

const OPEN_FULL_PAGE_MESSAGE_TYPE = "project-password-unlocked";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Iframe-only URL so project pages can hide chrome (e.g. Nav) via `?embed=1`. */
export function previewIframeSrc(href: string): string {
  try {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "http://localhost";
    const u = new URL(href, origin);
    if (typeof window !== "undefined" && u.origin !== window.location.origin) {
      return href;
    }
    u.searchParams.set("embed", "1");
    return `${u.pathname}${u.search}${u.hash}`;
  } catch {
    return href;
  }
}

type ProjectPreviewContextValue = {
  openPreview: (href: string) => void;
  closePreview: () => void;
};

const ProjectPreviewContext = createContext<ProjectPreviewContextValue | null>(
  null,
);

export function useProjectPreview() {
  const ctx = useContext(ProjectPreviewContext);
  if (!ctx) {
    throw new Error(
      "useProjectPreview must be used within ProjectPreviewProvider",
    );
  }
  return ctx;
}

export function ProjectPreviewProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [previewHref, setPreviewHref] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [fullscreenDisabled, setFullscreenDisabled] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const previewHrefRef = useRef<string | null>(null);
  const pendingNavigationRef = useRef<string | null>(null);
  const isExitingRef = useRef(false);
  const exitAnimStartedRef = useRef(false);

  useEffect(() => {
    previewHrefRef.current = previewHref;
  }, [previewHref]);

  useEffect(() => {
    isExitingRef.current = isExiting;
  }, [isExiting]);

  const finishClose = useCallback(() => {
    exitAnimStartedRef.current = false;
    const pending = pendingNavigationRef.current;
    pendingNavigationRef.current = null;
    setPreviewHref(null);
    setIsExiting(false);
    if (pending) {
      router.push(pending);
    }
  }, [router]);

  const requestClose = useCallback(
    (options?: { navigateTo?: string }) => {
      if (!previewHrefRef.current) return;
      if (options?.navigateTo !== undefined) {
        pendingNavigationRef.current = options.navigateTo;
      }
      if (prefersReducedMotion()) {
        finishClose();
        return;
      }
      if (exitAnimStartedRef.current) return;
      exitAnimStartedRef.current = true;
      setIsExiting(true);
    },
    [finishClose],
  );

  const openPreview = useCallback((href: string) => {
    if (PROJECT_CARD_INTERACTIONS_DISABLED) return;
    exitAnimStartedRef.current = false;
    pendingNavigationRef.current = null;
    setFullscreenDisabled(getProjectPageByHref(href)?.disableFullscreen ?? false);
    setPreviewHref(href);
    setIsExiting(false);
  }, []);

  const closePreview = useCallback(() => {
    pendingNavigationRef.current = null;
    requestClose();
  }, [requestClose]);

  const goFullPage = useCallback(() => {
    if (fullscreenDisabled) return;
    const href = previewHrefRef.current;
    if (!href) return;
    requestClose({ navigateTo: href });
  }, [requestClose, fullscreenDisabled]);

  useEffect(() => {
    if (!previewHref) return;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarW =
      typeof window !== "undefined"
        ? window.innerWidth - document.documentElement.clientWidth
        : 0;

    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) {
      document.body.style.paddingRight = `${scrollbarW}px`;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", onKeyDown);

    queueMicrotask(() => {
      shellRef.current?.focus({ preventScroll: true });
    });

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [previewHref, closePreview]);

  useEffect(() => {
    if (!previewHref) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const data = e.data as { type?: string; href?: string } | null;
      if (!data || data.type !== OPEN_FULL_PAGE_MESSAGE_TYPE || !data.href) return;
      const current = previewHrefRef.current;
      if (!current) return;
      const currentPath = getProjectPageByHref(current)?.href ?? current;
      if (currentPath !== data.href) return;
      requestClose({ navigateTo: data.href });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [previewHref, requestClose]);

  const onShellAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (!isExitingRef.current) return;
      if (e.target !== e.currentTarget) return;
      finishClose();
    },
    [finishClose],
  );

  const showModal = previewHref !== null;

  return (
    <ProjectPreviewContext.Provider value={{ openPreview, closePreview }}>
      {children}
      {showModal ? (
        <div
          className={`${styles.backdrop} ${isExiting ? styles.backdropExit : styles.backdropEnter} ${isExiting ? styles.backdropNoPointer : ""}`}
          onClick={closePreview}
          role="presentation"
        >
          <div
            ref={shellRef}
            role="dialog"
            aria-modal="true"
            aria-label={
              fullscreenDisabled
                ? "Project preview — scroll to read the work in progress"
                : "Project preview — scroll to read the case study, or use expand in the bar above to open the full page"
            }
            tabIndex={-1}
            className={`${styles.previewShell} ${isExiting ? styles.shellExit : styles.shellEnter}`}
            onAnimationEnd={onShellAnimationEnd}
            onClick={(e) => e.stopPropagation()}
          >
            <PreviewHeader
              onFullScreen={() => {
                if (!isExiting && !fullscreenDisabled) goFullPage();
              }}
              onClose={closePreview}
              fullscreenDisabled={fullscreenDisabled}
            />
            <div
              className={`${styles.frameWrap} ${fullscreenDisabled ? styles.frameWrapDisabled : ""}`}
            >
              <iframe
                className={styles.frame}
                src={previewIframeSrc(previewHref)}
                title="Project preview"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </div>
        </div>
      ) : null}
    </ProjectPreviewContext.Provider>
  );
}
