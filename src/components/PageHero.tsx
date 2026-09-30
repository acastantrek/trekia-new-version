import { Reveal } from './Reveal'

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-orb" />
      <div className="container">
        <Reveal>
          <span className="eyebrow">
            <i />
            {eyebrow}
          </span>
          <h1>{title}</h1>
          <p>{description}</p>
        </Reveal>
      </div>
    </section>
  )
}
