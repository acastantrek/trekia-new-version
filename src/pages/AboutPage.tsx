import { GraduationCap, Handshake, Heart, Headphones } from 'lucide-react'
// Solo la T, sin fondo; sin pérdida para que los bordes del logo queden limpios
import logoMark from '../assets/logo-mark-t.png?w=300;601&format=webp&lossless=true&as=picture'
import missionImage from '../assets/about/mision-ia-asistente.jpg'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { TeamPhotosCarousel } from '../components/TeamPhotosCarousel'
import { trackSpotlight } from '../lib/trackSpotlight'
import { CtaSection } from '../sections/CtaSection'
import { ResponsiveImage } from '../components/ResponsiveImage'

const story = [
  'Somos una consultora de ingeniería especializada en software a medida, integración de sistemas, automatización e IA aplicada. Trabajamos con empresas B2B de operaciones complejas y sistemas que no se hablan entre sí.',
  'Seguimos siempre el mismo orden: escuchamos, diseñamos y construimos, con control en cada flujo crítico. Y no desaparecemos tras la entrega: medimos el impacto y ajustamos la solución a medida que la operación cambia.',
]

const values = [
  {
    title: 'Diagnóstico antes que propuesta',
    description:
      'Escuchamos la operación real antes de plantear cualquier solución, sin plantillas genéricas.',
    icon: GraduationCap,
  },
  {
    title: 'Resultados medibles',
    description:
      'Cada proyecto parte de indicadores claros para demostrar el impacto desde el primer sprint.',
    icon: Heart,
  },
  {
    title: 'Acompañamiento continuo',
    description:
      'No entregamos y desaparecemos: damos soporte y evolucionamos la solución con la operación.',
    icon: Headphones,
  },
  {
    title: 'Comunicación directa',
    description:
      'Trabajamos codo a codo con quienes usan el sistema cada día, sin capas de gestión innecesarias.',
    icon: Handshake,
  },
]

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Quiénes somos"
        title="Ingeniería y automatización con criterio de negocio."
        description="Trek.IA combina desarrollo de software, automatización de procesos e inteligencia artificial para que las empresas operen con menos fricción y más control."
      />
      <section className="section">
        <div className="container mission-grid">
          <Reveal>
            <SectionHeading
              eyebrow="Nuestra misión"
              title="Tecnología que se adapta a cómo ya trabajas, no al revés."
              description="Trek.IA nace para cerrar la distancia entre lo que la tecnología puede hacer y lo que las operaciones reales necesitan. Ayudamos a empresas B2B a automatizar procesos, conectar sus sistemas y aplicar IA sin añadir complejidad."
            />
          </Reveal>
          <Reveal className="mission-media" delay={0.1}>
            <ResponsiveImage
              image={missionImage}
              sizes="(max-width: 820px) 100vw, 600px"
              alt="Persona usando el móvil con un asistente de IA"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>
      <section className="section about-story">
        <div className="container">
          <Reveal className="about-story-heading">
            <span className="eyebrow">
              <i />
              Nuestra historia
            </span>
            <h2>Del diagnóstico a la operación de tu empresa.</h2>
          </Reveal>
          <div className="about-story-grid">
            <Reveal className="about-story-media">
              <ResponsiveImage
                className="about-story-logo"
                image={logoMark}
                sizes="(max-width: 820px) 180px, 260px"
                alt="Trek.IA"
              />
            </Reveal>
            <div>
              {story.map((paragraph, index) => (
                <Reveal delay={index * 0.05} key={paragraph.slice(0, 24)}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <TeamPhotosCarousel />
      </section>
      <section className="section about-values">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Cómo trabajamos"
              title="Cuatro principios, un mismo criterio."
            />
          </Reveal>
          <div className="benefits-grid">
            {values.map((item, index) => {
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
      <CtaSection />
    </>
  )
}
