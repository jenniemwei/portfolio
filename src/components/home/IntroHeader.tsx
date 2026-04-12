/**
 * Credentials + large serif intro (Figma header below hero).
 */
export function IntroHeader() {
  return (
    <header className="grid w-full grid-cols-6 gap-x-[var(--intro-grid-gap)] gap-y-[var(--intro-grid-gap)] border-line border-t border-solid pt-[var(--space-lg)] pb-[var(--space-xl)]">
      <div className="col-span-6 flex flex-col gap-[var(--space-intro-credentials)] p-[var(--space-s)] md:col-span-1">
        <div className="w-full space-y-0 font-[family-name:var(--font-sans-stack)] text-[length:var(--font-size-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-note)] tracking-[var(--letter-spacing-none)]">
          <p className="text-fg">Incoming @ Superhuman</p>
          <p className="text-muted-fg">Product Design @ G2</p>
          <p className="text-muted-fg">Game Design @ SEI</p>
        </div>
        <p className="w-full font-[family-name:var(--font-sans-stack)] text-[length:var(--font-size-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-note)] tracking-[var(--letter-spacing-none)] text-fg">
          Design HCI + Info Systems @ Carnegie Mellon
        </p>
      </div>
      <div className="col-span-6 font-[family-name:var(--font-serif-stack)] md:col-span-4 md:col-start-3">
        <p className="text-[0px] leading-[var(--line-height-none)] tracking-[var(--tracking-serif-3xl)]">
          <span className="font-[family-name:var(--font-serif-stack)] text-[length:var(--font-size-3xl)] font-[var(--font-weight-regular)] leading-[var(--line-height-none)] tracking-[var(--tracking-serif-3xl)] text-fg">
            Jennie Wei is a product designer{" "}
          </span>
          <span className="font-[family-name:var(--font-serif-stack)] text-[length:var(--font-size-3xl)] font-[var(--font-weight-regular)] leading-[var(--line-height-none)] tracking-[var(--tracking-serif-3xl)] text-muted-fg">
            creating with intention, curiosity, and a drive to understand people.
          </span>
        </p>
      </div>
    </header>
  );
}
