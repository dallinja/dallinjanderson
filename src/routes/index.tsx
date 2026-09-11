import { Link, createFileRoute } from '@tanstack/react-router'
import { now } from '#/content/now'
import { publishedPosts, publishedProjects } from '#/content/registry'
import { publishedExperiments } from '#/playground/registry'

export const Route = createFileRoute('/')({ component: Home })

function Section({
  title,
  to,
  children,
}: {
  title: string
  to: '/projects' | '/writing' | '/playground'
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
          {title}
        </h2>
        <Link
          to={to}
          className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
        >
          All
        </Link>
      </div>
      {children}
    </section>
  )
}

/**
 * Presentational only. The Link wraps it at each call site so the router can
 * typecheck `to` against its own param names.
 */
function RowContent({ title, meta }: { title: string; meta: string }) {
  return (
    <span className="group flex items-baseline justify-between gap-4 py-1.5">
      <span className="group-hover:text-accent font-serif text-lg transition-colors">
        {title}
      </span>
      <span className="text-muted-foreground shrink-0 font-mono text-xs">
        {meta}
      </span>
    </span>
  )
}

function Home() {
  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-4xl">Dallin Anderson</h1>
        <p className="text-muted-foreground text-lg">
          Software engineer, builder, writer, and occasional musician.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
          Currently
        </h2>
        <dl className="space-y-2">
          {now.map((entry) => (
            <div key={entry.label} className="flex gap-3 text-base">
              <dt className="text-muted-foreground w-20 shrink-0 font-mono text-sm">
                {entry.label}
              </dt>
              <dd>
                {entry.href ? (
                  <a
                    href={entry.href}
                    className="hover:text-accent underline underline-offset-4"
                  >
                    {entry.value}
                  </a>
                ) : (
                  entry.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {publishedProjects.length > 0 ? (
        <Section title="Projects" to="/projects">
          <ul>
            {publishedProjects.slice(0, 3).map((project) => (
              <li key={project.slug}>
                <Link
                  to="/projects/$project"
                  params={{ project: project.slug }}
                  className="block"
                >
                  <RowContent title={project.title} meta={project.status} />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {publishedPosts.length > 0 ? (
        <Section title="Writing" to="/writing">
          <ul>
            {publishedPosts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Link
                  to="/writing/$slug"
                  params={{ slug: post.slug }}
                  className="block"
                >
                  <RowContent title={post.title} meta={post.date} />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {publishedExperiments.length > 0 ? (
        <Section title="Playground" to="/playground">
          <ul>
            {publishedExperiments.slice(0, 3).map((experiment) => (
              <li key={experiment.slug}>
                <Link
                  to="/playground/$slug"
                  params={{ slug: experiment.slug }}
                  className="block"
                >
                  <RowContent title={experiment.title} meta={experiment.date} />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </div>
  )
}
