type WorkPlaceholderProps = {
  title: string;
  period: string;
};

export function WorkPlaceholder({ title, period }: WorkPlaceholderProps) {
  return (
    <main className="pg-w-80 min-h-screen flex-col gap-md px-gutter py-16">
      <h1 className="type-page-heading text-text-default">{title}</h1>
      <p className="type-body text-text-subtle">{period}</p>
      <p className="type-body text-text-subtle">Case study content coming soon.</p>
    </main>
  );
}
