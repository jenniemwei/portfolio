import Link from "next/link";

export default function WorkPage() {
  return (
    <div
      className="mx-auto flex min-h-screen max-w-[var(--placeholder-body-max-width)] flex-col gap-[var(--space-m)] px-[var(--page-gutter)] py-[var(--placeholder-page-padding-y)]"
    >
      <Link
        href="/"
        className="w-fit font-[family-name:var(--font-sans-stack)] text-[length:var(--font-size-m)] font-[var(--font-weight-semibold)] text-muted-fg underline-offset-4 hover:opacity-[var(--link-hover-opacity)]"
      >
        ← Home
      </Link>
      <h1 className="font-[family-name:var(--font-serif-stack)] text-[length:var(--font-size-xl)] font-[var(--font-weight-regular)] tracking-[var(--tracking-serif-base)] text-fg">
        Work
      </h1>
      <p className="font-[family-name:var(--font-sans-stack)] text-[length:var(--font-size-m)] leading-[var(--line-height-note)] text-muted-fg">
        Case studies and projects coming soon.
      </p>
    </div>
  );
}
