import { z } from 'zod'

/**
 * An Experiment's metadata. The slug is NOT declared here — it is the folder
 * name, so there is exactly one source of truth for an experiment's identity
 * and renaming one is a single `mv`.
 */
export const experimentMetaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  /** ISO date, YYYY-MM-DD. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  tags: z.array(z.string()).default([]),
  /**
   * 'framed'  — renders inside normal site chrome (the default).
   * 'full'    — takes the whole viewport and provides its own way back.
   */
  layout: z.enum(['framed', 'full']).default('framed'),
  /** Hidden from the index while true. */
  draft: z.boolean().default(false),
})

export type ExperimentMeta = z.infer<typeof experimentMetaSchema>
export type ExperimentMetaInput = z.input<typeof experimentMetaSchema>

/** Authoring helper: gives editor completion and validates at build time. */
export function defineExperiment(
  meta: ExperimentMetaInput,
): ExperimentMetaInput {
  return meta
}

export type Experiment = ExperimentMeta & { slug: string }
