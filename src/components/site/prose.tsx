import type { ReactNode } from 'react'

/** Wrapper for MDX content. All long-form typography lives here. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-accent">
      {children}
    </div>
  )
}
