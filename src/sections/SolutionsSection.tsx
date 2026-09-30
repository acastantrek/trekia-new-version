import { Link } from 'react-router-dom'
import capabilitiesImage from '../assets/services/capacidades.jpg'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { trackSpotlight } from '../lib/trackSpotlight'
import { solutions } from '../data/siteData'
import { ResponsiveImage } from '../components/ResponsiveImage'

interface SolutionsSectionProps {
  compact?: boolean
  /** En móvil las cards se pasan deslizando en lugar de apilarse */
  carousel?: boolean
}

export function SolutionsSection({ compact = false, carousel = false }: SolutionsSectionProps) {
  return (
    <section className={`section solutions ${compact ? 'solutions-compact' : ''} ${carousel ? 'solutions-has-carousel' : ''}`} id="soluciones">
      <div className="container">
        <div className={compact ? 'solutions-intro' : undefined}>
          <Reveal>
            <SectionHeading
              eyebrow="Qué hacemos"
              title="Tecnología que resuelve trabajo real."
              description="Construimos una capa operativa conectada sobre lo que ya funciona en tu empresa."
            />
          </Reveal>
          {compact && (
            <Reveal className="solutions-intro-media" delay={0.1}>
              <ResponsiveImage
                image={capabilitiesImage}
                sizes="(max-width: 820px) 100vw, 600px"
                alt="Equipo técnico trabajando en una oficina de planta abierta"
              />
            </Reveal>
          )}
        </div>
        <div className="solutions-grid">
          {solutions.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal className="solution-card" key={item.title} delay={index * 0.045}>
                <Link
                  to={`/servicios/${item.slug}`}
                  className="solution-card-link glow-card"
                  onMouseMove={trackSpotlight}
                >
                  <div className="card-media">
                    <ResponsiveImage
                      image={item.image}
                      sizes="(max-width: 600px) 90vw, (max-width: 1040px) 50vw, 33vw"
                      alt=""
                      loading="lazy"
                    />
                    <div className="card-icon">
                      <Icon />
                    </div>
                  </div>
                  <div className="card-body">
                    <span className="card-index">0{index + 1}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
