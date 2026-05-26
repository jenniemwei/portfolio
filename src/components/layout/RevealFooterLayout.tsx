import type { ReactNode } from "react";

import { Footer } from "@/components/nav/Footer";

type RevealFooterLayoutProps = {
  children: ReactNode;
};

/**
 * Fixed footer stays put; the canvas panel above scrolls up (margin reserves footer
 * height) to reveal it — see rachelatwork.com case studies.
 */
export function RevealFooterLayout({ children }: RevealFooterLayoutProps) {
  return (
    <div className="relative">
      <Footer className="fixed inset-x-0 bottom-0 z-0" />
      <div
        className="relative isolate z-10 mb-[var(--footer-reveal-height)] min-h-screen overflow-hidden rounded-b-3xl bg-fill-default"
        data-reveal-footer-panel
      >
        {children}
      </div>
    </div>
  );
}
