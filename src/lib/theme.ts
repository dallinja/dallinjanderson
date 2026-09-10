export type Theme = 'system' | 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'
export const THEMES: Array<Theme> = ['system', 'light', 'dark']

export function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && THEMES.includes(value as Theme)
}

/** Applies the resolved theme to <html>. Safe to call repeatedly. */
export function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

export function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* private mode, blocked storage — the theme still applies for this page */
  }
}

/**
 * Runs before first paint to avoid a light-mode flash on a dark-mode device.
 * Inlined into <head>, so it must be self-contained and must not throw.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'&&t!=='system'){t='system'}var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`
