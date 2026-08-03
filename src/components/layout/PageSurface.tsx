import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type PageSurfaceProps = {
  children: ReactNode;
  className?: string;
};

/** Full-height page surface (`bg-fill-default` on `html` / `body`). */
export function PageSurface({ children, className }: PageSurfaceProps) {
  return (
    <div
      className={cn("min-h-screen w-full bg-fill-default", className)}
    >
      {children}
    </div>
  );
}
