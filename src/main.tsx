import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

// Las etiquetas SEO de index.html son solo para clientes sin JS: cada página pone las
// suyas con <Seo> y así no quedan duplicadas en el <head>
document.head.querySelectorAll('[data-fallback]').forEach((element) => element.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
