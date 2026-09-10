import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/')({ component: ProjectsIndex })

function ProjectsIndex() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Projects</h1>
      <p className="text-muted-foreground">Things built elsewhere.</p>
    </div>
  )
}
