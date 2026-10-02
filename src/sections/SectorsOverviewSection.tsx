import { Building2 } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { departments, sectors } from '../data/siteData'

// Página /sectores: los seis sectores como tarjetas y la franja de departamentos
export function SectorsOverviewSection() {
  return (
    <section className="section what-we-do is-page-header sectors-overview">
      <div className="container">
        <Reveal onLoad className="what-we-do-heading">
          <span className="eyebrow">
            <i />
            Sectores
          </span>
          <h1>Sectores donde los procesos importan.</h1>
          <p>
            Nos adaptamos a la forma de trabajar de cada negocio para simplificar tareas, mejorar la
            trazabilidad y conectar equipos.
          </p>
        </Reveal>

        <div className="sector-tiles">
          {sectors.map((sector, index) => {
            const Icon = sector.icon
            return (
              <Reveal key={sector.slug} delay={index * 0.05}>
                {/* id: destino de los enlaces /sectores#slug del menú y del home */}
                <div className="sector-tile" id={sector.slug}>
                  <span className="sector-tile-media">
                    <ResponsiveImage
                      image={sector.image}
                      sizes="(max-width: 600px) 50vw, (max-width: 1040px) 33vw, 220px"
                      alt=""
                      loading="lazy"
                    />
                  </span>
                  <span className="sector-tile-icon">
                    <Icon size={22} />
                  </span>
                  <span className="sector-tile-text">
                    <strong>{sector.label}</strong>
                    <span>{sector.tags}</span>
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="business-band">
          <div className="business-band-intro">
            <span className="business-band-icon">
              <Building2 size={28} />
            </span>
            <div>
              <strong>En cualquier sector. En cualquier departamento.</strong>
              <p>Siempre hay procesos que se pueden simplificar, conectar o automatizar.</p>
            </div>
          </div>
          <div className="business-band-types">
            <ul aria-label="Departamentos">
              {departments.map((department) => (
                <li key={department}>{department}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
