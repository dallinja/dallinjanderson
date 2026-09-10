import { createFileRoute } from '@tanstack/react-router'
import { now } from '#/content/now'

export const Route = createFileRoute('/')({ component: Home })

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
    </div>
  )
}
