import { AboutTeaserSection } from '../sections/AboutTeaserSection'
import { CtaSection } from '../sections/CtaSection'
import { HeroSection } from '../sections/HeroSection'
import { ProcessSection } from '../sections/ProcessSection'
import { SectorsSection } from '../sections/SectorsSection'
import { WhatWeDoTeaserSection } from '../sections/WhatWeDoTeaserSection'
import { Seo } from '../components/Seo'

export function HomePage() {
  return (
    <>
      <Seo
        fullTitle
        title="Trek.IA — Automatización de procesos e IA para empresas"
        description="Automatizamos procesos, conectamos tus sistemas y aplicamos IA para que tu empresa trabaje con menos tareas manuales. Diagnóstico gratuito."
      />
      <HeroSection />
      <AboutTeaserSection />
      <WhatWeDoTeaserSection />
      <SectorsSection carousel />
      <ProcessSection />
      <CtaSection />
    </>
  )
}
