import { PageHero } from '../components/PageHero'
import { CtaSection } from '../sections/CtaSection'
import { MethodDetailSection } from '../sections/MethodDetailSection'
import { ProcessSection } from '../sections/ProcessSection'

export function MethodPage() {
  return (
    <>
      <PageHero
        eyebrow="Método"
        title="Un método claro, sin proyectos eternos."
        description="Avanzamos por fases pequeñas y medibles. Cada entrega reduce incertidumbre y genera valor desde el primer momento."
      />
      <ProcessSection />
      <MethodDetailSection />
      <CtaSection />
    </>
  )
}
