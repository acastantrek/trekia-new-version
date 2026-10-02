import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
  /** Contenido extra bajo la descripción, como los puntos clave del hero de /contacto */
  children?: ReactNode
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="page-hero">
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
