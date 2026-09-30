import { PageHero } from '../components/PageHero'
import { CtaSection } from '../sections/CtaSection'
import { SectorsDetailSection } from '../sections/SectorsDetailSection'

export function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectores"
        title="Experiencia en operaciones complejas."
        description="Trabajamos con equipos que gestionan procesos críticos, múltiples sistemas y grandes volúmenes de datos."
      />
      <SectorsDetailSection />
      <CtaSection />
    </>
  )
}
