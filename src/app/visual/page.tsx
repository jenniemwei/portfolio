import Link from "next/link";

export default function VisualPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[var(--placeholder-body-max-width)] flex-col gap-[var(--space-m)] px-[var(--page-gutter)] py-[var(--space-64)]">
      <Link
        href="/"
        className="w-fit text-subtle underline-offset-4 [font:var(--link-back)] [letter-spacing:var(--link-back-tracking,0)] hover:opacity-[var(--link-hover-opacity)]"
      >
        ← Home
      </Link>
      <h1 className="text-default [font:var(--page-heading)] [letter-spacing:var(--page-heading-tracking,0)]">
        Visual
      </h1>
      <p className="text-subtle [font:var(--body)] [letter-spacing:var(--body-tracking,0)]">
        Visual explorations coming soon.
      </p>
    </div>
  );
}
