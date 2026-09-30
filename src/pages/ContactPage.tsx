import { CalendarCheck, Check, Mail, Phone } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Diagnóstico gratuito"
        title="Hablemos del proceso que está frenando tu crecimiento."
        description="Una conversación directa para entender tu operación, detectar el cuello de botella y valorar si la tecnología puede resolverlo."
      />
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
