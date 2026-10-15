import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description: string
  /** Contenido extra bajo la descripción, como los puntos clave del hero de /contacto */
  children?: ReactNode
  /** Clase extra para la sección, como `page-hero-article` en los artículos del blog */
  className?: string
}

export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <section className={className ? `page-hero ${className}` : 'page-hero'}>
      <div className="page-orb" />
      <div className="container">
        <Reveal onLoad>
          <span className="eyebrow">
            <i />
            {eyebrow}
          </span>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </Reveal>
      </div>
    </section>
  )
}
