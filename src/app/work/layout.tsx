import type { ReactNode } from "react";

import { PageSurface } from "@/components/layout/PageSurface";
import { SubNav } from "@/components/nav/SubNav";

type WorkLayoutProps = {
  children: ReactNode;
};

export default function WorkLayout({ children }: WorkLayoutProps) {
  return (
    <PageSurface>
      {/* Temporarily hidden; keep the work nav implementation available for later. */}
      {false && <SubNav />}
      {children}
    </PageSurface>
  );
}
