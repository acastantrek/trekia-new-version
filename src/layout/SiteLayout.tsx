import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CookieBanner } from '../components/CookieBanner'
import { CookiePreferencesModal } from '../components/CookiePreferencesModal'
import { CookieSettingsButton } from '../components/CookieSettingsButton'
import { JsonLd } from '../components/JsonLd'
import { company, SITE_NAME, SITE_URL } from '../data/site'
import { socialLinks } from '../data/siteData'
import {
  allAcceptedPreferences,
  defaultPreferences,
  getStoredConsent,
  saveConsent,
  type CookiePreferences,
} from '../lib/cookieConsent'
import { Footer } from './Footer'
import { Header } from './Header'

// Datos de la empresa para buscadores: se repiten en todas las páginas y los artículos del blog
// los referencian como editor por su @id
const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: company.legalName,
  taxID: company.taxId,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-256.png`,
  email: company.email,
  telephone: company.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    postalCode: company.address.postalCode,
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    addressCountry: company.address.country,
  },
  sameAs: socialLinks.map((link) => link.href),
}

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
      <JsonLd data={organization} />
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
