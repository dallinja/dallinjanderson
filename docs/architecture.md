# Architecture

Decisions that constrain how this site is built. Individual trade-offs with
alternatives are recorded in `docs/adr/`.

## Fully prerendered

`npm run build` produces static HTML for every route. Nitro starts at `/` and
**crawls links** to discover the rest (`prerender.crawlLinks` in
`vite.config.ts`).

The consequence that bites: **a route nothing links to is never prerendered.**
If you add a page that is not reachable by following links from `/`, add it to
`prerender.routes` explicitly or it will only exist as a server fallback.

Prerender options live in `nitro()`'s config, not `tanstackStart()`'s. The
Start plugin exposes no prerender surface — the option names in some docs do
not exist in the installed package.

## No server, mostly

Under the Vercel preset the build emits static files plus one
`__server.func` fallback, and `config.json` puts `handle: filesystem` ahead of
the catch-all. Pages are served from the CDN; the function only handles what
the filesystem does not.

That fallback is the escape hatch: if one Experiment eventually needs
persistence or an API, it can have a server route without changing how the
rest of the site is served. Do not introduce a database or auth for the site
as a whole.

## Content is files

Git is the CMS. Content lives in the repo as data or MDX, never in a database.

## Package manager

npm. There is a `package-lock.json` and no pnpm or yarn lockfile; keep it that
way.

## Not built yet

The MDX pipeline for Projects and Writing does not exist. The intended
approach is `@content-collections/*`, which has an official TanStack Start
quickstart and gives zod-typed frontmatter. `/projects` and `/writing` are
placeholder routes until then.
