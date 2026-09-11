import { lazy } from 'react'
import { postMetaSchema, projectMetaSchema } from './types'
import type { Post, Project } from './types'
import type { ComponentType, LazyExoticComponent } from 'react'
import type { ZodType } from 'zod'

/**
 * Content is discovered from the filesystem, exactly like Playground
 * experiments: an .mdx file in the right folder is published, and its
 * filename is its slug.
 *
 * Each file exports a `meta` object. Using `import: 'meta'` means the index
 * pages pull in metadata only, so the prose and components of every article
 * do not end up in the index bundle.
 */
const postMeta = import.meta.glob('./writing/*.mdx', {
  eager: true,
  import: 'meta',
})
const projectMeta = import.meta.glob('./projects/*.mdx', {
  eager: true,
  import: 'meta',
})

const postComponents: Record<
  string,
  (() => Promise<{ default: ComponentType }>) | undefined
> = import.meta.glob<{ default: ComponentType }>('./writing/*.mdx')

const projectComponents: Record<
  string,
  (() => Promise<{ default: ComponentType }>) | undefined
> = import.meta.glob<{ default: ComponentType }>('./projects/*.mdx')

function slugFromPath(path: string): string {
  return path
    .split('/')
    .pop()!
    .replace(/\.mdx$/, '')
}

function parse<T extends { date: string }>(
  modules: Record<string, unknown>,
  schema: ZodType<T>,
  kind: string,
): Array<T & { slug: string }> {
  return Object.entries(modules)
    .map(([path, meta]) => {
      const result = schema.safeParse(meta)
      if (!result.success) {
        throw new Error(
          `Invalid ${kind} metadata in ${path}: ${result.error.issues
            .map((issue) => `${issue.path.join('.')} ${issue.message}`)
            .join('; ')}`,
        )
      }
      return { slug: slugFromPath(path), ...result.data }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export const posts: Array<Post> = parse(postMeta, postMetaSchema, 'post')
export const projects: Array<Project> = parse(
  projectMeta,
  projectMetaSchema,
  'project',
)

export const publishedPosts = posts.filter((post) => !post.draft)
export const publishedProjects = projects.filter((project) => !project.draft)

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

// Same lazy-with-stable-cache approach as the playground registry: a
// module-level "already loaded" cache does not survive hydration.
const lazyCache = new Map<string, LazyExoticComponent<ComponentType>>()

function lazyFor(
  loaders: Record<
    string,
    (() => Promise<{ default: ComponentType }>) | undefined
  >,
  path: string,
): LazyExoticComponent<ComponentType> {
  const cached = lazyCache.get(path)
  if (cached) return cached

  const loader = loaders[path]
  if (!loader) throw new Error(`No content module at ${path}`)

  const component = lazy(loader)
  lazyCache.set(path, component)
  return component
}

export function getPostComponent(slug: string) {
  return lazyFor(postComponents, `./writing/${slug}.mdx`)
}

export function getProjectComponent(slug: string) {
  return lazyFor(projectComponents, `./projects/${slug}.mdx`)
}

export async function preloadPost(slug: string) {
  await postComponents[`./writing/${slug}.mdx`]?.()
}

export async function preloadProject(slug: string) {
  await projectComponents[`./projects/${slug}.mdx`]?.()
}
