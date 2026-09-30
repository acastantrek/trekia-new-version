import { Link } from 'react-router-dom'

interface CookieBannerProps {
  onAcceptAll: () => void
  onRejectAll: () => void
  onCustomize: () => void
}

export function CookieBanner({ onAcceptAll, onRejectAll, onCustomize }: CookieBannerProps) {
  return (
    <div className="cookie-banner" role="dialog" aria-label="Aviso de cookies">
      <p>
        Usamos cookies técnicas necesarias para el funcionamiento del sitio, y podrás activar
        opcionalmente otras categorías cuando estén disponibles. Puedes consultar más detalles en
        nuestra <Link to="/politica-cookies">Política de Cookies</Link>.
      </p>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-btn cookie-btn-ghost" onClick={onRejectAll}>
          Rechazar todo
        </button>
        <button type="button" className="cookie-btn cookie-btn-ghost" onClick={onCustomize}>
          Personalizar
        </button>
        <button type="button" className="cookie-btn cookie-btn-solid" onClick={onAcceptAll}>
          Aceptar todo
        </button>
      </div>
    </div>
  )
}
