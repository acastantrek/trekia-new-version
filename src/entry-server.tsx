import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { blogPosts } from './data/blogPosts'
import { businessAreas } from './data/businessAreas'
import { STATIC_ROUTES } from './data/site'

// Entrada de servidor que usa scripts/prerender.mjs para generar el HTML estático de cada ruta
// en el build. No se usa en el navegador

export const routes = [
  ...STATIC_ROUTES,
  ...blogPosts.map((post) => `/blog/${post.slug}`),
  ...businessAreas.map((area) => `/servicios/${area.slug}`),
]

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
