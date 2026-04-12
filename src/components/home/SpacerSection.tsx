export function SpacerSection() {
  return (
    <div
      className="flex w-full flex-col items-start gap-[var(--spacer-inner-gap)] p-[var(--space-s)]"
      style={{ height: "var(--spacer-section-height)" }}
      aria-hidden
    />
  );
}
