import { readFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import { SITE_URL, STATIC_ROUTES } from './src/data/site'

// Anchos que se generan de cada imagen (nunca por encima del original)
const IMAGE_WIDTHS = [480, 960, 1600]

// Slugs de un archivo de datos. Se leen como texto porque esos módulos importan imágenes y no se
// pueden cargar desde la configuración de Vite
function readSlugs(file: string) {
  const source = readFileSync(new URL(file, import.meta.url), 'utf-8')
  return [...source.matchAll(/^\s*slug: '([^']+)'/gm)].map((match) => match[1])
}

// sitemap.xml generado en cada build con las rutas fijas, los artículos y los servicios
function sitemap(): Plugin {
  return {
    name: 'trekia-sitemap',
    apply: 'build',
    generateBundle() {
      const routes = [
        ...STATIC_ROUTES,
        ...readSlugs('./src/data/blogPosts.ts').map((slug) => `/blog/${slug}`),
        ...readSlugs('./src/data/businessAreas.ts').map((slug) => `/servicios/${slug}`),
      ]
      const urls = routes.map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          '</urlset>',
          '',
        ].join('\n'),
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    sitemap(),
    // Todas las imágenes importadas sin query se convierten a WebP en varios anchos y se
    // importan como `Picture` ({ sources, img }); se pintan con <ResponsiveImage>
    imagetools({
      defaultDirectives: async (url, metadata) => {
        if (url.searchParams.size > 0) return new URLSearchParams()
        const { width = IMAGE_WIDTHS[0] } = await metadata()
        const widths = IMAGE_WIDTHS.filter((w) => w < width)
        widths.push(Math.min(width, IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1]))
        return new URLSearchParams({
          w: widths.join(';'),
          format: 'webp',
          quality: '75',
          as: 'picture',
        })
      },
    }),
  ],
})
