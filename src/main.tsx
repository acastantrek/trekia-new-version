import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// Fuentes alojadas en la propia web (no en Google Fonts): sin petición externa ni envío de la IP
// del visitante a terceros
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/manrope'
import './styles/index.css'

// Las etiquetas SEO del HTML estático (las de index.html o las que añade el prerender de cada
// ruta) son para clientes sin JS: cada página pone las suyas con <Seo> y así no quedan duplicadas
// en el <head>. La app no se hidrata: createRoot sustituye el HTML prerenderizado
document.head.querySelectorAll('[data-fallback]').forEach((element) => element.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
