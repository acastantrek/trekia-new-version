import introImage from '../assets/sectors/sectores-intro.jpg'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { CtaSection } from '../sections/CtaSection'
import { SectorsDetailSection } from '../sections/SectorsDetailSection'
import { ResponsiveImage } from '../components/ResponsiveImage'

export function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectores"
        title="Experiencia en operaciones complejas."
        description="Trabajamos con equipos que gestionan procesos críticos, múltiples sistemas y grandes volúmenes de datos."
      />
      <section className="sectors-intro">
        <div className="container sectors-intro-grid">
          <Reveal>
            <p>
              Cada sector tiene su propio ritmo, su propio vocabulario y sus propios cuellos de
              botella, pero todos comparten un mismo problema de fondo: información repartida entre
              sistemas que no se hablan y equipos que dedican demasiadas horas a tareas que no
              aportan valor. En logística, eso se traduce en rutas y entregas que se coordinan por
              teléfono; en industria, en órdenes de producción que se copian a mano de un sistema a
              otro; en el ámbito sanitario, en procesos administrativos que restan tiempo a la
              atención. En retail, hostelería y servicios, el reto suele ser el mismo: stock,
              reservas o incidencias que nadie ve completas hasta que ya es tarde. Nuestro trabajo
              empieza por entender cómo funciona realmente tu operación, con sus excepciones y sus
              atajos, para después conectar sistemas, automatizar lo repetitivo y aplicar IA solo
              donde aporta un resultado medible. No imponemos una solución genérica por sector:
              construimos sobre lo que ya funciona en tu empresa.
            </p>
          </Reveal>
          <Reveal className="sectors-intro-media" delay={0.1}>
            <ResponsiveImage
              image={introImage}
              sizes="(max-width: 820px) 100vw, 600px"
              alt="Ingeniera trabajando con un portátil en una planta industrial"
            />
          </Reveal>
        </div>
      </section>
      <SectorsDetailSection />
      <CtaSection />
    </>
  )
}
