import { ChevronDown } from 'lucide-react'
import { lazy, useRef } from 'react'
import dataFlowFallback from '../assets/three/data-flow-core.png'
import { LazyScene3D } from '../components/LazyScene3D'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const DataFlowCore = lazy(() =>
  import('../three/DataFlowCore').then((module) => ({ default: module.DataFlowCore })),
)

export function OperationsShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const scrollToNext = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="section operations-showcase" ref={sectionRef}>
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Tecnología en acción"
            title="Así conectamos tu operación."
            description="Un mismo núcleo de datos alimentando procesos, dashboards y decisiones en tiempo real."
          />
        </Reveal>
        <Reveal className="showcase-frame" delay={0.1}>
          <LazyScene3D
            scene={DataFlowCore}
            fallback={dataFlowFallback}
            fallbackAlt="Flujo de datos entre sistemas conectados"
          />
          <button
            type="button"
            className="scroll-arrows"
            onClick={scrollToNext}
            aria-label="Desplazarse hacia abajo"
          >
            <ChevronDown />
            <ChevronDown />
            <ChevronDown />
            <ChevronDown />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
