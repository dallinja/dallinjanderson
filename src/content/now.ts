/**
 * The most-edited file on the site. Structured rather than prose so that
 * editing it can never break the homepage layout.
 */
export type NowEntry = {
  label: string
  value: string
  href?: string
}

export const now: Array<NowEntry> = [
  {
    label: 'Building',
    value: 'Neighbor.com',
    href: 'https://www.neighbor.com',
  },
  { label: 'Writing', value: 'They Were Gods' },
  { label: 'Exploring', value: 'AI, games, software architecture' },
]
