import { Suspense, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CookieConsent } from '../components/CookieConsent'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { JsonLd } from '../components/JsonLd'
import { company, SITE_NAME, SITE_URL } from '../data/site'
import { socialLinks } from '../data/siteData'
import { ErrorPage } from '../pages/ErrorPage'
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
  const [menuOpen, setMenuOpen] = useState(false)

  // Depende de location.key (cambia en cada navegación) para que volver a pulsar el mismo ancla
  // también desplace. Al cambiar de página se salta arriba sin animación; el scroll suave es solo
  // para las anclas
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }
    const timeout = window.setTimeout(() => {
      // getElementById y no querySelector: un hash como "#1" o "#a%20b" no es un selector válido
      let id = location.hash.slice(1)
      try {
        id = decodeURIComponent(id)
      } catch {
        // Hash mal codificado: se busca tal cual
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 40)
    return () => window.clearTimeout(timeout)
  }, [location.key, location.hash])

  // La página se memoriza por ruta: si SiteLayout se vuelve a pintar (p. ej. al abrir el menú)
  // mientras el chunk de la página aún no ha llegado, React no toca el HTML prerenderizado. Si le
  // llegara una actualización antes de hidratarse, lo descartaría y lo pintaría de cero.
  // Las páginas se cargan bajo demanda (ver App.tsx). El Suspense va fuera del ErrorBoundary para
  // no remontarse al navegar: así la transición mantiene la página anterior en lugar de dejar el
  // hueco vacío mientras llega el chunk. key: al navegar a otra página se sale de la pantalla de
  // error
  const page = useMemo(
    () => (
      <Suspense fallback={null}>
        <ErrorBoundary key={location.pathname} fallback={<ErrorPage />}>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    ),
    [location.pathname],
  )

  return (
    <div className="site-shell">
      <JsonLd data={organization} />
      <Header menuOpen={menuOpen} onMenuOpenChange={setMenuOpen} />
      <main>{page}</main>
      <Footer />
      <CookieConsent menuOpen={menuOpen} />
    </div>
  )
}
