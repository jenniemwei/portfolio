import Link from "next/link";

export default function VisualPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[var(--placeholder-body-max-width)] flex-col gap-[var(--space-m)] px-[var(--page-gutter)] py-[var(--space-64)]">
      <Link
        href="/"
        className="type-link-back w-fit text-subtle underline-offset-4 hover:opacity-[var(--link-hover-opacity)]"
      >
        ← Home
      </Link>
      <h1 className="type-page-heading text-default">
        Visual
      </h1>
      <p className="type-body text-subtle">
        Visual explorations coming soon.
      </p>
    </div>
  );
}
