import { CheckCircle2 } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { CtaSection } from '../sections/CtaSection'
import { EconomicModelSection } from '../sections/EconomicModelSection'
import { WhatWeDoSection } from '../sections/WhatWeDoSection'

const principles = [
  [
    'Integrar antes que sustituir',
    'Aprovechamos la tecnología que ya aporta valor y construimos conexiones donde faltan.',
  ],
  [
    'Automatizar con supervisión',
    'Diseñamos control, alertas y capacidad de intervención en cada flujo crítico.',
  ],
  [
    'Medir desde el primer día',
    'Definimos indicadores antes de desarrollar para demostrar el impacto real.',
  ],
]

export function WhatWeDoPage() {
  return (
    <>
      <WhatWeDoSection isPageHeader />
      <section className="section principles">
        <div className="container principles-grid">
          <Reveal>
            <span className="eyebrow">
              <i />
              Criterios de diseño
            </span>
            <h2>Tecnología sostenible, no parches rápidos.</h2>
          </Reveal>
          <div>
            {principles.map(([title, description], index) => (
              <Reveal className="principle" key={title} delay={index * 0.06}>
                <CheckCircle2 />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <EconomicModelSection />
      <CtaSection />
    </>
  )
}
