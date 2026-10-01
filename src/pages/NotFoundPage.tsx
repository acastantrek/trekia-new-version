import { ButtonLink } from '../components/ButtonLink'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Página no encontrada"
        description="La página que buscas no existe o se ha movido."
        noindex
      />
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
    </>
  )
}
