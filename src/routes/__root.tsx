import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useMatches,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { SiteHeader } from '#/components/site/site-header'
import { SiteFooter } from '#/components/site/site-footer'
import { themeInitScript } from '#/lib/theme'
import appCss from '../styles.css?url'

const SITE_TITLE = 'Dallin Anderson'
const SITE_DESCRIPTION =
  'The place where Dallin Anderson makes things: projects, writing, and a playground of small experiments.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: SITE_TITLE },
      { name: 'description', content: SITE_DESCRIPTION },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      // The SVG carries its own prefers-color-scheme rules, so one file
      // covers both themes. PNGs are the fallback for browsers that do not
      // take SVG favicons.
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      {
        rel: 'icon',
        href: '/favicon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        rel: 'icon',
        href: '/favicon-96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
    scripts: [{ children: themeInitScript }],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

/**
 * Site chrome, unless a route opts out via `staticData.fullBleed`.
 * Full-bleed is the Playground's escape hatch: an experiment that needs the
 * whole viewport gets it, and provides its own way back.
 */
function RootComponent() {
  const matches = useMatches()
  const fullBleed = matches.some((match) => {
    const staticData = match.staticData as { fullBleed?: boolean } | undefined
    const loaderData = match.loaderData as { fullBleed?: boolean } | undefined
    return Boolean(staticData?.fullBleed ?? loaderData?.fullBleed)
  })

  if (fullBleed) return <Outlet />

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
