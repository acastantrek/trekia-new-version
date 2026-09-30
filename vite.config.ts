import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// Anchos que se generan de cada imagen (nunca por encima del original)
const IMAGE_WIDTHS = [480, 960, 1600]

export default defineConfig({
  plugins: [
    react(),
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
