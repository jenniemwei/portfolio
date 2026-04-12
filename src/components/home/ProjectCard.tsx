import type { ReactNode } from "react";

type ProjectCardProps = {
  id?: string;
  className?: string;
  projTitle?: string;
  projSub?: string;
  visual?: ReactNode;
};

export function ProjectCard({
  id,
  className = "",
  projTitle = "Project Headline",
  projSub = "Subhead",
  visual,
}: ProjectCardProps) {
  return (
    <article
      id={id}
      className={`flex min-h-0 flex-col items-start justify-end gap-[var(--space-s)] overflow-hidden ${className}`}
    >
      <div
        className="relative flex w-full shrink-0 flex-col items-start justify-end overflow-hidden"
        style={{ height: "var(--card-visual-height)" }}
      >
        {visual ?? (
          <div className="min-h-0 w-full flex-1 bg-[var(--color-placeholder)]" aria-hidden />
        )}
      </div>
      <div className="flex w-full shrink-0 items-end gap-[var(--space-s)] whitespace-nowrap px-[var(--space-s)] font-[family-name:var(--font-sans-stack)] text-[length:var(--font-size-m)] leading-[var(--line-height-none)]">
        <p className="shrink-0 font-[var(--font-weight-semibold)] tracking-[var(--tracking-sans-bold)] text-fg">
          {projTitle}
        </p>
        <p className="shrink-0 font-[var(--font-weight-regular)] tracking-[var(--letter-spacing-none)] text-muted-fg">
          {projSub}
        </p>
      </div>
    </article>
  );
}
