import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { sectors } from '../data/siteData'
import { trackSpotlight } from '../lib/trackSpotlight'
import { ResponsiveImage } from '../components/ResponsiveImage'

interface SectorsSectionProps {
  carousel?: boolean
}

export function SectorsSection({ carousel = false }: SectorsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollToIndex = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[index] as HTMLElement | undefined
    if (!card) return
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
  }

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(sectors.length - 1, index))
    setActive(clamped)
    scrollToIndex(clamped)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const cards = Array.from(track.children) as HTMLElement[]
        let closest = 0
        let closestDistance = Infinity
        cards.forEach((card, index) => {
          const distance = Math.abs(card.offsetLeft - track.scrollLeft)
          if (distance < closestDistance) {
            closestDistance = distance
            closest = index
          }
        })
        setActive(closest)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className={`section sectors ${carousel ? 'sectors-has-carousel' : ''}`} id="sectores">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Sectores"
            title={
              <>
                Donde los procesos importan, <br className="sectors-title-break" />
                la automatización multiplica.
              </>
            }
            description="Entendemos entornos con operaciones complejas, equipos diversos y sistemas que necesitan hablar entre sí."
          />
        </Reveal>
        <div className="sectors-carousel">
          <button
            type="button"
            className="carousel-arrow carousel-arrow-prev"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Sector anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="sectors-grid" ref={trackRef}>
            {sectors.map((sector, index) => {
              const Icon = sector.icon
              return (
                <Reveal className="sector-card" key={sector.slug} delay={index * 0.04}>
                  <Link
                    to={`/sectores#${sector.slug}`}
                    className="sector-card-link glow-card"
                    onMouseMove={trackSpotlight}
                  >
                    <div className="sector-card-media">
                      <ResponsiveImage
                        image={sector.image}
                        sizes="(max-width: 600px) 90vw, (max-width: 1040px) 50vw, 33vw"
                        alt=""
                        loading="lazy"
                      />
                      <div className="sector-card-icon">
                        <Icon />
                      </div>
                    </div>
                    <strong>{sector.label}</strong>
                  </Link>
                </Reveal>
              )
            })}
          </div>
          <button
            type="button"
            className="carousel-arrow carousel-arrow-next"
            onClick={() => goTo(active + 1)}
            disabled={active === sectors.length - 1}
            aria-label="Sector siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="carousel-dots sectors-dots">
          {sectors.map((sector, index) => (
            <button
              key={sector.slug}
              type="button"
              className={`carousel-dot ${index === active ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Ir al sector ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
