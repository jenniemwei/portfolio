import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="w-full flex-col gap-sm">
      <h2 className="type-h2 text-text-subtle">{title}</h2>
      <hr className="bottom-hr" aria-hidden />
    </div>
  );
}

interface SectionProps {
  id: string;
  header?: string;
  children: ReactNode;
}

export function HeaderSection({ id, header, children }: SectionProps) {
  return (
    <section id={id} className="flex-col gap-xl">
      {header && <SectionHeader title={header} />}
      {children}
    </section>
  );
}
