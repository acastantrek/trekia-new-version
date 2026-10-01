import { useLocation } from 'react-router-dom'
import { SITE_NAME, SITE_URL } from '../data/siteData'

interface SeoProps {
  /** Título de la página; se le añade " | Trek.IA" salvo que `fullTitle` sea true */
  title: string
  description: string
  /** El título ya es completo y no lleva el nombre de la web detrás (home) */
  fullTitle?: boolean
  /** Páginas que no deben indexarse (404): sin canonical y con robots noindex */
  noindex?: boolean
}

// React 19 sube <title>, <meta> y <link> al <head> desde cualquier punto del árbol
export function Seo({ title, description, fullTitle = false, noindex = false }: SeoProps) {
  const { pathname } = useLocation()
  // Sin barra final (salvo en la home) para que /blog y /blog/ compartan canonical
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

  return (
    <>
      <title>{fullTitle ? title : `${title} | ${SITE_NAME}`}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={`${SITE_URL}${path}`} />
      )}
    </>
  )
}
