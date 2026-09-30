import { ChevronDown } from 'lucide-react'
import { lazy, useRef } from 'react'
import operationsFallback from '../assets/three/operations-core.png'
import { ButtonLink } from '../components/ButtonLink'
import { LazyScene3D } from '../components/LazyScene3D'
import { Reveal } from '../components/Reveal'
import { metrics } from '../data/siteData'

const OperationsCore = lazy(() =>
  import('../three/OperationsCore').then((module) => ({ default: module.OperationsCore })),
)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const scrollToNext = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="container hero-grid">
        <div className="hero-content">
          <Reveal>
            <span className="eyebrow">
              <i />
              Software · Automatización · IA aplicada
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1>
              Automatizamos procesos. <span>Impulsamos negocios.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="hero-copy">
              Automatizamos procesos, conectamos ERP y CRM, y aplicamos IA para reducir costes y
              escalar sin añadir complejidad.
            </p>
          </Reveal>
          <Reveal className="hero-actions" delay={0.18}>
            <ButtonLink to="/contacto">Solicitar diagnóstico</ButtonLink>
            <ButtonLink to="/que-hacemos" variant="secondary">
              Ver soluciones
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal className="hero-visual" delay={0.14}>
          <div className="visual-frame">
            <LazyScene3D
              scene={OperationsCore}
              fallback={operationsFallback}
              fallbackAlt="Núcleo de operaciones conectadas"
            />
          </div>
          <div className="floating-chip chip-top">
            <small>Flujos activos</small>
            <strong>24</strong>
            <span>+8 este mes</span>
          </div>
          <div className="floating-chip chip-bottom">
            <small>Eficiencia operativa</small>
            <strong>92.4%</strong>
            <span className="trend">↗ 18.6%</span>
          </div>
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
      <div className="container metrics-row">
        {metrics.map((metric) => (
          <div className="metric" key={metric.value}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
      <a className="scroll-cue" href="#soluciones" aria-label="Ir a la siguiente sección">
        <ChevronDown />
      </a>
    </section>
  )
}
