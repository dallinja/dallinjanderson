# dallinjanderson.com

Dallin Anderson's personal site and internet workshop. Read `CONTEXT.md`
first — it defines what a Project, an Experiment, and a Post are, and those
words are used precisely throughout this repo.

## Commands

```bash
npm run dev              # dev server on :3000
npm run build            # production build (prerenders every route)
npm run generate-routes  # regenerate src/routeTree.gen.ts after adding a route
npm run lint             # eslint
npm run format           # prettier --write + eslint --fix
npx tsc --noEmit         # typecheck
```

Always run typecheck, lint and build before claiming a change works.
`npm run generate-routes` is required after adding or renaming any file in
`src/routes/` — the build reads the generated route tree, not the filesystem.

## Architecture

- **TanStack Start** with **TanStack Router** (file-based routes in `src/routes/`).
- **Fully prerendered.** Nitro crawls from `/` and writes static HTML for every
  route it can reach by following links. A page that nothing links to will not
  be prerendered — see `docs/architecture.md`.
- **No database, no CMS.** Content is files in the repo.
- Deployed to Vercel. Prerender config lives in `nitro()`'s options in
  `vite.config.ts`, _not_ in `tanstackStart()` — the Start plugin has no
  prerender surface.

## Where things live

```
src/
  routes/            file-based routes
  components/
    site/            site-specific components (header, cards, page header)
    ui/              shadcn/ui primitives
  content/           now.ts, plus projects/ and writing/ as .mdx
  playground/
    experiments/     one folder per Experiment
    registry.ts      filesystem discovery
    types.ts         Experiment metadata schema
  lib/               theme, utils
docs/
  playground.md      how to add an Experiment
  design-system.md   tokens, type, component conventions
  content.md         how to add a Project or a Post
  architecture.md    decisions that constrain how this is built
  adr/               architecture decision records
```

## Git

- **Never add co-author trailers.** No `Co-Authored-By`, no `Claude-Session`,
  no "Generated with" lines — in commit messages or PR descriptions. Commits
  are authored by Dallin.
- Commit messages explain _why_ a change was made and anything surprising that
  was hit along the way.

## Conventions

- **Never edit global theme tokens to style one page.** All colour lives in
  `src/styles.css`. See `docs/design-system.md`.
- **Do not add dependencies for a single Experiment** unless there is no
  reasonable alternative. Reach for CSS and the platform first.
- Prefer plain functions and small components over abstraction. This is a
  personal site, not a framework.
- Match the surrounding code. Comments explain _why_, never _what_.

## Content

Projects and Posts are `.mdx` files under `src/content/`, discovered by glob.
Filename is the slug; metadata is `export const meta`, not frontmatter. See
`docs/content.md`.
