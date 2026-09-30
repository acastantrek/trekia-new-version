import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { processSteps } from '../data/siteData'

// Entrada escalonada de los pasos en desktop: cada paso aparece desde la izquierda
// (número, luego texto) y la línea que lo une con el siguiente se dibuja hacia la derecha
const STEP_STAGGER = 0.35
const easeOut = [0.22, 1, 0.36, 1] as const

const stepNumberVariants: Variants = {
  hidden: { opacity: 0, transform: 'translateX(-32px) scale(0.7)' },
  visible: (index: number) => ({
    opacity: 1,
    transform: 'translateX(0px) scale(1)',
    transition: { duration: 0.6, delay: index * STEP_STAGGER, ease: easeOut },
  }),
}

const stepTextVariants: Variants = {
  hidden: { opacity: 0, transform: 'translateX(-40px)' },
  visible: (index: number) => ({
    opacity: 1,
    transform: 'translateX(0px)',
    transition: { duration: 0.7, delay: index * STEP_STAGGER + 0.12, ease: easeOut },
  }),
}

const stepLineVariants: Variants = {
  hidden: { transform: 'scaleX(0)' },
  visible: (index: number) => ({
    transform: 'scaleX(1)',
    transition: { duration: 0.6, delay: index * STEP_STAGGER + 0.25, ease: easeOut },
  }),
}

// Resumen del método para el home: los cuatro pasos en una línea y enlace a /metodo
export function ProcessSection() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const current = processSteps[active]

  const goTo = (index: number) => {
    setActive(Math.max(0, Math.min(processSteps.length - 1, index)))
  }

  return (
    <section className="section process" id="proceso">
      <div className="container">
        <Reveal className="process-header">
          <div className="process-heading">
            <span className="eyebrow">
              <i />
              Nuestro método
            </span>
            <h2>
              Cuatro etapas. <span className="text-gradient">Una dirección clara.</span>
            </h2>
          </div>
          <Link to="/metodo" className="process-header-link">
            Ver el método completo
            <ArrowRight size={16} />
          </Link>
        </Reveal>
        <motion.div
          className="process-steps"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {processSteps.map((step, index) => (
            <div className="process-step" key={step.number}>
              <motion.div className="step-number" variants={stepNumberVariants} custom={index}>
                {step.number}
              </motion.div>
              {index < processSteps.length - 1 && (
                <motion.span
                  className="process-step-line"
                  variants={stepLineVariants}
                  custom={index}
                  aria-hidden="true"
                />
              )}
              <motion.div variants={stepTextVariants} custom={index}>
                <span className="process-step-label">{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
        <div className="process-carousel">
          <div className="process-stepper">
            {processSteps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                className={`process-stepper-dot ${index === active ? 'is-active' : ''} ${
                  index < active ? 'is-done' : ''
                }`}
                onClick={() => goTo(index)}
                aria-label={`Ir al paso ${index + 1}: ${step.label}`}
              >
                {step.number}
              </button>
            ))}
          </div>
          <div className="process-carousel-content" key={active}>
            <span className="process-step-label">{current.label}</span>
            <h3>{current.title}</h3>
            <p>{current.description}</p>
          </div>
          <div className="process-carousel-nav">
            <button
              type="button"
              className="carousel-arrow"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Paso anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="carousel-arrow"
              onClick={() => goTo(active + 1)}
              disabled={active === processSteps.length - 1}
              aria-label="Paso siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
