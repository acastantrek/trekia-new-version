import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      // `transform` (y no `y`) para que framer-motion lo anime con WAAPI fuera del hilo principal:
      // así la animación no se congela a medias mientras carga la escena 3D y luego da un salto
      initial={{ opacity: 0, transform: 'translateY(24px)' }}
      whileInView={{ opacity: 1, transform: 'none' }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
