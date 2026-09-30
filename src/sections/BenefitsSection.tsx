import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { benefits } from '../data/siteData'
import { trackSpotlight } from '../lib/trackSpotlight'

export function BenefitsSection() {
  return (
    <section className="section benefits">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Por qué Trek.IA"
            title="Ingeniería con criterio de negocio."
          />
        </Reveal>
        <div className="benefits-grid">
          {benefits.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal className="value-card" key={item.title} delay={index * 0.06}>
                <div className="benefit-card glow-card" onMouseMove={trackSpotlight}>
                  <span className="value-card-icon">
                    <Icon />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
