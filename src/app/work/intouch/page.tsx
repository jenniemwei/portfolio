import type { Metadata } from "next";

import { ProjectPasswordGate } from "@/components/proj-page";
import { getProjectPageByHref } from "@/data/project-pages";

export const metadata: Metadata = {
  title: "InTouch — Jennie Wei",
  description: "Case study: InTouch — Spring 2025.",
};

export default function IntouchProjectPage() {
  const passwordProtected =
    getProjectPageByHref("/work/intouch")?.passwordProtected ?? false;

  return (
    <ProjectPasswordGate enabled={passwordProtected}>
      <div className="mx-auto flex min-h-screen max-w-[var(--content-max)] flex-col gap-[var(--space-m)] px-[var(--page-gutter)] py-[var(--space-64)]">
        <h1 className="type-page-heading text-default">InTouch</h1>
        <p className="type-body text-subtle">Spring 2025</p>
        <p className="type-body text-subtle">
          Case study content coming soon.
        </p>
      </div>
    </ProjectPasswordGate>
  );
}
