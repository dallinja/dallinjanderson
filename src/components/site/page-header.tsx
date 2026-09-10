export function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <header className="mb-12 space-y-3">
      <h1 className="text-3xl">{title}</h1>
      {description ? (
        <p className="text-muted-foreground max-w-prose text-base">
          {description}
        </p>
      ) : null}
    </header>
  )
}
