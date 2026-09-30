import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { businessAreas } from '../data/siteData'

// Versión reducida de "Qué hacemos" para el home: las seis áreas como tarjetas pequeñas
// que llevan a /que-hacemos, donde está el detalle completo
export function WhatWeDoTeaserSection() {
  return (
    <section className="section what-we-do what-we-do-teaser" id="soluciones">
      <div className="container">
        <Reveal className="what-we-do-teaser-header">
          <div>
            <span className="eyebrow">
              <i />
              Qué hacemos
            </span>
            <h2>Tecnología que resuelve trabajo real.</h2>
          </div>
          <Link to="/que-hacemos" className="what-we-do-teaser-link">
            Descubre cómo te ayudamos
            <ArrowRight size={16} />
          </Link>
        </Reveal>

        <div className="area-tiles">
          {businessAreas.map((area, index) => (
            <Reveal key={area.title} delay={(index % 3) * 0.05}>
              <Link to="/que-hacemos" className="area-tile">
                <span className="area-tile-media">
                  <ResponsiveImage image={area.image} sizes="80px" alt="" loading="lazy" />
                </span>
                <span className="area-tile-text">
                  <span className="area-card-index">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{area.title}</strong>
                  <span className="area-tile-description">{area.description}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
