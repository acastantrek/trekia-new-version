import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
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

// El HTML de cada ruta viene prerenderizado (scripts/prerender.mjs): se hidrata en lugar de
// volver a pintarlo
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
