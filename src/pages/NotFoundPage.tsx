import { ButtonLink } from '../components/ButtonLink'
import { PageHero } from '../components/PageHero'

export function NotFoundPage() {
  return (
    <PageHero
      eyebrow="Error 404"
      title="No encontramos esta página."
      description="Puede que el enlace esté mal escrito o que la página se haya movido. Vuelve al inicio o cuéntanos qué buscabas y te ayudamos."
    >
      <div className="not-found-actions">
        <ButtonLink to="/">Volver al inicio</ButtonLink>
        <ButtonLink to="/contacto" variant="secondary">
          Contactar
        </ButtonLink>
      </div>
    </PageHero>
  )
}
