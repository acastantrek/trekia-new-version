// Genera el HTML estático de cada ruta a partir del build: así buscadores y previews de redes
// (LinkedIn, WhatsApp…) reciben el título, la descripción, el Open Graph y el contenido de cada
// página sin ejecutar JS. Se ejecuta con `npm run build`, después de los builds de cliente
// (dist/) y de servidor (dist-ssr/).
//
// Salida (Vercel la sirve con cleanUrls, ver vercel.json):
//   /            → dist/index.html
//   /blog        → dist/blog.html
//   /blog/slug   → dist/blog/slug.html
//   resto        → dist/404.html (con estado HTTP 404)
//
// En el navegador main.tsx hidrata este HTML (hydrateRoot): el primer render del cliente tiene que
// coincidir con él. Lo que depende del navegador (cookies, WebGL) espera a hidratar (useIsClient).

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = `${root}dist`
const ssrDist = `${root}dist-ssr`

const { render, routes } = await import(pathToFileURL(`${ssrDist}/entry-server.js`).href)
const template = await readFile(`${dist}/index.html`, 'utf-8')

// Las etiquetas de respaldo de index.html se sustituyen por las de cada página
const fallbackTags = /\s*<(meta|title)\s+data-fallback[\s\S]*?(\/>|<\/title>)/g
const baseTemplate = template.replace(fallbackTags, '')
if (baseTemplate === template)
  throw new Error('No se han encontrado las etiquetas data-fallback en index.html')

// React 19 deja los <title>, <meta> y <link> de <Seo> (y los preload de imágenes) delante del
// contenido: se separan por el contenedor raíz de SiteLayout
const SHELL = '<div class="site-shell">'

async function renderPage(url) {
  const output = await render(url)
  const shellStart = output.indexOf(SHELL)
  if (shellStart < 0) throw new Error(`${url}: no se ha encontrado ${SHELL} en el HTML`)
  // data-fallback: main.tsx las retira al arrancar y React pone las suyas, sin duplicados
  const head = output.slice(0, shellStart).replace(/<(title|meta|link)\b/g, '<$1 data-fallback')
  const body = output.slice(shellStart)
  // Reemplazo con función para que un "$" del contenido no se interprete como patrón
  return baseTemplate
    .replace('</head>', () => `${head}\n  </head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)
}

function outputFile(route) {
  if (route === '/') return `${dist}/index.html`
  return `${dist}${route}.html`
}

async function write(file, html) {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}

for (const route of routes) {
  await write(outputFile(route), await renderPage(route))
}
// Cualquier ruta que no existe pinta la página 404
await write(`${dist}/404.html`, await renderPage('/404'))

await rm(ssrDist, { recursive: true, force: true })
console.log(`Prerender: ${routes.length} rutas + 404.html`)
