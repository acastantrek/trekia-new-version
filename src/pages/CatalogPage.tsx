import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo'

// El catálogo es un HTML autónomo (public/catalogo-trekia.html) con su propio pasapáginas; se
// incrusta tal cual en un iframe para no mezclar sus estilos y scripts con los de la web
export function CatalogPage() {
  return (
    <>
      <Seo
        title="Catálogo"
        description="Catálogo de Trek.IA: nuestros servicios de optimización y desarrollo con IA para pymes, en formato libro."
      />
      <PageHero
        eyebrow="Catálogo"
        title="Todo lo que hacemos, en un catálogo."
        description="Pasa las páginas con las flechas, el teclado o arrastrando las esquinas."
      />
      <section className="section catalog-section">
        <div className="container">
          <iframe className="catalog-frame" src="/catalogo-trekia.html" title="Catálogo Trek.IA" />
          <p className="catalog-open">
            <a href="/catalogo-trekia.html" target="_blank" rel="noopener">
              Abrir el catálogo a pantalla completa
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
