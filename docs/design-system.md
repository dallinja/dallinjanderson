# Design system

The site is editorial: warm paper, warm ink, near-monochrome with a single
accent, and type doing most of the work. It should not look like a developer
portfolio. Playfulness belongs in the Playground and in small interactions,
never in the foundation.

## Tokens

All colour lives in one block in `src/styles.css`, defined on `:root` and
overridden under `.dark`. Nothing else defines a colour.

| Token                                | Use                            |
| ------------------------------------ | ------------------------------ |
| `--background` / `--foreground`      | page ground and body text      |
| `--surface` / `--surface-foreground` | raised things: cards, popovers |
| `--muted` / `--muted-foreground`     | secondary text, quiet fills    |
| `--accent` / `--accent-foreground`   | links, hovers, the one colour  |
| `--border`                           | every border and rule          |
| `--ring`                             | focus rings                    |

They are exposed to Tailwind as `bg-background`, `text-muted-foreground`,
`border-border`, and so on. The shadcn/ui names (`--card`, `--primary`,
`--input`, …) alias these so its components inherit the palette.

**Never add a hardcoded colour to a component.** If a component needs a colour
that does not exist, the question is which existing token it should use.

## Type

Three self-hosted variable faces, no more:

- **Newsreader** (`font-serif`) — display and long-form reading. `h1`–`h3` use
  it automatically.
- **Inter** (`font-sans`) — body default, navigation, UI, labels.
- **JetBrains Mono** (`font-mono`) — metadata: dates, tags, kickers, footer.

Self-hosted via Fontsource. Do not add a font CDN: the site is prerendered and
should not depend on another origin to render text.

## Dark mode

Three states — system (default), light, dark — controlled by `ThemeToggle` and
persisted in `localStorage`. An inline script in `<head>` applies the class
before first paint, so there is no flash. Anything that reads the theme must go
through `src/lib/theme.ts`.

## Components

- `src/components/ui/` — shadcn/ui primitives. Add with
  `npx shadcn@latest add <component>`. Use them for the accessibility-heavy
  ones (Dialog, Tabs, Input); they are not the house style by default.
- `src/components/site/` — the site's own components: `SiteHeader`,
  `SiteFooter`, `PageHeader`, `ExperimentCard`, `ThemeToggle`.

Keep the set small. Build a component when the same markup appears a third
time, not in anticipation.

## Layout

Content sits in a `max-w-3xl` column with `px-6` gutters, set once in the root
route. Long-form prose uses `.prose`, which switches to the serif and inherits
the tokens.
