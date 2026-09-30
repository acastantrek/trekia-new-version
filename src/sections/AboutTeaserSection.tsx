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
          <h2>Tu departamento de IA.</h2>
          <p>
            Nos integramos en tu empresa para encontrar oportunidades, desarrollar soluciones y
            acompañar a tu equipo en su uso diario. Con personas a las que conoces, objetivos
            claros y trabajo continuo.
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
