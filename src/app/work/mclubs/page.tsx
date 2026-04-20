import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mclubs — Jennie Wei",
  description: "Case study: Mclubs — Summer 2024.",
};

export default function MclubsProjectPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[var(--content-max)] flex-col gap-[var(--space-m)] px-[var(--page-gutter)] py-[var(--space-64)]">
      <h1 className="type-page-heading text-default">Mclubs</h1>
      <p className="type-body text-subtle">Summer 2024</p>
      <p className="type-body text-subtle">
        Case study content coming soon.
      </p>
    </div>
  );
}
