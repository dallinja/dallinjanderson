import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '#/components/site/page-header'
import { ProjectCard } from '#/components/site/content-card'
import { publishedProjects } from '#/content/registry'

export const Route = createFileRoute('/projects/')({ component: ProjectsIndex })

function ProjectsIndex() {
  return (
    <div>
      <PageHeader
        title="Projects"
        description="Things I've built that live somewhere other than this site. Not all of them worked, and that's rather the point."
      />
      {publishedProjects.length === 0 ? (
        <p className="text-muted-foreground">Nothing here yet.</p>
      ) : (
        <ul className="divide-border divide-y">
          {publishedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ul>
      )}
    </div>
  )
}
