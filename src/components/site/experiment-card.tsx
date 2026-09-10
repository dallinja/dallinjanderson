import { Link } from '@tanstack/react-router'
import type { Experiment } from '#/playground/types'

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <li>
      <Link
        to="/playground/$slug"
        params={{ slug: experiment.slug }}
        className="group border-border hover:border-accent/50 block rounded-md border p-5 transition-colors"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="group-hover:text-accent font-serif text-xl transition-colors">
            {experiment.title}
          </h3>
          <time
            dateTime={experiment.date}
            className="text-muted-foreground shrink-0 font-mono text-xs"
          >
            {experiment.date}
          </time>
        </div>
        <p className="text-muted-foreground mt-2 text-sm">
          {experiment.description}
        </p>
        {experiment.tags.length > 0 ? (
          <ul className="text-muted-foreground mt-3 flex flex-wrap gap-2 font-mono text-xs">
            {experiment.tags.map((tag) => (
              <li key={tag} className="bg-muted rounded px-1.5 py-0.5">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </Link>
    </li>
  )
}
