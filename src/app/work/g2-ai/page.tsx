import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "G2 AI — Jennie Wei",
  description: "Case study: G2 AI — Fall 2025.",
};

export default function G2AiProjectPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[var(--content-max)] flex-col gap-[var(--space-m)] px-[var(--page-gutter)] py-[var(--space-64)]">
      <h1 className="type-page-heading text-default">G2 AI</h1>
      <p className="type-body text-subtle">Fall 2025</p>
      <p className="type-body text-subtle">
        Case study content coming soon.
      </p>
    </div>
  );
}
