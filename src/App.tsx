import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from './layout/SiteLayout'
import { AboutPage } from './pages/AboutPage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { ContactPage } from './pages/ContactPage'
import { CookiesPage } from './pages/CookiesPage'
import { HomePage } from './pages/HomePage'
import { LegalPage } from './pages/LegalPage'
import { MethodPage } from './pages/MethodPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { SectorsPage } from './pages/SectorsPage'
import { ServicePage } from './pages/ServicePage'
import { WhatWeDoPage } from './pages/WhatWeDoPage'

export default function App() {
  return (
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
  )
}
