import Link from "next/link";

export default function VisualPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[var(--placeholder-body-max-width)] flex-col gap-[var(--space-m)] px-[var(--page-gutter)] py-[var(--space-64)]">
      <Link
        href="/"
        className="w-fit text-text-subtle underline-offset-4 [font:var(--text-link-back-font)] [letter-spacing:var(--text-link-back-letter-spacing)] hover:opacity-[var(--link-hover-opacity)]"
      >
        ← Home
      </Link>
      <h1 className="text-text-default [font:var(--text-page-heading-font)] [letter-spacing:var(--text-page-heading-letter-spacing)]">
        Visual
      </h1>
      <p className="text-text-subtle [font:var(--text-body-font)] [letter-spacing:var(--text-body-letter-spacing)]">
        Visual explorations coming soon.
      </p>
    </div>
  );
}
