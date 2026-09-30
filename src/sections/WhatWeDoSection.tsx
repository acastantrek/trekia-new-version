import { ArrowRight, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { businessAreas, businessTypes } from '../data/siteData'

interface WhatWeDoSectionProps {
  /** En /que-hacemos es la cabecera de la página: título como h1 */
  isPageHeader?: boolean
}

export function WhatWeDoSection({ isPageHeader = false }: WhatWeDoSectionProps) {
  const Title = isPageHeader ? 'h1' : 'h2'

  return (
    <section className={`section what-we-do ${isPageHeader ? 'is-page-header' : ''}`} id="soluciones">
      <div className="container">
        <Reveal className="what-we-do-heading">
          <span className="eyebrow">
            <i />
            Qué hacemos
          </span>
          <Title>Tecnología que resuelve trabajo real.</Title>
          <p>
            Automatizamos, conectamos y simplificamos procesos que hoy consumen tiempo, generan
            errores o dependen demasiado de tareas manuales.
          </p>
        </Reveal>

        <div className="area-grid">
          {businessAreas.map((area, index) => (
            <Reveal className="area-card" key={area.title} delay={(index % 3) * 0.06}>
              <div className="area-card-body">
                <span className="area-card-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <ul className="area-card-features">
                  {area.features.map(({ label, icon: Icon }) => (
                    <li key={label}>
                      <Icon size={17} aria-hidden="true" />
                      {label}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contacto"
                  className="area-card-arrow"
                  aria-label={`Hablemos de ${area.title.toLowerCase()}`}
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
              <div className="area-card-media">
                <ResponsiveImage
                  image={area.image}
                  sizes="(max-width: 600px) 100vw, (max-width: 1040px) 25vw, 220px"
                  alt={area.imageAlt}
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="business-band">
          <div className="business-band-intro">
            <span className="business-band-icon">
              <UsersRound size={30} />
            </span>
            <div>
              <strong>
                No importa el tamaño de tu empresa,
                <br /> estamos para acompañarte.
              </strong>
              <p>Soluciones prácticas y cercanas, adaptadas a tu realidad.</p>
            </div>
          </div>
          <div className="business-band-types">
            <span className="business-band-label">Trabajamos con todo tipo de negocios</span>
            <ul>
              {businessTypes.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
