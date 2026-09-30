// Foto cálida de una conversación alrededor de una mesa: más cercana que una de oficina
import ctaPhoto from '../assets/method/entender.jpg'
import { ButtonLink } from '../components/ButtonLink'
import { Reveal } from '../components/Reveal'
import { ResponsiveImage } from '../components/ResponsiveImage'

export function CtaSection() {
  return (
    <section className="section cta-section" id="cta">
      <div className="container">
        <Reveal className="cta-panel">
          <div className="cta-photo">
            <ResponsiveImage
              image={ctaPhoto}
              sizes="(max-width: 1240px) 100vw, 1200px"
              alt=""
              loading="lazy"
            />
          </div>
          <div>
            <span className="eyebrow">
              <i />
              Diagnóstico gratuito
            </span>
            <h2>Nosotros encontramos dónde la tecnología puede ayudarte.</h2>
            <p>
              Analizamos cómo trabajáis, detectamos oportunidades de automatización y os proponemos
              soluciones concretas para ahorrar tiempo, simplificar procesos y mejorar el día a día.
            </p>
          </div>
          <ButtonLink to="/contacto">Solicitar diagnóstico</ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
