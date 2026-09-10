import { Link } from '@tanstack/react-router'
import { ThemeToggle } from './theme-toggle'

const NAV = [
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/playground', label: 'Playground' },
  { to: '/about', label: 'About' },
] as const

export function SiteHeader() {
  return (
    <header className="border-border/60 border-b">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-6 px-6 py-5">
        <Link
          to="/"
          className="font-serif text-lg tracking-tight hover:text-accent transition-colors"
        >
          Dallin Anderson
        </Link>

        <div className="flex items-center gap-5">
          <nav aria-label="Main">
            <ul className="flex items-center gap-5 text-sm">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    activeProps={{ className: 'text-foreground' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
