import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// Fuentes alojadas en la propia web (no en Google Fonts): sin petición externa ni envío de la IP
// del visitante a terceros
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/manrope'
import './styles/index.css'

// Las etiquetas SEO del HTML estático (las de index.html o las que añade el prerender de cada
// ruta) son para clientes sin JS: cada página pone las suyas con <Seo> y así no quedan duplicadas
// en el <head>
document.head.querySelectorAll('[data-fallback]').forEach((element) => element.remove())

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// En el build el HTML de cada ruta viene prerenderizado (scripts/prerender.mjs) y se hidrata en
// lugar de volver a pintarlo. En `npm run dev` no hay prerender y #root llega vacío
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
