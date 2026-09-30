import { Check } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { economicModel } from '../data/siteData'

export function EconomicModelSection() {
  return (
    <section className="section economic" id="modelo">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Cómo funciona"
            title="Una inversión alineada con la evolución del negocio."
            description="Empezamos con un alcance claro y continuamos solo donde existe impacto. Sin licencias infladas ni dependencia artificial."
          />
        </Reveal>
        <div className="model-grid">
          {economicModel.map((item, index) => (
            <Reveal className="model-card" key={item.title} delay={index * 0.07}>
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div>
                <Check size={15} />
                Alcance y costes transparentes
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="model-action">
          <ButtonLink to="/contacto">Estudiar mi caso</ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
