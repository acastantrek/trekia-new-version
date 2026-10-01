import { BarChart3, CalendarCheck, Check, Lightbulb, Mail, Phone, Search } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'

const heroPoints = [
  { label: 'Análisis a medida', icon: Search },
  { label: 'Soluciones concretas', icon: Lightbulb },
  { label: 'Acompañamiento real', icon: BarChart3 },
]

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contacto y diagnóstico gratuito"
        description="Cuéntanos qué proceso quieres mejorar y te proponemos soluciones concretas. Diagnóstico gratuito de 30 minutos, sin compromiso."
      />
      <PageHero
        eyebrow="Diagnóstico gratuito"
        title="Nosotros encontramos dónde la tecnología puede ayudarte."
        description="Analizamos cómo trabajáis, detectamos oportunidades de automatización y os proponemos soluciones concretas para ahorrar tiempo, simplificar procesos y mejorar el día a día."
      >
        <ul className="contact-hero-points">
          {heroPoints.map(({ label, icon: Icon }) => (
            <li key={label}>
              <Icon size={26} aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </PageHero>
      <section className="section contact-section">
        <div className="container contact-layout">
          <Reveal className="contact-aside">
            <span>Qué puedes esperar</span>
            <h2>Tu reto merece una conversación.</h2>
            <ul>
              <li>
                <Check />
                Análisis del proceso y sus costes ocultos
              </li>
              <li>
                <Check />
                Mapa inicial de oportunidades
              </li>
              <li>
                <Check />
                Recomendación técnica y siguiente paso
              </li>
            </ul>
            <div className="contact-detail">
              <CalendarCheck />
              <div>
                <strong>30 minutos</strong>
                <small>Sin compromiso comercial</small>
              </div>
            </div>
            <div className="contact-detail">
              <Mail />
              <div>
                <strong>hello@trek-ia.com</strong>
                <small>Respuesta en 1–2 días laborables</small>
              </div>
            </div>
            <div className="contact-detail">
              <Phone />
              <div>
                <strong>930 15 70 06</strong>
                <small>Respuesta en 1–2 días laborables</small>
              </div>
            </div>
          </Reveal>
          <Reveal className="form-shell" delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
