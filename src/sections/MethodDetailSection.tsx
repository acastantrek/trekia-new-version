import construirImage from '../assets/method/construir.jpg'
import definirImage from '../assets/method/definir.jpg'
import entenderImage from '../assets/method/entender.jpg'
import mejorarImage from '../assets/method/mejorar.jpg'
import { useRef, useState, type KeyboardEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { ResponsiveImage } from '../components/ResponsiveImage'

const methodDetails = [
  {
    number: '0',
    label: 'Entender',
    title: 'Analizamos',
    heading: 'Entendemos tu operación antes de proponer nada',
    paragraphs: [
      'Antes de hablar de tecnología, nos sentamos contigo a entender cómo funciona realmente el día a día: qué procesos existen, dónde se pierde tiempo, qué sistemas usáis y por qué se hacen las cosas como se hacen.',
      'Revisamos flujos de trabajo, hablamos con las personas que los ejecutan sobre el terreno y detectamos cuellos de botella que muchas veces pasan desapercibidos porque llevan años ahí, asumidos como normales.',
      'El resultado es un diagnóstico claro y priorizado: qué merece la pena automatizar primero, qué impacto real tendría y con qué nivel de esfuerzo.',
    ],
    image: entenderImage,
    imageAlt: 'Equipo tomando notas en libretas durante una sesión de análisis',
  },
  {
    number: '1',
    label: 'Definir',
    title: 'Diseñamos',
    heading: 'Diseñamos la solución antes de escribir una sola línea de código',
    paragraphs: [
      'Con el contexto claro, definimos qué se va a construir, con qué tecnología y en qué orden. Trazamos la arquitectura técnica y cómo va a integrarse con los sistemas que ya usáis, sin imponer herramientas que no necesitáis.',
      'Dividimos el proyecto en fases pequeñas y medibles, cada una con un objetivo y un resultado concreto, para reducir el riesgo y poder validar el rumbo antes de avanzar.',
      'Todo queda documentado y acordado contigo: alcance, plazos y criterios de éxito. Así evitamos cambios de rumbo a mitad de proyecto y sorpresas en la factura.',
    ],
    image: definirImage,
    imageAlt: 'Manos dibujando un wireframe de producto en una pizarra',
  },
  {
    number: '2',
    label: 'Construir',
    title: 'Implementamos',
    heading: 'Desarrollamos en ciclos cortos, con entregas que puedes probar',
    paragraphs: [
      'Desarrollamos la solución en sprints cortos, con entregas frecuentes que puedes revisar y probar desde las primeras semanas, no un único hito al final del proyecto.',
      'Integramos con tus sistemas existentes (ERP, CRM, hojas de cálculo, APIs propias) y validamos cada pieza en un entorno controlado antes de pasar a producción.',
      'Tú ves avances reales en cada entrega, no informes de estado: puedes tocar, probar y dar feedback sobre lo que se está construyendo.',
    ],
    image: construirImage,
    imageAlt: 'Desarrollador programando frente a varias pantallas con código',
  },
  {
    number: '3',
    label: 'Mejorar',
    title: 'Optimizamos',
    heading: 'Medimos el impacto real y seguimos iterando',
    paragraphs: [
      'Una vez en marcha, medimos el impacto con datos: tiempo ahorrado, errores reducidos, procesos que ahora fluyen sin intervención manual.',
      'Con esos datos, iteramos: ajustamos lo que no funciona como se esperaba y reforzamos lo que sí, en vez de darlo todo por cerrado tras el lanzamiento.',
      'El método no termina en la entrega. Seguimos monitorizando y proponiendo mejoras mientras la solución siga generando valor para tu operación.',
    ],
    image: mejorarImage,
    imageAlt: 'Panel de analítica con gráficos de rendimiento en una pantalla',
  },
]

// Las cuatro fases en un solo bloque con pestañas: se muestra una fase cada vez
// para que la página no sea una sucesión larga de filas imagen + texto
export function MethodDetailSection() {
  const [active, setActive] = useState(0)
  const current = methodDetails[active]
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Patrón ARIA de pestañas: solo la activa entra en el orden de Tab y las flechas (o Inicio y Fin)
  // cambian de fase y le llevan el foco
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = methodDetails.length - 1
    const next = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="section method-detail">
      <div className="container">
        <Reveal className="process-heading">
          <span className="eyebrow">
            <i />
            Nuestro método
          </span>
          <h2>
            Cuatro etapas. <span className="text-gradient">Una dirección clara.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="tabs-nav" role="tablist" aria-label="Fases del método">
            {methodDetails.map((step, index) => (
              <button
                key={step.number}
                type="button"
                role="tab"
                id={`method-tab-${step.number}`}
                aria-selected={index === active}
                aria-controls="method-tab-panel"
                tabIndex={index === active ? 0 : -1}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                className={`tab ${index === active ? 'is-active' : ''} ${
                  index < active ? 'is-done' : ''
                }`}
                onClick={() => setActive(index)}
                onKeyDown={onTabKeyDown}
              >
                <span className="tab-badge">{step.number}</span>
                <span className="tab-text">
                  <span className="process-step-label">{step.label}</span>
                  <strong>{step.title}</strong>
                </span>
              </button>
            ))}
          </div>
          <div
            className="tab-panel"
            id="method-tab-panel"
            role="tabpanel"
            // El panel no tiene nada enfocable: con Tab se llega a él desde la pestaña
            tabIndex={0}
            aria-labelledby={`method-tab-${current.number}`}
            key={active}
          >
            <div className="tab-panel-media">
              <ResponsiveImage
                image={current.image}
                sizes="(max-width: 820px) 100vw, 480px"
                alt={current.imageAlt}
                loading="lazy"
              />
            </div>
            <div className="tab-panel-content">
              <h3>{current.heading}</h3>
              {current.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
