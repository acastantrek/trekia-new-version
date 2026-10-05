import { useRef, useState } from 'react'
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
  // Se guarda al pulsar, antes de que el botón se oculte y pierda el foco
  const modalOpenerRef = useRef<HTMLElement | null>(null)
  const openModal = () => {
    modalOpenerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    setModalOpen(true)
  }

  const finalize = (value: CookiePreferences) => {
    saveConsent(value)
    setPreferences(value)
    setBannerOpen(false)
    setModalOpen(false)
  }

  if (!isClient) return null

  return (
    <>
      {/* El banner y el botón de preferencias se ocultan, sin desmontarse, mientras el modal está
          abierto: así el foco puede volver al botón que lo abrió al cerrarlo */}
      {bannerOpen && (
        <div style={{ display: menuOpen || modalOpen ? 'none' : undefined }}>
          <CookieBanner
            onAcceptAll={() => finalize(allAcceptedPreferences)}
            onRejectAll={() => finalize(defaultPreferences)}
            onCustomize={openModal}
          />
        </div>
      )}
      {modalOpen && (
        <CookiePreferencesModal
          initialPreferences={preferences}
          onClose={finalize}
          // Sin elegir nada: si aún no había consentimiento, el banner sigue ahí
          onDismiss={() => setModalOpen(false)}
          openerRef={modalOpenerRef}
        />
      )}
      {!bannerOpen && (
        <div style={{ display: menuOpen || modalOpen ? 'none' : undefined }}>
          <CookieSettingsButton onClick={openModal} />
        </div>
      )}
    </>
  )
}
