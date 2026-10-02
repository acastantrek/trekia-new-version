import { ButtonLink } from '../components/ButtonLink'
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

// Se muestra en lugar de la página cuando esta falla al pintarse (ver ErrorBoundary en SiteLayout)
export function ErrorPage() {
  return (
    <>
      <Seo
        title="Algo ha fallado"
        description="Ha ocurrido un error al cargar la página."
        noindex
      />
      <PageHero
        eyebrow="Error"
        title="Algo ha fallado al cargar esta página."
        description="Prueba a recargarla en unos segundos. Si el problema sigue, vuelve al inicio o escríbenos y lo revisamos."
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
