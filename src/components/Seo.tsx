import { useLocation } from 'react-router-dom'
import { OG_IMAGE, SITE_NAME, SITE_URL } from '../data/site'

interface SeoProps {
  /** Título de la página; se le añade " | Trek.IA" salvo que `fullTitle` sea true */
  title: string
  description: string
  /** El título ya es completo y no lleva el nombre de la web detrás (home) */
  fullTitle?: boolean
  /** Páginas que no deben indexarse (404): sin canonical y con robots noindex */
  noindex?: boolean
  /** Tipo de Open Graph: 'article' en los artículos del blog */
  type?: 'website' | 'article'
}

// React 19 sube <title>, <meta> y <link> al <head> desde cualquier punto del árbol
export function Seo({
  title,
  description,
  fullTitle = false,
  noindex = false,
  type = 'website',
}: SeoProps) {
  const { pathname } = useLocation()
  // Sin barra final (salvo en la home) para que /blog y /blog/ compartan canonical
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const url = `${SITE_URL}${path}`
  const pageTitle = fullTitle ? title : `${title} | ${SITE_NAME}`
  const image = `${SITE_URL}${OG_IMAGE.path}`

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={url} />
      )}
      {/* Previews en LinkedIn, WhatsApp, X, etc. */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={String(OG_IMAGE.width)} />
      <meta property="og:image:height" content={String(OG_IMAGE.height)} />
      <meta property="og:image:alt" content={`${SITE_NAME}: automatizamos procesos, impulsamos negocios`} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}
