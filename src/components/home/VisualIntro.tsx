export function VisualIntro() {
  return (
    <div className="grid w-full grid-cols-6 gap-x-[var(--intro-grid-gap)] gap-y-[var(--intro-grid-gap)] border-line border-t border-solid pt-[var(--space-lg)] pb-[var(--space-xl)]">
      <p className="col-span-6 font-[family-name:var(--font-serif-stack)] text-[length:var(--font-size-3xl)] font-[var(--font-weight-regular)] leading-[var(--line-height-none)] tracking-[var(--tracking-serif-3xl)] text-fg md:col-span-4">
        who also loves visual design...
      </p>
    </div>
  );
}
