import { Quote } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { testimonials } from '../data/siteData'
import { useCarouselMarquee } from '../hooks/useCarouselMarquee'
import { trackSpotlight } from '../lib/trackSpotlight'

const ITEMS_COUNT = testimonials.length

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const marqueeHandlers = useCarouselMarquee(trackRef, ITEMS_COUNT)

  const scrollToIndex = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[index] as HTMLElement | undefined
    if (!card) return
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
  }

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(testimonials.length - 1, index))
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
        // Solo las cards originales: las copias del bucle de desktop no cuentan
        const cards = Array.from(track.children).slice(0, ITEMS_COUNT) as HTMLElement[]
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
    <section className="section testimonials" id="opiniones">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestros clientes opinan"
            title="Resultados que se notan en el día a día."
          />
        </Reveal>
        <Reveal className="testimonials-carousel" delay={0.08}>
          <div className="testimonials-track" ref={trackRef} {...marqueeHandlers}>
            {/* Segunda copia para el bucle continuo de desktop (oculta en móvil) */}
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                className={`testimonial-card glow-card ${index >= ITEMS_COUNT ? 'is-clone' : ''}`}
                key={`${item.role}-${index}`}
                onMouseMove={trackSpotlight}
                aria-hidden={index >= ITEMS_COUNT || undefined}
                inert={index >= ITEMS_COUNT}
              >
                <Quote className="testimonial-quote-icon" size={22} />
                <p>{item.quote}</p>
                <div className="testimonial-author">
                  <img className="testimonial-avatar" src={item.avatar} alt="" loading="lazy" />
                  <div>
                    <strong>{item.role}</strong>
                    <span>{item.sector}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="carousel-dots">
          {testimonials.map((item, index) => (
            <button
              key={item.role}
              type="button"
              className={`carousel-dot ${index === active ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Ir a la opinión ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
