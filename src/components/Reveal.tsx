import { m, useReducedMotion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /**
   * Para el primer pantallazo (heros): se anima con CSS al pintar la página, sin esperar al JS, y
   * solo con desplazamiento, sin opacidad, para que el título cuente para el LCP desde el principio
   */
  onLoad?: boolean
}

export function Reveal({ children, className, delay = 0, onLoad = false }: RevealProps) {
  // MotionConfig reducedMotion no cubre `transform` como propiedad entera (solo x, y, scale…): con
  // "reducir movimiento" el desplazamiento dura 0 y solo queda el fundido. Solo cambia la
  // transición, no el HTML, así que no afecta a la hidratación
  const reduceMotion = useReducedMotion()

  if (onLoad) {
    return (
      <div
        className={className ? `${className} reveal-on-load` : 'reveal-on-load'}
        style={{ '--reveal-delay': `${delay}s` } as CSSProperties}
      >
        {children}
      </div>
    )
  }

  return (
    <m.div
      className={className}
      // `transform` (y no `y`) para que framer-motion lo anime con WAAPI fuera del hilo principal:
      // así la animación no se congela a medias mientras carga la escena 3D y luego da un salto
      initial={{ opacity: 0, transform: 'translateY(24px)' }}
      whileInView={{ opacity: 1, transform: 'none' }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
        ...(reduceMotion && { transform: { duration: 0 } }),
      }}
    >
      {children}
    </m.div>
  )
}
