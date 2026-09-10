import { experimentMetaSchema  } from './types'
import type {Experiment} from './types';
import type { ComponentType } from 'react'

/**
 * Experiments are discovered from the filesystem: drop a folder into
 * ./experiments and it appears in the Playground. Metadata is loaded eagerly
 * (it is tiny, and the index needs all of it); components are loaded on
 * demand so one heavy experiment does not bloat the gallery bundle.
 */
const metaModules = import.meta.glob<{ default: unknown }>(
  './experiments/*/meta.ts',
  { eager: true },
)

// Typed as possibly-missing: the glob record is total at build time, but a
// slug arriving from the URL is not guaranteed to be in it.
const componentLoaders: Record<
  string,
  (() => Promise<{ default: ComponentType }>) | undefined
> = import.meta.glob<{ default: ComponentType }>(
  './experiments/*/experiment.tsx',
)

function slugFromPath(path: string): string {
  return path.split('/')[2]
}

function parseAll(): Array<Experiment> {
  return Object.entries(metaModules)
    .map(([path, module]) => {
      const slug = slugFromPath(path)
      const parsed = experimentMetaSchema.safeParse(module.default)
      if (!parsed.success) {
        // Fail the build rather than shipping a half-broken gallery.
        throw new Error(
          `Invalid experiment metadata in ${path}: ${parsed.error.issues
            .map((issue) => `${issue.path.join('.')} ${issue.message}`)
            .join('; ')}`,
        )
      }
      return { slug, ...parsed.data }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export const experiments: Array<Experiment> = parseAll()

export const publishedExperiments: Array<Experiment> = experiments.filter(
  (experiment) => !experiment.draft,
)

export function getExperiment(slug: string): Experiment | undefined {
  return experiments.find((experiment) => experiment.slug === slug)
}

const componentCache = new Map<string, ComponentType>()

/**
 * Awaited in the route loader so the component is in hand before render.
 * That keeps experiments code-split without needing Suspense during
 * prerendering.
 */
export async function loadExperimentComponent(
  slug: string,
): Promise<ComponentType> {
  const cached = componentCache.get(slug)
  if (cached) return cached

  const loader = componentLoaders[`./experiments/${slug}/experiment.tsx`]
  if (!loader) throw new Error(`No experiment component for slug "${slug}"`)

  const module = await loader()
  componentCache.set(slug, module.default)
  return module.default
}

export function getLoadedExperimentComponent(
  slug: string,
): ComponentType | undefined {
  return componentCache.get(slug)
}
