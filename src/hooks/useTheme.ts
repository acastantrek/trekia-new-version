import { useCallback, useState } from 'react'

// 'mixed' alterna secciones claras y oscuras; es el modo por defecto
export type Theme = 'light' | 'mixed' | 'dark'

export const THEMES: Theme[] = ['light', 'mixed', 'dark']

// Clave nueva: la anterior ('theme') se guardaba en cada visita aunque el usuario no eligiera nada
const STORAGE_KEY = 'theme-preference'

function isTheme(value: string | null): value is Theme {
  return THEMES.includes(value as Theme)
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'mixed'
  const attr = document.documentElement.getAttribute('data-theme')
  return isTheme(attr) ? attr : 'mixed'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  // Solo se guarda cuando el usuario elige un modo explícitamente
  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
  }, [])

  return { theme, setTheme }
}
