import { ArrowRight, Ear, Sparkles, UsersRound } from 'lucide-react'
import heroPhoto from '../assets/cta/equipo-analizando-datos.jpg'
import { ButtonLink } from '../components/ButtonLink'
import { Reveal } from '../components/Reveal'
import { ResponsiveImage } from '../components/ResponsiveImage'

const ideas = [
  {
    title: 'Escuchamos',
    description: 'Antes de proponer nada, entendemos cómo trabajas.',
    icon: Ear,
  },
  {
    title: 'Simplificamos',
    description: 'Usamos tecnología e IA para quitar trabajo, no para añadir complejidad.',
    icon: Sparkles,
  },
  {
    title: 'Te acompañamos',
    description: 'Estamos ahí durante el proyecto y también después.',
    icon: UsersRound,
  },
]

const steps = [
  { title: 'Entender', description: 'Cómo trabajáis.' },
  { title: 'Detectar', description: 'Dónde podemos mejorar.' },
  { title: 'Construir', description: 'La solución.' },
  { title: 'Acompañar', description: 'Hasta que forme parte de vuestro día a día.' },
]

export function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="page-orb" />
        <div className="container about-hero-grid">
          <Reveal className="about-hero-content">
            <span className="eyebrow">
              <i />
              Quiénes somos
            </span>
            <h1>Personas trabajando para personas.</h1>
            <p className="about-hero-lead">
              Usamos la tecnología y la IA para hacer más fácil el día a día de tu empresa.
            </p>
            <p>
              Nos integramos en tu equipo, entendemos cómo trabajáis y desarrollamos soluciones que
              ahorran tiempo, reducen tareas manuales y mejoran procesos.
            </p>
            <ButtonLink to="/quienes-somos#tres-ideas">Conócenos</ButtonLink>
          </Reveal>
          <Reveal className="about-hero-media" delay={0.1}>
            <ResponsiveImage
              image={heroPhoto}
              sizes="(max-width: 820px) 100vw, 640px"
              alt="Equipo de Trek.IA trabajando junto alrededor de un portátil"
            />
          </Reveal>
        </div>
      </section>

      <section className="section about-ideas" id="tres-ideas">
        <div className="container">
          <Reveal className="section-heading section-heading-center">
            <span className="eyebrow">
              <i />
              Tres ideas. Nada más.
            </span>
            <h2>
              La tecnología es la herramienta.{' '}
              <span className="text-gradient">Las personas, el motivo.</span>
            </h2>
          </Reveal>
          <div className="about-ideas-grid">
            {ideas.map((idea, index) => {
              const Icon = idea.icon
              return (
                <Reveal className="about-idea" key={idea.title} delay={index * 0.08}>
                  <span className="about-idea-icon">
                    <Icon size={24} />
                  </span>
                  <h3>{idea.title}</h3>
                  <p>{idea.description}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section about-fit">
        <div className="container">
          <Reveal className="about-fit-heading">
            <h2>La mejor tecnología es la que encaja en tu forma de trabajar.</h2>
            <p className="about-fit-statement">
              <span>No venimos a decirte qué IA necesitas.</span>
              <span className="text-gradient">Venimos a entender qué podemos mejorar.</span>
            </p>
          </Reveal>
          <div className="about-steps">
            {steps.map((step, index) => (
              <Reveal className="about-step" key={step.title} delay={index * 0.1}>
                <span className="about-step-number">{index + 1}</span>
                <strong>{step.title}</strong>
                <span className="about-step-text">{step.description}</span>
                {index < steps.length - 1 && (
                  <ArrowRight className="about-step-arrow" size={22} aria-hidden="true" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-closing">
        <div className="container">
          <Reveal className="about-closing-content">
            <h2>
              Tecnología con sentido. <span className="text-gradient">Personas en el centro.</span>
            </h2>
            <p>
              Tu empresa no necesita más herramientas. Necesita soluciones que funcionen y personas
              detrás cuando las necesites.
            </p>
            <ButtonLink to="/contacto">Cuéntanos cómo trabajas</ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
