import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import styles from "./PageColumns.module.css";

type PageColumnsProps = {
  children: ReactNode;
  leftRail?: ReactNode;
  rightRail?: ReactNode;
  className?: string;
  centerClassName?: string;
  railClassName?: string;
};

/** Viewport-centered content column with symmetric optional side rails. */
export function PageColumns({
  children,
  leftRail,
  rightRail,
  className,
  centerClassName,
  railClassName,
}: PageColumnsProps) {
  return (
    <div className={cn(styles.columns, className)} data-page-columns>
      {leftRail ? (
        <aside
          className={cn(styles.leftRail, railClassName)}
          data-page-columns-rail
        >
          {leftRail}
        </aside>
      ) : null}
      <div
        className={cn(styles.center, centerClassName)}
        data-page-columns-center
      >
        {children}
      </div>
      {rightRail ? (
        <aside
          className={cn(styles.rightRail, railClassName)}
          data-page-columns-rail
        >
          {rightRail}
        </aside>
      ) : null}
    </div>
  );
}
