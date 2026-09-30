import { ButtonLink } from '../components/ButtonLink'
import { Reveal } from '../components/Reveal'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { teamPhotos } from '../data/siteData'

const photo = teamPhotos[1]

export function AboutTeaserSection() {
  return (
    <section className="section about-teaser">
      <div className="container about-teaser-grid">
        <Reveal className="about-teaser-content">
          <span className="eyebrow">
            <i />
            Quiénes somos
          </span>
          <h2>Ingeniería y automatización con criterio de negocio.</h2>
          <p>
            Somos el equipo detrás de Trek.IA: profesionales con experiencia real en desarrollo de
            software, integración de sistemas e inteligencia artificial. Escuchamos primero,
            entendemos la operación de cada empresa y solo después proponemos qué construir.
          </p>
          <ButtonLink to="/quienes-somos" variant="secondary">
            Conócenos
          </ButtonLink>
        </Reveal>
        <Reveal className="about-teaser-media" delay={0.08}>
          <ResponsiveImage
            image={photo.src}
            sizes="(max-width: 820px) 100vw, 640px"
            alt={photo.alt}
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  )
}
