import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CookieBanner } from '../components/CookieBanner'
import { CookiePreferencesModal } from '../components/CookiePreferencesModal'
import { CookieSettingsButton } from '../components/CookieSettingsButton'
import {
  allAcceptedPreferences,
  defaultPreferences,
  getStoredConsent,
  saveConsent,
  type CookiePreferences,
} from '../lib/cookieConsent'
import { Footer } from './Footer'
import { Header } from './Header'

export function SiteLayout() {
  const location = useLocation()
  const [preferences, setPreferences] = useState<CookiePreferences>(() => getStoredConsent() ?? defaultPreferences)
  const [bannerOpen, setBannerOpen] = useState(() => !getStoredConsent())
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)
      window.setTimeout(() => target?.scrollIntoView({ behavior: 'smooth' }), 40)
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.hash, location.pathname])

  const finalize = (value: CookiePreferences) => {
    saveConsent(value)
    setPreferences(value)
    setBannerOpen(false)
    setModalOpen(false)
  }

  return (
    <div className="site-shell">
      <Header onMenuOpenChange={setMenuOpen} />
      <main>
        <Outlet />
      </main>
      <Footer />
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
    </div>
  )
}
