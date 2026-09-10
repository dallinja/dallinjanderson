import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({ component: About })

function About() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl">About</h1>
      <p className="text-muted-foreground">
        Dallin Anderson is a software engineer, builder, and writer.
      </p>
    </div>
  )
}
