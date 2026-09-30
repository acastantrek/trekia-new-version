import { Check, X } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const before = [
  'Procesos manuales y repetitivos',
  'Hojas de cálculo desconectadas',
  'Falta de trazabilidad',
  'Software rígido y aislado',
]
const after = [
  'Automatización de tareas críticas',
  'Datos centralizados y fiables',
  'Dashboards en tiempo real',
  'Flujos y equipos conectados',
]

export function ChallengesSection() {
  return (
    <section className="section challenges" id="retos">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="El punto de inflexión"
            title="Menos fricción. Más capacidad operativa."
            description="No se trata de añadir otra herramienta. Se trata de rediseñar cómo fluye el trabajo para que cada sistema, dato y persona sume."
          />
        </Reveal>
        <div className="comparison-grid">
          <Reveal className="comparison-card before-card" delay={0.08}>
            <div className="comparison-title">
              <span>Antes</span>
              <small>Operación fragmentada</small>
            </div>
            <ul>
              {before.map((item) => (
                <li key={item}>
                  <X size={17} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mini-flow broken-flow">
              <i>ERP</i>
              <b />
              <i>Excel</i>
              <b />
              <i>Email</i>
            </div>
          </Reveal>
          <div className="comparison-arrow" aria-hidden="true">
            →
          </div>
          <Reveal className="comparison-card after-card" delay={0.16}>
            <div className="comparison-title">
              <span>Después</span>
              <small>Operación conectada</small>
            </div>
            <ul>
              {after.map((item) => (
                <li key={item}>
                  <Check size={17} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mini-flow connected-flow">
              <i>Datos</i>
              <b />
              <i>Motor Trek.IA</i>
              <b />
              <i>Decisión</i>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
