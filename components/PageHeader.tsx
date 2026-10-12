interface Props {
  /**
   * The main title of the page or section. This is a required prop and should be a concise and descriptive title that clearly indicates the content or purpose of the page.
   */
  title: string;
  /**
   * An optional description that provides more detail about the page or section. This can be used to give users a better understanding of what to expect or to provide additional context.
   */
  description?: string;
}

export function PageHeader({ title, description }: Props) {
  return (
    <header>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </header>
  );
}
