import { Suspense } from 'react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Prose } from '#/components/site/prose'
import {
  getProject,
  getProjectComponent,
  preloadProject,
} from '#/content/registry'
import {
  getExperiment,
  getExperimentComponent,
  preloadExperimentComponent,
} from '#/playground/registry'

export const Route = createFileRoute('/projects/$project')({
  loader: async ({ params }) => {
    const project = getProject(params.project)
    if (!project) throw notFound()
    await preloadProject(project.slug)
    // A Project may embed an Experiment when one exists. Each still has
    // exactly one canonical home; this is a reference, not a copy.
    const embedded =
      project.experiment && getExperiment(project.experiment)
        ? project.experiment
        : undefined
    if (embedded) await preloadExperimentComponent(embedded)
    return { project, embedded }
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.project.title} — Dallin Anderson` },
            { name: 'description', content: loaderData.project.description },
          ],
        }
      : {},
  component: ProjectRoute,
})

function ProjectRoute() {
  const { project, embedded } = Route.useLoaderData()
  const Content = getProjectComponent(project.slug)
  const Experiment = embedded ? getExperimentComponent(embedded) : undefined

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <Link
          to="/projects"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
        >
          <ArrowLeft className="size-3" aria-hidden />
          Projects
        </Link>
        <h1 className="text-3xl">{project.title}</h1>
        <div className="text-muted-foreground flex flex-wrap items-center gap-4 font-mono text-xs">
          <span>{project.status}</span>
          {project.url ? (
            <a
              href={project.url}
              className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              {new URL(project.url).hostname.replace(/^www\./, '')}
              <ExternalLink className="size-3" aria-hidden />
            </a>
          ) : null}
        </div>
      </header>

      <Suspense fallback={null}>
        <Prose>
          <Content />
        </Prose>
      </Suspense>

      {Experiment ? (
        <section className="space-y-3">
          <h2 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            Try it
          </h2>
          <Suspense fallback={null}>
            <Experiment />
          </Suspense>
        </section>
      ) : null}
    </article>
  )
}
