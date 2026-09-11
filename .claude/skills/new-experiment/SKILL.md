---
name: new-experiment
description: Create a new Playground experiment on dallinjanderson.com. Use when asked to add, create, or scaffold a playground experiment, a demo, a toy, or a small interactive thing that should run on the site.
---

# Create a Playground Experiment

Read `docs/playground.md` for the full convention. This skill is the procedure.

## 1. Pick the slug

Lowercase, hyphenated, derived from the title: "Motion Tabs" → `motion-tabs`.
The folder name **is** the slug; there is no slug field anywhere.

Check it does not already exist:

```bash
ls src/playground/experiments/
```

## 2. Create the files

```
src/playground/experiments/<slug>/
  meta.ts
  experiment.tsx
  <slug>.css     # only if the experiment needs its own styles
```

`meta.ts`:

```ts
import { defineExperiment } from '#/playground/types'

export default defineExperiment({
  title: '<Title Case Name>',
  description: '<one sentence, shown on the gallery card>',
  date: '<today, YYYY-MM-DD>',
  tags: ['<two or three>'],
})
```

`experiment.tsx` default-exports a React component taking no props.

Add `layout: 'full'` to the metadata **only** if the experiment genuinely needs
the whole viewport (a canvas, a game, a visualisation). Default to framed.

## 3. Style it with the site's tokens

Use `bg-background`, `text-muted-foreground`, `border-border`, `font-mono`, and
the rest, so it belongs to the site by default.

If it needs its own palette, re-scope tokens on the experiment's own root
element in its own CSS file. **Never edit `src/styles.css`.**

Do not add a dependency for one experiment unless there is genuinely no
alternative.

## 4. Verify

No registration step exists — the registry discovers the folder. But verify:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

The build must prerender `/playground/<slug>`; look for it in the crawler
output. If it is missing, the gallery is not linking to it.

Then run `npm run dev` and **interact with it in a browser**. Server-rendered
output looking correct does not prove the client works — experiments load
through `React.lazy`, and a hydration mistake shows up only as a click that
does nothing or a page that blanks after load.

## 5. Commit

One commit, describing what the experiment is and anything surprising you hit.
