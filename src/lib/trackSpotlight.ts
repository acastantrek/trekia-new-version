import type { MouseEvent } from 'react'

// Guarda la posición del cursor para el foco de luz de las .glow-card
export function trackSpotlight(event: MouseEvent<HTMLElement>) {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  card.style.setProperty('--my', `${event.clientY - rect.top}px`)
}
