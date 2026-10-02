import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { businessAreas } from '../data/businessAreas'
import { CtaSection } from '../sections/CtaSection'
import { Seo } from '../components/Seo'
import { NotFoundPage } from './NotFoundPage'

// Página de cada área de "Qué hacemos": poco texto, todo en tarjetas con icono
export function ServicePage() {
  const { slug } = useParams()
  const area = businessAreas.find((item) => item.slug === slug)

  if (!area) {
    return <NotFoundPage />
  }

  const otherAreas = businessAreas.filter((item) => item.slug !== area.slug)

  return (
    <>
      <Seo
        title={`${area.title}: qué automatizamos`}
        description={`${area.description} Te ayudamos a conectar tus sistemas y reducir el trabajo manual.`}
      />
      <section className="section area-hero">
        <div className="container area-hero-grid">
          <Reveal className="area-hero-content">
            <Link className="area-back-link" to="/que-hacemos">
              <ArrowLeft size={16} />
              Qué hacemos
            </Link>
            <h1>{area.title}</h1>
            <p>{area.description}</p>
            <ul className="area-hero-features">
              {area.features.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="area-hero-media" delay={0.08}>
            <ResponsiveImage
              image={area.image}
              sizes="(max-width: 820px) 100vw, 560px"
              alt={area.imageAlt}
            />
          </Reveal>
        </div>
      </section>

      <section className="section area-block">
        <div className="container">
          <Reveal className="area-heading">
            <span className="eyebrow">
              <i />
              ¿Te suena?
            </span>
            <h2>Lo que vemos a menudo.</h2>
          </Reveal>
          <div className="area-cards area-cards-3">
            {area.pains.map(({ title, text, icon: Icon }, index) => (
              <Reveal className="area-info-card is-pain" key={title} delay={index * 0.06}>
                <span className="area-info-icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section area-block">
        <div className="container">
          <Reveal className="area-heading">
            <span className="eyebrow">
              <i />
              La solución
            </span>
            <h2>Qué automatizamos.</h2>
          </Reveal>
          <div className="area-cards">
            {area.capabilities.map(({ title, text, icon: Icon }, index) => (
              <Reveal className="area-info-card" key={title} delay={(index % 3) * 0.06}>
                <span className="area-info-icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section area-block">
        <div className="container">
          <Reveal className="area-heading">
            <span className="eyebrow">
              <i />
              Resultado
            </span>
            <h2>Lo que ganas.</h2>
          </Reveal>
          <div className="area-results">
            {area.results.map(({ label, icon: Icon }, index) => (
              <Reveal className="area-result" key={label} delay={index * 0.06}>
                <span className="area-result-icon">
                  <Icon size={26} />
                </span>
                <strong>{label}</strong>
              </Reveal>
            ))}
          </div>
          <Reveal className="area-others">
            <span className="business-band-label">Otras áreas</span>
            <ul>
              {otherAreas.map(({ slug: otherSlug, title, icon: Icon }) => (
                <li key={otherSlug}>
                  <Link to={`/servicios/${otherSlug}`}>
                    <Icon size={16} aria-hidden="true" />
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
