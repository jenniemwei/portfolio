import type { CSSProperties, ReactNode } from "react";

interface RowProps {
  cols: string;
  className?: string;
  children: ReactNode;
}

/**
 * CSS grid row: `cols` is `grid-template-columns` from the `md` breakpoint up (48rem).
 * Below `md`, always a single column so cells stack (pairs with `Spacer`'s `hidden md:block`).
 */
export function Row({ cols, className, children }: RowProps) {
  const style = {
    "--row-cols-full": cols,
  } as CSSProperties;

  return (
    <div
      style={style}
      className={`grid w-full min-w-0 grid-cols-1 gap-md md:grid-cols-[var(--row-cols-full)] ${className ?? ""}`.trim()}
    >
      {children}
    </div>
  );
}
