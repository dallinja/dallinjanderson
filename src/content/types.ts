import { z } from 'zod'

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD')

/** A piece of writing. Lives at /writing/<slug>. */
export const postMetaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: isoDate,
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
})

/**
 * Something built elsewhere and described here. Status is a closed set:
 * resist adding to it. See CONTEXT.md.
 */
export const projectMetaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(['active', 'dormant', 'archived']),
  /** When work started. Used for ordering. */
  date: isoDate,
  url: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  /** Slug of a Playground Experiment to embed on the project page. */
  experiment: z.string().optional(),
  draft: z.boolean().default(false),
})

export type PostMeta = z.infer<typeof postMetaSchema>
export type ProjectMeta = z.infer<typeof projectMetaSchema>

export type Post = PostMeta & { slug: string }
export type Project = ProjectMeta & { slug: string }

export function definePost(meta: z.input<typeof postMetaSchema>) {
  return meta
}

export function defineProject(meta: z.input<typeof projectMetaSchema>) {
  return meta
}
