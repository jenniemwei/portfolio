type SectionHeaderProps = {
  /** Stable id for `aria-labelledby` on the parent section. */
  id: string;
  sectionHeader: string;
};

/** Case-study section title: serif h2 + full-width g2 rule. */
export function SectionHeader({ id, sectionHeader }: SectionHeaderProps) {
  return (
    <div className="flex w-full flex-col gap-[var(--space-s)] text-left">
      <h2 id={id} className="type-h2-section">
        {sectionHeader}
      </h2>
      <hr className="bottom-hr" aria-hidden />
    </div>
  );
}
