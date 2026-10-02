import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
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

// prerender (y no renderToString) espera a las páginas cargadas con lazy() antes de devolver el
// HTML; renderToString pintaría el fallback vacío de Suspense.
// progressiveChunkSize: Infinity para que el contenido de cada Suspense quede en su sitio. Si no,
// React deja el fallback en <main> y mueve la página a un <div hidden> al final con un script que
// la coloca al cargar: sin JS (buscadores, previews) el contenido quedaría oculto
export async function render(url: string) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    { progressiveChunkSize: Infinity },
  )
  const chunks: Buffer[] = []
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk))
  return Buffer.concat(chunks).toString('utf-8')
}
