type SectionHeaderProps = {
  title: string;
};

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex w-full items-center border-line border-b border-solid py-[var(--space-s)]">
      <p className="whitespace-nowrap text-secondary [font:var(--section-h2)] [letter-spacing:var(--section-h2-tracking,0)]">
        {title}
      </p>
    </div>
  );
}
