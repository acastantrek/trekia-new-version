import { PageHero } from '../components/PageHero'
import { CtaSection } from '../sections/CtaSection'
import { MethodDetailSection } from '../sections/MethodDetailSection'
import { Seo } from '../components/Seo'

export function MethodPage() {
  return (
    <>
      <Seo
        title="Nuestro método de trabajo"
        description="Entender, definir, construir y mejorar: avanzamos por fases pequeñas y medibles para que cada entrega genere valor desde el primer momento."
      />
      <PageHero
        eyebrow="Método"
        title="Un método claro, sin proyectos eternos."
        description="Avanzamos por fases pequeñas y medibles. Cada entrega reduce incertidumbre y genera valor desde el primer momento."
      />
      <MethodDetailSection />
      <CtaSection />
    </>
  )
}
