import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '#/components/site/page-header'
import { ExperimentCard } from '#/components/site/experiment-card'
import { publishedExperiments } from '#/playground/registry'

export const Route = createFileRoute('/playground/')({
  component: PlaygroundIndex,
})

function PlaygroundIndex() {
  return (
    <div>
      <PageHeader
        title="Playground"
        description="Small interactive things that run right here — tools, toys, visualisations, and experiments that were interesting enough to keep."
      />
      {publishedExperiments.length === 0 ? (
        <p className="text-muted-foreground">Nothing here yet.</p>
      ) : (
        <ul className="grid gap-4">
          {publishedExperiments.map((experiment) => (
            <ExperimentCard key={experiment.slug} experiment={experiment} />
          ))}
        </ul>
      )}
    </div>
  )
}
