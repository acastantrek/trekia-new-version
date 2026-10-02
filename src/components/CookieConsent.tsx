import { useState } from 'react'
import { useIsClient } from '../hooks/useIsClient'
import {
  allAcceptedPreferences,
  defaultPreferences,
  getStoredConsent,
  saveConsent,
  type CookiePreferences,
} from '../lib/cookieConsent'
import { CookieBanner } from './CookieBanner'
import { CookiePreferencesModal } from './CookiePreferencesModal'
import { CookieSettingsButton } from './CookieSettingsButton'

interface CookieConsentProps {
  /** Con el menú móvil abierto se ocultan el banner y el botón de preferencias */
  menuOpen: boolean
}

// Banner, modal y botón de preferencias de cookies. Va en su propio componente para que su estado
// (que cambia justo después de hidratar) no vuelva a pintar SiteLayout ni la página
export function CookieConsent({ menuOpen }: CookieConsentProps) {
  // En el prerender no se sabe si el visitante ya eligió sus cookies: el banner y el botón de
  // preferencias se pintan después de hidratar
  const isClient = useIsClient()
  const [preferences, setPreferences] = useState<CookiePreferences>(
    () => getStoredConsent() ?? defaultPreferences,
  )
  const [bannerOpen, setBannerOpen] = useState(() => !getStoredConsent())
  const [modalOpen, setModalOpen] = useState(false)

  const finalize = (value: CookiePreferences) => {
    saveConsent(value)
    setPreferences(value)
    setBannerOpen(false)
    setModalOpen(false)
  }

  if (!isClient) return null

  return (
    <>
      {bannerOpen && (
        <div style={{ display: menuOpen ? 'none' : undefined }}>
          <CookieBanner
            onAcceptAll={() => finalize(allAcceptedPreferences)}
            onRejectAll={() => finalize(defaultPreferences)}
            onCustomize={() => {
              setBannerOpen(false)
              setModalOpen(true)
            }}
          />
        </div>
      )}
      {modalOpen && <CookiePreferencesModal initialPreferences={preferences} onClose={finalize} />}
      {!bannerOpen && !modalOpen && (
        <div style={{ display: menuOpen ? 'none' : undefined }}>
          <CookieSettingsButton onClick={() => setModalOpen(true)} />
        </div>
      )}
    </>
  )
}
