import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import {
  getExperiment,
  getLoadedExperimentComponent,
  loadExperimentComponent,
} from '#/playground/registry'

export const Route = createFileRoute('/playground/$slug')({
  loader: async ({ params }) => {
    const experiment = getExperiment(params.slug)
    if (!experiment) throw notFound()
    // Awaited here so the component is in hand before render, which keeps
    // experiments code-split without Suspense during prerendering.
    await loadExperimentComponent(experiment.slug)
    return { experiment, fullBleed: experiment.layout === 'full' }
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.experiment.title} — Dallin Anderson` },
            { name: 'description', content: loaderData.experiment.description },
          ],
        }
      : {},
  component: ExperimentRoute,
})

function ExperimentRoute() {
  const { experiment } = Route.useLoaderData()
  const Component = getLoadedExperimentComponent(experiment.slug)

  if (!Component) return null

  if (experiment.layout === 'full') {
    return (
      <div className="relative min-h-screen">
        <Link
          to="/playground"
          className="bg-surface/80 text-muted-foreground hover:text-foreground border-border fixed top-4 left-4 z-50 flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur transition-colors"
        >
          <ArrowLeft className="size-3" aria-hidden />
          Playground
        </Link>
        <Component />
      </div>
    )
  }

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <Link
          to="/playground"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
        >
          <ArrowLeft className="size-3" aria-hidden />
          Playground
        </Link>
        <h1 className="text-3xl">{experiment.title}</h1>
        <p className="text-muted-foreground max-w-prose">
          {experiment.description}
        </p>
      </header>
      <Component />
    </article>
  )
}
