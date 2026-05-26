import type { ReactNode } from "react";

type PageSurfaceProps = {
  children: ReactNode;
  className?: string;
};

/** Full-height page surface (`bg-fill-default` on `html` / `body`). */
export function PageSurface({ children, className }: PageSurfaceProps) {
  return (
    <div
      className={["min-h-screen w-full bg-fill-default", className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
