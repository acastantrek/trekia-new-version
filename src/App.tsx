import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { lazy, type ComponentType } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from './layout/SiteLayout'

// Cada página es un chunk aparte que se descarga al entrar en ella. Al navegar, React Router usa
// transiciones y se sigue viendo la página anterior hasta que la nueva está lista; al cargar la
// web, el HTML prerenderizado se mantiene hasta que el chunk llega y se hidrata
function page<K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) {
  return lazy(() => load().then((module) => ({ default: module[name] })))
}

const HomePage = page(() => import('./pages/HomePage'), 'HomePage')
const AboutPage = page(() => import('./pages/AboutPage'), 'AboutPage')
const SectorsPage = page(() => import('./pages/SectorsPage'), 'SectorsPage')
const WhatWeDoPage = page(() => import('./pages/WhatWeDoPage'), 'WhatWeDoPage')
const ServicePage = page(() => import('./pages/ServicePage'), 'ServicePage')
const MethodPage = page(() => import('./pages/MethodPage'), 'MethodPage')
const BlogPage = page(() => import('./pages/BlogPage'), 'BlogPage')
const BlogPostPage = page(() => import('./pages/BlogPostPage'), 'BlogPostPage')
const ContactPage = page(() => import('./pages/ContactPage'), 'ContactPage')
const LegalPage = page(() => import('./pages/LegalPage'), 'LegalPage')
const PrivacyPage = page(() => import('./pages/PrivacyPage'), 'PrivacyPage')
const CookiesPage = page(() => import('./pages/CookiesPage'), 'CookiesPage')
const NotFoundPage = page(() => import('./pages/NotFoundPage'), 'NotFoundPage')

export default function App() {
  return (
    // Solo las funciones de framer-motion que se usan (animaciones, variantes y gestos, incluido
    // whileInView); los componentes usan `m` en lugar de `motion` (strict avisa si se cuela uno).
    // Se cargan de forma síncrona a propósito: con features asíncronas, al llegar cambian el
    // contexto de LazyMotion, la página aún sin hidratar recibe esa actualización y React descarta
    // su HTML prerenderizado y la vuelve a pintar entera
    <LazyMotion features={domAnimation} strict>
      {/* Con "reducir movimiento" activado en el sistema, framer-motion no anima x, y, scale…
          (Reveal anima `transform` entero y lo resuelve por su cuenta) */}
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/quienes-somos" element={<AboutPage />} />
            <Route path="/sectores" element={<SectorsPage />} />
            <Route path="/que-hacemos" element={<WhatWeDoPage />} />
            <Route path="/servicios/:slug" element={<ServicePage />} />
            <Route path="/metodo" element={<MethodPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/aviso-legal" element={<LegalPage />} />
            <Route path="/politica-privacidad" element={<PrivacyPage />} />
            <Route path="/politica-cookies" element={<CookiesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </MotionConfig>
    </LazyMotion>
  )
}
