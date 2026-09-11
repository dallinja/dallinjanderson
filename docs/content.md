# Adding content

Projects and Posts are `.mdx` files in `src/content/`. **The filename is the
slug** — same rule as Playground experiments. There is no registration step
and no frontmatter: each file exports a `meta` object, validated by zod at
build time.

## A new Post

Create `src/content/writing/<slug>.mdx`:

```mdx
import { definePost } from '#/content/types'

export const meta = definePost({
  title: 'Why I built this site',
  description:
    'One sentence. Shown on the index and used as the meta description.',
  date: '2026-09-10',
  tags: ['meta', 'design'],
  draft: false,
})

Prose starts here. Markdown, plus any React component you import.
```

## A new Project

A **Project** is something that lives somewhere other than this site (see
`CONTEXT.md`). Create `src/content/projects/<slug>.mdx`:

```mdx
import { defineProject } from '#/content/types'

export const meta = defineProject({
  title: 'Neighbor.com',
  description: 'One sentence.',
  status: 'active', // active | dormant | archived — closed set
  date: '2026-01-01', // when work started; used for ordering
  url: 'https://…', // optional
  tags: ['marketplace'],
  experiment: 'motion-tabs', // optional: embeds that Experiment on the page
  draft: false,
})
```

`status` is deliberately a closed set of three. Resist adding to it; the prose
can say "I abandoned this" without the label having to.

`experiment` references a Playground Experiment by slug and embeds it under a
"Try it" heading. The experiment's canonical home is still
`/playground/<slug>` — this is a reference, not a copy.

## Why no frontmatter

`export const meta` needs no YAML parser, no extra plugins, and gives real
TypeScript completion inside the file. It also means content and experiments
follow the _same_ convention, so there is one thing to learn rather than two.

## Drafts

`draft: true` keeps an item off the indexes. Note it is excluded by the
`published*` exports in `src/content/registry.ts`, so a draft is still built
and reachable by direct URL — it is unlisted, not secret.

## Checklist

1. Create the `.mdx` file.
2. `npx tsc --noEmit && npm run lint && npm run build`.
3. Check the crawler output lists your new route. If it does not, the index
   is not linking to it and it will not be prerendered.
