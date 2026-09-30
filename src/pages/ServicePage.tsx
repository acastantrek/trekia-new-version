import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { CtaSection } from '../sections/CtaSection'
import { solutions } from '../data/siteData'
import { ResponsiveImage } from '../components/ResponsiveImage'

export function ServicePage() {
  const { slug } = useParams()
  const service = solutions.find((item) => item.slug === slug)

  if (!service) {
    return <Navigate to="/que-hacemos" replace />
  }

  return (
    <>
      <PageHero eyebrow="Servicio" title={service.title} description={service.description} />
      <section className="section legal-section service-detail">
        <div className="container">
          <Reveal>
            <Link className="blog-back-link" to="/que-hacemos">
              <ArrowLeft size={16} />
              Volver a qué hacemos
            </Link>
          </Reveal>
          <div className="detail-row">
            <Reveal className="detail-media" delay={0.05}>
              <ResponsiveImage
                image={service.image}
                sizes="(max-width: 820px) 100vw, 600px"
                alt={service.title}
              />
            </Reveal>
            <Reveal className="detail-content" delay={0.08}>
              <p>{service.longDescription}</p>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section service-story">
        <div className="container">
          <div className="detail-row is-reverse">
            <Reveal className="detail-media">
              <ResponsiveImage
                image={service.gallery[0].src}
                sizes="(max-width: 820px) 100vw, 600px"
                alt={service.gallery[0].alt}
                loading="lazy"
              />
            </Reveal>
            <Reveal className="detail-content" delay={0.08}>
              <p>{service.extendedParagraphs[0]}</p>
              <p>{service.extendedParagraphs[1]}</p>
            </Reveal>
          </div>
          <div className="detail-row">
            <Reveal className="detail-media">
              <ResponsiveImage
                image={service.gallery[1].src}
                sizes="(max-width: 820px) 100vw, 600px"
                alt={service.gallery[1].alt}
                loading="lazy"
              />
            </Reveal>
            <Reveal className="detail-content" delay={0.08}>
              <p>{service.extendedParagraphs[2]}</p>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section principles">
        <div className="container principles-grid">
          <Reveal>
            <span className="eyebrow">
              <i />
              Qué incluye
            </span>
            <h2>Cómo lo ponemos en marcha.</h2>
          </Reveal>
          <div>
            {service.includes.map((item, index) => (
              <Reveal className="principle" key={item} delay={index * 0.06}>
                <CheckCircle2 />
                <p>{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  )
}
