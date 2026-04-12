type SectionHeaderProps = {
  title: string;
};

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex w-full items-center border-line border-b border-solid py-[var(--space-s)]">
      <p className="font-[family-name:var(--font-serif-stack)] text-[length:var(--font-size-xl)] font-[var(--font-weight-regular)] leading-[var(--line-height-none)] tracking-[var(--tracking-serif-base)] whitespace-nowrap text-muted-fg">
        {title}
      </p>
    </div>
  );
}
