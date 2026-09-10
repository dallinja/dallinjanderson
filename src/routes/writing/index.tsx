import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/writing/')({ component: WritingIndex })

function WritingIndex() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Writing</h1>
      <p className="text-muted-foreground">
        Notes, essays, and things learned.
      </p>
    </div>
  )
}
