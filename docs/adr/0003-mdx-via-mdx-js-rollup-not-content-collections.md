# MDX via @mdx-js/rollup, not content-collections

Content is compiled by `@mdx-js/rollup` as an ordinary Vite plugin, with
discovery by `import.meta.glob` and metadata exported from each file as
`export const meta` and validated with zod. We had originally chosen
`@content-collections/*`, which has an official TanStack Start quickstart and
typed frontmatter, and reversed that decision after installing it.

## Considered Options

- **@mdx-js/rollup (chosen)**: `.mdx` files become ordinary ES modules, so
  they are code-split per file and contain no runtime `eval`. Discovery works
  exactly like the Playground registry, so the repo has one convention rather
  than two.
- **@content-collections/\***: rejected on installation. It pulled five
  vulnerabilities with no fix available (`mdx-bundler` →
  `remark-mdx-frontmatter` → `toml` prototype pollution and uncontrolled
  recursion, plus `uuid`), and mdx-bundler's model compiles content to code
  strings that are evaluated at runtime — a poor fit for a site that is
  entirely prerendered. The vulnerabilities are build-time only and the real
  risk was low, but the combination was not worth it for a personal site.
- **Velite / fumadocs-mdx**: not seriously evaluated. fumadocs is built for
  documentation sites and its own threads flag unresolved full-static support.

## Consequences

No YAML frontmatter. Each file exports `meta` instead, which needs no parser
and gives TypeScript completion while writing. The trade-off is that content
files begin with an import and an export rather than a `---` block, which is
less conventional for anyone used to a normal static site generator.
