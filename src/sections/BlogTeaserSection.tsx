import { useEffect, useRef, useState } from 'react'
import { BlogCard } from '../components/BlogCard'
import { ButtonLink } from '../components/ButtonLink'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { blogPosts } from '../data/blogPosts'
import { useCarouselMarquee } from '../hooks/useCarouselMarquee'

const ITEMS_COUNT = blogPosts.length

export function BlogTeaserSection() {
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
    const clamped = Math.max(0, Math.min(blogPosts.length - 1, index))
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
    <section className="section blog-teaser">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Blog"
            title="Ideas prácticas sobre automatización, datos e IA aplicada."
            description="Lo que aprendemos ayudando a empresas B2B a operar con menos fricción, escrito sin relleno."
          />
        </Reveal>
        <Reveal className="blog-carousel" delay={0.08}>
          <div className="blog-track" ref={trackRef} {...marqueeHandlers}>
            {/* Segunda copia para el bucle continuo de desktop (oculta en móvil) */}
            {[...blogPosts, ...blogPosts].map((post, index) => (
              <BlogCard post={post} key={`${post.slug}-${index}`} clone={index >= ITEMS_COUNT} />
            ))}
          </div>
        </Reveal>
        <div className="carousel-dots">
          {blogPosts.map((post, index) => (
            <button
              key={post.slug}
              type="button"
              className={`carousel-dot ${index === active ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Ir al artículo ${index + 1}`}
            />
          ))}
        </div>
        <Reveal className="blog-teaser-cta" delay={0.15}>
          <ButtonLink to="/blog" variant="secondary">
            Ver todos los artículos
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
