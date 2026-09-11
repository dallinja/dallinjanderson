# Adding a Playground Experiment

An **Experiment** is a small interactive thing whose code lives in this repo
and runs on this site. (Something that lives elsewhere is a **Project** — see
`CONTEXT.md`.)

## The convention

One folder per experiment, named for its slug:

```
src/playground/experiments/<slug>/
  meta.ts          required — metadata
  experiment.tsx   required — default-exported React component
  <slug>.css       optional — scoped styles
  notes.mdx        optional — not yet supported, see "Not built yet"
```

**The folder name is the slug.** There is no `slug` field: an experiment's
identity has exactly one source of truth, and renaming one is a single `mv`.

Nothing needs registering. `src/playground/registry.ts` discovers experiments
from the filesystem, so a new folder appears in the gallery automatically.

## meta.ts

```ts
import { defineExperiment } from '#/playground/types'

export default defineExperiment({
  title: 'Motion Tabs',
  description:
    'One sentence. Shown on the gallery card and used as the meta description.',
  date: '2026-01-17', // YYYY-MM-DD
  tags: ['css', 'animation'],
  layout: 'framed', // optional, defaults to 'framed'
  draft: false, // optional, hides it from the gallery
})
```

Metadata is validated by zod at build time. A malformed `meta.ts` fails the
build rather than shipping a broken gallery.

## experiment.tsx

Default-export a React component that takes no props:

```tsx
export default function MotionTabs() {
  return <div>…</div>
}
```

Components are code-split with `React.lazy` and preloaded in the route loader.
**Do not** load the component through a module-level "already loaded" cache:
the router reuses serialized SSR loader data on hydration, so such a cache is
empty at first client render and the page blanks. This was a real bug; see the
commit "Fix experiments going blank after hydration".

## Layout

- `layout: 'framed'` (default) — renders inside normal site chrome. Use this
  unless the experiment genuinely needs the viewport.
- `layout: 'full'` — takes the whole viewport. The route supplies a floating
  "Playground" link back; the experiment supplies everything else.

## Styling

Use the site's tokens (`bg-background`, `text-muted-foreground`, `font-mono`,
etc.) so the experiment belongs to the site by default.

If an experiment needs its own look, **re-scope the tokens on its own root
element** — never edit `src/styles.css`:

```css
.my-experiment {
  --background: #0f0f0f;
  --foreground: #fff;
}
```

`motion-tabs` does exactly this: it keeps a dark metallic palette in its own
CSS file without touching the global theme.

Avoid adding dependencies for one experiment. Reach for CSS and the platform
first.

## Checklist

1. Create the folder with `meta.ts` and `experiment.tsx`.
2. `npx tsc --noEmit && npm run lint && npm run build`.
3. Confirm the gallery lists it and `/playground/<slug>` renders.
4. For anything interactive, load the page and **click it** — SSR output
   looking right does not prove the client works.

## Not built yet

`notes.mdx` (prose attached to an Experiment) is described in `CONTEXT.md` but
**not implemented** — it needs the MDX pipeline, which does not exist yet.
