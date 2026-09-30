import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { teamPhotos } from '../data/siteData'
import { ImageLightbox } from './ImageLightbox'
import { Reveal } from './Reveal'
import { ResponsiveImage } from './ResponsiveImage'

// En desktop las fotos se ven en una cuadrícula 2x2; en móvil, como carrusel
export function TeamPhotosCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const scrollToIndex = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[index] as HTMLElement | undefined
    if (!card) return
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
  }

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(teamPhotos.length - 1, index))
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
    <div className="container team-photos-grid">
      <Reveal className="about-teaser-carousel" delay={0.06}>
        <button
          type="button"
          className="carousel-arrow carousel-arrow-prev"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Foto anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="about-teaser-track" ref={trackRef}>
          {teamPhotos.map((photo, index) => (
            <button
              type="button"
              className="about-teaser-photo"
              key={photo.alt}
              onClick={() => setLightboxIndex(index)}
              aria-label={`Ampliar foto: ${photo.alt}`}
            >
              <ResponsiveImage
                image={photo.src}
                sizes="(max-width: 600px) 90vw, 700px"
                alt={photo.alt}
                loading="lazy"
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="carousel-arrow carousel-arrow-next"
          onClick={() => goTo(active + 1)}
          disabled={active === teamPhotos.length - 1}
          aria-label="Foto siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </Reveal>
      <div className="carousel-dots">
        {teamPhotos.map((photo, index) => (
          <button
            key={photo.alt}
            type="button"
            className={`carousel-dot ${index === active ? 'is-active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Ir a la foto ${index + 1}`}
          />
        ))}
      </div>
      {lightboxIndex !== null && (
        <ImageLightbox
          images={teamPhotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </div>
  )
}
