import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playground/')({
  component: PlaygroundIndex,
})

const SPIKE_SLUGS = ['motion-tabs', 'color-field']

function PlaygroundIndex() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Playground</h1>
      <ul className="mt-4">
        {SPIKE_SLUGS.map((slug) => (
          <li key={slug}>
            <Link
              to="/playground/$slug"
              params={{ slug }}
              className="underline"
            >
              {slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
