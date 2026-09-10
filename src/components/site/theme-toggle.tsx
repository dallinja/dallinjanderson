import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import {
  THEMES,
  applyTheme,
  readStoredTheme,
  storeTheme
  
} from '#/lib/theme'
import type {Theme} from '#/lib/theme';
import { cn } from '#/lib/utils'

const ICONS = { system: Monitor, light: Sun, dark: Moon } as const
const LABELS = {
  system: 'System theme',
  light: 'Light theme',
  dark: 'Dark theme',
} as const

export function ThemeToggle() {
  // Server-rendered as 'system' (the default); corrected on mount if the
  // visitor has chosen otherwise. Same size either way, so nothing shifts.
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    setTheme(readStoredTheme())
  }, [])

  // While on 'system', follow the OS if it changes mid-visit.
  useEffect(() => {
    if (theme !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyTheme('system')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [theme])

  function select(next: Theme) {
    setTheme(next)
    storeTheme(next)
    applyTheme(next)
  }

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="border-border inline-flex items-center gap-0.5 rounded-full border p-0.5"
    >
      {THEMES.map((option) => {
        const Icon = ICONS[option]
        const selected = theme === option
        return (
          <button
            key={option}
            type="button"
            onClick={() => select(option)}
            aria-pressed={selected}
            title={LABELS[option]}
            className={cn(
              'cursor-pointer rounded-full p-1.5 transition-colors',
              selected
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            <span className="sr-only">{LABELS[option]}</span>
          </button>
        )
      })}
    </div>
  )
}
