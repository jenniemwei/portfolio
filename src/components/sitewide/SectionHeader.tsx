type SectionHeaderProps = {
  title: string;
};

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex w-full items-center border-line border-b border-solid py-[var(--space-s)]">
      <p className="type-section-h2 whitespace-nowrap text-subtle">
        {title}
      </p>
    </div>
  );
}
