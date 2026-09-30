import ctaPhoto from '../assets/cta/equipo-analizando-datos.jpg'
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
              Primer paso, impacto real
            </span>
            <h2>Encuentra el proceso que más te está costando.</h2>
            <p>
              En el diagnóstico gratuito identificamos oportunidades, prioridades y el siguiente
              paso más sensato.
            </p>
          </div>
          <ButtonLink to="/contacto">Solicitar diagnóstico</ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
