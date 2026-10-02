import { Seo } from '../components/Seo'

// El catálogo es un HTML autónomo (public/catalogo-trekia.html) con su propio pasapáginas; se
// incrusta tal cual en un iframe para no mezclar sus estilos y scripts con los de la web.
// SiteLayout no pinta cabecera ni pie en esta ruta: solo se ve el libro
export function CatalogPage() {
  return (
    <>
      <Seo
        title="Catálogo"
        description="Catálogo de Trek.IA: nuestros servicios de optimización y desarrollo con IA para pymes, en formato libro."
      />
      <h1 className="catalog-title">Catálogo Trek.IA</h1>
      <div className="catalog-stage">
        <iframe className="catalog-frame" src="/catalogo-trekia.html" title="Catálogo Trek.IA" />
      </div>
    </>
  )
}
