import type { ReactNode } from "react";

import { SubNav } from "@/components/nav/SubNav";

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
