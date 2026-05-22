type WorkPlaceholderProps = {
  title: string;
  period: string;
};

export function WorkPlaceholder({ title, period }: WorkPlaceholderProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-page-lg flex-col gap-md px-gutter py-64">
      <h1 className="type-page-heading text-default">{title}</h1>
      <p className="type-body text-subtle">{period}</p>
      <p className="type-body text-subtle">Case study content coming soon.</p>
    </main>
  );
}
