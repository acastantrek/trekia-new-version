import { useRef, useState, type RefObject } from 'react'
import { useFocusTrap } from '../hooks/useFocusTrap'
import {
  allAcceptedPreferences,
  defaultPreferences,
  type CookiePreferences,
} from '../lib/cookieConsent'

interface CategoryDef {
  key: keyof CookiePreferences | 'necessary'
  title: string
  description: string
  locked?: boolean
}

const categories: CategoryDef[] = [
  {
    key: 'necessary',
    title: 'Necesaria',
    description:
      'Las cookies necesarias son imprescindibles para el funcionamiento básico del sitio web; sin ellas, el sitio no funcionaría correctamente. Estas cookies no almacenan ningún dato de identificación personal.',
    locked: true,
  },
  {
    key: 'functional',
    title: 'Funcional',
    description:
      'Ayudan a habilitar funcionalidades adicionales, como compartir contenido en redes sociales o recordar tus preferencias. Actualmente no utilizamos cookies de esta categoría.',
  },
  {
    key: 'analytics',
    title: 'Analítica',
    description:
      'Se utilizarían para entender cómo interactúan los visitantes con el sitio web: número de visitas, páginas más vistas, origen del tráfico, etc. Actualmente no utilizamos cookies de esta categoría.',
  },
  {
    key: 'performance',
    title: 'Rendimiento',
    description:
      'Ayudarían a analizar los indicadores clave de rendimiento del sitio para mejorar la experiencia de navegación. Actualmente no utilizamos cookies de esta categoría.',
  },
  {
    key: 'advertising',
    title: 'Anuncio',
    description:
      'Se utilizarían para mostrarte anuncios personalizados según tu navegación y medir la efectividad de campañas. Actualmente no utilizamos cookies de esta categoría.',
  },
  {
    key: 'uncategorized',
    title: 'Sin categorizar',
    description:
      'Cookies que todavía no se han clasificado en ninguna categoría. Actualmente no utilizamos cookies de esta categoría.',
  },
]

interface CookiePreferencesModalProps {
  initialPreferences: CookiePreferences
  onClose: (preferences: CookiePreferences) => void
  /** Escape: cierra sin guardar nada */
  onDismiss: () => void
  /** El botón que abrió el modal: recibe el foco al cerrarlo */
  openerRef: RefObject<HTMLElement | null>
}

export function CookiePreferencesModal({
  initialPreferences,
  onClose,
  onDismiss,
  openerRef,
}: CookiePreferencesModalProps) {
  const [preferences, setPreferences] = useState(initialPreferences)
  const [showMore, setShowMore] = useState(false)
  // Al abrirse el foco pasa al diálogo (el lector de pantalla lee su título), no sale de él y al
  // cerrarse vuelve al botón que lo abrió
  const dialogRef = useRef<HTMLDivElement>(null)
  useFocusTrap(dialogRef, true, onDismiss, { focusContainer: true, returnFocusRef: openerRef })

  const toggle = (key: keyof CookiePreferences) => {
    setPreferences((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <div className="cookie-modal-overlay" role="presentation">
      <div
        className="cookie-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Personalizar las preferencias de consentimiento"
        tabIndex={-1}
        ref={dialogRef}
      >
        <div className="cookie-modal-body">
          <h2>Personalizar las preferencias de consentimiento</h2>
          <p>
            Usamos cookies para ayudarte a navegar de forma eficiente y realizar ciertas
            funciones. Encontrarás información detallada sobre cada categoría de cookies a
            continuación.
          </p>
          <p>
            Las cookies categorizadas como «Necesarias» se guardan en tu navegador, ya que son
            esenciales para las funcionalidades básicas del sitio web.
            {showMore && (
              <>
                {' '}
                Además, dejamos preparadas otras categorías de cookies opcionales (funcionales,
                analíticas, de rendimiento y publicitarias) que solo activaríamos si en el futuro
                las incorporamos, y siempre con tu consentimiento previo. Puedes activar o
                desactivar cada categoría desde este panel en cualquier momento.
              </>
            )}
          </p>
          {!showMore && (
            <button type="button" className="cookie-modal-more" onClick={() => setShowMore(true)}>
              Mostrar más
            </button>
          )}

          <div className="cookie-categories">
            {categories.map((category) => (
              <div className="cookie-category" key={category.key}>
                <div className="cookie-category-header">
                  <span className="cookie-category-title">{category.title}</span>
                  {category.locked ? (
                    <span className="cookie-category-locked">Siempre activas</span>
                  ) : (
                    <button
                      type="button"
                      className={`consent-toggle ${
                        preferences[category.key as keyof CookiePreferences] ? 'is-on' : ''
                      }`}
                      role="switch"
                      aria-checked={preferences[category.key as keyof CookiePreferences]}
                      aria-label={`Activar cookies de tipo ${category.title}`}
                      onClick={() => toggle(category.key as keyof CookiePreferences)}
                    >
                      <span className="consent-toggle-thumb" />
                    </button>
                  )}
                </div>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="cookie-modal-footer">
          <button
            type="button"
            className="cookie-btn cookie-btn-ghost"
            onClick={() => onClose(defaultPreferences)}
          >
            Rechazar todo
          </button>
          <button type="button" className="cookie-btn cookie-btn-ghost" onClick={() => onClose(preferences)}>
            Guardar mis preferencias
          </button>
          <button
            type="button"
            className="cookie-btn cookie-btn-solid"
            onClick={() => onClose(allAcceptedPreferences)}
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  )
}
