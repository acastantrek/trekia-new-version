const STORAGE_KEY = 'trekia-cookie-consent'

export interface CookiePreferences {
  functional: boolean
  analytics: boolean
  performance: boolean
  advertising: boolean
  uncategorized: boolean
}

export const defaultPreferences: CookiePreferences = {
  functional: false,
  analytics: false,
  performance: false,
  advertising: false,
  uncategorized: false,
}

export const allAcceptedPreferences: CookiePreferences = {
  functional: true,
  analytics: true,
  performance: true,
  advertising: true,
  uncategorized: true,
}

export function getStoredConsent(): CookiePreferences | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>
    return { ...defaultPreferences, ...parsed }
  } catch {
    return null
  }
}

// Con el almacenamiento bloqueado (navegación privada, políticas de empresa) la elección vale
// solo para esta visita, pero el banner se cierra igual
export function saveConsent(preferences: CookiePreferences) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  } catch {
    // Sin almacenamiento: no se guarda
  }
}
