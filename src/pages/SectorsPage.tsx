import { CtaSection } from '../sections/CtaSection'
import { SectorsOverviewSection } from '../sections/SectorsOverviewSection'
import { Seo } from '../components/Seo'

export function SectorsPage() {
  return (
    <>
      <Seo
        title="Sectores: logística, industria, sanitario, retail y más"
        description="Automatización de procesos para logística, industria, sector sanitario, retail, hostelería y servicios, adaptada a la forma de trabajar de cada negocio."
      />
      <SectorsOverviewSection />
      <CtaSection />
    </>
  )
}
