import type { ReactNode } from "react";

import { SubNav } from "@/components/sitewide/SubNav";

type WorkLayoutProps = {
  children: ReactNode;
};

export default function WorkLayout({ children }: WorkLayoutProps) {
  return (
    <>
      <SubNav />
      {children}
    </>
  );
}
