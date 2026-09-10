import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playground/$slug')({
  component: Experiment,
})

function Experiment() {
  const { slug } = Route.useParams()
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">{slug}</h1>
      <p className="mt-4">Spike: nested dynamic route rendered statically.</p>
    </div>
  )
}
