import type { ReactNode } from "react";

import { PageSurface } from "@/components/layout/PageSurface";
import { SubNav } from "@/components/nav/SubNav";

type WorkLayoutProps = {
  children: ReactNode;
};

export default function WorkLayout({ children }: WorkLayoutProps) {
  return (
    <PageSurface>
      <SubNav />
      {children}
    </PageSurface>
  );
}
